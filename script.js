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

  function istVideo(datei) {
    return /\.(mp4|webm|mov|m4v)$/i.test(datei);
  }

  function pfad(projekt, datei) {
    return (projekt.ordner || '') + datei;
  }

  function projektLink(bereich, projekt) {
    if (projekt.seite) return projekt.seite;   // eigene, ausführliche Projektseite
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
    var key = params.get('b') || el.getAttribute('data-bereich') || 'fotografie';
    var id = params.get('p') || el.getAttribute('data-projekt');
    var bereich = daten[key];
    var projekt = null;

    if (bereich && bereich.projekte) {
      bereich.projekte.forEach(function (p) { if (p.id === id) projekt = p; });
    }

    var rueckZiel = bereich ? (key + '.html') : 'index.html#portfolio';
    var rueckText = '\u2190 ' + (bereich && bereich.titel ? bereich.titel : 'Startseite');
    var zurueck = document.getElementById('zurueck');
    zurueck.href = rueckZiel;
    zurueck.textContent = rueckText;

    // Menüpunkt des Bereichs als aktuell markieren
    var menueLink = document.querySelector('#menue a[href="' + key + '.html"]');
    if (menueLink) menueLink.setAttribute('aria-current', 'page');

    if (!projekt) {
      document.title = 'Projekt nicht gefunden – Stella Schreiber';
      document.getElementById('projektTitel').textContent = 'Projekt nicht gefunden';
      document.getElementById('projektSlider').hidden = true;
      return;
    }

    document.title = projekt.titel + ' – ' + (bereich.titel || '') + ' – Stella Schreiber';
    document.getElementById('projektTitel').textContent = projekt.titel;
    if (projekt.meta) {
      var metaEl = document.getElementById('projektMeta');
      metaEl.textContent = projekt.meta;
      metaEl.hidden = false;
    }

    // Text: Leerzeile = neuer Absatz
    var textBox = document.getElementById('projektText');
    String(projekt.text || '').split(/\n\s*\n/).forEach(function (absatz) {
      absatz = absatz.trim();
      if (!absatz) return;
      var p = document.createElement('p');
      p.textContent = absatz;
      textBox.appendChild(p);
    });

    // Bilder und Videos
    var bilder = (projekt.bilder || []).map(function (eintrag) {
      var info = bildInfo(eintrag);
      return {
        quelle: pfad(projekt, info.datei),
        datei: info.datei,
        alt: info.alt || '',
        poster: info.poster ? pfad(projekt, info.poster)
              : (projekt.vorschau ? pfad(projekt, projekt.vorschau) : ''),
        titel: projekt.titel
      };
    });
    sliderStarten(bilder, document.getElementById('projektSpur'),
      document.getElementById('bildVor'), document.getElementById('bildWeiter'),
      document.getElementById('bildZaehler'), null);
  }

  /* ----- Illustration: nur Bilder, darunter der kurze Name ----- */
  function galerieStarten(el) {
    var key = el.getAttribute('data-bereich');
    var bereich = daten[key];
    var liste = bereich && bereich.bilder;

    if (!liste || !liste.length) {
      hinweis(el, 'Hier sind noch keine Illustrationen eingetragen. ' +
        'Falls du schon welche eingetragen hast, prüfe die Datei projekte.js ' +
        '(fehlt irgendwo ein Komma oder ein Anführungszeichen?).');
      return;
    }

    var ordner = bereich.ordner || '';
    var bilder = liste.map(function (eintrag) {
      var info = bildInfo(eintrag);
      return {
        quelle: ordner + info.datei,
        datei: info.datei,
        alt: info.alt || info.titel || '',
        poster: info.poster ? ordner + info.poster : '',
        titel: info.titel || ''
      };
    });
    var name = document.getElementById('galerieName');
    sliderStarten(bilder, document.getElementById('galerieSpur'),
      document.getElementById('galerieVor'), document.getElementById('galerieWeiter'),
      document.getElementById('galerieZaehler'), function (i) {
        name.textContent = bilder[i].titel;
      });
  }


  /* ----- Ausführliche Projektseite (z. B. Sooderso): Bilder/Videos einsetzen ----- */
  function medienStarten() {
    var felder = document.querySelectorAll('.medium[data-datei]');
    Array.prototype.forEach.call(felder, function (fig) {
      var datei = fig.getAttribute('data-datei');
      var alt = fig.getAttribute('data-alt') || '';
      var medium;

      function platzhalter() {
        fig.classList.add('leer');
        fig.setAttribute('data-hinweis', datei.split('/').pop());
        if (medium) medium.remove();
      }

      if (istVideo(datei)) {
        medium = document.createElement('video');
        medium.src = datei;
        medium.playsInline = true;
        medium.preload = 'metadata';
        var poster = fig.getAttribute('data-poster');
        if (poster) medium.poster = poster;
        if (fig.getAttribute('data-auto') === 'ja') {
          medium.muted = true; medium.loop = true; medium.autoplay = true;
        } else {
          medium.controls = true;
        }
        medium.setAttribute('aria-label', alt);
        medium.addEventListener('error', platzhalter);
      } else {
        medium = document.createElement('img');
        medium.src = datei;
        medium.alt = alt;
        medium.decoding = 'async';
        medium.loading = 'lazy';
        medium.addEventListener('error', platzhalter);
      }
      fig.appendChild(medium);
    });
  }

  /* ----- gemeinsamer Slider (Projektseite und Illustration) ----- */
  function sliderStarten(bilder, spur, vor, weiter, zaehlerEl, beiWechsel) {
    bilder.forEach(function (b, i) {
      var fig = document.createElement('figure');
      fig.className = 'folie';
      var medium;

      if (istVideo(b.datei)) {
        medium = document.createElement('video');
        medium.src = b.quelle;
        medium.controls = true;
        medium.playsInline = true;
        medium.preload = 'metadata';
        if (b.poster) medium.poster = b.poster;
        medium.setAttribute('aria-label', b.alt || b.titel);
      } else {
        medium = document.createElement('img');
        medium.src = b.quelle;
        medium.alt = b.alt || (b.titel + ' – Bild ' + (i + 1));
        medium.decoding = 'async';
        if (i > 0) medium.loading = 'lazy';
      }

      medium.addEventListener('error', function () {
        // Hilfe beim Einrichten: zeigt, welche Datei nicht gefunden wurde
        fig.classList.add('leer');
        fig.setAttribute('data-hinweis', 'Datei nicht gefunden: ' + b.quelle);
        medium.remove();
      });
      fig.appendChild(medium);
      spur.appendChild(fig);
    });

    var n = bilder.length;
    var index = 0;

    function aktualisieren() {
      zaehlerEl.textContent = (index + 1) + ' / ' + n;
      Array.prototype.forEach.call(spur.querySelectorAll('video'), function (v) { v.pause(); });
      if (beiWechsel) beiWechsel(index);
    }

    function gehe(i) {
      i = (i + n) % n;
      spur.scrollTo({ left: i * spur.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
    }

    if (beiWechsel) beiWechsel(0);
    if (n < 2) {
      vor.hidden = true;
      weiter.hidden = true;
      zaehlerEl.hidden = true;
      return;
    }
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

  if (document.querySelector('.medium[data-datei]')) medienStarten();

  var galerie = document.getElementById('illustrationGalerie');
  if (galerie) galerieStarten(galerie);

  var uebersicht = document.getElementById('projektUebersicht');
  if (uebersicht) uebersichtStarten(uebersicht);

  var detail = document.getElementById('projektDetail');
  if (detail) detailStarten(detail);
})();
