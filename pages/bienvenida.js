/* ═══════════════════════════════════════════════════
   CASARD — PÁGINA BIENVENIDA
   ─────────────────────────────────────────────────
   Primera pantalla que ve el usuario.
   Contiene: logo, descripción, botones de acceso.
   Para modificar el diseño: solo tocar este archivo.
════════════════════════════════════════════════════ */

const PaginaBienvenida = (() => {

  /* ─────────────────────────────────────────────
     RENDER — genera el HTML de la página
  ───────────────────────────────────────────── */
  function render() {
    return `
      <div class="bienvenida">

        <!-- Fondo con orbes de color -->
        <div class="bv-orb1"></div>
        <div class="bv-orb2"></div>

        <!-- Logo y nombre -->
        <div class="bv-logo">🏡</div>
        <h1 class="bv-titulo">CasaRD</h1>
        <p class="bv-subtitulo">🇩🇴 Alquileres en República Dominicana</p>

        <!-- Descripción -->
        <p class="bv-desc">
          Encuentra tu hogar ideal cerca de ti,<br>
          junto a la playa, en el campo o en el<br>
          corazón de la ciudad dominicana.
        </p>

        <!-- Números de confianza -->
        <div class="bv-trust">
          <div class="bv-trust-item">
            <span class="bv-trust-n">100+</span>
            <span class="bv-trust-l">Propiedades</span>
          </div>
          <div class="bv-trust-div"></div>
          <div class="bv-trust-item">
            <span class="bv-trust-n">RD$</span>
            <span class="bv-trust-l">Precios locales</span>
          </div>
          <div class="bv-trust-div"></div>
          <div class="bv-trust-item">
            <span class="bv-trust-n">💬</span>
            <span class="bv-trust-l">WhatsApp directo</span>
          </div>
        </div>

        <!-- Botones de acceso -->
        <div class="bv-acciones">
          <button class="btn btn-dorado" id="btn-registro">
            Comenzar ahora →
          </button>
          <button class="btn btn-outline bv-btn-login" id="btn-login-demo">
            Ya tengo una cuenta
          </button>
        </div>

        <!-- Legal -->
        <p class="bv-legal">
          Al continuar aceptas nuestros
          <u>Términos de uso</u> y la
          <u>Política de privacidad</u> de CasaRD
        </p>

      </div>
    `;
  }

  /* ─────────────────────────────────────────────
     ON MOUNT — lógica después del render
  ───────────────────────────────────────────── */
  function onMount() {
    /* Botón principal — ir a registro */
    const btnRegistro = document.getElementById('btn-registro');
    if (btnRegistro) {
      btnRegistro.addEventListener('click', () => {
        /* Por ahora en modo demo — entrar directamente */
        Auth.loginEmail('demo@casard.do', '123456')
          .then(() => {
            Utils.toast('¡Bienvenido a CasaRD! 🏡', 'success');
            Router.ir('explorar');
          });
      });
    }

    /* Botón login demo */
    const btnLogin = document.getElementById('btn-login-demo');
    if (btnLogin) {
      btnLogin.addEventListener('click', () => {
        Auth.loginEmail('demo@casard.do', '123456')
          .then(() => Router.ir('explorar'));
      });
    }
  }

  return { render, onMount };

})();
