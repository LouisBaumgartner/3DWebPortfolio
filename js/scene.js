/* =====================================================================
   3D-Szene im Stil "weisses Architekturmodell".
   Eine Station = ein Diorama auf einem Sockel. Die Kamera fährt beim
   Scrollen von Station zu Station (Steuerung: window.PORTFOLIO_STATE.t).
   Neue Station? -> in content.js ein "scene" angeben und unten in
   SCENES eine Bau-Funktion ergänzen.
   ===================================================================== */
import * as THREE from "three";

const canvas = document.getElementById("scene");
const C = window.PORTFOLIO;
const STATE = window.PORTFOLIO_STATE;
const N = C.experience.length;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 400);

/* ---------- Farben ---------- */
const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const ACCENT = new THREE.Color(css("--accent") || "#e5412d");
function applyBackground() {
  const bg = new THREE.Color(css("--bg"));
  scene.background = bg;
  scene.fog = new THREE.Fog(bg, 45, 150);
}
applyBackground();

/* ---------- Materialien (Modellbau-Look) ---------- */
const std = (color, rough = 0.9, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  white: std(0xf4f3ef),
  light: std(0xe6e4de),
  mid: std(0xcdc9c0),
  dark: std(0x3b3e45, 0.6),
  accent: std(ACCENT, 0.55, { emissive: ACCENT, emissiveIntensity: 0.12 }),
  glass: new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.05, transparent: true, opacity: 0.16, depthWrite: false }),
  line: new THREE.LineBasicMaterial({ color: 0x8f8b82 }),
  ghost: new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.75 }),
  ghostFill: new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.08, depthWrite: false }),
  beam: new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.55 }),
};

/* ---------- Licht ---------- */
scene.add(new THREE.HemisphereLight(0xffffff, 0xb9b4aa, 1.25));
const sun = new THREE.DirectionalLight(0xffffff, 2.2);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.02;
sun.shadow.radius = 4;
scene.add(sun, sun.target);

/* Boden fängt nur Schatten auf */
const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.ShadowMaterial({ opacity: 0.1 }));
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

/* ---------- Bau-Helfer ---------- */
const animated = []; // { obj, fn(time, obj) }
function prep(m) { m.castShadow = true; m.receiveShadow = true; return m; }
function add(parent, geo, mat, x = 0, y = 0, z = 0) {
  const m = prep(new THREE.Mesh(geo, mat));
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}
// Quader, y = Unterkante
const box = (p, w, h, d, x, y, z, mat = M.white) => add(p, new THREE.BoxGeometry(w, h, d), mat, x, y + h / 2, z);
// Zylinder, y = Unterkante
const cyl = (p, rt, rb, h, x, y, z, mat = M.white, seg = 24) => add(p, new THREE.CylinderGeometry(rt, rb, h, seg), mat, x, y + h / 2, z);
function outline(mesh, mat = M.line) {
  const l = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), mat);
  l.position.copy(mesh.position); l.rotation.copy(mesh.rotation); l.scale.copy(mesh.scale);
  mesh.parent.add(l);
  return l;
}
function line(p, pts, mat) {
  const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts.map((v) => new THREE.Vector3(...v))), mat);
  p.add(l);
  return l;
}
function float(obj, amp = 0.06, speed = 1.2, phase = Math.random() * 6) {
  const y0 = obj.position.y;
  animated.push({ obj, fn: (tm) => (obj.position.y = y0 + Math.sin(tm * speed + phase) * amp) });
}

