# Portfolio Louis Baumgartner

Persönliches 3D-Webportfolio (Three.js), gebaut für GitHub Pages. Kein Build-Schritt nötig: reines HTML, CSS und JavaScript.

## Aufbau

```
index.html          Seitengerüst
css/style.css       Gestaltung (Farben ganz oben unter :root)
js/content.js       ALLE Inhalte – hier bearbeitest du Texte, Projekte, Links
js/app.js           rendert die Inhalte, Scroll-Logik (normalerweise nicht anfassen)
js/scene.js         3D-Szene: vier Dioramen im Stil "weisses Architekturmodell"
js/vendor/          Three.js (lokal, damit die Seite unabhängig von CDNs läuft)
assets/             deine Bilder, CV, Foto
```

## Inhalte bearbeiten (js/content.js)

- Texte sind entweder `"..."` (gilt für beide Sprachen) oder `{ de: "...", en: "..." }`.
- **Foto:** Bild nach `assets/louis.jpg` legen, dann `photo: "assets/louis.jpg"`.
- **LinkedIn:** `linkedin: "https://www.linkedin.com/in/..."`.
- **CV-Download:** PDF nach `assets/` legen, dann `cvFile: "assets/CV_Louis_Baumgartner.pdf"`.
  Tipp: für die öffentliche Version Adresse, Telefonnummer und Geburtsdatum entfernen.
- **Stationen:** `experience` – `highlights` (max. 3) werden in der 3D-Fahrt eingeblendet, `points` erscheinen unter "Alle Details".
- **Projekte:** `projects` – `show: false` blendet ein Projekt aus.
- **Case Studies:** `caseStudies` – Vorlagen mit `[PLATZHALTER]`. Solange `draft: true` gesetzt ist, sind sie unsichtbar.
  Vorschau aller Entwürfe: `index.html?drafts=1`. Wenn fertig: Platzhalter ersetzen, `draft: false`.
- **Bilder der Projekte:** aktuell direkt vom Adobe-Portfolio verlinkt. Falls du das Adobe-Portfolio kündigst, Bilder herunterladen, nach `assets/` legen und `cover:` anpassen.

## Nützliche URL-Parameter

| Parameter | Wirkung |
|---|---|
| `?lang=en` | englische Version (Standard ist Deutsch), z. B. für Bewerbungen auf Englisch |
| `?mode=classic` | Version ohne 3D |
| `?drafts=1` | zeigt Case-Study-Entwürfe |

Besucher können oben rechts auch selbst Sprache und 3D/Klassisch umschalten. Ohne WebGL startet automatisch die klassische Ansicht.

## Lokal ansehen

Wegen der JavaScript-Module braucht es einen kleinen lokalen Server (Doppelklick auf index.html reicht nicht):

```bash
cd portfolio
python3 -m http.server 8000
# dann im Browser: http://localhost:8000
```

## Auf GitHub Pages veröffentlichen

1. Repository: `LouisBaumgartner/3DWebPortfolio`. Für kostenloses GitHub Pages muss es **öffentlich** sein
   (Settings → General → Danger Zone → Change visibility), sonst braucht es GitHub Pro.
2. Alle Dateien dieses Ordners hochladen (Web: "Add file → Upload files", oder per git push).
3. Im Repository: **Settings → Pages → Branch: `master` / Ordner: `/ (root)` → Save**.
4. Nach 1–2 Minuten ist die Seite online unter
   `https://louisbaumgartner.github.io/3DWebPortfolio/`.

## 3D-Szene anpassen (js/scene.js)

- Jede Station in `content.js` hat ein Feld `scene` (`isolator`, `hall`, `workshop`, `alps`).
  Die gleichnamige Funktion in `SCENES` baut das Diorama aus einfachen Formen.
- Farben: Die rote Akzentfarbe kommt aus `--accent` in `css/style.css`.
- Kamera-Perspektive pro Station: Block "Kamera-Keyframes".
