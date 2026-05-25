/* ═══════════════════════════════════════════════════
   CASARD PRIME — DATOS.JS
   Configuración, estado, demo local y utilidades.
   Adaptado al mercado dominicano.
════════════════════════════════════════════════════ */

/* ── FIREBASE INIT ── */
var firebaseConfig = {
  apiKey:            "AIzaSyDxQFV7C3O1y7vKuUyrd7jk_O1pIPUFuLk",
  authDomain:        "casard-4291b.firebaseapp.com",
  projectId:         "casard-4291b",
  storageBucket:     "casard-4291b.appspot.com",
  messagingSenderId: "922772206314",
  appId:             "1:922772206314:web:bc323b24653f3ca9f41d93"
};

var fbApp  = firebase.initializeApp(firebaseConfig);
var db     = firebase.firestore();
var fbAuth = firebase.auth();
var store  = firebase.storage();
console.log('🔥 CasaRD Prime listo');

var BRAND = {
  name: 'CasaRD Prime',
  short: 'CasaRD',
  country: 'República Dominicana',
  currency: 'RD$',
  whatsappCode: '+1'
};

/* ── ESTADO GLOBAL ── */
var S = {
  usuario: null,
  pagina: null,
  propiedades: [],
  filtros: {
    tipo: 'Todos'
  }
};

try {
  var _u = localStorage.getItem('casard_u');
  if (_u) S.usuario = JSON.parse(_u);
} catch(e) {
  localStorage.removeItem('casard_u');
}