/* Modellbau-Figur. opts: headset "vr" | "holo", accent (Kleidung), scale, kneel, tablet */
function person(p, x, z, rotY = 0, opts = {}) {
  const g = new THREE.Group();
  const s = opts.scale ?? 1;
  const body = opts.accent ? M.accent : M.white;
  const kneel = opts.kneel ? 0.45 : 0;
  if (!opts.kneel) {
    cyl(g, 0.07, 0.06, 0.78, -0.09, 0, 0, M.white, 10);
    cyl(g, 0.07, 0.06, 0.78, 0.09, 0, 0, M.white, 10);
  } else {
    box(g, 0.34, 0.14, 0.36, 0, 0, 0.1, M.white); // Unterschenkel am Boden
  }
  const torso = add(g, new THREE.CapsuleGeometry(0.17, 0.42, 4, 12), body, 0, 1.08 - kneel, 0);
  torso.scale.z = 0.72;
  const arms = [-0.24, 0.24].map((ax) => { const a = cyl(g, 0.05, 0.05, 0.58, ax, 0.72 - kneel, 0, body, 8); return a; });
  if (opts.tablet) {
    arms.forEach((a) => { a.rotation.x = -1.0; a.position.z = 0.18; a.position.y = 1.05 - kneel; });
    const tb = box(g, 0.34, 0.02, 0.24, 0, 1.08 - kneel, 0.4, M.dark);
    tb.rotation.x = -0.5;
  }
  add(g, new THREE.SphereGeometry(0.13, 20, 14), M.white, 0, 1.52 - kneel, 0);
  if (opts.headset === "vr") box(g, 0.24, 0.1, 0.14, 0, 1.49 - kneel, 0.09, M.accent);
  if (opts.headset === "holo") {
    const band = add(g, new THREE.TorusGeometry(0.135, 0.022, 8, 24), M.dark, 0, 1.56 - kneel, 0);
    band.rotation.x = Math.PI / 2;
    box(g, 0.22, 0.06, 0.05, 0, 1.51 - kneel, 0.13, M.accent);
  }
  g.scale.setScalar(s);
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  p.add(g);
  return g;
}
const faceTo = (x, z, tx, tz) => Math.atan2(tx - x, tz - z);

function table(p, w, d, x, z, h = 0.78, mat = M.white) {
  box(p, w, 0.05, d, x, h - 0.05, z, mat);
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) cyl(p, 0.03, 0.03, h - 0.05, x + sx * (w / 2 - 0.08), 0, z + sz * (d / 2 - 0.08), M.mid, 8);
}
function screenPanel(p, w, h, x, y, z, rotY = 0) {
  // schwebendes UI-Panel: Rahmen, rote Kopfzeile, graue Inhaltszeilen
  const g = new THREE.Group();
  box(g, w, h, 0.03, 0, -h / 2, 0, M.white);
  box(g, w, 0.1, 0.035, 0, h / 2 - 0.1, 0, M.accent);
  for (let i = 0; i < 3; i++) box(g, w * (0.75 - i * 0.15), 0.045, 0.035, -w * 0.08 + i * w * 0.05, h / 2 - 0.28 - i * 0.14, 0, M.mid);
  g.position.set(x, y, z); g.rotation.y = rotY;
  p.add(g);
  float(g, 0.06, 1.1);
  return g;
}
function tripod(p, x, z, h, rotY = 0) {
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const leg = cyl(g, 0.018, 0.018, h * 1.02, Math.sin(a) * 0.18, 0, Math.cos(a) * 0.18, M.dark, 6);
    leg.rotation.set(Math.cos(a) * 0.16, 0, -Math.sin(a) * 0.16);
  }
  g.position.set(x, 0, z); g.rotation.y = rotY;
  p.add(g);
  return g;
}
function tree(p, x, z, s = 1) {
  cyl(p, 0.04 * s, 0.05 * s, 0.5 * s, x, 0, z, M.mid, 8);
  add(p, new THREE.ConeGeometry(0.38 * s, 0.9 * s, 7), M.white, x, 0.9 * s, z);
  add(p, new THREE.ConeGeometry(0.28 * s, 0.7 * s, 7), M.white, x, 1.3 * s, z);
}
function roundTree(p, x, z, s = 1) {
  cyl(p, 0.04 * s, 0.05 * s, 0.7 * s, x, 0, z, M.mid, 8);
  add(p, new THREE.IcosahedronGeometry(0.42 * s, 1), M.white, x, 1.05 * s, z);
}

/* Sockel für jedes Diorama */
const PLINTH = { w: 11, d: 8.4, h: 0.55 };
function plinth(parent, index) {
  const b = box(parent, PLINTH.w, PLINTH.h, PLINTH.d, 0, -PLINTH.h, 0, M.light);
  box(parent, PLINTH.w - 0.3, 0.02, PLINTH.d - 0.3, 0, -0.02, 0, M.white);
  // Stationsnummer als rote Kerbe an der Vorderkante
  for (let i = 0; i <= index; i++) box(parent, 0.14, 0.2, 0.02, -PLINTH.w / 2 + 0.45 + i * 0.24, -0.4, PLINTH.d / 2 + 0.005, M.accent);
  return b;
}

