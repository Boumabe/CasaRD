/* ═══════════════════════════════════════════════════
   CASARD — DATOS.JS  (versión profesional)
   Firebase + Estado + Utilidades
   ⚠️  Sin onAuthStateChanged aquí — está en app.js
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
console.log('🔥 Firebase listo');

/* ── ESTADO GLOBAL ── */
var S = {
  usuario:     null,
  pagina:      null,
  propiedades: [],
};

try {
  var _u = localStorage.getItem('casard_u');
  if (_u) S.usuario = JSON.parse(_u);
} catch(e) { localStorage.removeItem('casard_u'); }

/* ── DATOS DEMO ── */
var PROPS_DEMO = [
  {id:'d1',titulo:'Villa Las Palmas',   tipo:'Villa',       precio:25000, ciudad:'Punta Cana',    sector:'La Altagracia', dist:'1.8 km',hab:3,ban:2,m2:120,emoji:'🏠',grad:'linear-gradient(135deg,#FDEBC8,#F0B86E)',top:true, nuevo:false,wa:'18090000001',val:4.9,res:34,foto:'',desc:'Hermosa villa con piscina privada y vista al mar. Amueblada, todos los servicios incluidos.',comod:['📶 WiFi','❄️ A/C','🌊 Vista mar','🐾 Mascotas OK','🍳 Cocina equipada','⚡ Planta eléc.','🏊 Piscina','🔐 Seguridad 24h'],prop:'Roberto Vargas',opiniones:[{n:'Ana López',i:'AL',c:'#1B4F8A',s:'★★★★★',t:'¡100% recomendada! La villa es exactamente como en las fotos.'},{n:'Carlos Marte',i:'CM',c:'#10B981',s:'★★★★☆',t:'Muy cómoda, planta siempre funciona.'}]},
  {id:'d2',titulo:'Apto. Vista Mar',    tipo:'Apartamento', precio:18000, ciudad:'Santo Domingo',  sector:'Naco',           dist:'3.2 km',hab:2,ban:1,m2:75, emoji:'🌴',grad:'linear-gradient(135deg,#C8E6D4,#7ABFA0)',top:false,nuevo:true, wa:'18090000002',val:4.8,res:21,foto:'',desc:'Moderno apartamento en zona exclusiva. Cerca de todo.',comod:['📶 WiFi','❄️ A/C','🚗 Parqueo'],prop:'Luisa Castro',opiniones:[{n:'Pedro M.',i:'PM',c:'#6B3FA0',s:'★★★★★',t:'Excelente ubicación en Naco.'}]},
  {id:'d3',titulo:'Cabaña El Río',      tipo:'Cabaña',      precio:12000, ciudad:'Jarabacoa',      sector:'Confluencia',    dist:'45 km', hab:2,ban:1,m2:60, emoji:'🌊',grad:'linear-gradient(135deg,#C8DFFB,#7AAEE0)',top:false,nuevo:false,wa:'18090000003',val:4.7,res:18,foto:'',desc:'Cabaña rodeada de naturaleza con vista al río.',comod:['📶 WiFi','🌿 Jardín','🌊 Vista río'],prop:'Juan Díaz',opiniones:[{n:'María G.',i:'MG',c:'#E85D3A',s:'★★★★☆',t:'Lugar espectacular para desconectarse.'}]},
  {id:'d4',titulo:'Casa Familiar Jardines',tipo:'Casa',      precio:22000, ciudad:'Santiago',        sector:'Los Jardines',   dist:'5.1 km',hab:4,ban:2,m2:140,emoji:'🏘️',grad:'linear-gradient(135deg,#FBC8C8,#E07A7A)',top:false,nuevo:true, wa:'18090000004',val:4.6,res:15,foto:'',desc:'Espaciosa casa familiar con patio grande y parqueo.',comod:['📶 WiFi','❄️ A/C','🚗 Parqueo','🌿 Jardín'],prop:'Ana López',opiniones:[{n:'Carlos R.',i:'CR',c:'#1B4F8A',s:'★★★★☆',t:'Propietaria muy atenta y responsable.'}]},
  {id:'d5',titulo:'Estudio Moderno',    tipo:'Estudio',     precio:9500,  ciudad:'La Romana',       sector:'Centro',         dist:'8 km',  hab:1,ban:1,m2:45, emoji:'🏡',grad:'linear-gradient(135deg,#E8C8FB,#B07AE0)',top:false,nuevo:false,wa:'18090000005',val:4.5,res:9, foto:'',desc:'Estudio moderno ideal para profesionales.',comod:['📶 WiFi','❄️ A/C'],prop:'Roberto V.',opiniones:[{n:'Sara M.',i:'SM',c:'#10B981',s:'★★★★★',t:'Perfecto y muy cómodo.'}]},
];

