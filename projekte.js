/* =====================================================================
   PROJEKTE – HIER TRÄGST DU DEINE BILDER, VIDEOS UND TEXTE EIN
   =====================================================================

   So funktioniert es
   ------------------
   - Es gibt vier Bereiche: animation, illustration, fotografie, grafik-design.
     (Illustration ist anders: dort stehen direkt die Bilder, siehe unten.)
     In jedem Bereich (außer Illustration) stehen mehrere Projekte.
   - Jedes Projekt ist ein Block von { bis },. Die Reihenfolge hier ist
     die Reihenfolge auf der Seite.
   - NEUES PROJEKT: einen ganzen Block kopieren, direkt darunter einfügen
     und die Angaben ändern.
   - Achte auf die Kommas am Ende der Zeilen und auf die Anführungszeichen.
     Fehlt eins, bleibt die Seite leer.

   Die Felder eines Projekts
   -------------------------
   id        Kurzname für die Internetadresse. Nur kleine Buchstaben,
             Zahlen und Bindestriche, keine Leerzeichen oder Umlaute.
             Innerhalb eines Bereichs darf jede id nur einmal vorkommen.
   titel     Der Name des Projekts, so wie er auf der Seite steht.
   ordner    Der Ordner im Repository, in dem die Dateien dieses Projekts
             liegen. Mit einem / am Ende.
   vorschau  Das Vorschaubild in der Projektliste (Dateiname im Ordner).
   bilder    Die großen Bilder oder Videos, in der Reihenfolge, in der man
             sie durchblättert. Hochformat und Querformat dürfen gemischt
             werden, die Seite passt sich an.
             Bild:   '02.jpg'
             Video:  '02.mp4'
             Mit Beschreibung (gut für Blinde und Suchmaschinen):
                     { datei: '02.jpg', alt: 'Was auf dem Bild zu sehen ist' }
             Video mit eigenem Startbild:
                     { datei: '02.mp4', poster: '02.jpg' }
   text      Die Beschreibung unter den Bildern. Zwischen die Backticks `
             schreiben. Neue Absätze trennst du mit einer Leerzeile.
             Bitte kein weiteres Backtick ` im Text verwenden.

   Neue Bilder hinzufügen
   ----------------------
   1. Bild in den Ordner des Projekts hochladen (zum Beispiel
      bilder/fotografie/etagen/) und den Dateinamen merken.
   2. Hier bei "bilder" des Projekts eine neue Zeile mit dem Dateinamen
      ergänzen, am Ende mit Komma.
   Tipp: Bilder vorher auf etwa 2000 Pixel Kantenlänge verkleinern
   (JPG), dann laden sie schnell.

   Platzhalter ersetzen
   --------------------
   Die Projekte "Projekt 1, 2, 3" mit den grauen Platzhalterbildern sind nur
   Vorlagen. Ersetze bei ihnen titel, ordner, vorschau, bilder und text durch
   deine eigenen Angaben (oder lösche den ganzen Block).
   ===================================================================== */

