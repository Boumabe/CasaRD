/* ═══════════════════════════════════════════════════
   CASARD — APP.JS  (versión profesional + Avisos)
   Router + arranque + UN SOLO auth listener.
   ⚠️ Siempre el último script en cargar.
════════════════════════════════════════════════════ */

var SIN_NAV = ['bienvenida','registro','login'];

var PAGINAS_MAP = {
  bienvenida:   pagBienvenida,
  registro:     pagRegistro,
  login:        pagLogin,
  explorar:     pagExplorar,
  detalle:      pagDetalle,
  publicar:     pagPublicar,
  mensajes:     pagMensajes,
  chat:         pagChat,
  perfil:       pagPerfil,
  avisos:       pagAvisos,
  detalleAviso: pagDetalleAviso,
  nuevoAviso:   pagNuevoAviso,
};

var MOUNTS_MAP = {
  chat: function() {
    var m = document.getElementById('chat-msgs');
    if (m) m.scrollTop = m.scrollHeight;
  },
  explorar: function() {
    cargarPropiedades(function(lista) {
      var lv = document.getElementById('lista-v');
      if (lv) lv.innerHTML = lista.map(tarjetaV).join('');
      var hs = document.querySelector('.hscroll');
      if (hs) {
        var dest = lista.filter(function(p){ return p.top || p.nuevo; });
        if (!dest.length) dest = lista.slice(0, 3);
        hs.innerHTML = dest.map(tarjetaH).join('');
      }
    });
  },
  avisos: function() {
    cargarAvisos(function(lista) {
      var feed = document.getElementById('feed-avisos');
      if (feed) feed.innerHTML = lista.map(tarjetaAviso).join('');
    });
  },
  detalleAviso: function() {
    /* Incrementar vista en Firebase */
    var pag = S.pagina;
    if (pag !== 'detalleAviso') return;
    /* El id lo guardamos en S.avisoActual */
    if (S.avisoActual) {
      db.collection('avisos').doc(S.avisoActual)
        .update({ vistas: firebase.firestore.FieldValue.increment(1) })
        .catch(function(){});
      cargarComentarios(S.avisoActual, function(comms) {
        var lista = document.getElementById('lista-comentarios');
        if (lista && comms.length) {
          lista.innerHTML = comms.map(tarjetaComentario).join('');
        }
      });
    }
  },
};

/* ══════════════════════════════
   NAV — activar icono SVG
══════════════════════════════ */
function activarNav(pagina) {
  var ids = ['ni-inicio','ni-avisos','ni-mensajes','ni-perfil'];
  ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('on');
    var svg = el.querySelector('svg');
    if (svg) svg.setAttribute('stroke', '#94A3B8');
    var lb = el.querySelector('.ni-lb');
    if (lb) { lb.style.color = ''; lb.style.fontWeight = ''; }
  });

  var mapaNav = {
    explorar:     'ni-inicio',
    detalle:      'ni-inicio',
    avisos:       'ni-avisos',
    detalleAviso: 'ni-avisos',
    nuevoAviso:   'ni-avisos',
    mensajes:     'ni-mensajes',
    chat:         'ni-mensajes',
    perfil:       'ni-perfil',
    publicar:     null,
  };

  var targetId = mapaNav[pagina];
  if (!targetId) return;
  var el = document.getElementById(targetId);
  if (!el) return;
  el.classList.add('on');
  var svg = el.querySelector('svg');
  if (svg) svg.setAttribute('stroke', '#1B4F8A');
  var lb = el.querySelector('.ni-lb');
  if (lb) { lb.style.color = '#1B4F8A'; lb.style.fontWeight = '700'; }
}

/* ══════════════════════════════
   ROUTER
══════════════════════════════ */
function ir(pagina, params) {
  params = params || {};
  if (!PAGINAS_MAP[pagina]) { ir('explorar'); return; }

  S.pagina = pagina;

  /* Guardar id del aviso actual para el mount */
  if (pagina === 'detalleAviso') S.avisoActual = params.id || null;

  /* Ocultar punto rojo de Avisos al visitarlos */
  if (pagina === 'avisos' || pagina === 'detalleAviso' || pagina === 'nuevoAviso') {
    var dot = document.getElementById('ni-avisos-dot');
    if (dot) dot.style.display = 'none';
  }

  /* Badge de mensajes no leídos */
  var nrTotal = typeof CONVS !== 'undefined'
    ? CONVS.reduce(function(s,c){ return s + (c.nr||0); }, 0) : 0;
  var badge = document.getElementById('ni-msg-badge');
  if (badge) {
    if (nrTotal > 0 && pagina !== 'mensajes' && pagina !== 'chat') {
      badge.textContent = nrTotal > 9 ? '9+' : nrTotal;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }

  var pg = document.getElementById('page');
  if (!pg) return;
  pg.innerHTML = PAGINAS_MAP[pagina](params);

  var nav    = document.getElementById('bnav');
  var app    = document.getElementById('app');
  var sinNav = SIN_NAV.indexOf(pagina) >= 0;

  if (nav) nav.className = 'bnav' + (sinNav ? ' oculto' : '');
  if (app) app.className = sinNav ? 'no-nav' : '';

  activarNav(pagina);

  window.scrollTo(0, 0);
  if (MOUNTS_MAP[pagina]) setTimeout(MOUNTS_MAP[pagina], 60);
}

/* ══════════════════════════════
   ARRANQUE — un solo auth listener
══════════════════════════════ */
(function() {
  console.log('🏡 CasaRD iniciando…');

  if (S.usuario) {
    ir('explorar');
  } else {
    ir('bienvenida');
  }

  fbAuth.onAuthStateChanged(function(user) {
    if (user) {
      S.usuario = {
        uid:    user.uid,
        nombre: user.displayName || user.email.split('@')[0],
        email:  user.email,
        foto:   user.photoURL || null,
      };
      localStorage.setItem('casard_u', JSON.stringify(S.usuario));
      loader(false);
      if (SIN_NAV.indexOf(S.pagina) >= 0) {
        ir('explorar');
      }
    } else {
      S.usuario = null;
      localStorage.removeItem('casard_u');
      loader(false);
      if (S.pagina && SIN_NAV.indexOf(S.pagina) < 0) {
        ir('bienvenida');
      }
    }
  });

  console.log('✅ CasaRD lista');
})();
