/* ═══════════════════════════════════════════════════
   CASARD — PÁGINA PERFIL
════════════════════════════════════════════════════ */
const PaginaPerfil = (() => {

  function render() {
    const u = Auth.usuarioActual();
    const nombre = u?.nombre || u?.displayName || 'Usuario CasaRD';
    const email  = u?.email  || 'usuario@casard.do';

    return `
      <div>
        <!-- Hero oscuro -->
        <div class="dark-header" style="text-align:center;padding-bottom:26px">
          <div style="height:36px"></div>
          <div style="position:relative;display:inline-block;margin-bottom:12px">
            <div class="avatar avatar-lg avatar-verified"
              style="background:linear-gradient(135deg,var(--dorado),var(--coral));margin:0 auto">
              ${Utils.iniciales(nombre)}
            </div>
          </div>
          <h2 style="font-family:var(--font-titulo);color:white;font-size:var(--text-xl);font-weight:700">${nombre}</h2>
          <p style="color:rgba(255,255,255,0.4);font-size:var(--text-xs);margin:4px 0 14px">📍 Santo Domingo, RD · Miembro desde 2024</p>
          <div style="display:flex;border-top:1px solid rgba(255,255,255,0.07);padding-top:14px">
            ${[['4','Anuncios'],['34','Reseñas'],['4.9','Calificación']].map((s,i,a) => `
              <div style="flex:1;text-align:center">
                <span style="font-family:var(--font-titulo);color:white;font-size:1.2rem;font-weight:700;display:block">${s[0]}</span>
                <span style="color:rgba(255,255,255,0.35);font-size:0.6rem">${s[1]}</span>
              </div>
              ${i < a.length-1 ? '<div style="width:1px;background:rgba(255,255,255,0.07)"></div>' : ''}
            `).join('')}
          </div>
        </div>

        <div class="page-body">
          <!-- Mis propiedades -->
          <p class="perf-sec-titulo">MIS PROPIEDADES</p>
          <div class="pmenu">
            ${[
              ['🏠','#EBF3FF','Mis anuncios','4 propiedades activas','4'],
              ['❤️','#FFF0EB','Favoritos','18 propiedades guardadas',''],
              ['📅','#EBFFF3','Mis reservas','2 reservas activas','2'],
            ].map(([ic,bg,t,s,badge]) => `
              <div class="pitem" onclick="Utils.toast('${t} — próximamente','info')">
                <div class="pitem-ic" style="background:${bg}">${ic}</div>
                <div class="pitem-txt">
                  <p class="pitem-main">${t}</p>
                  <p class="pitem-sub">${s}</p>
                </div>
                ${badge ? `<span class="pbadge">${badge}</span>` : ''}
                <span class="pitem-arr">›</span>
              </div>
            `).join('')}
          </div>

          <!-- Cuenta -->
          <p class="perf-sec-titulo" style="margin-top:16px">CUENTA</p>
          <div class="pmenu">
            ${[
              ['💬','rgba(37,211,102,0.12)','WhatsApp vinculado','+1 (809) 000-0000'],
              ['🔔','#FFF8EB','Notificaciones','Gestionar alertas'],
              ['⚙️','#F5EBFF','Configuración','Idioma, moneda RD$'],
            ].map(([ic,bg,t,s]) => `
              <div class="pitem" onclick="Utils.toast('${t} — próximamente','info')">
                <div class="pitem-ic" style="background:${bg}">${ic}</div>
                <div class="pitem-txt">
                  <p class="pitem-main">${t}</p>
                  <p class="pitem-sub">${s}</p>
                </div>
                <span class="pitem-arr">›</span>
              </div>
            `).join('')}
            <div class="pitem" onclick="Auth.cerrarSesion()">
              <div class="pitem-ic" style="background:#FFEBEB">🚪</div>
              <div class="pitem-txt">
                <p class="pitem-main" style="color:#C0392B">Cerrar sesión</p>
                <p class="pitem-sub">Terminar sesión actual</p>
              </div>
              <span class="pitem-arr">›</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function onMount() {}
  return { render, onMount };
})();