/* =====================================================================
   SZENEN
   ===================================================================== */
const SCENES = {
  /* ---------- SKAN: Isolator im Design Review ---------- */
  isolator(g) {
    const iz = -1.3;
    // Isolator
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) cyl(g, 0.05, 0.05, 0.3, sx * 1.6, 0, iz + sz * 0.6, M.mid, 8);
    box(g, 3.6, 0.95, 1.5, 0, 0.3, iz, M.white);
    for (let i = 0; i < 3; i++) box(g, 1.05, 0.7, 0.02, -1.15 + i * 1.15, 0.42, iz + 0.76, M.light); // Schranktüren
    const chamber = box(g, 3.6, 1.25, 1.5, 0, 1.25, iz, M.glass);
    chamber.castShadow = false;
    outline(chamber);
    box(g, 3.4, 0.04, 1.3, 0, 1.27, iz, M.light); // Arbeitsfläche
    box(g, 3.6, 0.55, 1.3, 0, 2.5, iz - 0.1, M.white); // Technikaufbau
    for (let i = 0; i < 5; i++) box(g, 0.5, 0.05, 0.02, -1.3 + i * 0.65, 2.75, iz + 0.56, M.mid); // Lüftung
    for (let i = -1; i <= 1; i++) {
      const port = add(g, new THREE.TorusGeometry(0.2, 0.045, 10, 28), M.dark, i * 1.1, 1.85, iz + 0.76);
      const glove = cyl(g, 0.11, 0.14, 0.5, i * 1.1, 0, iz + 0.5, M.light, 12);
      glove.rotation.x = Math.PI / 2; glove.position.y = 1.85;
    }
    // Produkt im Isolator (rot)
    for (let i = 0; i < 4; i++) cyl(g, 0.06, 0.06, 0.22, 0.55 + i * 0.16, 1.31, iz - 0.1, M.accent, 10);
    box(g, 0.35, 0.5, 0.25, 1.95, 1.2, iz + 0.4, M.dark); // Bedienpanel

    // Review-Team mit VR-Brillen
    person(g, -2.1, 1.2, faceTo(-2.1, 1.2, 0, iz), { headset: "vr" });
    person(g, -0.3, 1.6, faceTo(-0.3, 1.6, 0, iz), { headset: "vr", accent: true });
    person(g, 1.5, 1.4, faceTo(1.5, 1.4, 0, iz), { headset: "vr" });
    person(g, -3.8, 2.4, faceTo(-3.8, 2.4, 0, iz), { tablet: true });

    // Schwebende UI-Panels (Design Review)
    screenPanel(g, 1.5, 0.9, -1.6, 3.7, 0.2, 0.35);
    screenPanel(g, 1.2, 0.75, 1.4, 3.9, 0.3, -0.35);

    // Kamera auf Stativ + Sichtkegel (Kamerasimulation)
    const cx = 3.9, cz = 1.9;
    tripod(g, cx, cz, 1.5);
    const head = box(g, 0.42, 0.28, 0.3, cx, 1.48, cz, M.dark);
    const rot = faceTo(cx, cz, 0.2, iz);
    head.rotation.y = rot;
    const lens = cyl(g, 0.1, 0.12, 0.18, cx + Math.sin(rot) * 0.22, 0, cz + Math.cos(rot) * 0.22, M.accent, 16);
    lens.rotation.set(Math.PI / 2, 0, 0); lens.rotation.order = "YXZ"; lens.rotation.y = rot; lens.position.y = 1.62;
    const o = [cx + Math.sin(rot) * 0.3, 1.62, cz + Math.cos(rot) * 0.3];
    for (const [tx, ty] of [[-1.1, 1.35], [1.3, 1.35], [-1.1, 2.4], [1.3, 2.4]]) line(g, [o, [tx, ty, iz + 0.78]], M.beam);
    line(g, [[-1.1, 1.35, iz + 0.78], [1.3, 1.35, iz + 0.78], [1.3, 2.4, iz + 0.78], [-1.1, 2.4, iz + 0.78], [-1.1, 1.35, iz + 0.78]], M.beam);

    // Arbeitsplatz mit Laptop
    table(g, 1.3, 0.7, -3.9, -0.4);
    box(g, 0.5, 0.02, 0.35, -3.9, 0.78, -0.35, M.dark);
    const scr = box(g, 0.5, 0.32, 0.02, -3.9, 0.78, -0.53, M.dark);
    scr.rotation.x = -0.25;
    roundTree(g, 4.6, -3.2, 1.1);
  },

  /* ---------- Refense: VR-Trainingshalle ---------- */
  hall(g) {
    // Hallenwände mit Pfeilern
    box(g, 10.6, 2.8, 0.15, 0, 0, -3.95, M.white);
    box(g, 0.15, 2.8, 7.8, -5.22, 0, -0.1, M.white);
    for (let i = 0; i < 8; i++) box(g, 0.18, 2.8, 0.22, -4.6 + i * 1.35, 0, -3.8, M.light);
    for (let i = 0; i < 5; i++) box(g, 0.22, 2.8, 0.18, -5.08, 0, -3 + i * 1.5, M.light);
    box(g, 10.6, 0.35, 0.3, 0, 2.8, -3.9, M.light); // Oberlicht-Band
    // Tracking-Fläche (rote Markierung)
    const ax = 0.9, az = -0.4, s = 5;
    for (const [w, d, x, z] of [[s, 0.06, ax, az - s / 2], [s, 0.06, ax, az + s / 2], [0.06, s, ax - s / 2, az], [0.06, s, ax + s / 2, az]]) box(g, w, 0.015, d, x, 0, z, M.accent);
    box(g, s, 0.005, s, ax, 0, az, M.light);
    // Tracking-Stationen an den Ecken
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const x = ax + sx * (s / 2 + 0.3), z = az + sz * (s / 2 + 0.3);
      tripod(g, x, z, 2.1);
      const b = box(g, 0.2, 0.14, 0.14, x, 2.08, z, M.dark);
      b.rotation.y = faceTo(x, z, ax, az);
      const led = box(g, 0.05, 0.05, 0.02, x, 2.12, z, M.accent);
      led.rotation.y = b.rotation.y;
      led.position.x += Math.sin(b.rotation.y) * 0.08; led.position.z += Math.cos(b.rotation.y) * 0.08;
    }
    // Eingeblendete virtuelle Szene (rote Drahtgitter): Einsatzfahrzeug, Gebäude, Verletzte Person
    const ghost = new THREE.Group();
    const ghostBox = (w, h, d, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), M.ghostFill);
      m.position.set(x, y + h / 2, z); ghost.add(m);
      const l = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), M.ghost);
      l.position.copy(m.position); ghost.add(l);
    };
    ghostBox(2.1, 0.7, 1.0, 2.2, 0.15, -2.0); ghostBox(1.1, 0.55, 0.95, 1.9, 0.85, -2.0); // Fahrzeug
    ghostBox(0.9, 0.08, 0.3, 2.9, 1.4, -2.0); // Blaulicht-Balken
    for (const wx of [1.5, 2.9]) for (const wz of [-2.5, -1.5]) {
      const w = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.CylinderGeometry(0.2, 0.2, 0.12, 12)), M.ghost);
      w.rotation.x = Math.PI / 2; w.position.set(wx, 0.2, wz); ghost.add(w);
    }
    ghostBox(1.4, 2.1, 1.2, -0.9, 0, -2.3); // Gebäudeecke
    ghostBox(0.9, 0.18, 0.35, 1.4, 0, 0.9); // liegende Person
    ghostBox(0.22, 0.2, 0.22, 1.95, 0, 0.9);
    g.add(ghost);
    animated.push({ obj: ghost, fn: (tm) => { M.ghost.opacity = 0.55 + Math.sin(tm * 2) * 0.2; } });
    // Trainierende mit VR
    person(g, 1.4, 1.55, faceTo(1.4, 1.55, 1.4, 0.9), { headset: "vr", kneel: true });
    person(g, 0.1, 0.2, faceTo(0.1, 0.2, 1.5, 0.9), { headset: "vr", accent: true });
    person(g, -0.6, -0.9, faceTo(-0.6, -0.9, 2, -2), { headset: "vr" });
    // Instruktor-Pult mit Szenario-Editor
    const dx = -3.4, dz = 2.6;
    table(g, 1.9, 0.8, dx, dz);
    for (const [ox, ry] of [[-0.45, 0.25], [0.45, -0.25]]) {
      const mon = new THREE.Group();
      box(mon, 0.78, 0.46, 0.04, 0, 0, 0, M.dark);
      box(mon, 0.66, 0.08, 0.05, 0, 0.32, 0, M.accent);
      box(mon, 0.2, 0.2, 0.05, -0.22, 0.06, 0, M.mid);
      box(mon, 0.36, 0.05, 0.05, 0.12, 0.2, 0, M.mid);
      box(mon, 0.36, 0.05, 0.05, 0.12, 0.1, 0, M.mid);
      mon.position.set(dx + ox, 0.95, dz - 0.25); mon.rotation.y = ry + Math.PI;
      g.add(mon);
      cyl(g, 0.02, 0.05, 0.18, dx + ox, 0.78, dz - 0.25, M.mid, 8);
    }
    person(g, dx, dz + 0.75, Math.PI, {});
  },

  /* ---------- FHNW: Mixed-Reality-Workshop ---------- */
  workshop(g) {
    // Glaswand-Element hinten
    for (let i = 0; i < 5; i++) box(g, 0.08, 2.6, 0.08, -4.8 + i * 1.6, 0, -3.9, M.white);
    const pane = box(g, 6.4, 2.6, 0.03, -1.6, 0, -3.9, M.glass); pane.castShadow = false; outline(pane);
    // Runder Tisch mit Architekturmodell
    const tx = 0.4, tz = -0.3;
    cyl(g, 1.35, 1.35, 0.06, tx, 0.78, tz, M.white, 40);
    cyl(g, 0.08, 0.1, 0.78, tx, 0, tz, M.mid, 12);
    cyl(g, 0.45, 0.45, 0.03, tx, 0, tz, M.mid, 24);
    box(g, 1.5, 0.04, 1.1, tx, 0.84, tz, M.light);
    const heights = [0.18, 0.32, 0.12, 0.45, 0.22, 0.28, 0.15, 0.38];
    heights.forEach((h, i) => box(g, 0.24, h, 0.24, tx - 0.55 + (i % 4) * 0.36, 0.88, tz - 0.25 + Math.floor(i / 4) * 0.45, i === 3 ? M.accent : M.white));
    // Personen mit HoloLens + geteilter Pointer
    const p1 = person(g, -1.7, 0.6, faceTo(-1.7, 0.6, tx, tz), { headset: "holo" });
    person(g, 2.4, -1.2, faceTo(2.4, -1.2, tx, tz), { headset: "holo", accent: true });
    const target = [tx - 0.55 + 3 * 0.36, 1.4, tz - 0.25];
    line(g, [[-1.6, 1.5, 0.52], target], M.beam);
    const dot = add(g, new THREE.SphereGeometry(0.06, 16, 10), M.accent, ...target);
    animated.push({ obj: dot, fn: (tm) => dot.scale.setScalar(1 + Math.sin(tm * 3) * 0.3) });
    // Virtueller Screen mit geteilter Perspektive
    const vs = new THREE.Group();
    box(vs, 1.7, 1.0, 0.03, 0, -0.5, 0, M.white);
    const frame = box(vs, 1.5, 0.8, 0.035, 0, -0.4, 0, M.light);
    for (let i = 0; i < 4; i++) box(vs, 0.18, 0.12 + i * 0.1, 0.04, -0.45 + i * 0.3, -0.35, 0, i === 2 ? M.accent : M.mid);
    vs.position.set(0.6, 3.1, -1.9); vs.rotation.y = 0.15;
    g.add(vs); float(vs, 0.05, 0.9);
    // Whiteboard mit UX-Skizzen und Post-its
    const wb = new THREE.Group();
    box(wb, 2.3, 1.3, 0.05, 0, 0.85, 0, M.white);
    for (const lx of [-1, 1]) { cyl(wb, 0.03, 0.03, 2.15, lx * 1.05, 0, 0.05, M.mid, 8); box(wb, 0.06, 0.03, 0.6, lx * 1.05, 0, 0.05, M.mid); }
    // Wireframe-Skizzen
    for (let i = 0; i < 3; i++) {
      box(wb, 0.42, 0.62, 0.02, -0.75 + i * 0.52, 1.18, 0.035, M.light);
      box(wb, 0.34, 0.06, 0.025, -0.75 + i * 0.52, 1.66, 0.04, M.mid);
      box(wb, 0.34, 0.2, 0.025, -0.75 + i * 0.52, 1.35, 0.04, M.mid);
    }
    [[0.78, 1.8, M.accent], [0.95, 1.62, M.light], [0.78, 1.44, M.accent], [0.95, 1.26, M.mid]].forEach(([x, y, m]) => box(wb, 0.14, 0.14, 0.03, x, y, 0.04, m));
    wb.position.set(-3.3, 0, -1.9); wb.rotation.y = 0.45;
    g.add(wb);
    person(g, -2.8, -0.6, faceTo(-2.8, -0.6, -3.3, -1.9) + 0.4, { tablet: true });
    roundTree(g, 4.4, -2.9, 1.2); roundTree(g, 4.7, 2.8, 0.9);
    // Stühle
    for (const a of [2.4, 4.1]) { const x = tx + Math.cos(a) * 1.8, z = tz + Math.sin(a) * 1.8; box(g, 0.45, 0.05, 0.45, x, 0.45, z, M.light); box(g, 0.05, 0.45, 0.05, x, 0, z, M.mid); }
  },

  /* ---------- Armee: Alpen, Zug-Formation ---------- */
  alps(g) {
    // Berge im Hintergrund
    const peaks = [[-3.8, -2.8, 1.7, 2.6], [-1.6, -3.1, 2.2, 3.8], [1.1, -2.9, 1.9, 3.0], [3.6, -3.0, 1.8, 2.4], [-0.2, -2.1, 1.2, 1.6], [2.4, -1.9, 1.1, 1.4]];
    peaks.forEach(([x, z, r, h], i) => {
      const m = add(g, new THREE.ConeGeometry(r, h, 5 + (i % 3)), i % 2 ? M.light : M.white, x, h / 2, z);
      m.rotation.y = i * 0.7;
    });
    // Fahne auf dem höchsten Gipfel
    cyl(g, 0.02, 0.02, 0.6, -1.6, 3.7, -3.1, M.dark, 6);
    const flag = box(g, 0.34, 0.22, 0.02, -1.43, 4.05, -3.1, M.accent);
    animated.push({ obj: flag, fn: (tm) => (flag.rotation.y = Math.sin(tm * 2.2) * 0.25) });
    // Hügel
    for (const [x, z, sx, sz] of [[-3.2, 0.4, 1.6, 1.1], [3.5, 0.9, 1.4, 1.2], [0.3, -0.9, 2.2, 0.9]]) {
      const h = add(g, new THREE.SphereGeometry(1, 20, 12), M.light, x, 0, z);
      h.scale.set(sx, 0.28, sz);
    }
    // Bäume
    [[-4.6, 1.8], [-4.2, 2.8], [-3.6, 2.2], [4.4, -0.4], [4.8, 0.6], [4.5, 2.6], [-4.8, -0.8]].forEach(([x, z], i) => tree(g, x, z, 0.8 + (i % 3) * 0.15));
    // Weg
    [[0.6, 3.6], [0.4, 3.0], [0.1, 2.4], [-0.3, 1.8], [-0.4, 1.2]].forEach(([x, z]) => box(g, 0.5, 0.015, 0.45, x, 0, z, M.mid));
    // Zelt
    const tentGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.6, 3);
    tentGeo.rotateX(-Math.PI / 2); // Prisma liegt, Spitze zeigt nach oben
    const tent = add(g, tentGeo, M.white, 3.1, 0.35, 1.9);
    tent.rotation.y = 0.35;
    const flap = box(g, 0.3, 0.45, 0.02, 3.1 + Math.sin(0.35) * 0.81, 0, 1.9 + Math.cos(0.35) * 0.81, M.dark);
    flap.rotation.y = 0.35;
    // Kartentisch (Planung)
    table(g, 1.2, 0.8, 1.6, 2.9, 0.75);
    box(g, 1.0, 0.012, 0.65, 1.6, 0.75, 2.9, M.light);
    [[1.3, 2.8], [1.75, 3.05], [1.9, 2.75]].forEach(([x, z]) => cyl(g, 0.035, 0.035, 0.1, x, 0.76, z, M.accent, 8));
    box(g, 0.5, 0.013, 0.03, 1.55, 0.762, 2.92, M.dark).rotation.y = 0.4;
    person(g, 1.5, 3.55, Math.PI, { scale: 0.95 });
    // Zug-Formation (klein) mit Zugführer in Rot
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) person(g, -2.4 + c * 0.42, 1.0 + r * 0.5, Math.PI / 5, { scale: 0.48 });
    person(g, -1.6, 2.7, Math.PI + Math.PI / 5, { scale: 0.52, accent: true });
  },
};