/* ── DATOS DEMO — ENFOQUE DOMINICANO ── */
var PROPS_DEMO = [
  {
    id:'rd1',
    titulo:'Torre Naco Executive',
    tipo:'Apartamento',
    precio:68000,
    ciudad:'Santo Domingo',
    sector:'Naco',
    dist:'Distrito Nacional',
    hab:2,
    ban:2,
    m2:118,
    emoji:'🏢',
    grad:'linear-gradient(135deg,#DCEBFF,#8FB9FF)',
    top:true,
    nuevo:true,
    wa:'18095550101',
    val:4.9,
    res:47,
    foto:'',
    desc:'Apartamento ejecutivo amueblado en torre con lobby, planta full, dos parqueos y excelente conectividad hacia Piantini, Evaristo Morales y la Churchill. Ideal para profesionales, parejas o clientes corporativos.',
    comod:['🛋️ Amueblado','❄️ A/C inverter','⚡ Planta full','🚗 2 parqueos','🛗 Ascensor','🛡️ Seguridad 24h','🏋️ Gimnasio','🧺 Línea blanca'],
    incluye:['Mantenimiento','Gas común','Acceso controlado'],
    prop:'María Fernanda Gómez',
    tiempoResp:'35 min',
    opiniones:[
      {n:'Daniela Cruz',i:'DC',c:'#1B4F8A',s:'★★★★★',t:'La ubicación es excelente y el proceso fue muy profesional.'},
      {n:'Luis Batista',i:'LB',c:'#10B981',s:'★★★★★',t:'Edificio seguro y exactamente como en las fotos.'}
    ]
  },
  {
    id:'rd2',
    titulo:'Villa Cocotal Golf & Family',
    tipo:'Villa',
    precio:145000,
    ciudad:'Punta Cana',
    sector:'Cocotal, Bávaro',
    dist:'12 min de Downtown',
    hab:4,
    ban:4.5,
    m2:320,
    emoji:'🏡',
    grad:'linear-gradient(135deg,#FDEBC8,#F0B86E)',
    top:true,
    nuevo:false,
    wa:'18095550102',
    val:4.8,
    res:31,
    foto:'',
    desc:'Villa de alto nivel con patio, piscina privada y terraza social. Pensada para estancias familiares, relocalización o renta premium en una de las zonas de mayor demanda de Punta Cana.',
    comod:['🏊 Piscina privada','🌴 Patio','🛏️ Walk-in closet','🍽️ Cocina caliente y fría','🧰 Área de servicio','🚗 Marquesina doble','🛡️ Residencial cerrado','🐾 Mascotas OK'],
    incluye:['Jardinería','Mantenimiento de piscina'],
    prop:'Carlos Andrés Tejada',
    tiempoResp:'50 min',
    opiniones:[
      {n:'Paola Reyes',i:'PR',c:'#E85D3A',s:'★★★★★',t:'Perfecta para familia, muy buena administración.'}
    ]
  },
  {
    id:'rd3',
    titulo:'Residencia Los Jardines Metropolitanos',
    tipo:'Casa',
    precio:52000,
    ciudad:'Santiago',
    sector:'Los Jardines Metropolitanos',
    dist:'8 min del HOMS',
    hab:3,
    ban:2.5,
    m2:185,
    emoji:'🏠',
    grad:'linear-gradient(135deg,#C8E6D4,#7ABFA0)',
    top:false,
    nuevo:true,
    wa:'18095550103',
    val:4.7,
    res:19,
    foto:'',
    desc:'Casa familiar en una zona consolidada de Santiago, con patio, marquesina y espacios ventilados. Muy conveniente para familias que buscan cercanía a colegios, clínicas y vías principales.',
    comod:['🚗 Marquesina','🌿 Patio','🧺 Área de lavado','🚪 Portón eléctrico','❄️ Preinstalación A/C','💧 Cisterna','🛡️ Hierros de seguridad'],
    incluye:['Mantenimiento de portón'],
    prop:'Rosa Elvira Peña',
    tiempoResp:'1 h',
    opiniones:[
      {n:'Miguel Durán',i:'MD',c:'#6B3FA0',s:'★★★★☆',t:'Sector tranquilo y dueño muy atento.'}
    ]
  },
  {
    id:'rd4',
    titulo:'Loft Colonial Signature',
    tipo:'Estudio',
    precio:36000,
    ciudad:'Santo Domingo',
    sector:'Zona Colonial',
    dist:'A pasos de El Conde',
    hab:1,
    ban:1,
    m2:54,
    emoji:'🏛️',
    grad:'linear-gradient(135deg,#F6D6C6,#E89A73)',
    top:false,
    nuevo:false,
    wa:'18095550104',
    val:4.8,
    res:26,
    foto:'',
    desc:'Loft amueblado con estilo contemporáneo y detalles coloniales. Excelente opción para nómadas digitales, ejecutivos o estadías de media duración en el centro histórico.',
    comod:['🛋️ Amueblado','📶 WiFi rápido','❄️ A/C inverter','🍳 Cocina equipada','🧾 Factura disponible','🚶 Zona caminable'],
    incluye:['Internet','Mantenimiento'],
    prop:'José Manuel Henríquez',
    tiempoResp:'25 min',
    opiniones:[
      {n:'Andrea Martínez',i:'AM',c:'#1B4F8A',s:'★★★★★',t:'Muy bonito, limpio y bien manejado.'}
    ]
  },
  {
    id:'rd5',
    titulo:'Chalet Vista Yaque',
    tipo:'Cabaña',
    precio:42000,
    ciudad:'Jarabacoa',
    sector:'Manabao',
    dist:'18 min del centro',
    hab:2,
    ban:2,
    m2:96,
    emoji:'🛖',
    grad:'linear-gradient(135deg,#D9F0E6,#7FC6A2)',
    top:false,
    nuevo:false,
    wa:'18095550105',
    val:4.9,
    res:22,
    foto:'',
    desc:'Cabaña de montaña con vista abierta, chimenea y terraza. Orientada a renta de descanso premium en uno de los destinos de mayor atractivo interno en República Dominicana.',
    comod:['🔥 Chimenea','🌄 Vista de montaña','🌿 Terraza','🍖 BBQ','📶 WiFi','🚗 Parqueo','🐾 Mascotas OK'],
    incluye:['Mantenimiento del jardín'],
    prop:'Patricia Núñez',
    tiempoResp:'40 min',
    opiniones:[
      {n:'Sofía Polanco',i:'SP',c:'#10B981',s:'★★★★★',t:'Ideal para escapadas; la vista es increíble.'}
    ]
  },
  {
    id:'rd6',
    titulo:'Suite Marina Romana',
    tipo:'Apartamento',
    precio:47000,
    ciudad:'La Romana',
    sector:'Cumayasa / Vista Catalina',
    dist:'10 min de la autopista',
    hab:2,
    ban:2,
    m2:88,
    emoji:'🌊',
    grad:'linear-gradient(135deg,#C8DFFB,#7AAEE0)',
    top:true,
    nuevo:true,
    wa:'18095550106',
    val:4.6,
    res:14,
    foto:'',
    desc:'Apartamento funcional y bien presentado, con perfil ideal para ejecutivos de zona Este o clientes que valoran conectividad entre La Romana, Bayahíbe y Punta Cana.',
    comod:['🛋️ Semi amueblado','🚗 1 parqueo','🛡️ Seguridad','🧺 Área de lavado','🏢 Área social'],
    incluye:['Cuota de condominio'],
    prop:'Enmanuel Cedeño',
    tiempoResp:'55 min',
    opiniones:[
      {n:'Rafael Ortiz',i:'RO',c:'#E85D3A',s:'★★★★☆',t:'Buena relación precio-ubicación.'}
    ]
  }
];

