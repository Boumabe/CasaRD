/* ═══════════════════════════════════════════════════
   CASARD — PÁGINA DETALLE
   Muestra toda la información de una propiedad.
   Botón WhatsApp directo al propietario.
════════════════════════════════════════════════════ */

const PaginaDetalle = (() => {

  /* Datos demo — se reemplazará con Firebase */
  const DEMO = {
    id: '1', titulo: 'Villa Las Palmas', tipo: 'Villa',
    precio: 25000, ciudad: 'Punta Cana', sector: 'La Altagracia',
    distancia: '1.8 km', metros: 120,
    habitaciones: 3, banos: 2, emoji: '🏠',
    descripcion: 'Hermosa villa con piscina privada y vista al mar, ubicada en exclusivo complejo. Ideal para familias. Amueblada con todos los servicios incluidos. Disponible desde febrero 2025.',
    comodidades: ['📶 WiFi incluido','❄️ Aire acondicionado','🌊 Vista al mar','🐾 Mascotas OK','🍳 Cocina equipada','⚡ Planta eléctrica','🏊 Piscina privada','🔐 Seguridad 24h'],
    valoracion: 4.9, resenas: 34,
    propietario: { nombre: 'Roberto Vargas', verificado: true, respuesta: 'Responde en menos de 1h' },
    whatsapp: '18090000001',
    gradiente: 'linear-gradient(135deg,#FDEBC8,#F0B86E)',
    opiniones: [
      { nombre: 'Ana López',    iniciales: 'AL', color: '#1B4F8A', stars: '★★★★★', texto: 'Excelente propiedad, muy limpia y bien ubicada. ¡100% recomendada!' },
      { nombre: 'Carlos Marte', iniciales: 'CM', color: '#10B981', stars: '★★★★☆', texto: 'Muy cómoda, planta eléctrica siempre funcionando. La vista al mar es increíble.' },
    ],
  };

  function render(params = {}) {
    const p = DEMO; /* En el futuro: buscar por params.id en Firebase */

    return `
      <div class="detalle-page">

        <!-- IMAGEN HERO -->
        <div class="det-img" style="background:${p.gradiente}">
          <span style="font-size:5rem">${p.emoji}</span>
          <button class="det-back btn-dark-sm"
            onclick="history.back()">← Volver</button>
          <button class="det-fav" onclick="Utils.toast('Guardado en favoritos ❤️','success')">❤️</button>
          <div class="det-dots">
            <div class="ddot on"></div>
            <div class="ddot"></div>
            <div class="ddot"></div>
          </div>
        </div>

        <!-- CUERPO -->
        <div class="det-body">

          <!-- Tags de características -->
          <div class="det-tags">
            <span class="tag-feature">🛏 ${p.habitaciones} hab.</span>
            <span class="tag-feature">🛁 ${p.banos} baños</span>
            <span class="tag-feature">📐 ${p.metros}m²</span>
            <span class="tag-feature">🚗 Parqueo</span>
          </div>

          <!-- Título y ubicación -->
          <h1 class="det-titulo">${p.titulo}</h1>
          <p class="det-loc">📍 ${p.ciudad}, ${p.sector} · ${p.distancia} de ti</p>

          <!-- Precio + valoración -->
          <div class="det-precio-row">
            <div>
              <span class="det-precio">${Utils.precio(p.precio)}</span>
              <span style="font-size:var(--text-sm);color:var(--gris)">/mes</span>
            </div>
            <div class="det-rating">
              ${Utils.estrellasHTML(p.valoracion)}
              <span style="color:var(--gris);font-size:var(--text-xs)">(${p.resenas})</span>
            </div>
          </div>

          <!-- BOTÓN WHATSAPP — el más importante -->
          <button class="btn btn-whatsapp"
            onclick="Utils.abrirWhatsapp('${p.whatsapp}', Utils.mensajeWhatsapp({titulo:'${p.titulo}',precio:${p.precio},ciudad:'${p.ciudad}'}))">
            💬 Contactar por WhatsApp
          </button>

          <!-- Botón solicitar visita -->
          <button class="btn btn-primary" style="margin-top:10px"
            onclick="Utils.toast('Visita solicitada — el propietario te contactará 📅','success')">
            📅 Solicitar visita
          </button>

          <!-- Comodidades -->
          <h3 class="det-section-titulo">Comodidades</h3>
          <div class="amenidades">
            ${p.comodidades.map(c => `<div class="amen">${c}</div>`).join('')}
          </div>

          <!-- Descripción -->
          <h3 class="det-section-titulo">Descripción</h3>
          <p class="det-descripcion">${p.descripcion}</p>

          <!-- Propietario -->
          <h3 class="det-section-titulo">Propietario</h3>
          <div class="owner-card">
            <div class="avatar avatar-md avatar-verified"
              style="background:linear-gradient(135deg,var(--azul),var(--dorado))">
              ${Utils.iniciales(p.propietario.nombre)}
            </div>
            <div class="owner-info">
              <p class="owner-name">${p.propietario.nombre}</p>
              <p class="owner-role">${p.propietario.verificado ? '✓ Propietario verificado' : 'Propietario'}</p>
              <p class="owner-resp">${p.propietario.respuesta}</p>
            </div>
            <button class="btn-dark-sm"
              onclick="Router.ir('chat',{propietario:'${p.propietario.nombre}'})">
              Chat
            </button>
          </div>

          <!-- Reseñas -->
          <h3 class="det-section-titulo">Reseñas recientes</h3>
          ${p.opiniones.map(o => `
            <div class="resena-card">
              <div class="resena-head">
                <div class="avatar avatar-sm" style="background:${o.color}">${o.iniciales}</div>
                <span class="resena-nombre">${o.nombre}</span>
                <span class="resena-stars">${o.stars}</span>
              </div>
              <p class="resena-texto">${o.texto}</p>
            </div>
          `).join('')}

        </div>

      </div>
    `;
  }

  function onMount() {}

  return { render, onMount };

})();