/* ---------- Stationen aufbauen ---------- */
const SPACING = 17;
const stations = C.experience.map((e, i) => {
  const g = new THREE.Group();
  g.position.set(i % 2 === 0 ? -4.5 : 4.5, PLINTH.h, -i * SPACING);
  plinth(g, i);
  (SCENES[e.scene] || (() => {}))(g);
  scene.add(g);
  return g;
});

/* Verbindungslinie zwischen den Sockeln */
{
  const pts = [];
  stations.forEach((s, i) => {
    pts.push(new THREE.Vector3(s.position.x, 0.02, s.position.z + PLINTH.d / 2 + (i === 0 ? 3 : 0)));
    pts.push(new THREE.Vector3(s.position.x, 0.02, s.position.z - PLINTH.d / 2));
  });
  const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
  const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(300)), new THREE.LineDashedMaterial({ color: ACCENT, dashSize: 0.35, gapSize: 0.3 }));
  l.computeLineDistances();
  scene.add(l);
}

/* ---------- Kamera-Keyframes ----------
   off = Verschiebung des Bildausschnitts (Anteil der Breite/Höhe):
   ox > 0 schiebt die Szene nach rechts (Platz für Text links),
   oyM > 0 schiebt sie auf Mobile nach unten (unter den Hero-Text), < 0 nach oben. */
