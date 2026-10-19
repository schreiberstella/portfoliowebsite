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

   Eigene Projektseite (wie bei "Sooderso")
   ----------------------------------------
   Steht bei einem Projekt  seite: 'sooderso.html',  dann öffnet ein Klick
   auf das Projekt diese eigene Seite. Oben sieht sie aus wie jede andere
   Projektseite (Titel, Kurzbeschreibung, Vorschaubild aus diesem Block,
   dazu optional  meta: '5 min | 2026').  Darunter folgt der Prozess, den
   du direkt in der Datei sooderso.html pflegst (Anleitung steht dort).

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
        id: 'sooderso',
        titel: 'Sooderso',
        seite: 'sooderso.html',          // eigene Seite: oben wie jedes Projekt, darunter der Prozess (siehe sooderso.html)
        ordner: 'bilder/sooderso/',
        vorschau: 'still-01.jpg',
        meta: '5 min | 2026',
        bilder: [
          { datei: 'still-01.jpg', alt: 'Sooderso: Autos im Stau, ein Lastwagen brennt' },
          // später z. B. das Video: { datei: 'video-hero.mp4', poster: 'still-01.jpg' },
        ],
        text: `Ein interaktives Story-Game. Die Spielenden entscheiden durch ihre Bewegung im Raum über den Verlauf einer Geschichte. Immer wieder hält die Geschichte an. Mit jeder Wahl stellt sich die Frage: Ist das Leben Schicksal oder Zufall?

Das Spiel entstand im Kurs Expander Animation. Es bespielt zwei Projektionsflächen an der Wand und am Boden.`,
      },

      {
        id: 'do-you-mind',
        titel: 'DO YOU MIND?',
        seite: 'do-you-mind.html',       // eigene Seite: oben wie jedes Projekt, darunter der Prozess
        ordner: 'bilder/do-you-mind/',
        vorschau: 'titelbild.jpg',
        meta: '2 min | 2025',
        bilder: [
          { datei: 'titelbild.jpg', alt: 'DO YOU MIND?: rote Schrift auf blauem Grund' },
        ],
        text: `Ein animierter Kurzfilm über Impulskontrolle. Was ist in einer Gesellschaft erlaubt und was verboten? Und warum halten wir uns eigentlich an diese Regeln?`,
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
        titel: 'Every photo a page',
        ordner: 'bilder/fotografie/every-photo-a-page/',
        vorschau: 'vorschau.jpg',
        bilder: [
          { datei: '01.jpg', alt: 'Aufgestelltes Buch mit blauen Einbänden, auf die Dias genäht sind, dazwischen pinke Seiten, zwei Kabel führen nach oben' },
          { datei: '02.jpg', alt: 'Geschlossenes Buch von der Seite: pinker Buchschnitt, blaue Deckel, Dias auf dem Cover' },
          { datei: '03.jpg', alt: 'Aufgeschlagenes Buch: schwarz-weiß Foto zweier Personen auf blauer Folie, daneben weißes Papier' },
          { datei: '04.jpg', alt: 'Aufgeschlagenes Buch: Foto von Personen im hohen Gras auf grünem Papier' },
          { datei: '05.jpg', alt: 'Aufgeschlagenes Buch: Foto zweier Personen in blauen Badeanzügen auf weißem Papier' },
          { datei: '06.jpg', alt: 'Aufgeschlagenes Buch: schwarz-weiß Foto einer Person mit Mütze, türkise Folie und schwarzes Papier' },
          { datei: '07.jpg', alt: 'Aufgeschlagenes Buch: Foto mit Person mit Sonnenbrille, silberne und schwarze Folie' },
          { datei: '08.jpg', alt: 'Aufgeschlagenes Buch: Foto einer Person im Zug mit Bergen im Fenster, hellblaues Papier' },
          { datei: '09.jpg', alt: 'Aufgeschlagenes Buch: schwarz-weiß Foto einer Person an einer Kleiderstange, rote Folie' },
          { datei: '10.jpg', alt: 'Cover mit zwölf Dias, schräg von oben' },
          { datei: '11.jpg', alt: 'Detail der Dias, mit Faden zusammengenäht' },
          { datei: '12.jpg', alt: 'Detail der Dias, nahe Perspektive' },
          { datei: '13.jpg', alt: 'Beleuchtetes Cover: zwölf Dias leuchten im Dunkeln, von schräg oben' },
          { datei: '14.jpg', alt: 'Beleuchtetes Cover: zwölf Dias leuchten im Dunkeln, von der Seite' },
        ],
        text: `Ein experimentelles Fotobuch, bei dem jede Seite durch unterschiedliche Papiere und Materialien individuell auf das jeweilige Bild abgestimmt ist. Das Cover besteht aus zwei beleuchteten Lichtplatten, die darauf montierte Dias sichtbar machen.`,
      },

      /* ---------- Projekt 2 ---------- */
      {
        id: 'etagen',
        titel: 'Etagen',
        ordner: 'bilder/fotografie/etagen/',
        vorschau: 'vorschau.jpg',
        bilder: [
          { datei: '01.jpg', alt: 'Wohnraum im Erdgeschoss: Sofa mit Kissen und dunkelblauem Sessel, Tisch, Löwenbild an der Wand' },
          { datei: '02.jpg', alt: 'Wohnraum in der dritten Etage: Holzschrank, Esstisch mit weißer Decke, Stehlampe' },
          { datei: '03.jpg', alt: 'Wohnraum mit Bett, Sofa, Kleiderhaufen auf dem Boden und einem orangen Vorhang am Fenster' },
          { datei: '04.jpg', alt: 'Wohnraum mit braunen Ledersofas, Glastisch, Zimmerpflanzen, Waschbrett und Teppichklopfer an der Wand' },
        ],
        text: `Ein fotografisches Kurzzeitprojekt zum Thema Identität. Innerhalb einer Woche habe ich den identischen Wohnraum auf verschiedenen Etagen eines Mehrfamilienhauses aus derselben Perspektive fotografiert. Die Bildserie zeigt, wie unterschiedlich Menschen denselben Raum gestalten und ihm ihre persönliche Identität verleihen.`,
      },

      /* ---------- Projekt 3 ---------- */
      {
        id: 'filmzitate',
        titel: 'Filmzitate',
        ordner: 'bilder/fotografie/filmzitate/',
        vorschau: 'vorschau.jpg',
        bilder: [
          { datei: '01.jpg', alt: 'Plakat „60 Years Kino International“: ein rosa Telefonhörer und eine welke violette Rose auf rosa Grund, Zitat aus Her' },
          { datei: '02.jpg', alt: 'Plakat „60 Years Kino International“: Spielkarten (drei Asse) in einer Mausefalle auf rotem Grund, Zitat aus Casino Royale' },
          { datei: '03.jpg', alt: 'Plakat „60 Years Kino International“: ein Stück Kirschkuchen in einer Drahtfalle auf fliederfarbenem Grund, Zitat aus The Godfather' },
          { datei: '04.jpg', alt: 'Plakat „60 Years Kino International“: ein schwarzer Motorradhelm mit Spiralmuster im Visier, Zitat aus James Bond 007 Skyfall' },
        ],
        text: `Anlässlich des 60-jährigen Jubiläums des Kino International entstand eine Plakatreihe, in der berühmte Filmzitate in eine eigene Bildsprache übersetzt und visuell interpretiert wurden.`,
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