var CONVS = [
  {id:'c1',n:'María Fernanda Gómez',i:'MG',c:'linear-gradient(135deg,#1B4F8A,#2563EB)',prop:'🏢 Torre Naco Executive · Santo Domingo',ult:'Te puedo enviar video y condiciones de alquiler.',h:'Ahora',nr:2,online:true},
  {id:'c2',n:'Carlos Andrés Tejada',i:'CT',c:'linear-gradient(135deg,#F5A623,#E85D3A)',prop:'🏡 Villa Cocotal Golf & Family · Punta Cana',ult:'La villa incluye mantenimiento de piscina.',h:'Hoy',nr:0,online:true},
  {id:'c3',n:'Rosa Elvira Peña',i:'RP',c:'linear-gradient(135deg,#10B981,#059669)',prop:'🏠 Residencia Los Jardines · Santiago',ult:'Sí, aceptamos visita este sábado.',h:'Ayer',nr:1,online:false},
  {id:'c4',n:'Patricia Núñez',i:'PN',c:'linear-gradient(135deg,#6B7280,#111827)',prop:'🛖 Chalet Vista Yaque · Jarabacoa',ult:'Te comparto ubicación y reglas de estadía.',h:'Dom',nr:0,online:false}
];

/* ══════════════════════════════
   FIREBASE — AUTH
══════════════════════════════ */
function registrarse(nombre, email, password, telefono) {
  loader(true, 'Creando tu cuenta…');
  fbAuth.createUserWithEmailAndPassword(email, password)
    .then(function(res) {
      return res.user.updateProfile({ displayName: nombre })
        .then(function() {
          return db.collection('usuarios').doc(res.user.uid).set({
            nombre: nombre,
            email: email,
            telefono: normalizarTelefonoDO(telefono || ''),
            pais: 'República Dominicana',
            creadoEn: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        });
    })
    .then(function() {
      loader(false);
      toast('¡Cuenta creada! Bienvenido a CasaRD Prime.', 'ok');
    })
    .catch(function(err) {
      loader(false);
      toast(errAuth(err.code), 'err');
    });
}

function loginEmail(email, password) {
  loader(true, 'Iniciando sesión…');
  fbAuth.signInWithEmailAndPassword(email, password)
    .catch(function(err) {
      loader(false);
      toast(errAuth(err.code), 'err');
    });
}

function loginGoogle() {
  loader(true, 'Conectando con Google…');
  var prov = new firebase.auth.GoogleAuthProvider();
  fbAuth.signInWithPopup(prov)
    .then(function(res) {
      return db.collection('usuarios').doc(res.user.uid).set({
        nombre: res.user.displayName,
        email: res.user.email,
        foto: res.user.photoURL || '',
        pais: 'República Dominicana',
        creadoEn: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    })
    .catch(function(err) {
      loader(false);
      toast(errAuth(err.code), 'err');
    });
}

function salir() {
  fbAuth.signOut().then(function() {
    S.usuario = null;
    localStorage.removeItem('casard_u');
    ir('bienvenida');
  });
}

function errAuth(code) {
  var e = {
    'auth/email-already-in-use':   'Este correo ya está registrado.',
    'auth/invalid-email':          'El correo no es válido.',
    'auth/weak-password':          'La contraseña debe tener al menos 6 caracteres.',
    'auth/user-not-found':         'No existe una cuenta con este correo.',
    'auth/wrong-password':         'Contraseña incorrecta.',
    'auth/too-many-requests':      'Demasiados intentos. Espera un momento.',
    'auth/network-request-failed': 'Sin conexión a internet.',
    'auth/popup-closed-by-user':   'Ventana cerrada. Intenta de nuevo.',
    'auth/invalid-credential':     'Correo o contraseña incorrectos.'
  };
  return e[code] || 'Error al autenticar. Intenta de nuevo.';
}

/* ══════════════════════════════
   FIREBASE — PROPIEDADES
══════════════════════════════ */
function cargarPropiedades(cb) {
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
          titulo: d.titulo || '',
          tipo:   d.tipo || 'Casa',
          precio: d.precio || 0,
          ciudad: d.ciudad || '',
          sector: d.sector || '',
          hab:    d.hab || 1,
          ban:    d.ban || 1,
          m2:     d.m2 || 0,
          desc:   d.desc || '',
          comod:  d.comod || [],
          incluye:d.incluye || [],
          wa:     d.telefono || '',
          foto:   (d.fotos && d.fotos[0]) ? d.fotos[0] : '',
          fotos:  d.fotos || [],
          val:    d.val || 5.0,
          res:    d.res || 0,
          prop:   d.propNombre || '',
          propId: d.propId || '',
          grad:   gradTipo(d.tipo),
          emoji:  emojiTipo(d.tipo),
          top:    d.destacado || false,
          nuevo:  esNuevo(d.creadoEn),
          dist:   d.dist || '',
          tiempoResp: d.tiempoResp || '1 h',
          opiniones: d.opiniones || []
        });
      });
      S.propiedades = lista.length ? lista : PROPS_DEMO;
      if (cb) cb(S.propiedades);
    })
    .catch(function() {
      S.propiedades = PROPS_DEMO;
      if (cb) cb(S.propiedades);
    });
}

