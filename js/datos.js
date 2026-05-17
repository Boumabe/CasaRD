/* ═══════════════════════════════════════════════════
   CASARD — DATOS.JS
   Estado global, datos demo y funciones utilitarias.
   Cargado primero — todo lo demás depende de esto.
════════════════════════════════════════════════════ */

/* ── ESTADO GLOBAL ── */
const S = {
  usuario: null,
  paginaActual: null,
};

/* Cargar usuario guardado */
try {
  const guardado = localStorage.getItem('casard_u');
  if (guardado) S.usuario = JSON.parse(guardado);
} catch(e) {
  localStorage.removeItem('casard_u');
}

/* ── PROPIEDADES DEMO ── */
const PROPS = [
  {
    id:'1', titulo:'Villa Las Palmas', tipo:'Villa',
    precio:25000, ciudad:'Punta Cana', sector:'La Altagracia',
    dist:'1.8 km', hab:3, ban:2, m2:120,
    emoji:'🏠', grad:'linear-gradient(135deg,#FDEBC8,#F0B86E)',
    top:true, nuevo:false, wa:'18090000001', val:4.9, res:34,
    desc:'Hermosa villa con piscina privada y vista al mar, en exclusivo complejo. Amueblada, todos los servicios incluidos. Disponible desde febrero 2025.',
    comod:['📶 WiFi','❄️ A/C','🌊 Vista mar','🐾 Mascotas OK','🍳 Cocina equipada','⚡ Planta eléc.','🏊 Piscina','🔐 Seguridad 24h'],
    prop:'Roberto Vargas',
    opiniones:[
      {n:'Ana López',    i:'AL', c:'#1B4F8A', s:'★★★★★', t:'Excelente propiedad, muy limpia y bien ubicada. ¡100% recomendada!'},
      {n:'Carlos Marte', i:'CM', c:'#10B981', s:'★★★★☆', t:'Muy cómoda, planta eléctrica siempre funciona. La vista al mar es increíble.'},
    ],
  },
  {
    id:'2', titulo:'Apto. Vista Mar', tipo:'Apartamento',
    precio:18000, ciudad:'Santo Domingo', sector:'Naco',
    dist:'3.2 km', hab:2, ban:1, m2:75,
    emoji:'🌴', grad:'linear-gradient(135deg,#C8E6D4,#7ABFA0)',
    top:false, nuevo:true, wa:'18090000002', val:4.8, res:21,
    desc:'Moderno apartamento en zona exclusiva. Cerca de todo. Ideal para profesionales o pareja.',
    comod:['📶 WiFi','❄️ A/C','🚗 Parqueo'],
    prop:'Luisa Castro',
    opiniones:[
      {n:'Pedro M.', i:'PM', c:'#6B3FA0', s:'★★★★★', t:'Excelente ubicación, todo muy limpio y moderno.'},
    ],
  },
  {
    id:'3', titulo:'Cabaña El Río', tipo:'Cabaña',
    precio:12000, ciudad:'Jarabacoa', sector:'La Confluencia',
    dist:'45 km', hab:2, ban:1, m2:60,
    emoji:'🌊', grad:'linear-gradient(135deg,#C8DFFB,#7AAEE0)',
    top:false, nuevo:false, wa:'18090000003', val:4.7, res:18,
    desc:'Cabaña rodeada de naturaleza con vista al río. Ideal para familias que buscan tranquilidad.',
    comod:['📶 WiFi','🌿 Jardín','🌊 Vista río'],
    prop:'Juan Díaz',
    opiniones:[
      {n:'María G.', i:'MG', c:'#E85D3A', s:'★★★★☆', t:'Lugar espectacular, muy tranquilo y fresco.'},
    ],
  },
  {
    id:'4', titulo:'Casa Familiar', tipo:'Casa',
    precio:22000, ciudad:'Santiago', sector:'Los Jardines',
    dist:'5.1 km', hab:4, ban:2, m2:140,
    emoji:'🏘️', grad:'linear-gradient(135deg,#FBC8C8,#E07A7A)',
    top:false, nuevo:true, wa:'18090000004', val:4.6, res:15,
    desc:'Espaciosa casa familiar con patio grande. Barrio tranquilo, cerca de colegios y supermercados.',
    comod:['📶 WiFi','❄️ A/C','🚗 Parqueo','🌿 Jardín'],
    prop:'Ana López',
    opiniones:[
      {n:'Carlos R.', i:'CR', c:'#1B4F8A', s:'★★★★☆', t:'Muy buena casa, propietaria muy atenta y responsable.'},
    ],
  },
  {
    id:'5', titulo:'Estudio Moderno', tipo:'Estudio',
    precio:9500, ciudad:'La Romana', sector:'Centro',
    dist:'8 km', hab:1, ban:1, m2:45,
    emoji:'🏡', grad:'linear-gradient(135deg,#E8C8FB,#B07AE0)',
    top:false, nuevo:false, wa:'18090000005', val:4.5, res:9,
    desc:'Estudio moderno ideal para profesionales. Todo incluido. Cerca de la zona franca.',
    comod:['📶 WiFi','❄️ A/C'],
    prop:'Roberto V.',
    opiniones:[
      {n:'Sara M.', i:'SM', c:'#10B981', s:'★★★★★', t:'Perfecto para una persona, muy cómodo y bien equipado.'},
    ],
  },
];

