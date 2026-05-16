/* ═══════════════════════════════════════════════════
   CASARD — APP.JS (Punto de entrada principal)
   ─────────────────────────────────────────────────
   Este archivo arranca toda la aplicación.
   Se ejecuta último, después de todos los demás.

   ⚠️  REGLA: No añadir lógica de páginas aquí.
   Solo inicialización y configuración global.
════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  console.log('🏡 CasaRD PWA iniciando…');

  /* ── 1. INICIALIZAR NAVEGACIÓN ── */
  Router.inicializarNav();

  /* ── 2. VERIFICAR SESIÓN Y DECIDIR PÁGINA INICIAL ── */
  Auth.verificarSesion((usuario) => {
    if (usuario) {
      /* Usuario logueado → ir a Explorar */
      console.log(`✅ Sesión activa: ${usuario.email}`);
      Router.ir('explorar');
    } else {
      /* Sin sesión → ir a Bienvenida */
      console.log('👋 Sin sesión — mostrando bienvenida');
      Router.ir('bienvenida');
    }
  });

  /* ── 3. BOTÓN ATRÁS DEL NAVEGADOR ── */
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.pagina) {
      Router.ir(e.state.pagina, e.state.params || {});
    }
  });

  /* ── 4. PREVENIR SCROLL REBOTE en iOS ── */
  document.body.addEventListener('touchmove', (e) => {
    if (e.target.closest('.scroll-container')) return;
  }, { passive: false });

  console.log('✅ CasaRD lista');
});
