/* ═══════════════════════════════════════════════════
   CASARD — PÁGINA EXPLORAR
   ─────────────────────────────────────────────────
   Página principal — lista de propiedades.
   Contiene: búsqueda, filtros, mapa, tarjetas.
════════════════════════════════════════════════════ */

const PaginaExplorar = (() => {

  /* ── DATOS DEMO (se reemplazarán con Firebase) ── */
  const PROPIEDADES_DEMO = [
    {
      id: '1', titulo: 'Villa Las Palmas', tipo: 'Villa',
      precio: 25000, ciudad: 'Punta Cana', distancia: '1.8 km',
      habitaciones: 3, banos: 2, emoji: '🏠',
      comodidades: ['WiFi', 'A/C', 'Piscina', 'Planta eléc.'],
      valoracion: 4.9, resenas: 34, nuevo: false, destacado: true,
      whatsapp: '18090000001',
      gradiente: 'linear-gradient(135deg,#FDEBC8,#F0B86E)',
    },
    {
      id: '2', titulo: 'Apto. Vista Mar', tipo: 'Apartamento',
      precio: 18000, ciudad: 'Santo Domingo', distancia: '3.2 km',
      habitaciones: 2, banos: 1, emoji: '🌴',
      comodidades: ['WiFi', 'A/C', 'Parqueo'],
      valoracion: 4.8, resenas: 21, nuevo: true, destacado: false,
      whatsapp: '18090000002',
      gradiente: 'linear-gradient(135deg,#C8E6D4,#7ABFA0)',
    },
    {
      id: '3', titulo: 'Cabaña El Río', tipo: 'Cabaña',
      precio: 12000, ciudad: 'Jarabacoa', distancia: '45 km',
      habitaciones: 2, banos: 1, emoji: '🌊',
      comodidades: ['WiFi', 'Vista al río'],
      valoracion: 4.7, resenas: 18, nuevo: false, destacado: false,
      whatsapp: '18090000003',
      gradiente: 'linear-gradient(135deg,#C8DFFB,#7AAEE0)',
    },
    {
      id: '4', titulo: 'Casa Familiar', tipo: 'Casa',
      precio: 22000, ciudad: 'Santiago', distancia: '5.1 km',
      habitaciones: 4, banos: 2, emoji: '🏘️',
      comodidades: ['WiFi', 'A/C', 'Parqueo', 'Jardín'],
      valoracion: 4.6, resenas: 15, nuevo: true, destacado: false,
      whatsapp: '18090000004',
      gradiente: 'linear-gradient(135deg,#FBC8C8,#E07A7A)',
    },
    {
      id: '5', titulo: 'Estudio Moderno', tipo: 'Estudio',
      precio: 9500, ciudad: 'La Romana', distancia: '8 km',
      habitaciones: 1, banos: 1, emoji: '🏡',
      comodidades: ['WiFi', 'A/C'],
      valoracion: 4.5, resenas: 9, nuevo: false, destacado: false,
      whatsapp: '18090000005',
      gradiente: 'linear-gradient(135deg,#E8C8FB,#B07AE0)',
    },
  ];

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  function render() {
    const usuario = Auth.usuarioActual();
    const nombre  = usuario?.nombre || usuario?.displayName || 'bienvenido';

    return `
      <div class="explorar-page">

        <!-- CABECERA AZUL -->
        <div class="hero-header">
          <div class="sbar-espaciado"></div>
          <div class="exp-top-row">
            <div>
              <p class="greeting">Buenos días 👋</p>
              <p class="greeting-name">${nombre}</p>
            </div>
            <button class="notif-btn" onclick="Utils.toast('Notificaciones próximamente','info')">
              🔔
              <span class="notif-badge"></span>
            </button>
          </div>
          <!-- Barra de búsqueda -->
          <div class="search-bar">
            <span class="search-icon">🔍</span>
            <input type="text" id="input-buscar"
              placeholder="Ciudad, barrio, sector…"
              oninput="PaginaExplorar.filtrar(this.value)" />
            <button class="search-filter-btn"
              onclick="Utils.toast('Filtros próximamente','info')">🎛</button>
          </div>
          <!-- Chips de filtro -->
          <div class="chips-row" id="chips-filtro">
            <button class="chip active" onclick="PaginaExplorar.filtrarTipo('Todos',this)">Todos</button>
            <button class="chip" onclick="PaginaExplorar.filtrarTipo('Casa',this)">Casa</button>
            <button class="chip" onclick="PaginaExplorar.filtrarTipo('Apartamento',this)">Apto.</button>
            <button class="chip" onclick="PaginaExplorar.filtrarTipo('Villa',this)">Villa</button>
            <button class="chip" onclick="PaginaExplorar.filtrarTipo('Cabaña',this)">Cabaña</button>
            <button class="chip" onclick="PaginaExplorar.filtrarTipo('Estudio',this)">Estudio</button>
          </div>
        </div>

        <!-- DESTACADOS -->
        <div class="section-header">
          <h2 class="section-title">Destacados ✨</h2>
          <span class="section-link" onclick="Utils.toast('Ver todos próximamente','info')">Ver todos</span>
        </div>
        <div class="h-scroll" id="lista-destacados">
          ${PROPIEDADES_DEMO.filter(p => p.destacado || p.nuevo)
            .map(p => _tarjetaHorizontal(p)).join('')}
        </div>

        <!-- MAPA -->
        <div class="section-header">
          <h2 class="section-title">Mapa 🗺️</h2>
          <span class="section-link" onclick="Utils.toast('Mapa completo próximamente','info')">Ampliar</span>
        </div>
        <div class="map-preview" onclick="Utils.toast('Mapa interactivo próximamente','info')">
          <div class="map-grid"></div>
          <div class="map-road-h"></div>
          <div class="map-road-v"></div>
          <div class="map-pin map-pin-azul"  style="top:26px;left:55px"></div>
          <div class="map-pin map-pin-coral" style="top:54px;left:130px"></div>
          <div class="map-pin map-pin-verde" style="top:20px;right:46px"></div>
          <div class="map-label">🏠 ${PROPIEDADES_DEMO.length} propiedades encontradas</div>
        </div>

        <!-- TODAS LAS PROPIEDADES -->
        <div class="section-header">
          <h2 class="section-title">Todas las propiedades</h2>
          <span class="section-link">${PROPIEDADES_DEMO.length} disponibles</span>
        </div>
        <div class="page-body" id="lista-todas">
          ${PROPIEDADES_DEMO.map(p => _tarjetaVertical(p)).join('')}
        </div>

      </div>
    `;
  }

  /* ─────────────────────────────────────────────
     TARJETA HORIZONTAL (scroll)
  ───────────────────────────────────────────── */
  function _tarjetaHorizontal(p) {
    return `
      <div class="property-card" onclick="Router.ir('detalle',{id:'${p.id}'})">
        <div class="property-card-img" style="background:${p.gradiente}">
          ${p.emoji}
          ${p.destacado ? '<span class="badge badge-top-left badge-dest">⭐ TOP</span>' : ''}
          ${p.nuevo     ? '<span class="badge badge-top-left badge-nuevo">NUEVO</span>' : ''}
          <span class="badge-fav">🤍</span>
        </div>
        <div class="property-card-body">
          <p class="property-card-name">${p.titulo}</p>
          <p class="property-card-loc">📍 ${p.ciudad} · ${p.distancia}</p>
          <div class="property-card-footer">
            <span class="property-price">${Utils.precio(p.precio)}<small>/mes</small></span>
            <span class="property-stars">★ ${p.valoracion}</span>
          </div>
        </div>
      </div>
    `;
  }

  /* ─────────────────────────────────────────────
     TARJETA VERTICAL (lista completa)
  ───────────────────────────────────────────── */
  function _tarjetaVertical(p) {
    return `
      <div class="property-card-full" onclick="Router.ir('detalle',{id:'${p.id}'})">
        <div class="property-card-full-img" style="background:${p.gradiente}">
          ${p.emoji}
          ${p.nuevo ? '<span class="badge badge-top-left badge-nuevo">NUEVO</span>' : ''}
          <span class="badge-fav">🤍</span>
        </div>
        <div class="property-card-full-body">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
            <h3 style="font-size:var(--text-md);font-weight:700;color:var(--oscuro)">${p.titulo}</h3>
            <span class="property-stars">★ ${p.valoracion}</span>
          </div>
          <p style="font-size:var(--text-sm);color:var(--gris);margin-bottom:8px">
            📍 ${p.ciudad} · 🛏 ${p.habitaciones} hab. · 🛁 ${p.banos} baños
          </p>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span class="property-price">${Utils.precio(p.precio)}<small>/mes</small></span>
            <button class="btn btn-whatsapp btn-sm"
              onclick="event.stopPropagation();Utils.abrirWhatsapp('${p.whatsapp}',Utils.mensajeWhatsapp(${JSON.stringify(p).replace(/"/g,"'")}))">
              💬 WhatsApp
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /* ─────────────────────────────────────────────
     FILTRAR por texto
  ───────────────────────────────────────────── */
  function filtrar(texto) {
    const lista = document.getElementById('lista-todas');
    if (!lista) return;
    const filtradas = PROPIEDADES_DEMO.filter(p =>
      p.titulo.toLowerCase().includes(texto.toLowerCase()) ||
      p.ciudad.toLowerCase().includes(texto.toLowerCase())
    );
    lista.innerHTML = filtradas.length
      ? filtradas.map(p => _tarjetaVertical(p)).join('')
      : '<div class="empty-state"><span class="empty-icon">🔍</span><h3>Sin resultados</h3><p>Prueba con otra búsqueda</p></div>';
  }

  /* ─────────────────────────────────────────────
     FILTRAR por tipo
  ───────────────────────────────────────────── */
  function filtrarTipo(tipo, btn) {
    document.querySelectorAll('#chips-filtro .chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const lista = document.getElementById('lista-todas');
    const listaDest = document.getElementById('lista-destacados');
    if (!lista) return;
    const filtradas = tipo === 'Todos'
      ? PROPIEDADES_DEMO
      : PROPIEDADES_DEMO.filter(p => p.tipo === tipo);
    lista.innerHTML = filtradas.map(p => _tarjetaVertical(p)).join('');
    if (listaDest) {
      const dest = filtradas.filter(p => p.destacado || p.nuevo);
      listaDest.innerHTML = dest.length
        ? dest.map(p => _tarjetaHorizontal(p)).join('')
        : '<p style="padding:8px 20px;color:var(--gris);font-size:var(--text-sm)">Sin destacados en esta categoría</p>';
    }
  }

  /* ─────────────────────────────────────────────
     ON MOUNT
  ───────────────────────────────────────────── */
  function onMount() {
    /* Marcar Inicio como activo en la nav */
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.page === 'explorar') item.classList.add('active');
    });
  }

  return { render, onMount, filtrar, filtrarTipo };

})();
