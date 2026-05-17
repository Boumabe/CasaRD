/* ═══════════════════════════════════════════════════
   CASARD — APP.JS
   Router + arranque de la app.
   ⚠️ Siempre el último script en cargar.
════════════════════════════════════════════════════ */

/* ── PÁGINAS SIN BARRA DE NAVEGACIÓN ── */
var SIN_NAV = ['bienvenida'];

/* ── MAPA DE PÁGINAS → FUNCIONES ── */
var PAGINAS_MAP = {
  bienvenida: pagBienvenida,
  explorar:   pagExplorar,
  detalle:    pagDetalle,
  publicar:   pagPublicar,
  mensajes:   pagMensajes,
  chat:       pagChat,
  perfil:     pagPerfil,
};

/* ── ACCIONES POST-RENDER (onMount) ── */
var MOUNTS_MAP = {
  chat: function() {
    var m = document.getElementById('chat-msgs');
    if (m) m.scrollTop = m.scrollHeight;
  },
  explorar: function() {
    var inp = document.getElementById('inp-buscar');
    if (inp) inp.focus();
  },
};

/* ══════════════════════════════
   ROUTER — función principal
   Uso: ir('explorar')
        ir('detalle', {id:'1'})
══════════════════════════════ */
function ir(pagina, params) {
  params = params || {};

  /* Verificar que la página existe */
  if (!PAGINAS_MAP[pagina]) {
    console.warn('CasaRD: página "' + pagina + '" no encontrada, redirigiendo a explorar');
    ir('explorar');
    return;
  }

  S.paginaActual = pagina;

  /* ── Renderizar HTML ── */
  var contenedor = document.getElementById('page');
  if (!contenedor) return;
  contenedor.innerHTML = PAGINAS_MAP[pagina](params);

  /* ── Mostrar / ocultar nav ── */
  var nav = document.getElementById('bnav');
  var app = document.getElementById('app');
  var sinNav = SIN_NAV.indexOf(pagina) >= 0;

  if (nav) nav.className = 'bnav' + (sinNav ? ' oculto' : '');
  if (app) app.className = sinNav ? 'no-nav' : '';

  /* ── Marcar ítem activo en nav ── */
  var items = {
    'explorar': 'ni-inicio',
    'mensajes': 'ni-mensajes',
    'perfil':   'ni-perfil',
  };
  ['ni-inicio', 'ni-mensajes', 'ni-perfil'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('on');
  });
  if (items[pagina]) {
    var activo = document.getElementById(items[pagina]);
    if (activo) activo.classList.add('on');
  }

  /* ── Scroll al top ── */
  window.scrollTo(0, 0);

  /* ── onMount — ejecutar después del render ── */
  if (MOUNTS_MAP[pagina]) {
    setTimeout(MOUNTS_MAP[pagina], 50);
  }
}

/* ══════════════════════════════
   ARRANQUE DE LA APP
   Se ejecuta cuando el DOM está listo
══════════════════════════════ */
/* ══════════════════════════════
   ARRANQUE — llamada directa
   Scripts al final del body =
   DOM ya listo = llamar directo
══════════════════════════════ */
(function() {
  console.log('🏡 CasaRD iniciando…');
  if (S.usuario) {
    ir('explorar');
  } else {
    ir('bienvenida');
  }
  console.log('✅ CasaRD lista');
})();
