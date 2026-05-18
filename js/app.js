/* ═══════════════════════════════════════════════════
   CASARD — APP.JS
   Router + arranque. Siempre el último en cargar.
════════════════════════════════════════════════════ */

/* ── PÁGINAS SIN BARRA DE NAVEGACIÓN ── */
var SIN_NAV = ['bienvenida', 'registro', 'login'];

/* ── MAPA PÁGINAS → FUNCIONES ── */
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

/* ── ACCIONES POST-RENDER ── */
var MOUNTS_MAP = {
  chat: function() {
    var m = document.getElementById('chat-msgs');
    if (m) m.scrollTop = m.scrollHeight;
  },
  explorar: function() {
    /* Cargar propiedades reales de Firebase */
    cargarPropiedades(function(lista) {
      var el = document.getElementById('lista-v');
      if (el && lista.length > 0) {
        el.innerHTML = lista.map(tarjetaV).join('');
      }
      var hscroll = document.querySelector('.hscroll');
      if (hscroll) {
        var dest = lista.filter(function(p){ return p.top || p.nuevo; });
        if (dest.length === 0) dest = lista.slice(0, 3);
        if (dest.length > 0) hscroll.innerHTML = dest.map(tarjetaH).join('');
      }
      var secA = document.querySelector('.sec-a:last-of-type');
      if (secA) secA.textContent = lista.length + ' disponibles';
    });
  },
};

/* ══════════════════════════════
   ROUTER
══════════════════════════════ */
function ir(pagina, params) {
  params = params || {};

  if (!PAGINAS_MAP[pagina]) {
    console.warn('Página "' + pagina + '" no encontrada');
    ir('explorar');
    return;
  }

  S.paginaActual = pagina;

  /* Renderizar */
  var contenedor = document.getElementById('page');
  if (!contenedor) return;
  contenedor.innerHTML = PAGINAS_MAP[pagina](params);

  /* Nav */
  var nav = document.getElementById('bnav');
  var app = document.getElementById('app');
  var sinNav = SIN_NAV.indexOf(pagina) >= 0;
  if (nav) nav.className = 'bnav' + (sinNav ? ' oculto' : '');
  if (app) app.className = sinNav ? 'no-nav' : '';

  /* Marcar activo */
  var mapa = { explorar:'ni-inicio', mensajes:'ni-mensajes', perfil:'ni-perfil' };
  ['ni-inicio','ni-mensajes','ni-perfil'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('on');
  });
  if (mapa[pagina]) {
    var activo = document.getElementById(mapa[pagina]);
    if (activo) activo.classList.add('on');
  }

  window.scrollTo(0, 0);

  /* onMount */
  if (MOUNTS_MAP[pagina]) {
    setTimeout(MOUNTS_MAP[pagina], 60);
  }
}

/* ══════════════════════════════
   ARRANQUE
══════════════════════════════ */
(function() {
  console.log('🏡 CasaRD iniciando…');

  /* Escuchar cambios de sesión Firebase */
  fbAuth.onAuthStateChanged(function(user) {
    if (user) {
      S.usuario = {
        uid:      user.uid,
        nombre:   user.displayName || user.email.split('@')[0],
        email:    user.email,
        foto:     user.photoURL || null,
      };
      localStorage.setItem('casard_u', JSON.stringify(S.usuario));
      /* Si estamos en bienvenida/login/registro → ir a explorar */
      if (!S.paginaActual || SIN_NAV.indexOf(S.paginaActual) >= 0) {
        ir('explorar');
      }
    } else {
      S.usuario = null;
      localStorage.removeItem('casard_u');
    }
  });

  /* Mostrar página inicial */
  if (S.usuario) {
    ir('explorar');
  } else {
    ir('bienvenida');
  }

  console.log('✅ CasaRD lista');
})();