const center = new THREE.Vector3(0, 0, -((N - 1) * SPACING) / 2);
const K = [];
K.push({ pos: new THREE.Vector3(30, 26, 22), look: center.clone().add(new THREE.Vector3(0, 0, 4)), ox: 0.2, oxM: 0, oyM: 0.3, dist: 40 });
stations.forEach((s) => {
  const p = s.position;
  K.push({ pos: new THREE.Vector3(p.x + 9.5, p.y + 7.2, p.z + 12.5), look: new THREE.Vector3(p.x, p.y + 1.3, p.z), ox: 0.17, oxM: 0, oyM: 0.2, dist: 14 });
});
K.push({ pos: new THREE.Vector3(-34, 46, center.z + 30), look: center.clone(), ox: 0, oxM: 0, oyM: 0, dist: 44 });

/* ---------- Grösse & Bildausschnitt ---------- */
let W = 1, H = 1;
function resize() {
  W = innerWidth; H = innerHeight;
  renderer.setSize(W, H, false);
  camera.aspect = W / H;
  camera.fov = W < 700 ? 44 : 32;
  camera.updateProjectionMatrix();
}
addEventListener("resize", resize);
resize();

/* ---------- Maus-Parallaxe ---------- */
const mouse = new THREE.Vector2();
addEventListener("pointermove", (e) => mouse.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1), { passive: true });

