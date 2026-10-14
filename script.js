/* =====================================================
   Stella Schreiber – Portfolio
   1) Menü (auf allen Seiten)
   2) Logo-Seite auf der Startseite
   3) Projekte (Fotografie-Übersicht und Projektseite)
      Die Inhalte stehen in der Datei projekte.js
   ===================================================== */
(function () {
  'use strict';

  var html = document.documentElement;
  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------
     1) MENÜ
     --------------------------------------------------- */
  var menue = document.getElementById('menue');
  var auf = document.getElementById('menueAuf');
  var zu = document.getElementById('menueZu');
  var scrim = document.getElementById('scrim');

  function menueOffen() {
    return !!menue && menue.classList.contains('offen');
  }

  function menueOeffnen() {
    menue.classList.add('offen');
    scrim.classList.add('offen');
    document.body.classList.add('menue-offen');
    auf.setAttribute('aria-expanded', 'true');
    zu.focus();
  }

  function menueSchliessen() {
    menue.classList.remove('offen');
    scrim.classList.remove('offen');
    document.body.classList.remove('menue-offen');
    auf.setAttribute('aria-expanded', 'false');
    auf.focus();
  }

  if (menue && auf && zu && scrim) {
    auf.addEventListener('click', menueOeffnen);
    zu.addEventListener('click', menueSchliessen);
    scrim.addEventListener('click', menueSchliessen);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menueOffen()) menueSchliessen();
    });
  }

  /* ---------------------------------------------------
     2) LOGO-SEITE (Klick auf den Namen öffnet das Portfolio)
     --------------------------------------------------- */
  var tor = document.getElementById('tor');
  var eintreten = document.getElementById('eintreten');

  if (tor && eintreten) {
    eintreten.addEventListener('click', function () {
      tor.classList.add('weg');
      setTimeout(function () {
        html.setAttribute('data-stage', 'portfolio');
        window.scrollTo(0, 0);
        try { history.replaceState(null, '', '#portfolio'); } catch (e) { /* egal */ }
      }, reduce ? 0 : 500);
    });
  }

  /* ---------------------------------------------------
     3) PROJEKTE
     --------------------------------------------------- */
  var daten = window.PORTFOLIO || {};

  function bildInfo(eintrag) {
    return (typeof eintrag === 'string') ? { datei: eintrag } : eintrag;
  }

  function pfad(projekt, datei) {
    return (projekt.ordner || '') + datei;
  }

  function projektLink(bereich, projekt) {
    return 'projekt.html?b=' + encodeURIComponent(bereich) +
           '&p=' + encodeURIComponent(projekt.id);
  }

  function hinweis(el, text) {
    el.textContent = '';
    var p = document.createElement('p');
    p.className = 'hinweis';
    p.textContent = text;
    el.appendChild(p);
  }

  /* ----- Fotografie-Seite: Vorschau links, Projektliste rechts ----- */
  function uebersichtStarten(el) {
    var key = el.getAttribute('data-bereich');
    var bereich = daten[key];

    if (!bereich || !bereich.projekte || !bereich.projekte.length) {
      hinweis(el, 'Hier sind noch keine Projekte eingetragen. ' +
        'Falls du schon welche eingetragen hast, prüfe die Datei projekte.js ' +
        '(fehlt irgendwo ein Komma oder ein Anführungszeichen?).');
      return;
    }

    var projekte = bereich.projekte;
    var n = projekte.length;
    var buehne = document.getElementById('vorschauBuehne');
    var link = document.getElementById('vorschauLink');
    var bild = document.getElementById('vorschauBild');
    var zurueck = document.getElementById('vorschauZurueck');
    var weiter = document.getElementById('vorschauWeiter');
    var liste = document.getElementById('projektListe');
    var eintraege = [];
    var aktuell = -1;
    var zaehler = 0;

    projekte.forEach(function (p, i) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = projektLink(key, p);
      var text = document.createElement('span');
      text.textContent = p.titel;
      a.appendChild(text);
      a.addEventListener('mouseenter', function () { zeige(i); });
      a.addEventListener('focus', function () { zeige(i); });
      li.appendChild(a);
      liste.appendChild(li);
      eintraege.push(li);
    });

    function zeige(i) {
      i = (i + n) % n;
      if (i === aktuell) return;
      aktuell = i;
      var p = projekte[i];

      eintraege.forEach(function (li, k) {
        li.classList.toggle('aktiv', k === i);
      });
      link.href = projektLink(key, p);
      link.setAttribute('aria-label', 'Projekt „' + p.titel + '“ öffnen');
      buehne.setAttribute('data-titel', p.titel);

      var mein = ++zaehler;
      var neu = new Image();
      var fertig = function (fehler) {
        if (mein !== zaehler) return;     // inzwischen wurde ein anderes Projekt gewählt
        setTimeout(function () {
          if (mein !== zaehler) return;
          buehne.classList.toggle('leer', !!fehler);
          if (fehler) bild.removeAttribute('src'); else bild.src = neu.src;
          bild.alt = fehler ? '' : 'Vorschau: ' + p.titel;
          bild.classList.remove('weg');
        }, reduce ? 0 : 150);
      };
      neu.onload = function () { fertig(false); };
      neu.onerror = function () { fertig(true); };
      bild.classList.add('weg');
      neu.src = pfad(p, p.vorschau);
    }

    if (n < 2) {
      zurueck.hidden = true;
      weiter.hidden = true;
    }
    zurueck.addEventListener('click', function () { zeige(aktuell - 1); });
    weiter.addEventListener('click', function () { zeige(aktuell + 1); });

    document.addEventListener('keydown', function (e) {
      if (menueOffen() || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'ArrowLeft') zeige(aktuell - 1);
      if (e.key === 'ArrowRight') zeige(aktuell + 1);
    });

    zeige(0);
  }

  /* ----- Projektseite: große Bilder, Titel, Text ----- */
  function detailStarten(el) {
    var params = new URLSearchParams(window.location.search);
    var key = params.get('b') || 'fotografie';
    var id = params.get('p');
    var bereich = daten[key];
    var projekt = null;

    if (bereich && bereich.projekte) {
      bereich.projekte.forEach(function (p) { if (p.id === id) projekt = p; });
    }

    var rueckZiel = bereich ? (key + '.html') : 'index.html#portfolio';
    var rueckText = '← ' + (bereich && bereich.titel ? bereich.titel : 'Startseite');
    ['zurueckOben', 'zurueckUnten'].forEach(function (nameId) {
      var a = document.getElementById(nameId);
      a.href = rueckZiel;
      a.textContent = rueckText;
    });

    if (!projekt) {
      document.title = 'Projekt nicht gefunden – Stella Schreiber';
      document.getElementById('projektTitel').textContent = 'Projekt nicht gefunden';
      document.getElementById('projektSlider').hidden = true;
      return;
    }

    document.title = projekt.titel + ' – ' + (bereich.titel || '') + ' – Stella Schreiber';
    document.getElementById('projektTitel').textContent = projekt.titel;

    // Text: Leerzeile = neuer Absatz
    var textBox = document.getElementById('projektText');
    String(projekt.text || '').split(/\n\s*\n/).forEach(function (absatz) {
      absatz = absatz.trim();
      if (!absatz) return;
      var p = document.createElement('p');
      p.textContent = absatz;
      textBox.appendChild(p);
    });

    // Bilder
    var spur = document.getElementById('projektSpur');
    var bilder = projekt.bilder || [];
    bilder.forEach(function (eintrag, i) {
      var info = bildInfo(eintrag);
      var fig = document.createElement('figure');
      fig.className = 'folie';
      var img = document.createElement('img');
      img.src = pfad(projekt, info.datei);
      img.alt = info.alt || (projekt.titel + ' – Bild ' + (i + 1));
      img.decoding = 'async';
      if (i > 0) img.loading = 'lazy';
      img.addEventListener('error', function () {
        // Hilfe beim Einrichten: zeigt, welche Datei nicht gefunden wurde
        fig.classList.add('leer');
        fig.setAttribute('data-hinweis', 'Bild nicht gefunden: ' + pfad(projekt, info.datei));
        img.remove();
      });
      fig.appendChild(img);
      spur.appendChild(fig);
    });

    var n = bilder.length;
    var zaehlerEl = document.getElementById('bildZaehler');
    var vor = document.getElementById('bildVor');
    var weiter = document.getElementById('bildWeiter');
    var index = 0;

    function aktualisieren() {
      zaehlerEl.textContent = (index + 1) + ' / ' + n;
    }

    function gehe(i) {
      i = (i + n) % n;
      spur.scrollTo({ left: i * spur.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
    }

    if (n < 2) {
      vor.hidden = true;
      weiter.hidden = true;
      zaehlerEl.hidden = true;
    } else {
      aktualisieren();
      vor.addEventListener('click', function () { gehe(index - 1); });
      weiter.addEventListener('click', function () { gehe(index + 1); });

      // Wischen oder Scrollen: Zähler mitführen
      spur.addEventListener('scroll', function () {
        var i = Math.round(spur.scrollLeft / Math.max(spur.clientWidth, 1));
        if (i !== index) { index = i; aktualisieren(); }
      }, { passive: true });

      // Bei Größenänderung am aktuellen Bild bleiben
      window.addEventListener('resize', function () {
        spur.scrollTo({ left: index * spur.clientWidth, behavior: 'auto' });
      });

      document.addEventListener('keydown', function (e) {
        if (menueOffen() || e.altKey || e.ctrlKey || e.metaKey) return;
        if (e.key === 'ArrowLeft') gehe(index - 1);
        if (e.key === 'ArrowRight') gehe(index + 1);
      });
    }
  }

  var uebersicht = document.getElementById('projektUebersicht');
  if (uebersicht) uebersichtStarten(uebersicht);

  var detail = document.getElementById('projektDetail');
  if (detail) detailStarten(detail);
})();
