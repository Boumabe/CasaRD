/* ═══════════════════════════════════════════════════
   CASARD — DATOS.JS
   Firebase real + Estado global + Utilidades
   Cargado primero — todo lo demás depende de esto.
════════════════════════════════════════════════════ */

/* ── FIREBASE CONFIG ── */
var firebaseConfig = {
  apiKey:            "AIzaSyDxQFV7C3O1y7vKuUyrd7jk_O1pIPUFuLk",
  authDomain:        "casard-4291b.firebaseapp.com",
  projectId:         "casard-4291b",
  storageBucket:     "casard-4291b.firebasestorage.app",
  messagingSenderId: "922772206314",
  appId:             "1:922772206314:web:bc323b24653f3ca9f41d93"
};

/* ── INICIALIZAR FIREBASE ── */
var fbApp  = firebase.initializeApp(firebaseConfig);
var db     = firebase.firestore();
var fbAuth = firebase.auth();
var store  = firebase.storage();
console.log('🔥 Firebase conectado — CasaRD');

/* ── ESTADO GLOBAL ── */
var S = {
  usuario:      null,
  paginaActual: null,
  propiedades:  [],
  cargando:     false,
};

/* Restaurar sesión guardada */
try {
  var _u = localStorage.getItem('casard_u');
  if (_u) S.usuario = JSON.parse(_u);
} catch(e) { localStorage.removeItem('casard_u'); }

/* ── PROPIEDADES DEMO (mientras no hay datos en Firebase) ── */
var PROPS_DEMO = [
  {id:'demo1',titulo:'Villa Las Palmas',tipo:'Villa',precio:25000,ciudad:'Punta Cana',sector:'La Altagracia',dist:'1.8 km',hab:3,ban:2,m2:120,emoji:'🏠',grad:'linear-gradient(135deg,#FDEBC8,#F0B86E)',top:true,nuevo:false,wa:'18090000001',val:4.9,res:34,desc:'Hermosa villa con piscina privada y vista al mar. Amueblada, todos los servicios incluidos.',comod:['📶 WiFi','❄️ A/C','🌊 Vista mar','🐾 Mascotas OK','🍳 Cocina equipada','⚡ Planta eléc.','🏊 Piscina','🔐 Seguridad 24h'],prop:'Roberto Vargas',propId:'',opiniones:[{n:'Ana López',i:'AL',c:'#1B4F8A',s:'★★★★★',t:'Excelente propiedad. ¡100% recomendada!'},{n:'Carlos Marte',i:'CM',c:'#10B981',s:'★★★★☆',t:'Muy cómoda, planta eléctrica siempre funciona.'}]},
  {id:'demo2',titulo:'Apto. Vista Mar',tipo:'Apartamento',precio:18000,ciudad:'Santo Domingo',sector:'Naco',dist:'3.2 km',hab:2,ban:1,m2:75,emoji:'🌴',grad:'linear-gradient(135deg,#C8E6D4,#7ABFA0)',top:false,nuevo:true,wa:'18090000002',val:4.8,res:21,desc:'Moderno apartamento en zona exclusiva. Cerca de todo.',comod:['📶 WiFi','❄️ A/C','🚗 Parqueo'],prop:'Luisa Castro',propId:'',opiniones:[{n:'Pedro M.',i:'PM',c:'#6B3FA0',s:'★★★★★',t:'Excelente ubicación, todo muy limpio.'}]},
  {id:'demo3',titulo:'Cabaña El Río',tipo:'Cabaña',precio:12000,ciudad:'Jarabacoa',sector:'La Confluencia',dist:'45 km',hab:2,ban:1,m2:60,emoji:'🌊',grad:'linear-gradient(135deg,#C8DFFB,#7AAEE0)',top:false,nuevo:false,wa:'18090000003',val:4.7,res:18,desc:'Cabaña rodeada de naturaleza con vista al río.',comod:['📶 WiFi','🌿 Jardín','🌊 Vista río'],prop:'Juan Díaz',propId:'',opiniones:[{n:'María G.',i:'MG',c:'#E85D3A',s:'★★★★☆',t:'Lugar espectacular y muy tranquilo.'}]},
  {id:'demo4',titulo:'Casa Familiar',tipo:'Casa',precio:22000,ciudad:'Santiago',sector:'Los Jardines',dist:'5.1 km',hab:4,ban:2,m2:140,emoji:'🏘️',grad:'linear-gradient(135deg,#FBC8C8,#E07A7A)',top:false,nuevo:true,wa:'18090000004',val:4.6,res:15,desc:'Espaciosa casa familiar con patio grande.',comod:['📶 WiFi','❄️ A/C','🚗 Parqueo','🌿 Jardín'],prop:'Ana López',propId:'',opiniones:[{n:'Carlos R.',i:'CR',c:'#1B4F8A',s:'★★★★☆',t:'Muy buena casa, propietaria muy atenta.'}]},
  {id:'demo5',titulo:'Estudio Moderno',tipo:'Estudio',precio:9500,ciudad:'La Romana',sector:'Centro',dist:'8 km',hab:1,ban:1,m2:45,emoji:'🏡',grad:'linear-gradient(135deg,#E8C8FB,#B07AE0)',top:false,nuevo:false,wa:'18090000005',val:4.5,res:9,desc:'Estudio moderno ideal para profesionales.',comod:['📶 WiFi','❄️ A/C'],prop:'Roberto V.',propId:'',opiniones:[{n:'Sara M.',i:'SM',c:'#10B981',s:'★★★★★',t:'Perfecto para una persona, muy cómodo.'}]},
];

