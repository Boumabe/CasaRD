/* ═══════════════════════════════════════════════════
   CASARD — APP.JS
   Router + arranque + UN SOLO auth listener.
   ⚠️ Siempre el último script en cargar.
════════════════════════════════════════════════════ */

var SIN_NAV = ['bienvenida','registro','login'];

var PAGINAS_MAP = {
  bienvenida: pagBienvenida,
  registro:   pagRegistro,
  login:      pagLogin,
  explorar:   pagExplorar,
  detalle:    pagDetalle,
  publicar:   pagPublicar,
  mensajes:   pagMensajes,
  chat:       pagChat,
  perfil:     pagPerfil,
};

var MOUNTS_MAP = {
  chat: function() {
    var m = document.getElementById('chat-msgs');
    if (m) m.scrollTop = m.scrollHeight;
  },
  explorar: function() {
    /* Cargar propiedades de Firebase */
    cargarPropiedades(function(lista) {
      var lv = document.getElementById('lista-v');
      if (lv) lv.innerHTML = lista.map(tarjetaV).join('');
      var hs = document.querySelector('.hscroll');
      if (hs) {
        var dest = lista.filter(function(p){ return p.top||p.nuevo; });
        if (!dest.length) dest = lista.slice(0,3);
        hs.innerHTML = dest.map(tarjetaH).join('');
      }
    });
  },
};

/* ══════════════════════════════
   ROUTER
══════════════════════════════ */
function ir(pagina, params) {
  params = params || {};
  if (!PAGINAS_MAP[pagina]) { ir('explorar'); return; }

  S.pagina = pagina;

  var pg  = document.getElementById('page');
  if (!pg) return;
  pg.innerHTML = PAGINAS_MAP[pagina](params);

  var nav    = document.getElementById('bnav');
  var app    = document.getElementById('app');
  var sinNav = SIN_NAV.indexOf(pagina) >= 0;
  if (nav) nav.className = 'bnav' + (sinNav ? ' oculto' : '');
  if (app) app.className = sinNav ? 'no-nav' : '';

  /* Marcar ítem activo */
  ['ni-inicio','ni-mensajes','ni-perfil'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('on');
  });
  var mapaNav = {explorar:'ni-inicio', mensajes:'ni-mensajes', perfil:'ni-perfil'};
  if (mapaNav[pagina]) {
    var a = document.getElementById(mapaNav[pagina]);
    if (a) a.classList.add('on');
  }

  window.scrollTo(0,0);
  if (MOUNTS_MAP[pagina]) setTimeout(MOUNTS_MAP[pagina], 60);
}

/* ══════════════════════════════
   ARRANQUE — un solo auth listener
══════════════════════════════ */
(function() {
  console.log('🏡 CasaRD iniciando…');

  /* Mostrar página inicial INMEDIATAMENTE */
  if (S.usuario) {
    ir('explorar');
  } else {
    ir('bienvenida');
  }

  /* Auth listener — actualiza estado cuando Firebase responde */
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

      /* Ir a explorar solo si estamos en página de auth */
      if (SIN_NAV.indexOf(S.pagina) >= 0) {
        ir('explorar');
      }
    } else {
      /* Sin sesión — si no estamos en auth, ir a bienvenida */
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