var CONVS = [
  {id:'c1',n:'Roberto Vargas',i:'RV',c:'linear-gradient(135deg,#1B4F8A,#2563EB)',prop:'🏠 Villa Las Palmas – Punta Cana',ult:'¡Hola! La villa está disponible desde…',h:'Ahora',nr:2,online:true},
  {id:'c2',n:'Luisa Castro',  i:'LC',c:'linear-gradient(135deg,#F5A623,#E85D3A)',prop:'🏢 Apto. Vista Mar – Sto. Domingo', ult:'Perfecto, nos vemos el viernes.',h:'Ayer',nr:0,online:false},
  {id:'c3',n:'Pedro Mejía',   i:'PM',c:'linear-gradient(135deg,#10B981,#059669)',prop:'🏡 Casa Familiar – Santiago',ult:'¿Incluye los servicios (luz, agua)?',h:'Lun',nr:1,online:true},
  {id:'c4',n:'Yaritza Reyes', i:'YR',c:'linear-gradient(135deg,#9B59B6,#6C3483)',prop:'🛖 Cabaña El Río – Jarabacoa',ult:'Gracias por la información 😊',h:'Dom',nr:0,online:false},
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
            nombre: nombre, email: email,
            telefono: telefono || '',
            creadoEn: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
    })
    .then(function() {
      loader(false);
      toast('¡Cuenta creada! Bienvenido a CasaRD 🏡', 'ok');
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
        email:  res.user.email,
        foto:   res.user.photoURL || '',
        creadoEn: firebase.firestore.FieldValue.serverTimestamp(),
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
    'auth/user-not-found':         'No existe cuenta con este correo.',
    'auth/wrong-password':         'Contraseña incorrecta.',
    'auth/too-many-requests':      'Demasiados intentos. Espera un momento.',
    'auth/network-request-failed': 'Sin conexión a internet.',
    'auth/popup-closed-by-user':   'Ventana cerrada. Intenta de nuevo.',
    'auth/invalid-credential':     'Correo o contraseña incorrectos.',
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
          tipo:   d.tipo   || 'Casa',
          precio: d.precio || 0,
          ciudad: d.ciudad || '',
          sector: d.sector || '',
          hab:    d.hab    || 1,
          ban:    d.ban    || 1,
          m2:     d.m2     || 0,
          desc:   d.desc   || '',
          comod:  d.comod  || [],
          wa:     d.telefono || '',
          foto:   (d.fotos && d.fotos[0]) ? d.fotos[0] : '',
          fotos:  d.fotos  || [],
          val:    d.val    || 5.0,
          res:    d.res    || 0,
          prop:   d.propNombre || '',
          propId: d.propId || '',
          grad:   gradTipo(d.tipo),
          emoji:  emojiTipo(d.tipo),
          top:    d.destacado || false,
          nuevo:  esNuevo(d.creadoEn),
          dist:   '',
          opiniones: [],
        });
      });
      S.propiedades = lista.length > 0 ? lista : PROPS_DEMO;
      if (cb) cb(S.propiedades);
    })
    .catch(function() {
      S.propiedades = PROPS_DEMO;
      if (cb) cb(S.propiedades);
    });
}

