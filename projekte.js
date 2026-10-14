/* =====================================================================
   PROJEKTE – HIER TRÄGST DU DEINE BILDER UND TEXTE EIN
   =====================================================================

   So funktioniert es
   ------------------
   - Jedes Projekt ist ein Block von { bis },. Die Reihenfolge hier ist
     die Reihenfolge auf der Seite.
   - NEUES PROJEKT: einen ganzen Block kopieren, direkt darunter einfügen
     und die Angaben ändern.
   - Achte auf die Kommas am Ende der Zeilen und auf die Anführungszeichen.
     Fehlt eins, bleibt die Seite leer.

   Die Felder
   ----------
   id        Kurzname für die Internetadresse. Nur kleine Buchstaben,
             Zahlen und Bindestriche, keine Leerzeichen oder Umlaute.
             Jede id darf nur einmal vorkommen.
   titel     Der Name des Projekts, so wie er auf der Seite steht.
   ordner    Der Ordner im Repository, in dem die Bilder dieses Projekts
             liegen. Mit einem / am Ende.
   vorschau  Das Vorschaubild auf der Fotografie-Seite (Dateiname im Ordner).
   bilder    Die großen Bilder des Projekts, in der Reihenfolge, in der man
             sie durchblättert. Hochformat und Querformat dürfen gemischt
             werden, die Seite passt sich an.
             Einfach: '02.jpg'
             Mit Bildbeschreibung (gut für Blinde und Suchmaschinen):
             { datei: '02.jpg', alt: 'Was auf dem Bild zu sehen ist' }
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
   ===================================================================== */

window.PORTFOLIO = {

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

};
