/* ============================================================
   CONTENT — alle Inhalte des Portfolios an einem Ort.
   ------------------------------------------------------------
   So bearbeitest du Inhalte:
   - Texte: entweder ein einfacher String "..." (gilt für beide
     Sprachen) oder ein Objekt { de: "...", en: "..." }.
   - Bilder: lege sie in /assets/ ab und trage den Pfad ein,
     z.B. cover: "assets/skan-cover.jpg". Leer lassen ("")
     zeigt eine neutrale Farbfläche.
   - Videos: YouTube-Embed-Link (https://www.youtube.com/embed/ID)
     oder Adobe-Embed-Link. Leer lassen = kein Video.
   - Neues Projekt: einen Block in "projects" kopieren und anpassen.
   - Einträge mit [PLATZHALTER] sind noch auszufüllen.
   ============================================================ */

window.PORTFOLIO = {
  meta: {
    name: "Louis Baumgartner",
    firstName: "Louis",
    lastName: "Baumgartner",
    headline: {
      de: "Digital Solutions · XR · Von der Anforderung bis zur Umsetzung",
      en: "Digital Solutions · XR · From requirements to delivery",
    },
    /* Kurzer "Über mich"-Text im Kontaktbereich – Vorschlag, gerne anpassen */
    about: {
      de: "Mich interessiert, wo Technik auf Menschen trifft: Bedürfnisse verstehen, Systeme zusammendenken und Lösungen so bauen, dass sie im Alltag wirklich helfen. Entwickeln ist für mich Mittel zum Zweck – der Zweck ist Wirkung beim Kunden und im Team.",
      en: "I'm drawn to where technology meets people: understanding needs, thinking in systems and building solutions that genuinely help day to day. For me, development is a means to an end – the end is impact for clients and the team.",
    },
    intro: {
      de: "Ich übersetze Kundenbedürfnisse in tragfähige digitale Lösungen – von der Anforderung über das Design bis zur Umsetzung. Rund sechs Jahre Erfahrung in XR und nutzerzentrierter Softwareentwicklung, mit kaufmännischem Hintergrund und Führungserfahrung als Offizier.",
      en: "I translate client needs into viable digital solutions – from requirements through design to delivery. Around six years in XR and user-centred software development, with a commercial background and leadership experience as an army officer.",
    },
    location: "Buchs ZH, Schweiz",
    email: "louisbaumgartner@hotmail.com",
    linkedin: "", // [PLATZHALTER] z.B. "https://www.linkedin.com/in/..."
    cvFile: "", // [PLATZHALTER] z.B. "assets/CV_Louis_Baumgartner.pdf"
    photo: "", // [PLATZHALTER] z.B. "assets/louis.jpg"
    availability: {
      de: "Offen für Rollen an der Schnittstelle von Kunde, Business und Technik.",
      en: "Open to roles at the intersection of client, business and technology.",
    },
  },

  /* Kernkompetenzen – erscheinen als Kacheln unter dem Hero */
  /* "proof" = konkreter Beleg aus Zeugnis, CV oder Projekten */
  strengths: [
    { title: { de: "Anforderungen verstehen", en: "Understanding needs" },
      text: { de: "Kundenbedürfnisse aufnehmen, Use Cases schärfen, User Stories priorisieren.", en: "Capture client needs, sharpen use cases, prioritise user stories." },
      proof: { de: "Kundenanforderungen bei SKAN in Softwaredesigns überführt; bei Refense User Stories geschrieben und priorisiert.", en: "Turned client requirements into software designs at SKAN; wrote and prioritised user stories at Refense." } },
    { title: { de: "Lösungen gestalten", en: "Designing solutions" },
      text: { de: "Von Figma-Konzepten bis zur Softwarearchitektur.", en: "From Figma concepts to software architecture." },
      proof: { de: "Meine Architekturlösungen wurden vom Team als Basis für die Weiterentwicklung übernommen.", en: "My architecture solutions were adopted by the team as the basis for further development." } },
    { title: { de: "Menschen verbinden", en: "Connecting people" },
      text: { de: "Reviews und Workshops mit Kunden, Vertrieb, Engineering und PM leiten.", en: "Lead reviews and workshops with clients, sales, engineering and PM." },
      proof: { de: "XR Design Reviews mit internationalen Pharma-Kunden geleitet; Front-End-Design mit 18 EU-Partnern abgestimmt.", en: "Led XR design reviews with international pharma clients; aligned front-end design with 18 EU partners." } },
    { title: { de: "Ergebnisse liefern", en: "Delivering results" },
      text: { de: "Proofs of Concept, Schätzungen und Prozesse, die im Alltag funktionieren.", en: "Proofs of concept, estimates and processes that work in practice." },
      proof: { de: "PoC zur digitalen Kameraevaluation geliefert; PM- und Zeiterfassungstools im Team eingeführt.", en: "Delivered a PoC for digital camera evaluation; introduced PM and time-tracking tools in the team." } },
  ],

  /* Berufliche Stationen – werden im 3D-Raum als Wegpunkte gezeigt */
  experience: [
    {
      id: "skan",
      scene: "isolator", // 3D-Szene: Isolator im Design Review
      highlights: {
        de: ["XR Design Reviews mit internationalen Pharma-Kunden geleitet", "Kundenbedürfnisse in Softwaredesigns überführt", "PoC Kamerasimulation inkl. Use-Case-Interviews"],
        en: ["Led XR design reviews with international pharma clients", "Turned client needs into software designs", "Camera simulation PoC incl. use-case interviews"],
      },
      period: "07/2024 – heute",
      periodEn: "07/2024 – present",
      org: "SKAN AG",
      place: "Allschwil",
      role: "XR Application Developer",
      field: { de: "Digital Development · Pharma-Anlagenbau", en: "Digital Development · Pharmaceutical equipment" },
      points: {
        de: [
          "Kundenbedürfnisse analysiert und in Softwaredesigns und Projektkonzepte überführt.",
          "XR Design Reviews mit internationalen Kunden und internen Stakeholdern aus PM, Engineering und Vertrieb geplant und geleitet.",
          "Proofs of Concept zur digitalen Kameraevaluation geliefert, inkl. interner Interviews zu Use Cases und Geschäftspotenzial.",
          "Softwarearchitektur für VR-Training und Kamerasimulation entworfen – vom Team als Basis übernommen.",
          "An Produkt- und Roadmapplanung, Aufwandsschätzungen und Terminplanung mitgewirkt; PM-Tools evaluiert und eingeführt.",
        ],
        en: [
          "Analysed client needs and translated requirements into software designs and project concepts.",
          "Planned and led XR design reviews with international clients and internal stakeholders from PM, engineering and sales.",
          "Delivered proofs of concept for digital camera evaluation, incl. internal interviews on use cases and business potential.",
          "Designed software architecture for VR training and camera simulation – adopted by the team as the basis for further work.",
          "Contributed to product and roadmap planning, effort estimates and schedules; evaluated and introduced PM tools.",
        ],
      },
      projectId: "skan-xr",
    },
    {
      id: "refense",
      scene: "hall", // 3D-Szene: VR-Trainingshalle
      highlights: {
        de: ["Anforderungen aufgenommen, User Stories priorisiert", "Internationale Partner im EU-Projekt Med1st koordiniert", "Szenario-Editor für Instruktoren entwickelt"],
        en: ["Captured requirements, prioritised user stories", "Coordinated international partners in EU project Med1st", "Built a scenario editor for instructors"],
      },
      period: "05/2022 – 04/2024",
      org: "Refense AG",
      place: "Dietlikon",
      role: "Unity 3D Developer",
      field: { de: "XR-Training für Polizei und Ersthelfer", en: "XR training for police and first responders" },
      points: {
        de: [
          "Systemanforderungen aufgenommen, User Stories geschrieben und priorisiert (Product-Management-Rolle).",
          "Technische Arbeit und Planung mit internationalen Projektpartnern koordiniert, u.a. im EU-Horizon-2020-Projekt Med1st.",
          "Konfigurierbaren Szenario-Editor und VR-Trainingssimulator entwickelt; Figma-Prototypen und User Journey Maps erstellt.",
        ],
        en: [
          "Captured system requirements, wrote and prioritised user stories (product management role).",
          "Coordinated technical work and scheduling with international partners, incl. the EU Horizon 2020 project Med1st.",
          "Developed a configurable scenario editor and VR training simulator; created Figma prototypes and user journey maps.",
        ],
      },
      projectId: "vr-training",
    },
    {
      id: "fhnw",
      scene: "workshop", // 3D-Szene: Mixed-Reality-Workshop
      highlights: {
        de: ["Lead Designer im EU-Projekt GEIGER (18 Partner)", "Nutzertests geplant, durchgeführt, ausgewertet", "HoloLens-2-Prototypen mit Industriepartnern"],
        en: ["Lead Designer in EU project GEIGER (18 partners)", "Planned, ran and evaluated user tests", "HoloLens 2 prototypes with industry partners"],
      },
      period: "09/2020 – 02/2022",
      org: "IIT / FHNW",
      place: "Windisch",
      role: { de: "Wissenschaftlicher Assistent", en: "Scientific Assistant" },
      field: { de: "Angewandte Forschung · XR, UX und Cybersecurity", en: "Applied research · XR, UX and cybersecurity" },
      points: {
        de: [
          "Lead Designer im EU-Projekt GEIGER mit 18 internationalen Partnern; Toolbox-UX entwickelt und validiert.",
          "Qualitative Nutzertests geplant, durchgeführt und ausgewertet; Design Thinking auf Technologiekonzepte angewendet.",
          "Kollaborative HoloLens-2-Prototypen in einem Innosuisse-Projekt mit drei Industrie- und drei Hochschulpartnern entwickelt.",
        ],
        en: [
          "Lead Designer in the EU project GEIGER with 18 international partners; developed and validated the toolbox UX.",
          "Planned, ran and evaluated qualitative user tests; applied design thinking to technology concepts.",
          "Built collaborative HoloLens 2 prototypes in an Innosuisse project with three industry and three academic partners.",
        ],
      },
      projectId: "ux-lead",
    },
    {
      id: "army",
      scene: "alps", // 3D-Szene: Alpen, Zug-Formation
      highlights: {
        de: ["Zug mit rund 50 Personen geführt", "Kompaniekommandant in der Planung vertreten", "Leistungsbezogen befördert"],
        en: ["Led a platoon of around 50 people", "Deputised for the company commander in planning", "Promoted based on performance"],
      },
      period: "06/2015 – 02/2017",
      org: { de: "Schweizer Armee", en: "Swiss Army" },
      place: "",
      role: { de: "Zugführer Infanterie (Oberleutnant)", en: "Platoon Commander, Infantry (First Lieutenant)" },
      field: { de: "Führung", en: "Leadership" },
      points: {
        de: [
          "Infanteriezug mit rund 50 Personen geführt; Kompaniekommandant in der Planung vertreten.",
          "Rekruten ausgebildet, Übungen geplant und nachbesprochen; leistungsbezogen befördert.",
        ],
        en: [
          "Led an infantry platoon of around 50 people; deputised for the company commander in planning.",
          "Trained recruits, planned and debriefed exercises; promoted based on performance.",
        ],
      },
    },
  ],

  /* Projekte / Case Studies – aus dem Adobe-Portfolio übernommen */
  projects: [
    {
      id: "skan-xr",
      year: "2024–2026",
      title: "Industrial XR Applications",
      org: "SKAN AG",
      tags: ["Requirements", "Figma", "Unity UI Toolkit", "Architecture", "Roadmap"],
      cover: "https://cdn.myportfolio.com/7b9b7d28-cde0-4887-ae3b-42541ff9601b/841d9543-5330-4cac-a98e-321b5af6af37_rwc_131x0x1377x1033x1377.png?h=5e57d221d9061dafed7bc42f4c79f20c",
      video: "https://www.youtube.com/embed/InPL4jnBaBU",
      summary: {
        de: "Industrielle XR-Anwendung zur Evaluation kundenspezifischer Maschinendesigns. Neben der Unity-Entwicklung: Anforderungen koordiniert, an Produkt- und Roadmap-Diskussionen mitgewirkt und Business- sowie Usability-Bedürfnisse in technische Lösungen übersetzt.",
        en: "Industrial XR application supporting machine design evaluations in customer projects. Beyond Unity development: coordinated requirements, contributed to product and roadmap discussions, and translated business and usability needs into technical solutions.",
      },
      contribution: {
        de: [
          "UI- und Workflow-Verbesserungen zwischen Design, Umsetzung und Produktbedürfnissen koordiniert",
          "Use Cases in praxistaugliche XR-Workflows für Design Reviews übersetzt",
          "Usability-Probleme und Feature-Chancen für die Roadmap identifiziert",
          "UI-Konzepte und Interaction Flows in Figma gestaltet, in Unity UI Toolkit umgesetzt",
          "Strukturierte Architektur-Patterns eingeführt, die Wartbarkeit und Weiterentwicklung stützen",
          "Interne Prozesse verbessert: PM-Tools evaluiert, Zeiterfassung eingeführt",
        ],
        en: [
          "Coordinated UI and workflow improvements across design, implementation and product needs",
          "Translated use cases into practical XR workflows for design reviews",
          "Identified usability issues and feature opportunities for the roadmap",
          "Designed UI concepts and interaction flows in Figma, implemented them in Unity UI Toolkit",
          "Introduced structured architectural patterns for maintainability and future development",
          "Improved internal processes: evaluated PM tools, introduced time tracking",
        ],
      },
      link: "https://louisbaumgartner3ce3.myportfolio.com/industrial-xr-applications-skan-ag",
    },
    {
      id: "vr-training",
      year: "2022–2024",
      title: { de: "VR-Training für Ersthelfer", en: "VR Training for First Responders" },
      org: "Refense AG · EU Horizon 2020 Med1st",
      tags: ["Multi-User VR", "Scenario Editor", "User Stories", "International Partners"],
      cover: "https://cdn.myportfolio.com/7b9b7d28-cde0-4887-ae3b-42541ff9601b/8799c91c-0835-4c31-894f-61e97398098c_rwc_203x0x1207x906x1207.jpg?h=5e8ca85eefc4f62a5e65a262297b9204",
      video: "https://www-ccv.adobe.io/v1/player/ccv/GaIS9tpYHcf/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
      summary: {
        de: "Multi-User-VR-Trainingssoftware für Polizei und Sanität. Kernaufgabe war ein Szenario-Editor, mit dem Instruktoren eigene Trainings erstellen und steuern, während Trainierende das Szenario immersiv in VR erleben.",
        en: "Multi-user VR training software for police and medics. My key responsibility was a scenario editor that lets instructors build and run custom trainings while trainees experience them immersively in VR.",
      },
      contribution: {
        de: [
          "End-User-Szenario-Editor für individuelle VR-Trainings entwickelt",
          "Anforderungen aufgenommen, User Stories geschrieben und priorisiert",
          "Technische Koordination mit internationalen Partnern im Projekt Med1st",
          "Figma-Prototypen und User Journey Maps erstellt",
        ],
        en: [
          "Developed an end-user scenario editor for custom VR trainings",
          "Captured requirements, wrote and prioritised user stories",
          "Technical coordination with international partners in the Med1st project",
          "Created Figma prototypes and user journey maps",
        ],
      },
      link: "https://louisbaumgartner3ce3.myportfolio.com/vr-police-training",
    },
    {
      id: "mr-collab",
      year: "2020–2022",
      title: { de: "Mixed Reality für Zusammenarbeit", en: "Mixed Reality for Collaboration" },
      org: "Innosuisse · IIT / FHNW",
      tags: ["HoloLens 2", "Spatial Anchors", "Multi-User", "Research"],
      cover: "https://cdn.myportfolio.com/7b9b7d28-cde0-4887-ae3b-42541ff9601b/eb03271c-db91-4a6c-ad18-14125b6ace89_car_4x3.jpg?h=d224aed3f710d22b83e72849c8986da3",
      video: "https://www-ccv.adobe.io/v1/player/ccv/EszKExiQA8g/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
      summary: {
        de: "Forschung dazu, wie eine kollaborative Aufgabe im Kontext eines Architekturwettbewerbs von Mixed Reality profitieren kann. Dazu die Bachelorarbeit über digitale Zwillinge für Remote Support.",
        en: "Research on how a collaborative task in an architectural competition can benefit from mixed reality. Plus my bachelor thesis on digital twins for remote support.",
      },
      contribution: {
        de: [
          "Multi-User-Erlebnis mit Spatial Anchoring",
          "Geteilter virtueller Pointer",
          "Virtueller Screen, um Perspektiven der Beteiligten zu teilen",
          "Menü für Studienleitende und Teilnehmende",
        ],
        en: [
          "Multi-user experience with spatial anchoring",
          "Shared virtual pointer",
          "Virtual screen to share collaborators' perspectives",
          "Menu for study conductors and participants",
        ],
      },
      link: "https://louisbaumgartner3ce3.myportfolio.com/collaborative-mixed-reality",
    },
    {
      id: "ux-lead",
      year: "2021",
      title: "UX Design Lead · GEIGER",
      org: "EU Horizon 2020 · IIT / FHNW",
      tags: ["Figma", "Click Dummy", "Usability Testing", "18 Partners"],
      cover: "https://cdn.myportfolio.com/7b9b7d28-cde0-4887-ae3b-42541ff9601b/576d648b-3c4a-454c-8cd6-cd666bdd7b1f_rwc_121x0x719x540x719.gif?h=82993cee251350fc8585444b7c4897bd",
      video: "https://www-ccv.adobe.io/v1/player/ccv/CY4NBYLHHZg/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
      summary: {
        de: "Als Front-End Lead Designer das gesamte Front-End-Design gestaltet und mit allen Projektpartnern abgestimmt. Ein Figma-Click-Dummy half, kritische Konzepte früh mit echten Nutzenden zu testen und Business-Probleme früh zu erkennen.",
        en: "As front-end lead designer I shaped the entire front-end design and aligned it with all project partners. A Figma click dummy let us test critical concepts with real users early and surface business issues before development.",
      },
      contribution: {
        de: [
          "Front-End-Design geleitet und mit 18 Partnern abgestimmt",
          "Interaktiven Click Dummy in Figma gebaut",
          "Qualitative Nutzertests geplant, durchgeführt und ausgewertet",
        ],
        en: [
          "Led the front-end design and aligned it with 18 partners",
          "Built an interactive click dummy in Figma",
          "Planned, ran and evaluated qualitative user tests",
        ],
      },
      link: "https://louisbaumgartner3ce3.myportfolio.com/ux-design-usability-testing",
    },
    {
      id: "procedural",
      show: false, // auf true setzen, um das Projekt wieder anzuzeigen
      year: "2020",
      title: { de: "Prozedurale Animationen", en: "Procedural Animations" },
      org: { de: "Machbarkeitsstudie", en: "Feasibility study" },
      tags: ["Blender", "Inverse Kinematics", "Synthetic ML Data"],
      cover: "https://cdn.myportfolio.com/7b9b7d28-cde0-4887-ae3b-42541ff9601b/bcfb6621-40a0-4578-8d21-538fcbd05e8b_rwc_0x9x693x519x693.gif?h=b5165d3cfb05e501d30684a0f3d0c136",
      video: "https://www-ccv.adobe.io/v1/player/ccv/QCGCg47j9Dz/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
      summary: {
        de: "Machbarkeitsstudie zu künstlich generierten Machine-Learning-Datensätzen, um Algorithmen für ein kassenloses Retail-System zu trainieren.",
        en: "Feasibility study on synthetically generated machine learning data sets to train algorithms for a cashless retail system.",
      },
      contribution: {
        de: [
          "Testumgebung und Produkte in Blender modelliert",
          "Charakter mit Unity Inverse Kinematics geriggt, Animationen per Code erzeugt",
          "Handgelenk-Koordinaten an die Kamera übergeben, um Bildausschnitte als Datensatz zu speichern",
        ],
        en: [
          "Modelled the test setting and products in Blender",
          "Rigged the character with Unity inverse kinematics, generated animations in code",
          "Passed wrist coordinates to the camera to save image crops as a data set",
        ],
      },
      link: "https://louisbaumgartner3ce3.myportfolio.com/procedural-animations",
    },
    {
      id: "game",
      show: false, // auf true setzen, um das Projekt wieder anzuzeigen
      year: "2020",
      title: "Kitchen Escape",
      org: { de: "Game Design · Studium", en: "Game design · Studies" },
      tags: ["Unity", "Game Design"],
      cover: "https://cdn.myportfolio.com/7b9b7d28-cde0-4887-ae3b-42541ff9601b/be6eefd3-20e5-4ba8-a710-275e6a5dac4c_rwc_121x0x719x540x719.gif?h=79da4de6b10ca543d9fd347eae2ca2e8",
      video: "https://www-ccv.adobe.io/v1/player/ccv/87Ji7BuNJYy/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
      summary: {
        de: "Semesterarbeit im Modul Game Design: ein Escape-Game in Unity.",
        en: "Semester project for a game design module: an escape game in Unity.",
      },
      contribution: { de: [], en: [] },
      link: "https://louisbaumgartner3ce3.myportfolio.com/unity-game-design-project",
    },
  ],

  /* ------------------------------------------------------------
     CASE STUDIES (Entwürfe)
     draft: true  -> auf der Live-Seite unsichtbar.
     Vorschau aller Entwürfe: index.html?drafts=1
     Wenn fertig: [PLATZHALTER] ersetzen und draft: false setzen.
     Aufbau: Ausgangslage -> Meine Rolle -> Vorgehen -> Ergebnis.
     Achtung: keine vertraulichen Kundendaten oder Zahlen ohne Freigabe.
     ------------------------------------------------------------ */
  caseStudies: [
    {
      id: "cs-camera",
      draft: true,
      year: "", // [PLATZHALTER] Jahr
      title: { de: "PoC digitale Kamerasimulation", en: "Digital camera simulation PoC" },
      org: "SKAN AG",
      tags: ["Proof of Concept", "Interviews", "Use Cases", "Business Potential"],
      cover: "", video: "",
      context: { de: "[PLATZHALTER] Welches Kundenproblem stand am Anfang? Warum war eine digitale Kameraevaluation interessant?", en: "[PLACEHOLDER]" },
      role: { de: "Konzept und Umsetzung des PoC; interne Interviews zur Ermittlung von Use Cases und Geschäftspotenzial.", en: "Concept and delivery of the PoC; internal interviews to identify use cases and business potential." },
      approach: { de: ["[PLATZHALTER] Schritt 1 – z.B. Interviews mit Vertrieb, Engineering, Service", "[PLATZHALTER] Schritt 2 – z.B. Prototyp in Unity", "[PLATZHALTER] Schritt 3 – z.B. Test mit Kunde"], en: [] },
      result: { de: "[PLATZHALTER] Was ist daraus entstanden? (z.B. Grundlage für eine neue digitale Dienstleistung)", en: "[PLACEHOLDER]" },
    },
    {
      id: "cs-co2",
      draft: true,
      year: "", // [PLATZHALTER] Jahr
      title: { de: "CO2-Analyse digitaler Produkte", en: "CO2 analysis of digital products" },
      org: "SKAN AG",
      tags: ["Sustainability", "Analysis", "Reporting"],
      cover: "", video: "",
      context: { de: "[PLATZHALTER] Warum wurde die Analyse gebraucht?", en: "[PLACEHOLDER]" },
      role: { de: "CO2-Analyse der digitalen Produkte erstellt und als Report verfasst.", en: "Produced the CO2 analysis of the digital products and wrote it up as a report." },
      approach: { de: ["[PLATZHALTER] Datengrundlage und Methode", "[PLATZHALTER] Abstimmung mit wem?"], en: [] },
      result: { de: "[PLATZHALTER] Ergebnis – erst nach Veröffentlichung im Geschäftsbericht konkret nennen.", en: "[PLACEHOLDER]" },
    },
    {
      id: "cs-scanning",
      draft: true,
      year: "2026",
      title: { de: "Bedarfsanalyse 3D-Scanning", en: "3D scanning needs assessment" },
      org: "SKAN AG",
      tags: ["Requirements Engineering", "Stakeholder Interviews", "Workflow"],
      cover: "", video: "",
      context: { de: "Für bestehende Isolatoren und Bauteile fehlen oft CAD-Daten – etwa bei Retrofits oder für die Planung von Installationsumgebungen beim Kunden.", en: "CAD data is often missing for existing isolators and components – e.g. for retrofits or when planning installation environments at the client site." },
      role: { de: "Internen Bedarf und Workflow-Anforderungen für 3D-Scanning über mehrere Abteilungen abgeklärt.", en: "Assessed internal needs and workflow requirements for 3D scanning across several departments." },
      approach: { de: ["[PLATZHALTER] Welche Abteilungen, wie befragt?", "[PLATZHALTER] Wie wurden Anforderungen strukturiert und priorisiert?"], en: [] },
      result: { de: "[PLATZHALTER] Empfehlung / nächster Schritt", en: "[PLACEHOLDER]" },
    },
    {
      id: "cs-pm",
      draft: true,
      year: "", // [PLATZHALTER] Jahr
      title: { de: "Einführung PM-Tool & Teamprozesse", en: "Introducing a PM tool & team processes" },
      org: "SKAN AG",
      tags: ["Process Improvement", "Tool Evaluation", "Change"],
      cover: "", video: "",
      context: { de: "[PLATZHALTER] Wie wurde vorher geplant und Zeit erfasst? Was war das Problem?", en: "[PLACEHOLDER]" },
      role: { de: "Projektmanagement- und Zeiterfassungstools evaluiert und im Team eingeführt.", en: "Evaluated and introduced project management and time-tracking tools in the team." },
      approach: { de: ["[PLATZHALTER] Evaluationskriterien", "[PLATZHALTER] Wie das Team mitgenommen wurde"], en: [] },
      result: { de: "[PLATZHALTER] Was hat sich verbessert?", en: "[PLACEHOLDER]" },
    },
  ],

  skills: [
    { group: { de: "Methoden", en: "Methods" },
      items: ["Requirements Engineering", "User Stories", "Design Thinking", "Usability Testing", "Workshop-Moderation", "Aufwandsschätzung"] },
    { group: { de: "Design", en: "Design" },
      items: ["Figma", "UX/UI Prototyping", "User Journey Maps", "Blender"] },
    { group: { de: "Technik", en: "Technology" },
      items: ["Unity", "C# / .NET", "Software Architecture", "TypeScript / JS", "HTML / CSS", "Python"] },
  ],

  education: [
    { period: "2017 – 2020", title: { de: "BSc Informatik", en: "BSc Computer Science" }, detail: "Design & Management (iCompetence) · FHNW · GPA 5.1" },
    { period: "2017", title: { de: "Sprachaufenthalt Englisch", en: "English language studies" }, detail: "Milner School of English, London" },
    { period: "2014 – 2015", title: { de: "Berufsmaturität BM2", en: "Professional baccalaureate BM2" }, detail: "Wirtschaft & Dienstleistungen · KV Zürich Business School" },
    { period: "2011 – 2014", title: { de: "Kaufmann EFZ", en: "Commercial apprenticeship" }, detail: "Profil E · Orgapack GmbH, Dietikon" },
  ],

  volunteering: [
    { period: "2018 – 2021", title: { de: "Kassier & Jugendleiter, Pfadi St. Felix", en: "Accountant & Youth Leader, Scouts St. Felix" },
      detail: { de: "Buchhaltung digitalisiert (Bexio), Aktivitäten und Finanzierung eines Sommerlagers organisiert.", en: "Digitalised accounting (Bexio), organised activities and financing for a summer camp." } },
  ],

  feedback: {
    quote: { de: "Klare, proaktive Kommunikation und frühe Einbindung der Stakeholder.", en: "Clear, proactive communication and early stakeholder involvement." },
    source: { de: "Zusammenfassung Zwischenzeugnis SKAN AG, 2026", en: "Summary of SKAN interim reference, 2026" },
  },

  languages: [
    { name: { de: "Deutsch", en: "German" }, level: { de: "Muttersprache", en: "Native" } },
    { name: { de: "Englisch", en: "English" }, level: { de: "Verhandlungssicher", en: "Business fluent" } },
  ],
};