/* ---------- Loop ---------- */
const pos = new THREE.Vector3(), look = new THREE.Vector3(), lookNow = new THREE.Vector3();
let tNow = 0, offX = 0, offY = 0;
const clock = new THREE.Clock();
let running = false;

/* Mobile: freier Bereich zwischen Kopfzeile und Infokachel.
   Die Kamera richtet das Diorama genau in diesem Bereich ein. */
const topbar = document.querySelector(".topbar");
const panel = document.getElementById("station-panel");
const DIORAMA_RADIUS = 6.0; // halbe Diagonale eines Sockels (+ etwas Luft)
function freeRegion() {
  const top = topbar ? topbar.getBoundingClientRect().bottom : 0;
  let bottom = H;
  if (panel && !panel.classList.contains("hidden")) {
    const r = panel.getBoundingClientRect();
    if (r.height > 0 && r.top < H) bottom = Math.max(top + 120, r.top - 8);
  }
  return { top, bottom };
}

function sample(t) {
  const i = Math.max(0, Math.min(K.length - 2, Math.floor(t)));
  const f = THREE.MathUtils.clamp(t - i, 0, 1);
  const a = K[i], b = K[i + 1];
  pos.lerpVectors(a.pos, b.pos, f);
  look.lerpVectors(a.look, b.look, f);
  const mobile = W < 900;
  let oy = mobile ? THREE.MathUtils.lerp(a.oyM, b.oyM, f) : 0;

  // Hochformat im Stationsbereich: Diorama in den freien Bereich einpassen
  const inStations = t > 0.5 && t < N + 0.5;
  if (mobile && inStations) {
    const reg = freeRegion();
    const regH = reg.bottom - reg.top;
    const centerY = (reg.top + reg.bottom) / 2;
    oy = (centerY - H / 2) / H; // Mitte des freien Bereichs (negativ = Szene rückt nach oben)
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const fitV = tanHalf * (regH / H);
    const fitH = tanHalf * (W / H);
    const need = DIORAMA_RADIUS / Math.min(fitV, fitH);
    const dir = pos.clone().sub(look);
    const len = dir.length();
    // sanft einblenden, damit der Übergang vom Hero nicht springt
    const w = THREE.MathUtils.smoothstep(t, 0.5, 1);
    pos.copy(look).add(dir.setLength(THREE.MathUtils.lerp(len, Math.max(len, need), w)));
  }
  // Bei Stationswechsel etwas anheben -> Flug-Gefühl
  pos.y += Math.sin(f * Math.PI) * (i > 0 && i < K.length - 2 ? 3 : 0);
  return {
    ox: mobile ? THREE.MathUtils.lerp(a.oxM, b.oxM, f) : THREE.MathUtils.lerp(a.ox, b.ox, f),
    oy,
    dist: THREE.MathUtils.lerp(a.dist, b.dist, f) * (mobile && inStations ? 1.6 : 1),
  };
}