function publicarPropiedad(datos, fotos) {
  if (!S.usuario) { toast('Inicia sesión para publicar.', 'err'); ir('login'); return; }
  loader(true, 'Publicando anuncio…');

  var subirFotos = fotos.length > 0
    ? Promise.all(fotos.slice(0, 5).map(function(f, i) {
        var ref = store.ref('props/' + S.usuario.uid + '/' + Date.now() + '_' + i);
        return ref.put(f).then(function() { return ref.getDownloadURL(); });
      }))
    : Promise.resolve([]);

  subirFotos
    .then(function(urls) {
      return db.collection('propiedades').add({
        titulo:      datos.titulo,
        tipo:        datos.tipo,
        precio:      Number(datos.precio),
        ciudad:      datos.ciudad,
        sector:      datos.sector || '',
        hab:         Number(datos.hab) || 1,
        ban:         Number(datos.ban) || 1,
        m2:          Number(datos.m2) || 0,
        desc:        datos.desc,
        comod:       datos.comod || [],
        incluye:     datos.incluye || [],
        telefono:    normalizarTelefonoDO(datos.telefono),
        fotos:       urls,
        propId:      S.usuario.uid,
        propNombre:  S.usuario.nombre,
        propEmail:   S.usuario.email,
        activo:      true,
        destacado:   false,
        val:         5.0,
        res:         0,
        tiempoResp:  '1 h',
        creadoEn:    firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(function() {
      loader(false);
      toast('Anuncio publicado con éxito.', 'ok');
      S.propiedades = [];
      ir('explorar');
    })
    .catch(function(err) {
      loader(false);
      console.error(err);
      toast('Error al publicar. Verifica tu conexión.', 'err');
    });
}

/* ══════════════════════════════
   UTILIDADES
══════════════════════════════ */
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

function loader(on, txt) {
  var el = document.getElementById('loader');
  if (!el) return;
  if (on) {
    var t = el.querySelector('.loader-txt');
    if (t) t.textContent = txt || 'Cargando…';
    el.style.display = 'flex';
  } else {
    el.style.display = 'none';
  }
}

function precio(v) {
  return 'RD$' + Number(v || 0).toLocaleString('es-DO');
}

function plural(n, singular, pluralTxt) {
  return Number(n) === 1 ? singular : pluralTxt;
}

function mensajeContacto(p) {
  return 'Hola, vi ' + p.titulo + ' en CasaRD Prime por ' + precio(p.precio) + ' al mes en ' + p.ciudad + '. ¿Sigue disponible y cuáles son las condiciones de entrada?';
}

function normalizarTelefonoDO(tel) {
  var num = String(tel || '').replace(/\D/g, '');
  if (!num) return '';
  if (num.length === 10) return '1' + num;
  if (num.length === 11 && num.charAt(0) === '1') return num;
  return num;
}

function telefonoBonito(tel) {
  var num = normalizarTelefonoDO(tel);
  if (num.length === 11) {
    return '+1 (' + num.slice(1,4) + ') ' + num.slice(4,7) + '-' + num.slice(7,11);
  }
  return tel || '';
}

function validarTelefonoDO(tel) {
  var num = normalizarTelefonoDO(tel);
  return /^1(809|829|849)\d{7}$/.test(num);
}

function wa(tel, msg) {
  var num = normalizarTelefonoDO(tel);
  if (!num) { toast('Número de WhatsApp no disponible.', 'err'); return; }
  window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(msg), '_blank');
}

function iniciales(n) {
  return (n || '?').split(' ').slice(0, 2).map(function(x) {
    return x[0] ? x[0].toUpperCase() : '';
  }).join('');
}

function resumenMercado() {
  var lista = S.propiedades.length ? S.propiedades : PROPS_DEMO;
  var ciudades = {};
  lista.forEach(function(p) { ciudades[p.ciudad] = true; });
  var promedio = lista.length
    ? Math.round(lista.reduce(function(acc, p) { return acc + Number(p.precio || 0); }, 0) / lista.length)
    : 0;
  return {
    total: lista.length,
    ciudades: Object.keys(ciudades).length,
    promedio: promedio,
    destacados: lista.filter(function(p) { return p.top || p.nuevo; }).length
  };
}

function selTipo(btn) {
  document.querySelectorAll('.tipo-opt').forEach(function(b) { b.classList.remove('on'); });
  btn.classList.add('on');
}

function toggleComod(btn) {
  btn.classList.toggle('on');
  var box = btn.querySelector('.cbox');
  if (box) {
    if (btn.classList.contains('on')) {
      box.className = 'cbox on';
      box.textContent = '✓';
    } else {
      box.className = 'cbox off';
      box.textContent = '';
    }
  }
}

function previsualizarFotos(input) {
  var prev = document.getElementById('fotos-prev');
  if (!prev) return;
  prev.innerHTML = '';
  Array.from(input.files || []).slice(0, 5).forEach(function(f) {
    var r = new FileReader();
    r.onload = function(e) {
      var d = document.createElement('div');
      d.style.cssText = 'width:78px;height:78px;border-radius:14px;background-image:url(' + e.target.result + ');background-size:cover;background-position:center;border:2px solid #E2EAF4;flex-shrink:0';
      prev.appendChild(d);
    };
    r.readAsDataURL(f);
  });
}

function buscar(txt) {
  var el = document.getElementById('lista-v');
  if (!el) return;
  var lista = S.propiedades.length ? S.propiedades : PROPS_DEMO;
  var t = (txt || '').toLowerCase().trim();
  var r = t
    ? lista.filter(function(p) {
        return [p.titulo, p.ciudad, p.sector, p.tipo, p.desc].join(' ').toLowerCase().indexOf(t) >= 0;
      })
    : lista;

  el.innerHTML = r.length
    ? r.map(tarjetaV).join('')
    : '<div class="empty-state"><span style="font-size:2.6rem">🔎</span><p class="empty-title">No encontramos resultados</p><p class="empty-copy">Prueba con zonas como Naco, Piantini, Bávaro, Santiago o Jarabacoa.</p></div>';
}

function enviarMsg() {
  var inp  = document.getElementById('cinput');
  var msgs = document.getElementById('chat-msgs');
  if (!inp || !msgs || !inp.value.trim()) return;
  var div = document.createElement('div');
  div.innerHTML = '<div class="bubble b-me">' + inp.value + '</div><p class="btime me">Ahora ✓</p>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  inp.value = '';
}

function emojiTipo(t) {
  return {
    Casa:'🏠',
    Apartamento:'🏢',
    Villa:'🏡',
    Cabaña:'🛖',
    Estudio:'🏛️',
    Otro:'📍'
  }[t] || '🏠';
}

function gradTipo(t) {
  return {
    Casa:'linear-gradient(135deg,#C8E6D4,#7ABFA0)',
    Apartamento:'linear-gradient(135deg,#DCEBFF,#8FB9FF)',
    Villa:'linear-gradient(135deg,#FDEBC8,#F0B86E)',
    Cabaña:'linear-gradient(135deg,#D9F0E6,#7FC6A2)',
    Estudio:'linear-gradient(135deg,#F6D6C6,#E89A73)',
    Otro:'linear-gradient(135deg,#E8C8FB,#B07AE0)'
  }[t] || 'linear-gradient(135deg,#FDEBC8,#F0B86E)';
}

function esNuevo(ts) {
  if (!ts) return false;
  try {
    return (Date.now() - (ts.toDate ? ts.toDate() : new Date(ts)).getTime()) < 7 * 24 * 3600 * 1000;
  } catch(e) {
    return false;
  }
}

/* ══════════════════════════════
   SUBMITS
══════════════════════════════ */
function submitRegistro() {
  var n = document.getElementById('reg-nombre');
  var e = document.getElementById('reg-email');
  var t = document.getElementById('reg-tel');
  var p = document.getElementById('reg-pass');
  if (!n || !e || !p) return;
  if (!n.value.trim())  { toast('Escribe tu nombre.', 'err'); return; }
  if (!e.value.trim())  { toast('Escribe tu correo.', 'err'); return; }
  if (t && t.value.trim() && !validarTelefonoDO(t.value.trim())) { toast('Usa un número dominicano válido: 809, 829 o 849.', 'err'); return; }
  if (p.value.length < 6) { toast('La contraseña debe tener mínimo 6 caracteres.', 'err'); return; }
  registrarse(n.value.trim(), e.value.trim(), p.value, t ? t.value.trim() : '');
}

function submitLogin() {
  var e = document.getElementById('log-email');
  var p = document.getElementById('log-pass');
  if (!e || !p) return;
  if (!e.value.trim()) { toast('Escribe tu correo.', 'err'); return; }
  if (!p.value) { toast('Escribe tu contraseña.', 'err'); return; }
  loginEmail(e.value.trim(), p.value);
}

function submitPublicar() {
  var titulo  = document.getElementById('pub-titulo');
  var pr      = document.getElementById('pub-precio');
  var hab     = document.getElementById('pub-hab');
  var ban     = document.getElementById('pub-ban');
  var m2      = document.getElementById('pub-m2');
  var ciudad  = document.getElementById('pub-ciudad');
  var sector  = document.getElementById('pub-sector');
  var tel     = document.getElementById('pub-tel');
  var desc    = document.getElementById('pub-desc');
  var tipoBtn = document.querySelector('.tipo-opt.on');
  var inpFoto = document.getElementById('input-fotos');

  if (!titulo || !titulo.value.trim()) { toast('Escribe el título del anuncio.', 'err'); return; }
  if (!pr || !pr.value)                { toast('Indica el precio mensual.', 'err'); return; }
  if (!hab || !hab.value)              { toast('Indica la cantidad de habitaciones.', 'err'); return; }
  if (!ciudad || !ciudad.value.trim()) { toast('Escribe la ciudad.', 'err'); return; }
  if (!tel || !tel.value.trim())       { toast('Escribe tu WhatsApp.', 'err'); return; }
  if (!validarTelefonoDO(tel.value.trim())) { toast('Usa un número dominicano válido: 809, 829 o 849.', 'err'); return; }
  if (!desc || !desc.value.trim())     { toast('Escribe una descripción profesional.', 'err'); return; }

  var comodSelec = [];
  document.querySelectorAll('.como-item.on').forEach(function(b) {
    if (b.dataset.comod) comodSelec.push(b.dataset.comod);
  });

  publicarPropiedad({
    titulo:   titulo.value.trim(),
    tipo:     tipoBtn ? (tipoBtn.dataset.tipo || 'Casa') : 'Casa',
    precio:   pr.value,
    hab:      hab.value,
    ban:      ban ? ban.value : 1,
    m2:       m2 ? m2.value : 0,
    ciudad:   ciudad.value.trim(),
    sector:   sector ? sector.value.trim() : '',
    telefono: tel.value.trim(),
    desc:     desc.value.trim(),
    comod:    comodSelec,
    incluye:  comodSelec.filter(function(c) {
      return ['🛋️ Amueblado','🧾 Mantenimiento incluido','⚡ Planta full','🧺 Línea blanca'].indexOf(c) >= 0;
    })
  }, inpFoto ? Array.from(inpFoto.files || []) : []);
       }
