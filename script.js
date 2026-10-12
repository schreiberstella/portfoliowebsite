/* =====================================================
   Stella Schreiber – Portfolio
   1) Menü (auf allen Seiten)
   2) Intro-Ablauf (nur auf der Startseite)
   ===================================================== */
(function () {
  'use strict';

  var html = document.documentElement;
  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function sleep(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  /* ---------------------------------------------------
     1) MENÜ
     --------------------------------------------------- */
  var menue = document.getElementById('menue');
  var auf = document.getElementById('menueAuf');
  var zu = document.getElementById('menueZu');
  var scrim = document.getElementById('scrim');

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
      if (e.key === 'Escape' && menue.classList.contains('offen')) {
        menueSchliessen();
      }
    });
  }

  /* ---------------------------------------------------
     2) INTRO (nur wenn es die Bühne auf der Seite gibt)
     --------------------------------------------------- */
  var buehne = document.getElementById('buehne');
  if (!buehne) return;

  var video = document.getElementById('introVideo');
  var knopf = document.getElementById('abspielen');
  var tor = document.getElementById('tor');
  var eintreten = document.getElementById('eintreten');
  var titel = document.getElementById('crash');
  var untertitel = document.getElementById('panik');

  function setStage(name) {
    html.setAttribute('data-stage', name);
  }

  /* Text in einzelne Buchstaben zerlegen (für den Schreibmaschinen-Effekt).
     Die Buchstaben sind zuerst unsichtbar, nehmen aber schon Platz ein,
     damit nichts springt. Für Screenreader bleibt der volle Text erhalten. */
  function vorbereiten(el) {
    var teile = [];
    var buchstaben = [];
    var huelle = document.createElement('span');
    huelle.setAttribute('aria-hidden', 'true');

    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var t = n.textContent.replace(/\s+/g, ' ');
        teile.push(t);
        t.split('').forEach(function (zeichen) {
          var s = document.createElement('span');
          s.className = 'z';
          s.textContent = zeichen;
          huelle.appendChild(s);
          buchstaben.push(s);
        });
      } else if (n.nodeName === 'BR') {
        teile.push(' ');
        huelle.appendChild(document.createElement('br'));
      }
    });

    var sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = teile.join('').replace(/\s+/g, ' ').trim();

    el.textContent = '';
    el.appendChild(sr);
    el.appendChild(huelle);
    return buchstaben;
  }

  var letzter = null;
  async function tippen(buchstaben, tempo) {
    for (var i = 0; i < buchstaben.length; i++) {
      if (letzter) letzter.classList.remove('letzte');
      buchstaben[i].classList.add('an', 'letzte');
      letzter = buchstaben[i];
      if (!reduce) await sleep(tempo + Math.random() * tempo * 0.6);
    }
  }

  /* Video abspielen und warten, bis es zu Ende ist.
     Geht etwas schief (Datei fehlt, Autoplay blockiert), geht es trotzdem weiter. */
  function abspielen() {
    return new Promise(function (resolve) {
      var fertig = false;
      var gestartet = false;
      var timer = setTimeout(function () { if (!gestartet) ende(); }, 8000);

      function ende() {
        if (fertig) return;
        fertig = true;
        clearTimeout(timer);
        resolve();
      }

      video.muted = true;
      video.addEventListener('ended', ende);
      video.addEventListener('error', ende);
      var quelle = video.querySelector('source');
      if (quelle) quelle.addEventListener('error', ende);
      video.addEventListener('playing', function () {
        gestartet = true;
        clearTimeout(timer);
      });

      var versprechen = video.play();
      if (versprechen && versprechen.catch) {
        versprechen.catch(function () {
          /* Der Browser erlaubt kein automatisches Abspielen (z. B. Stromsparmodus):
             dann kommt ein Knopf zum Antippen. */
          clearTimeout(timer);
          knopf.hidden = false;
          knopf.addEventListener('click', function () {
            knopf.hidden = true;
            var v = video.play();
            if (v && v.catch) v.catch(ende);
          });
        });
      }
    });
  }

  async function ablauf() {
    var buchstabenTitel = vorbereiten(titel);
    var buchstabenText = vorbereiten(untertitel);

    // 1. Nur das Video
    await abspielen();

    // 2. Video blendet aus, CRAAAAAAASH wird getippt, danach der Text
    buehne.classList.add('video-aus');
    await sleep(reduce ? 100 : 600);
    buehne.classList.add('text-an');
    await sleep(reduce ? 100 : 300);
    await tippen(buchstabenTitel, 105);
    await sleep(reduce ? 600 : 900);
    await tippen(buchstabenText, 55);
    await sleep(reduce ? 1200 : 2200);

    // 3. Alles verschwindet, die Logo-Seite erscheint
    buehne.classList.add('weg');
    await sleep(reduce ? 50 : 750);
    setStage('gate');
  }

  // Klick auf den Namen öffnet das Portfolio
  eintreten.addEventListener('click', function () {
    tor.classList.add('weg');
    setTimeout(function () {
      setStage('portfolio');
      window.scrollTo(0, 0);
      try { history.replaceState(null, '', '#portfolio'); } catch (e) { /* egal */ }
    }, reduce ? 0 : 500);
  });

  if (html.getAttribute('data-stage') === 'intro') {
    ablauf();
  }
})();