window.PORTFOLIO = {

  /* =========================== ANIMATION =========================== */
  animation: {
    titel: 'Animation',

    projekte: [

      {
        id: 'craaaaaaash',
        titel: 'CRAAAAAAASH',
        ordner: '',                      // die Dateien liegen im Hauptordner
        vorschau: 'A_1-poster.jpg',
        bilder: [
          { datei: 'A_1.mp4', poster: 'A_1-poster.jpg', alt: 'Animation: ein Lastwagen wird von einem roten Auto gerammt und fängt Feuer' },
        ],
        text: `Hier kommt der Beschreibungstext zu "CRAAAAAAASH" hin.`,
      },

      {
        id: 'projekt-2',
        titel: 'Projekt 2',
        ordner: 'bilder/',
        vorschau: 'platzhalter-hoch.svg',
        bilder: [
          'platzhalter-hoch.svg',
        ],
        text: `Hier kommt der Beschreibungstext zu Projekt 2 hin.`,
      },

      {
        id: 'projekt-3',
        titel: 'Projekt 3',
        ordner: 'bilder/',
        vorschau: 'platzhalter-quer.svg',
        bilder: [
          'platzhalter-quer.svg',
        ],
        text: `Hier kommt der Beschreibungstext zu Projekt 3 hin.`,
      },

    ],
  },

  /* ========================== ILLUSTRATION ==========================
     Hier gibt es KEINE Projekte: Die Illustrationen werden direkt gezeigt,
     man klickt sich durch. Pro Bild: datei + titel (kurzer Name, steht
     unter dem Bild). Neue Illustration = eine Zeile kopieren und ändern.
     ================================================================== */
  illustration: {
    titel: 'Illustration',
    ordner: 'bilder/',   // Ordner der Bilder (mit / am Ende), z. B. 'bilder/illustration/'

    bilder: [
      { datei: 'platzhalter-quer.svg', titel: 'Illustration 1' },
      { datei: 'platzhalter-hoch.svg', titel: 'Illustration 2' },
      { datei: 'platzhalter-quer.svg', titel: 'Illustration 3' },
      // { datei: '04.jpg', titel: 'Name der Illustration', alt: 'Was zu sehen ist' },
    ],
  },

  /* =========================== FOTOGRAFIE =========================== */
  fotografie: {
    titel: 'Fotografie',

    projekte: [

      /* ---------- Projekt 1 ---------- */
      {
        id: 'every-photo-a-page',
        titel: 'every photo a page',
        ordner: 'bilder/fotografie/every-photo-a-page/',
        vorschau: 'vorschau.jpg',
        bilder: [
          { datei: '01.jpg', alt: 'Aufgeklapptes Buch mit blauen Einbänden, auf die Dia-Rahmen genäht sind; dazwischen leuchtend pinke Seiten, zwei schwarze Kabel führen nach oben' },
          // '02.jpg',
          // '03.jpg',
        ],
        text: `Hier kommt der Beschreibungstext zu "every photo a page" hin.

Einen neuen Absatz beginnst du mit einer Leerzeile.`,
      },

      /* ---------- Projekt 2 ---------- */
      {
        id: 'etagen',
        titel: 'Etagen',
        ordner: 'bilder/fotografie/etagen/',
        vorschau: 'vorschau.jpg',
        bilder: [
          { datei: '01.jpg', alt: 'Unordentliches Zimmer mit Bett, Sofa, Kleiderhaufen auf dem Boden und einem orangen Vorhang am Fenster' },
          // '02.jpg',
          // '03.jpg',
        ],
        text: `Hier kommt der Beschreibungstext zu "Etagen" hin.`,
      },

      /* ---------- Projekt 3 ---------- */
      {
        id: 'filmzitate',
        titel: 'Filmzitate',
        ordner: 'bilder/fotografie/filmzitate/',
        vorschau: 'vorschau.jpg',
        bilder: [
          { datei: '01.jpg', alt: 'Plakat "60 Years Kino International": ein rosa Telefonhörer und eine welke violette Rose auf rosa Grund' },
          // '02.jpg',
          // '03.jpg',
        ],
        text: `Hier kommt der Beschreibungstext zu "Filmzitate" hin.`,
      },

    ],
  },

  /* =========================== GRAFIK DESIGN =========================== */
  'grafik-design': {
    titel: 'Grafik Design',

    projekte: [

      {
        id: 'projekt-1',
        titel: 'Projekt 1',
        ordner: 'bilder/',
        vorschau: 'platzhalter-quer.svg',
        bilder: [
          'platzhalter-quer.svg',
          'platzhalter-quer.svg',
        ],
        text: `Hier kommt der Beschreibungstext zu Projekt 1 hin.

Einen neuen Absatz beginnst du mit einer Leerzeile.`,
      },

      {
        id: 'projekt-2',
        titel: 'Projekt 2',
        ordner: 'bilder/',
        vorschau: 'platzhalter-hoch.svg',
        bilder: [
          'platzhalter-hoch.svg',
        ],
        text: `Hier kommt der Beschreibungstext zu Projekt 2 hin.`,
      },

      {
        id: 'projekt-3',
        titel: 'Projekt 3',
        ordner: 'bilder/',
        vorschau: 'platzhalter-quer.svg',
        bilder: [
          'platzhalter-quer.svg',
        ],
        text: `Hier kommt der Beschreibungstext zu Projekt 3 hin.`,
      },

    ],
  },

};