/* ── CONVERSACIONES DEMO ── */
var CONVS = [
  {id:'c1',n:'Roberto Vargas',i:'RV',c:'linear-gradient(135deg,#1B4F8A,#2563EB)',prop:'🏠 Villa Las Palmas – Punta Cana',ult:'¡Hola! La villa está disponible desde…',h:'Ahora',nr:2,online:true},
  {id:'c2',n:'Luisa Castro',  i:'LC',c:'linear-gradient(135deg,#F5A623,#E85D3A)',prop:'🏢 Apto. Vista Mar – Sto. Domingo', ult:'Perfecto, nos vemos el viernes.',      h:'Ayer', nr:0,online:false},
  {id:'c3',n:'Pedro Mejía',   i:'PM',c:'linear-gradient(135deg,#10B981,#059669)',prop:'🏡 Casa Familiar – Santiago',        ult:'¿Incluye los servicios (luz, agua)?', h:'Lun',  nr:1,online:true},
  {id:'c4',n:'Yaritza Reyes', i:'YR',c:'linear-gradient(135deg,#9B59B6,#6C3483)',prop:'🛖 Cabaña El Río – Jarabacoa',       ult:'Gracias por la información 😊',       h:'Dom',  nr:0,online:false},
];

/* ═══════════════════════════════════════════════════
   FIREBASE — AUTENTICACIÓN
════════════════════════════════════════════════════ */

/* Escuchar cambios de sesión */
fbAuth.onAuthStateChanged(function(user) {
  if (user) {
    S.usuario = {
      uid:    user.uid,
      nombre: user.displayName || user.email.split('@')[0],
      email:  user.email,
      foto:   user.photoURL || null,
    };
    localStorage.setItem('casard_u', JSON.stringify(S.usuario));
  } else {
    S.usuario = null;
    localStorage.removeItem('casard_u');
  }
});

