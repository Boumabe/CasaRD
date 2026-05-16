/* ═══════════════════════════════════════════════════
   CASARD — AUTH (Autenticación)
   ─────────────────────────────────────────────────
   Maneja login, registro y sesión del usuario.
   Funciona en MODO DEMO si Firebase no está listo.
════════════════════════════════════════════════════ */

const Auth = (() => {

  /* ── USUARIO EN SESIÓN (demo mode) ── */
  let _usuarioDemo = null;

  /* ─────────────────────────────────────────────
     VERIFICAR SESIÓN al arrancar la app
     Callback recibe el usuario o null
  ───────────────────────────────────────────── */
  function verificarSesion(callback) {
    /* Si Firebase está listo, usar sesión real */
    if (typeof firebase !== 'undefined' && auth) {
      auth.onAuthStateChanged(usuario => callback(usuario));
      return;
    }

    /* Modo demo — simular usuario logueado */
    const usuarioGuardado = localStorage.getItem('casard_usuario_demo');
    if (usuarioGuardado) {
      _usuarioDemo = JSON.parse(usuarioGuardado);
      callback(_usuarioDemo);
    } else {
      callback(null);
    }
  }

  /* ─────────────────────────────────────────────
     OBTENER USUARIO ACTUAL
  ───────────────────────────────────────────── */
  function usuarioActual() {
    if (typeof firebase !== 'undefined' && auth) {
      return auth.currentUser;
    }
    return _usuarioDemo;
  }

  /* ─────────────────────────────────────────────
     LOGIN CON GOOGLE
  ───────────────────────────────────────────── */
  async function loginGoogle() {
    if (typeof firebase !== 'undefined' && auth) {
      const provider = new firebase.auth.GoogleAuthProvider();
      return auth.signInWithPopup(provider);
    }
    /* Modo demo */
    return _loginDemo('Usuario Demo', 'demo@casard.do');
  }

  /* ─────────────────────────────────────────────
     LOGIN CON EMAIL Y CONTRASEÑA
  ───────────────────────────────────────────── */
  async function loginEmail(email, password) {
    if (typeof firebase !== 'undefined' && auth) {
      return auth.signInWithEmailAndPassword(email, password);
    }
    return _loginDemo('Usuario Demo', email);
  }

  /* ─────────────────────────────────────────────
     REGISTRO CON EMAIL
  ───────────────────────────────────────────── */
  async function registro(nombre, email, password) {
    if (typeof firebase !== 'undefined' && auth) {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      await res.user.updateProfile({ displayName: nombre });
      return res;
    }
    return _loginDemo(nombre, email);
  }

  /* ─────────────────────────────────────────────
     CERRAR SESIÓN
  ───────────────────────────────────────────── */
  async function cerrarSesion() {
    if (typeof firebase !== 'undefined' && auth) {
      return auth.signOut();
    }
    localStorage.removeItem('casard_usuario_demo');
    _usuarioDemo = null;
    Router.ir('bienvenida');
  }

  /* ─────────────────────────────────────────────
     MODO DEMO — login sin Firebase
  ───────────────────────────────────────────── */
  function _loginDemo(nombre, email) {
    _usuarioDemo = { nombre, email, uid: 'demo-uid-001', demo: true };
    localStorage.setItem('casard_usuario_demo', JSON.stringify(_usuarioDemo));
    return Promise.resolve({ user: _usuarioDemo });
  }

  return { verificarSesion, usuarioActual, loginGoogle, loginEmail, registro, cerrarSesion };

})();
