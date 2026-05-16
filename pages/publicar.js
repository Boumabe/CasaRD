/* ═══════════════════════════════════════════════════
   CASARD — PÁGINA PUBLICAR
════════════════════════════════════════════════════ */
const PaginaPublicar = (() => {

  function render() {
    return `
      <div>
        <div class="dark-header">
          <div style="height:36px"></div>
          <h2>Publicar propiedad</h2>
          <p>Paso 1 de 3 · Información básica</p>
          <div class="steps-bar">
            <div class="step-bar-item active"></div>
            <div class="step-bar-item"></div>
            <div class="step-bar-item"></div>
          </div>
        </div>
        <div class="page-body">

          <!-- Aviso WhatsApp -->
          <div class="aviso aviso-wa">
            <span class="aviso-icon">💬</span>
            <div class="aviso-texto">
              <b>Tip CasaRD:</b> Los inquilinos te contactarán directamente por
              <b>WhatsApp</b>. Asegúrate de que tu número esté correcto.
            </div>
          </div>

          <!-- Tipo de propiedad -->
          <div class="form-section-title">🏠 Tipo de propiedad</div>
          <div class="tipo-grid" id="tipo-grid">
            ${['🏠 Casa','🏢 Apartamento','🏡 Villa','🛖 Cabaña','🏩 Estudio'].map((t,i) => `
              <button class="tipo-opt ${i===0?'on':''}"
                onclick="PaginaPublicar.selTipo(this)">${t}</button>
            `).join('')}
          </div>

          <!-- Formulario -->
          <div class="form-section-title">📝 Detalles</div>

          <div class="form-group">
            <label class="form-label">Título del anuncio</label>
            <input class="form-input" type="text" placeholder="Ej: Hermosa villa con piscina…" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Precio / mes (RD$)</label>
              <input class="form-input" type="number" placeholder="25000" />
            </div>
            <div class="form-group">
              <label class="form-label">Habitaciones</label>
              <input class="form-input" type="number" placeholder="3" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Ciudad / Sector</label>
            <input class="form-input" type="text" placeholder="Punta Cana, La Altagracia…" />
          </div>

          <div class="form-group">
            <label class="form-label">WhatsApp de contacto</label>
            <input class="form-input form-input-wa" type="tel"
              placeholder="+1 (809) 000-0000" />
          </div>

          <div class="form-group">
            <label class="form-label">Descripción</label>
            <textarea class="form-input form-textarea"
              placeholder="Describe tu propiedad…"></textarea>
          </div>

          <button class="btn btn-primary"
            onclick="Utils.toast('Guardado — continúa al paso 2 →','success')">
            Continuar →
          </button>
        </div>
      </div>
    `;
  }

  function selTipo(btn) {
    document.querySelectorAll('.tipo-opt').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
  }

  function onMount() {}

  return { render, onMount, selTipo };
})();