/* Registro con email y contraseña */
function registrarse(nombre, email, password, telefono) {
  mostrarLoader(true);
  return fbAuth.createUserWithEmailAndPassword(email, password)
    .then(function(res) {
      return res.user.updateProfile({ displayName: nombre })
        .then(function() {
          /* Guardar perfil en Firestore */
          return db.collection('usuarios').doc(res.user.uid).set({
            nombre:    nombre,
            email:     email,
            telefono:  telefono || '',
            ciudad:    '',
            creadoEn:  firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
    })
    .then(function() {
      mostrarLoader(false);
      toast('¡Cuenta creada! Bienvenido a CasaRD 🏡', 'ok');
      ir('explorar');
    })
    .catch(function(err) {
      mostrarLoader(false);
      var msg = traducirErrorAuth(err.code);
      toast(msg, 'err');
    });
}

/* Login con email y contraseña */
function loginEmail(email, password) {
  mostrarLoader(true);
  return fbAuth.signInWithEmailAndPassword(email, password)
    .then(function() {
      mostrarLoader(false);
      toast('¡Bienvenido de vuelta! 🏡', 'ok');
      ir('explorar');
    })
    .catch(function(err) {
      mostrarLoader(false);
      toast(traducirErrorAuth(err.code), 'err');
    });
}

/* Login con Google */
function loginGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  mostrarLoader(true);
  return fbAuth.signInWithPopup(provider)
    .then(function(res) {
      /* Crear perfil si es nuevo */
      return db.collection('usuarios').doc(res.user.uid).set({
        nombre:   res.user.displayName,
        email:    res.user.email,
        foto:     res.user.photoURL || '',
        creadoEn: firebase.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    })
    .then(function() {
      mostrarLoader(false);
      toast('¡Bienvenido a CasaRD! 🏡', 'ok');
      ir('explorar');
    })
    .catch(function(err) {
      mostrarLoader(false);
      toast(traducirErrorAuth(err.code), 'err');
    });
}

/* Cerrar sesión */
function salir() {
  fbAuth.signOut().then(function() {
    S.usuario = null;
    localStorage.removeItem('casard_u');
    ir('bienvenida');
  });
}

/* Traducir errores de Firebase a español */
function traducirErrorAuth(code) {
  var errores = {
    'auth/email-already-in-use':    'Este correo ya está registrado.',
    'auth/invalid-email':           'El correo no es válido.',
    'auth/weak-password':           'La contraseña debe tener al menos 6 caracteres.',
    'auth/user-not-found':          'No existe una cuenta con este correo.',
    'auth/wrong-password':          'Contraseña incorrecta.',
    'auth/too-many-requests':       'Demasiados intentos. Espera un momento.',
    'auth/network-request-failed':  'Sin conexión a internet.',
    'auth/popup-closed-by-user':    'Ventana cerrada. Intenta de nuevo.',
  };
  return errores[code] || 'Error: ' + code;
}

/* ═══════════════════════════════════════════════════
   FIREBASE — PROPIEDADES
════════════════════════════════════════════════════ */

/* Cargar propiedades desde Firestore */
function cargarPropiedades(callback) {
  db.collection('propiedades')
    .where('activo', '==', true)
    .orderBy('creadoEn', 'desc')
    .get()
    .then(function(snap) {
      var lista = [];
      snap.forEach(function(doc) {
        var d = doc.data();
        lista.push({
          id:     doc.id,
          titulo: d.titulo   || '',
          tipo:   d.tipo     || 'Casa',
          precio: d.precio   || 0,
          ciudad: d.ciudad   || '',
          sector: d.sector   || '',
          hab:    d.hab      || 1,
          ban:    d.ban      || 1,
          m2:     d.m2       || 0,
          desc:   d.desc     || '',
          comod:  d.comod    || [],
          wa:     d.telefono || '',
          foto:   d.fotos    && d.fotos[0] ? d.fotos[0] : '',
          fotos:  d.fotos    || [],
          val:    d.val      || 5.0,
          res:    d.res      || 0,
          prop:   d.propNombre || '',
          propId: d.propId   || '',
          grad:   'linear-gradient(135deg,#FDEBC8,#F0B86E)',
          emoji:  _emojiTipo(d.tipo),
          top:    d.destacado || false,
          nuevo:  _esNuevo(d.creadoEn),
          opiniones: [],
          dist:   '',
        });
      });
      /* Combinar con demo si está vacío */
      S.propiedades = lista.length > 0 ? lista : PROPS_DEMO;
      if (callback) callback(S.propiedades);
    })
    .catch(function(err) {
      console.warn('Error cargando propiedades:', err);
      S.propiedades = PROPS_DEMO;
      if (callback) callback(S.propiedades);
    });
}

/* Publicar propiedad en Firestore */
function publicarPropiedad(datos, fotos, onProgress) {
  if (!S.usuario) {
    toast('Debes iniciar sesión para publicar', 'err');
    ir('login');
    return Promise.reject('No autenticado');
  }

  mostrarLoader(true, 'Publicando anuncio…');

  /* 1 — Subir fotos a Storage */
  var subirFotos = fotos.length > 0
    ? Promise.all(fotos.map(function(foto, i) {
        var ref = store.ref('propiedades/' + S.usuario.uid + '/' + Date.now() + '_' + i);
        return ref.put(foto).then(function() {
          return ref.getDownloadURL();
        });
      }))
    : Promise.resolve([]);

  return subirFotos
    .then(function(urls) {
      /* 2 — Guardar en Firestore */
      return db.collection('propiedades').add({
        titulo:     datos.titulo,
        tipo:       datos.tipo,
        precio:     Number(datos.precio),
        ciudad:     datos.ciudad,
        sector:     datos.sector || '',
        hab:        Number(datos.hab)  || 1,
        ban:        Number(datos.ban)  || 1,
        m2:         Number(datos.m2)   || 0,
        desc:       datos.desc,
        comod:      datos.comod || [],
        telefono:   datos.telefono,
        fotos:      urls,
        propId:     S.usuario.uid,
        propNombre: S.usuario.nombre,
        propEmail:  S.usuario.email,
        activo:     true,
        destacado:  false,
        val:        5.0,
        res:        0,
        creadoEn:   firebase.firestore.FieldValue.serverTimestamp(),
      });
    })
    .then(function() {
      mostrarLoader(false);
      toast('¡Anuncio publicado exitosamente! 🏠', 'ok');
      ir('explorar');
    })
    .catch(function(err) {
      mostrarLoader(false);
      console.error('Error publicando:', err);
      toast('Error al publicar. Verifica tu conexión.', 'err');
    });
}

/* ═══════════════════════════════════════════════════
   UTILIDADES
════════════════════════════════════════════════════ */

/* Toast — notificación */
function toast(msg, tipo, ms) {
  ms = ms || 3200;
  var el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = tipo || '';
  el.style.display = 'block';
  clearTimeout(el._t);
  el._t = setTimeout(function() { el.style.display = 'none'; }, ms);
}

/* Loader global */
function mostrarLoader(visible, texto) {
  var el = document.getElementById('loader');
  if (!el) return;
  if (visible) {
    el.querySelector && (el.querySelector('.loader-txt').textContent = texto || 'Cargando…');
    el.style.display = 'flex';
  } else {
    el.style.display = 'none';
  }
}

/* Formato precio RD$ */
function precio(v) {
  return 'RD$' + Number(v).toLocaleString('es-DO');
}

/* Abrir WhatsApp */
function wa(tel, msg) {
  var num = String(tel).replace(/\D/g, '');
  if (!num) { toast('Número de WhatsApp no disponible', 'err'); return; }
  window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(msg), '_blank');
}

/* Iniciales de un nombre */
function iniciales(nombre) {
  if (!nombre) return '?';
  return nombre.split(' ').slice(0, 2).map(function(x) {
    return x[0] ? x[0].toUpperCase() : '';
  }).join('');
}

/* Guardar usuario */
function guardarUsuario(u) {
  S.usuario = u;
  try { localStorage.setItem('casard_u', JSON.stringify(u)); } catch(e) {}
}

/* Entrar en modo demo (botones bienvenida) */
function entrar() {
  ir('registro');
}

/* Seleccionar tipo en formulario */
function selTipo(btn) {
  var opts = document.querySelectorAll('.tipo-opt');
  for (var i = 0; i < opts.length; i++) opts[i].classList.remove('on');
  btn.classList.add('on');
}

/* Toggle comodidad */
function toggleComod(btn) {
  btn.classList.toggle('on');
}

/* Buscar en lista de propiedades */
function buscar(txt) {
  var el = document.getElementById('lista-v');
  if (!el) return;
  var t = txt.toLowerCase();
  var lista = S.propiedades.length > 0 ? S.propiedades : PROPS_DEMO;
  var r = lista.filter(function(p) {
    return p.titulo.toLowerCase().indexOf(t) >= 0 ||
           p.ciudad.toLowerCase().indexOf(t) >= 0 ||
           p.tipo.toLowerCase().indexOf(t)   >= 0;
  });
  el.innerHTML = r.length
    ? r.map(tarjetaV).join('')
    : '<div style="text-align:center;padding:40px 20px"><span style="font-size:2.5rem">🔍</span><p style="color:#64748B;margin-top:10px;font-size:.82rem">Sin resultados para "' + txt + '"</p></div>';
}

/* Enviar mensaje en chat */
function enviarMsg() {
  var inp = document.getElementById('cinput');
  if (!inp || !inp.value.trim()) return;
  var msgs = document.getElementById('chat-msgs');
  if (!msgs) return;
  var div = document.createElement('div');
  div.innerHTML = '<div class="bubble b-me">' + inp.value + '</div><p class="btime me">Ahora ✓</p>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  inp.value = '';
}

/* Emoji según tipo de propiedad */
function _emojiTipo(tipo) {
  var map = { Casa:'🏠', Apartamento:'🌴', Villa:'🏡', Cabaña:'🌊', Estudio:'🏘️' };
  return map[tipo] || '🏠';
}

/* Verificar si es nuevo (menos de 7 días) */
function _esNuevo(ts) {
  if (!ts) return false;
  try {
    var d = ts.toDate ? ts.toDate() : new Date(ts);
    return (Date.now() - d.getTime()) < 7 * 24 * 3600 * 1000;
  } catch(e) { return false; }
}

/* Leer fotos seleccionadas */
function leerFotos(input) {
  return Array.from(input.files || []);
}
