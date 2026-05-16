/* ═══════════════════════════════════════════════════
   CASARD — ROUTER (Navegación)
   ─────────────────────────────────────────────────
   Controla qué página se muestra.
   Para añadir una nueva página:
   1. Crear el archivo en /pages/nuevapagina.js
   2. Añadirla al objeto RUTAS aquí abajo
   3. Eso es todo — nada más que tocar
════════════════════════════════════════════════════ */

const Router = (() => {

  /* ── PÁGINAS SIN BARRA DE NAVEGACIÓN INFERIOR ── */
  const PAGINAS_SIN_NAV = ['bienvenida', 'registro', 'login'];

  /* ── REGISTRO DE RUTAS ── */
  /* Para añadir una nueva página, solo añadir aquí */
  const RUTAS = {
    bienvenida: () => PaginaBienvenida.render(),
    explorar:   () => PaginaExplorar.render(),
    detalle:    (params) => PaginaDetalle.render(params),
    publicar:   () => PaginaPublicar.render(),
    mensajes:   () => PaginaMensajes.render(),
    chat:       (params) => PaginaChat.render(params),
    perfil:     () => PaginaPerfil.render(),
    buscar:     () => PaginaBuscar.render(),
  };

  /* ── PÁGINA ACTUAL ── */
  let paginaActual = null;

  /* ─────────────────────────────────────────────
     NAVEGAR — función principal
     Uso: Router.ir('explorar')
          Router.ir('detalle', { id: 'abc123' })
  ───────────────────────────────────────────── */
  function ir(pagina, params = {}) {
    // Verificar que la página existe
    if (!RUTAS[pagina]) {
      console.warn(`CasaRD Router: página "${pagina}" no encontrada`);
      ir('explorar');
      return;
    }

    // Guardar página actual
    paginaActual = pagina;

    // Renderizar la página en el contenedor
    const contenedor = document.getElementById('page-container');
    contenedor.innerHTML = '';
    contenedor.innerHTML = RUTAS[pagina](params);

    // Mostrar u ocultar la barra de navegación
    _actualizarNav(pagina);

    // Marcar el botón activo en la nav
    _marcarNavActivo(pagina);

    // Scroll al top
    window.scrollTo(0, 0);

    // Ejecutar scripts de la página si existen
    _ejecutarOnMount(pagina, params);
  }

  /* ─────────────────────────────────────────────
     ACTUALIZAR NAV — mostrar/ocultar
  ───────────────────────────────────────────── */
  function _actualizarNav(pagina) {
    const nav = document.getElementById('bottom-nav');
    const app = document.getElementById('app');

    if (PAGINAS_SIN_NAV.includes(pagina)) {
      nav.classList.add('hidden');
      app.classList.add('no-nav');
    } else {
      nav.classList.remove('hidden');
      app.classList.remove('no-nav');
    }
  }

  /* ─────────────────────────────────────────────
     MARCAR ACTIVO en la barra de navegación
  ───────────────────────────────────────────── */
  function _marcarNavActivo(pagina) {
    const items = document.querySelectorAll('.nav-item');
    items.forEach(item => {
      item.classList.remove('active');
      if (item.dataset.page === pagina) {
        item.classList.add('active');
      }
    });
  }

  /* ─────────────────────────────────────────────
     ON MOUNT — ejecutar lógica post-render
  ───────────────────────────────────────────── */
  function _ejecutarOnMount(pagina, params) {
    const mounts = {
      explorar:  () => PaginaExplorar.onMount && PaginaExplorar.onMount(),
      detalle:   () => PaginaDetalle.onMount && PaginaDetalle.onMount(params),
      publicar:  () => PaginaPublicar.onMount && PaginaPublicar.onMount(),
      mensajes:  () => PaginaMensajes.onMount && PaginaMensajes.onMount(),
      chat:      () => PaginaChat.onMount && PaginaChat.onMount(params),
      perfil:    () => PaginaPerfil.onMount && PaginaPerfil.onMount(),
    };
    if (mounts[pagina]) mounts[pagina]();
  }

  /* ─────────────────────────────────────────────
     PÁGINA ACTUAL — getter
  ───────────────────────────────────────────── */
  function obtenerPaginaActual() {
    return paginaActual;
  }

  /* ─────────────────────────────────────────────
     INICIALIZAR EVENTOS de la nav
  ───────────────────────────────────────────── */
  function inicializarNav() {
    // Botones de la nav inferior
    document.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pagina = btn.dataset.page;
        ir(pagina);
      });
    });
  }

  /* API pública */
  return { ir, inicializarNav, obtenerPaginaActual };

})();