/* ── CONVERSACIONES DEMO ── */
const CONVS = [
  {id:'c1', n:'Roberto Vargas', i:'RV', c:'linear-gradient(135deg,#1B4F8A,#2563EB)', prop:'🏠 Villa Las Palmas – Punta Cana', ult:'¡Hola! La villa está disponible desde…', h:'Ahora', nr:2, online:true},
  {id:'c2', n:'Luisa Castro',   i:'LC', c:'linear-gradient(135deg,#F5A623,#E85D3A)', prop:'🏢 Apto. Vista Mar – Sto. Domingo',  ult:'Perfecto, nos vemos el viernes.',      h:'Ayer',  nr:0, online:false},
  {id:'c3', n:'Pedro Mejía',    i:'PM', c:'linear-gradient(135deg,#10B981,#059669)', prop:'🏡 Casa Familiar – Santiago',         ult:'¿Incluye los servicios (luz, agua)?', h:'Lun',   nr:1, online:true},
  {id:'c4', n:'Yaritza Reyes',  i:'YR', c:'linear-gradient(135deg,#9B59B6,#6C3483)', prop:'🛖 Cabaña El Río – Jarabacoa',        ult:'Gracias por la información 😊',       h:'Dom',   nr:0, online:false},
];

/* ══════════════════════════════
   UTILIDADES
══════════════════════════════ */

/* Toast — notificación */
function toast(msg, tipo, ms) {
  ms = ms || 3000;
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = tipo || '';
  el.style.display = 'block';
  clearTimeout(el._t);
  el._t = setTimeout(function() { el.style.display = 'none'; }, ms);
}

/* Formato precio RD$ */
function precio(v) {
  return 'RD$' + Number(v).toLocaleString('es-DO');
}

/* Abrir WhatsApp */
function wa(tel, msg) {
  const num = String(tel).replace(/\D/g, '');
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

/* Cerrar sesión */
function salir() {
  S.usuario = null;
  try { localStorage.removeItem('casard_u'); } catch(e) {}
  ir('bienvenida');
}

/* Seleccionar tipo en formulario publicar */
function selTipo(btn) {
  var opts = document.querySelectorAll('.tipo-opt');
  for (var i = 0; i < opts.length; i++) opts[i].classList.remove('on');
  btn.classList.add('on');
}

/* Buscar en lista de propiedades */
function buscar(txt) {
  var el = document.getElementById('lista-v');
  if (!el) return;
  var t = txt.toLowerCase();
  var r = PROPS.filter(function(p) {
    return p.titulo.toLowerCase().indexOf(t) >= 0 ||
           p.ciudad.toLowerCase().indexOf(t) >= 0;
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

/* Entrar a la app (botones bienvenida) */
function entrar() {
  guardarUsuario({ nombre: 'Usuario Demo', email: 'demo@casard.do', uid: 'demo-001' });
  toast('¡Bienvenido a CasaRD! 🏡', 'ok');
  ir('explorar');
}
