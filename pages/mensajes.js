/* ═══════════════════════════════════════════════════
   CASARD — PÁGINA MENSAJES
════════════════════════════════════════════════════ */
const PaginaMensajes = (() => {

  const DEMO = [
    { id:'c1', nombre:'Roberto Vargas', iniciales:'RV', color:'linear-gradient(135deg,#1B4F8A,#2563EB)',
      propiedad:'🏠 Villa Las Palmas – Punta Cana', ultimo:'¡Hola! La villa está disponible desde…',
      hora:'Ahora', noLeidos:2, online:true },
    { id:'c2', nombre:'Luisa Castro', iniciales:'LC', color:'linear-gradient(135deg,#F5A623,#E85D3A)',
      propiedad:'🏢 Apto. Vista Mar – Sto. Domingo', ultimo:'Perfecto, nos vemos el viernes.',
      hora:'Ayer', noLeidos:0, online:false },
    { id:'c3', nombre:'Pedro Mejía', iniciales:'PM', color:'linear-gradient(135deg,#10B981,#059669)',
      propiedad:'🏡 Casa Familiar – Santiago', ultimo:'¿Incluye los servicios (luz, agua)?',
      hora:'Lun', noLeidos:1, online:true },
    { id:'c4', nombre:'Yaritza Reyes', iniciales:'YR', color:'linear-gradient(135deg,#9B59B6,#6C3483)',
      propiedad:'🛖 Cabaña El Río – Jarabacoa', ultimo:'Gracias por la información 😊',
      hora:'Dom', noLeidos:0, online:false },
  ];

  function render() {
    return `
      <div>
        <div class="page-header" style="background:white">
          <div style="height:8px"></div>
          <h2 class="page-title">Mensajes 💬</h2>
          <div class="search-bar" style="background:var(--fondo);border:1px solid var(--borde);margin-top:10px">
            <span>🔍</span>
            <input type="text" placeholder="Buscar conversaciones…"
              style="background:transparent;color:var(--oscuro)" />
          </div>
        </div>
        <div>
          ${DEMO.map(c => `
            <div class="conversation-item ${c.noLeidos > 0 ? 'unread' : ''}"
              onclick="Router.ir('chat',{id:'${c.id}',nombre:'${c.nombre}'})">
              <div class="avatar avatar-md ${c.online ? 'avatar-online' : ''}"
                style="background:${c.color}">${c.iniciales}</div>
              <div class="conv-body">
                <div class="conv-top">
                  <span class="conv-name">${c.nombre}</span>
                  <span class="conv-time">${c.hora}</span>
                </div>
                <p class="conv-prop">${c.propiedad}</p>
                <p class="conv-last ${c.noLeidos > 0 ? 'bold' : ''}">${c.ultimo}</p>
              </div>
              ${c.noLeidos > 0 ? `<div class="unread-badge">${c.noLeidos}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function onMount() {}
  return { render, onMount };
})();