function publicarPropiedad(datos, fotos) {
  if (!S.usuario) { toast('Inicia sesión para publicar', 'err'); ir('login'); return; }
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
        hab:         Number(datos.hab)  || 1,
        ban:         Number(datos.ban)  || 1,
        m2:          Number(datos.m2)   || 0,
        desc:        datos.desc,
        comod:       datos.comod || [],
        telefono:    datos.telefono,
        fotos:       urls,
        propId:      S.usuario.uid,
        propNombre:  S.usuario.nombre,
        propEmail:   S.usuario.email,
        activo:      true,
        destacado:   false,
        val:         5.0,
        res:         0,
        creadoEn:    firebase.firestore.FieldValue.serverTimestamp(),
      });
    })
    .then(function() {
      loader(false);
      toast('¡Anuncio publicado con éxito! 🏠', 'ok');
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

/* Toast — con animación suave */
function toast(msg, tipo, ms) {
  ms = ms || 3200;
  var el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = tipo || '';
  el.style.display = 'block';
  clearTimeout(el._t);
  /* Trigger animation */
  requestAnimationFrame(function() {
    el.classList.add('show');
  });
  el._t = setTimeout(function() {
    el.classList.remove('show');
    setTimeout(function() { el.style.display = 'none'; }, 200);
  }, ms);
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
  return 'RD$' + Number(v).toLocaleString('es-DO');
}

function wa(tel, msg) {
  var num = String(tel || '').replace(/\D/g, '');
  if (!num) { toast('Número de WhatsApp no disponible', 'err'); return; }
  window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(msg), '_blank');
}

function iniciales(n) {
  return (n || '?').split(' ').slice(0, 2).map(function(x) {
    return x[0] ? x[0].toUpperCase() : '';
  }).join('');
}

/* Seleccionar tipo propiedad */
function selTipo(btn) {
  document.querySelectorAll('.tipo-opt').forEach(function(b) { b.classList.remove('on'); });
  btn.classList.add('on');
}

/* Toggle comodidad */
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

/* Vista previa de fotos */
function previsualizarFotos(input) {
  var prev = document.getElementById('fotos-prev');
  if (!prev) return;
  prev.innerHTML = '';
  Array.from(input.files || []).slice(0, 5).forEach(function(f) {
    var r = new FileReader();
    r.onload = function(e) {
      var d = document.createElement('div');
      d.style.cssText = 'width:74px;height:74px;border-radius:12px;background-image:url('+e.target.result+');background-size:cover;background-position:center;border:2px solid #DDE5F0;flex-shrink:0;position:relative';
      /* Remove button */
      var x = document.createElement('button');
      x.style.cssText = 'position:absolute;top:-6px;right:-6px;width:20px;height:20px;border-radius:50%;background:#0B1E38;color:white;font-size:.65rem;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1';
      x.textContent = '×';
      x.onclick = function() { d.remove(); };
      d.appendChild(x);
      prev.appendChild(d);
    };
    r.readAsDataURL(f);
  });
}

/* Buscar propiedades */
function buscar(txt) {
  var el = document.getElementById('lista-v');
  if (!el) return;
  var lista = S.propiedades.length > 0 ? S.propiedades : PROPS_DEMO;
  var t = (txt || '').toLowerCase();
  var r = t
    ? lista.filter(function(p) {
        return p.titulo.toLowerCase().indexOf(t) >= 0 ||
               p.ciudad.toLowerCase().indexOf(t) >= 0 ||
               p.tipo.toLowerCase().indexOf(t)   >= 0 ||
               (p.sector||'').toLowerCase().indexOf(t) >= 0;
      })
    : lista;
  el.innerHTML = r.length
    ? r.map(tarjetaV).join('')
    : '<div style="text-align:center;padding:50px 20px">'
      +'<div style="width:64px;height:64px;border-radius:50%;background:#EBF3FF;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">'
      +'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>'
      +'</div>'
      +'<p style="font-weight:700;font-size:.86rem;color:#0B1E38;margin-bottom:6px">Sin resultados</p>'
      +'<p style="color:#64748B;font-size:.76rem">No encontramos propiedades para "'+txt+'"</p>'
      +'</div>';
}

/* Enviar mensaje chat */
function enviarMsg() {
  var inp  = document.getElementById('cinput');
  var msgs = document.getElementById('chat-msgs');
  if (!inp || !msgs || !inp.value.trim()) return;
  var div = document.createElement('div');
  div.innerHTML = '<div class="bubble b-me">' + inp.value + '</div><p class="btime me">Ahora ✓</p>';
  msgs.insertBefore(div, msgs.lastElementChild.previousElementSibling
    ? msgs.lastElementChild
    : msgs.lastElementChild);
  /* Insert before last element (WA button) */
  var waBtn = msgs.querySelector('.btn-wa');
  if (waBtn) msgs.insertBefore(div, waBtn);
  else msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  inp.value = '';
}

/* Helpers */
function emojiTipo(t) {
  return { Casa:'🏠', Apartamento:'🌴', Villa:'🏡', Cabaña:'🌊', Estudio:'🏘️' }[t] || '🏠';
}
function gradTipo(t) {
  return {
    Casa:        'linear-gradient(135deg,#FDEBC8,#F0B86E)',
    Apartamento: 'linear-gradient(135deg,#C8E6D4,#7ABFA0)',
    Villa:       'linear-gradient(135deg,#E8C8FB,#B07AE0)',
    Cabaña:      'linear-gradient(135deg,#C8DFFB,#7AAEE0)',
    Estudio:     'linear-gradient(135deg,#FBC8C8,#E07A7A)',
  }[t] || 'linear-gradient(135deg,#FDEBC8,#F0B86E)';
}
function esNuevo(ts) {
  if (!ts) return false;
  try { return (Date.now() - (ts.toDate ? ts.toDate() : new Date(ts)).getTime()) < 7*24*3600*1000; }
  catch(e) { return false; }
}

/* Submit formularios */
function submitRegistro() {
  var n = document.getElementById('reg-nombre');
  var e = document.getElementById('reg-email');
  var t = document.getElementById('reg-tel');
  var p = document.getElementById('reg-pass');
  if (!n||!e||!p) return;
  if (!n.value.trim())  { toast('Escribe tu nombre', 'err');               return; }
  if (!e.value.trim())  { toast('Escribe tu correo', 'err');               return; }
  if (p.value.length<6) { toast('Contraseña mínimo 6 caracteres', 'err'); return; }
  registrarse(n.value.trim(), e.value.trim(), p.value, t ? t.value.trim() : '');
}

function submitLogin() {
  var e = document.getElementById('log-email');
  var p = document.getElementById('log-pass');
  if (!e||!p) return;
  if (!e.value.trim()) { toast('Escribe tu correo', 'err');    return; }
  if (!p.value)        { toast('Escribe tu contraseña', 'err'); return; }
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

  if (!titulo||!titulo.value.trim())  { toast('Escribe el título', 'err');          return; }
  if (!pr||!pr.value)                 { toast('Escribe el precio por mes', 'err');  return; }
  if (!hab||!hab.value)               { toast('Indica las habitaciones', 'err');    return; }
  if (!ciudad||!ciudad.value.trim())  { toast('Escribe la ciudad', 'err');          return; }
  if (!tel||!tel.value.trim())        { toast('Escribe tu número de WhatsApp', 'err'); return; }
  if (!desc||!desc.value.trim())      { toast('Escribe una descripción', 'err');    return; }

  var comodSelec = [];
  document.querySelectorAll('.como-item.on').forEach(function(b) {
    if (b.dataset.comod) comodSelec.push(b.dataset.comod);
  });

  publicarPropiedad({
    titulo:   titulo.value.trim(),
    tipo:     tipoBtn ? (tipoBtn.dataset.tipo || 'Casa') : 'Casa',
    precio:   pr.value,
    hab:      hab.value,
    ban:      ban  ? ban.value  : 1,
    m2:       m2   ? m2.value   : 0,
    ciudad:   ciudad.value.trim(),
    sector:   sector ? sector.value.trim() : '',
    telefono: tel.value.trim(),
    desc:     desc.value.trim(),
    comod:    comodSelec,
  }, inpFoto ? Array.from(inpFoto.files || []) : []);
}