const first = sample(STATE ? STATE.t : 0);
camera.position.copy(pos); lookNow.copy(look);

function frame() {
  if (!running) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  const tm = clock.elapsedTime;
  const target = STATE ? STATE.t : 0;
  tNow += (target - tNow) * (1 - Math.pow(0.03, dt));
  const s = sample(tNow);

  pos.x += mouse.x * 0.5; pos.y -= mouse.y * 0.3;
  camera.position.lerp(pos, 1 - Math.pow(0.002, dt));
  lookNow.lerp(look, 1 - Math.pow(0.002, dt));
  camera.lookAt(lookNow);

  offX += (s.ox - offX) * (1 - Math.pow(0.01, dt));
  offY += (s.oy - offY) * (1 - Math.pow(0.01, dt));
  camera.setViewOffset(W, H, -offX * W, -offY * H, W, H);

  // Schatten folgen dem Blickpunkt
  const half = THREE.MathUtils.clamp(s.dist * 0.75, 9, 40);
  const sc = sun.shadow.camera;
  if (Math.abs(sc.right - half) > 0.1) { sc.left = -half; sc.right = half; sc.top = half; sc.bottom = -half; sc.far = 120; sc.updateProjectionMatrix(); }
  sun.position.copy(lookNow).add(new THREE.Vector3(12, 22, 10));
  sun.target.position.copy(lookNow);

  canvas.classList.toggle("dim", tNow > N + 0.4);
  animated.forEach((a) => a.fn(tm, a.obj));
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

function start() { if (!running) { running = true; clock.getDelta(); requestAnimationFrame(frame); } }
function stop() { running = false; }
function sync() { (STATE && STATE.classic) || document.hidden ? stop() : start(); }
addEventListener("portfolio:mode", sync);
document.addEventListener("visibilitychange", sync);
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyBackground);
sync();
