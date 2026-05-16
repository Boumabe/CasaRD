/* ═══════════════════════════════════════════════════
   CASARD — FIREBASE (Base de datos)
   ─────────────────────────────────────────────────
   ⚠️  IMPORTANTE:
   Cuando tengas tu proyecto Firebase listo,
   reemplaza los valores de firebaseConfig
   con los TUS propios desde:
   console.firebase.google.com → Configuración del proyecto
════════════════════════════════════════════════════ */

/* ── CONFIGURACIÓN FIREBASE ── */
const firebaseConfig = {
  apiKey:            "TU_API_KEY",
  authDomain:        "casard.firebaseapp.com",
  projectId:         "casard",
  storageBucket:     "casard.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId:             "TU_APP_ID"
};

/* ── INICIALIZAR FIREBASE ── */
let db, auth, storage;

try {
  firebase.initializeApp(firebaseConfig);
  db      = firebase.firestore();
  auth    = firebase.auth();
  storage = firebase.storage();
  console.log('🔥 Firebase conectado');
} catch (e) {
  console.warn('⚠️ Firebase no configurado aún — usando modo demo');
}

/* ── COLECCIONES ── */
/* Uso: FirebaseDB.propiedades, FirebaseDB.usuarios, etc. */
const FirebaseDB = {
  get propiedades()   { return db ? db.collection('propiedades')   : null; },
  get usuarios()      { return db ? db.collection('usuarios')       : null; },
  get conversaciones(){ return db ? db.collection('conversaciones') : null; },
};
