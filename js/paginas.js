/* ═══════════════════════════════════════════════════
   CASARD — PAGINAS.JS
   Las 8 páginas completamente funcionales.
════════════════════════════════════════════════════ */

/* ══════════════════════════════
   TARJETAS
══════════════════════════════ */
function tarjetaH(p) {
  return '<div class="hcard" onclick="ir(\'detalle\',{id:\'' + p.id + '\'})">'
    + '<div class="hcard-img" style="background:' + p.grad + (p.foto ? ';background-image:url(' + p.foto + ');background-size:cover;background-position:center' : '') + '">'
    + (p.foto ? '' : p.emoji)
    + (p.top   ? '<span class="badge b-tl b-top">⭐ TOP</span>' : '')
    + (p.nuevo ? '<span class="badge b-tl b-nuevo">NUEVO</span>' : '')
    + '<span class="b-fav" onclick="event.stopPropagation();toast(\'Guardado en favoritos ❤️\',\'ok\')">🤍</span>'
    + '</div>'
    + '<div class="hcard-body">'
    + '<p class="hcard-name">' + p.titulo + '</p>'
    + '<p class="hcard-loc">📍 ' + p.ciudad + (p.dist ? ' · ' + p.dist : '') + '</p>'
    + '<div class="hcard-ft">'
    + '<span class="price">' + precio(p.precio) + '<small>/mes</small></span>'
    + '<span class="stars">★ ' + p.val + '</span>'
    + '</div></div></div>';
}

function tarjetaV(p) {
  var msgWa = '¡Hola! Vi ' + p.titulo + ' en CasaRD (' + precio(p.precio) + '/mes en ' + p.ciudad + '). ¿Sigue disponible? 🏠🇩🇴';
  return '<div class="vcard" onclick="ir(\'detalle\',{id:\'' + p.id + '\'})">'
    + '<div class="vcard-img" style="background:' + p.grad + (p.foto ? ';background-image:url(' + p.foto + ');background-size:cover;background-position:center' : '') + '">'
    + (p.foto ? '' : p.emoji)
    + (p.nuevo ? '<span class="badge b-tl b-nuevo">NUEVO</span>' : '')
    + '<span class="b-fav" onclick="event.stopPropagation();toast(\'Guardado en favoritos ❤️\',\'ok\')">🤍</span>'
    + '</div>'
    + '<div class="vcard-body">'
    + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">'
    + '<h3 style="font-size:.9rem;font-weight:700;color:#0D1F35">' + p.titulo + '</h3>'
    + '<span class="stars">★ ' + p.val + '</span>'
    + '</div>'
    + '<p style="font-size:.72rem;color:#64748B;margin-bottom:8px">📍 ' + p.ciudad + ' · 🛏 ' + p.hab + ' hab. · 🛁 ' + p.ban + ' baños</p>'
    + '<div style="display:flex;justify-content:space-between;align-items:center">'
    + '<span class="price">' + precio(p.precio) + '<small>/mes</small></span>'
    + '<button class="btn btn-wa btn-sm" onclick="event.stopPropagation();wa(\'' + p.wa + '\',\'' + msgWa.replace(/'/g,"\\'") + '\')">💬 WhatsApp</button>'
    + '</div></div></div>';
}

/* ══════════════════════════════
   PÁGINA 1 — BIENVENIDA
══════════════════════════════ */
function pagBienvenida() {
  return '<div class="splash">'
    + '<div class="orb1"></div><div class="orb2"></div>'
    + '<div class="sp-logo">🏡</div>'
    + '<h1 class="sp-titulo">CasaRD</h1>'
    + '<p class="sp-sub">🇩🇴 Alquileres en República Dominicana</p>'
    + '<p class="sp-desc">Encuentra tu hogar ideal cerca de ti, junto a la playa, en el campo o en el corazón de la ciudad dominicana.</p>'
    + '<div class="sp-trust">'
    + '<div><span class="sp-tn">100+</span><span class="sp-tl">Propiedades</span></div>'
    + '<div class="sp-tdiv"></div>'
    + '<div><span class="sp-tn">RD$</span><span class="sp-tl">Precios locales</span></div>'
    + '<div class="sp-tdiv"></div>'
    + '<div><span class="sp-tn">💬</span><span class="sp-tl">WhatsApp</span></div>'
    + '</div>'
    + '<div class="sp-btns">'
    + '<button class="btn btn-dorado" onclick="ir(\'registro\')">Comenzar ahora →</button>'
    + '<button class="btn btn-out" onclick="ir(\'login\')">Ya tengo una cuenta</button>'
    + '</div>'
    + '<p class="sp-legal">Al continuar aceptas nuestros <u>Términos de uso</u> y la <u>Política de privacidad</u></p>'
    + '</div>';
}

/* ══════════════════════════════
   PÁGINA 2 — REGISTRO
══════════════════════════════ */
function pagRegistro() {
  return '<div style="min-height:100vh;background:linear-gradient(170deg,#080F1C,#0D1F35 45%,#132B50);padding:0 0 40px">'
    + '<div style="padding:48px 28px 24px;text-align:center">'
    + '<div class="sp-logo" style="margin:0 auto 16px">🏡</div>'
    + '<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.6rem;font-weight:900;margin-bottom:6px">Crear cuenta</h2>'
    + '<p style="color:rgba(255,255,255,.45);font-size:.78rem">Únete a CasaRD — es gratis 🇩🇴</p>'
    + '</div>'
    + '<div style="background:white;border-radius:28px 28px 0 0;padding:28px 24px;min-height:60vh">'
    /* Google */
    + '<button class="btn" style="background:#F5F7FB;border:1.5px solid #E2EAF4;color:#0D1F35;margin-bottom:10px" onclick="loginGoogle()">'
    + '<span style="font-size:1.1rem">🇬</span> Continuar con Google'
    + '</button>'
    /* Divider */
    + '<div style="display:flex;align-items:center;gap:10px;margin:14px 0;color:#94A3B8;font-size:.72rem"><div style="flex:1;height:1px;background:#E2EAF4"></div>o con tu correo<div style="flex:1;height:1px;background:#E2EAF4"></div></div>'
    /* Formulario */
    + '<div class="fgroup"><label class="flabel">Nombre completo</label><input class="finput" id="reg-nombre" type="text" placeholder="Ej: Juan Pérez"/></div>'
    + '<div class="fgroup"><label class="flabel">Correo electrónico</label><input class="finput" id="reg-email" type="email" placeholder="juan@ejemplo.com"/></div>'
    + '<div class="fgroup"><label class="flabel">WhatsApp / Teléfono</label><input class="finput finput-wa" id="reg-tel" type="tel" placeholder="+1 (809) 000-0000"/></div>'
    + '<div class="fgroup"><label class="flabel">Contraseña</label><input class="finput" id="reg-pass" type="password" placeholder="Mínimo 6 caracteres"/></div>'
    + '<button class="btn btn-azul" style="margin-top:4px" onclick="submitRegistro()">Crear mi cuenta gratis</button>'
    + '<p style="text-align:center;margin-top:16px;font-size:.75rem;color:#64748B">¿Ya tienes cuenta? <u style="color:#1B4F8A;cursor:pointer" onclick="ir(\'login\')">Iniciar sesión</u></p>'
    + '</div></div>';
}

function submitRegistro() {
  var nombre = document.getElementById('reg-nombre');
  var email  = document.getElementById('reg-email');
  var tel    = document.getElementById('reg-tel');
  var pass   = document.getElementById('reg-pass');
  if (!nombre||!email||!pass) return;
  if (!nombre.value.trim()) { toast('Escribe tu nombre completo','err'); return; }
  if (!email.value.trim())  { toast('Escribe tu correo electrónico','err'); return; }
  if (pass.value.length < 6){ toast('La contraseña debe tener al menos 6 caracteres','err'); return; }
  registrarse(nombre.value.trim(), email.value.trim(), pass.value, tel ? tel.value.trim() : '');
}

/* ══════════════════════════════
   PÁGINA 3 — LOGIN
══════════════════════════════ */
function pagLogin() {
  return '<div style="min-height:100vh;background:linear-gradient(170deg,#080F1C,#0D1F35 45%,#132B50);padding:0 0 40px">'
    + '<div style="padding:48px 28px 24px;text-align:center">'
    + '<div class="sp-logo" style="margin:0 auto 16px">🏡</div>'
    + '<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.6rem;font-weight:900;margin-bottom:6px">Iniciar sesión</h2>'
    + '<p style="color:rgba(255,255,255,.45);font-size:.78rem">Bienvenido de vuelta 🇩🇴</p>'
    + '</div>'
    + '<div style="background:white;border-radius:28px 28px 0 0;padding:28px 24px;min-height:60vh">'
    + '<button class="btn" style="background:#F5F7FB;border:1.5px solid #E2EAF4;color:#0D1F35;margin-bottom:10px" onclick="loginGoogle()">'
    + '<span style="font-size:1.1rem">🇬</span> Continuar con Google'
    + '</button>'
    + '<div style="display:flex;align-items:center;gap:10px;margin:14px 0;color:#94A3B8;font-size:.72rem"><div style="flex:1;height:1px;background:#E2EAF4"></div>o con tu correo<div style="flex:1;height:1px;background:#E2EAF4"></div></div>'
    + '<div class="fgroup"><label class="flabel">Correo electrónico</label><input class="finput" id="log-email" type="email" placeholder="juan@ejemplo.com"/></div>'
    + '<div class="fgroup"><label class="flabel">Contraseña</label><input class="finput" id="log-pass" type="password" placeholder="Tu contraseña"/></div>'
    + '<button class="btn btn-azul" style="margin-top:4px" onclick="submitLogin()">Iniciar sesión</button>'
    + '<p style="text-align:center;margin-top:16px;font-size:.75rem;color:#64748B">¿No tienes cuenta? <u style="color:#1B4F8A;cursor:pointer" onclick="ir(\'registro\')">Crear cuenta gratis</u></p>'
    + '<p style="text-align:center;margin-top:10px;font-size:.72rem"><u style="color:#64748B;cursor:pointer" onclick="toast(\'Función próximamente disponible\',\'info\')">¿Olvidaste tu contraseña?</u></p>'
    + '</div></div>';
}

function submitLogin() {
  var email = document.getElementById('log-email');
  var pass  = document.getElementById('log-pass');
  if (!email||!pass) return;
  if (!email.value.trim()) { toast('Escribe tu correo','err'); return; }
  if (!pass.value)         { toast('Escribe tu contraseña','err'); return; }
  loginEmail(email.value.trim(), pass.value);
}

/* ══════════════════════════════
   PÁGINA 4 — EXPLORAR
══════════════════════════════ */
function pagExplorar(params) {
  params = params || {};
  var tipo = params.tipo || 'Todos';
  var tipos = ['Todos','Casa','Apartamento','Villa','Cabaña','Estudio'];

  /* Usar propiedades cargadas o demo */
  var todasProps = S.propiedades.length > 0 ? S.propiedades : PROPS_DEMO;
  var lista = tipo === 'Todos' ? todasProps : todasProps.filter(function(p){ return p.tipo === tipo; });
  var dest  = todasProps.filter(function(p){ return p.top || p.nuevo; });
  if (dest.length === 0) dest = todasProps.slice(0, 3);

  return '<div class="pb-nav">'
    + '<div class="hero-azul">'
    + '<div class="sbar d"><span>9:41</span><span>●●● 100%</span></div>'
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">'
    + '<div>'
    + '<p style="font-size:.68rem;color:rgba(255,255,255,.5)">Buenos días 👋</p>'
    + '<p style="font-family:\'Fraunces\',serif;font-size:1.05rem;font-weight:700">' + (S.usuario ? S.usuario.nombre : 'Bienvenido') + '</p>'
    + '</div>'
    + '<div style="width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:1rem;cursor:pointer" onclick="ir(\'perfil\')">👤</div>'
    + '</div>'
    + '<div class="s-bar">'
    + '<span style="color:rgba(255,255,255,.5)">🔍</span>'
    + '<input type="text" id="inp-buscar" placeholder="Ciudad, barrio, sector…" oninput="buscar(this.value)"/>'
    + '<div class="fbtn" onclick="toast(\'Filtros avanzados próximamente\',\'info\')">🎛</div>'
    + '</div>'
    + '<div class="chips">'
    + tipos.map(function(t){
        return '<button class="chip ' + (t===tipo?'on':'') + '" onclick="ir(\'explorar\',{tipo:\'' + t + '\'})">' + t + '</button>';
      }).join('')
    + '</div></div>'
    /* DESTACADOS */
    + '<div class="sec-h"><span class="sec-t">Destacados ✨</span><span class="sec-a" onclick="ir(\'explorar\')">Ver todos</span></div>'
    + '<div class="hscroll">' + dest.map(tarjetaH).join('') + '</div>'
    /* MAPA */
    + '<div class="sec-h" style="margin-top:6px"><span class="sec-t">Mapa 🗺️</span><span class="sec-a">Ampliar</span></div>'
    + '<div id="mapa-contenedor" class="map-box">'
    + '<div class="map-grid"></div><div class="map-rh"></div><div class="map-rv"></div>'
    + '<div class="map-pin" style="background:#1B4F8A;top:26px;left:55px"></div>'
    + '<div class="map-pin" style="background:#E85D3A;top:54px;left:130px"></div>'
    + '<div class="map-pin" style="background:#10B981;top:20px;right:46px"></div>'
    + '<div class="map-lbl">🏠 ' + todasProps.length + ' propiedades disponibles</div>'
    + '</div>'
    /* LISTA */
    + '<div class="sec-h" style="margin-top:6px"><span class="sec-t">Todas las propiedades</span><span class="sec-a">' + lista.length + ' disponibles</span></div>'
    + '<div class="page-body" id="lista-v">' + lista.map(tarjetaV).join('') + '</div>'
    + '</div>';
}

/* ══════════════════════════════
   PÁGINA 5 — DETALLE
══════════════════════════════ */
function pagDetalle(params) {
  params = params || {};
  var todas = S.propiedades.length > 0 ? S.propiedades : PROPS_DEMO;
  var p = todas.filter(function(x){ return x.id === params.id; })[0] || todas[0];
  var msgWa = '¡Hola! Vi ' + p.titulo + ' en CasaRD (' + precio(p.precio) + '/mes en ' + p.ciudad + '). ¿Sigue disponible? 🏠🇩🇴';

  /* Galería de fotos */
  var imgStyle = p.foto
    ? 'background:' + p.grad + ';background-image:url(' + p.foto + ');background-size:cover;background-position:center'
    : 'background:' + p.grad;

  return '<div style="background:white;padding-bottom:90px">'
    + '<div class="det-img" style="' + imgStyle + '">'
    + (p.foto ? '' : '<span style="font-size:5rem">' + p.emoji + '</span>')
    + '<button class="det-back" onclick="ir(\'explorar\')">← Volver</button>'
    + '<button class="det-fav" onclick="toast(\'Guardado en favoritos ❤️\',\'ok\')">❤️</button>'
    + '<div class="det-dots"><div class="ddot on"></div><div class="ddot"></div><div class="ddot"></div></div>'
    + '</div>'
    + '<div class="page-body">'
    + '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">'
    + '<span class="dtag">🛏 ' + p.hab + ' hab.</span>'
    + '<span class="dtag">🛁 ' + p.ban + ' baños</span>'
    + (p.m2 ? '<span class="dtag">📐 ' + p.m2 + 'm²</span>' : '')
    + '<span class="dtag">🚗 Parqueo</span>'
    + '</div>'
    + '<h1 style="font-family:\'Fraunces\',serif;font-size:1.3rem;font-weight:700;color:#0D1F35;margin-bottom:4px">' + p.titulo + '</h1>'
    + '<p style="font-size:.73rem;color:#64748B;margin-bottom:10px">📍 ' + p.ciudad + (p.sector ? ', ' + p.sector : '') + '</p>'
    + '<div class="det-pr-row">'
    + '<div><span class="det-pr">' + precio(p.precio) + '</span><span style="font-size:.7rem;color:#64748B">/mes</span></div>'
    + '<div style="display:flex;align-items:center;gap:4px;font-size:.78rem;font-weight:700">⭐ ' + p.val + ' <span style="color:#64748B;font-size:.65rem">(' + p.res + ')</span></div>'
    + '</div>'
    + '<button class="btn btn-wa mb10" onclick="wa(\'' + p.wa + '\',\'' + msgWa.replace(/'/g,"\\'") + '\')">💬 Contactar por WhatsApp</button>'
    + '<button class="btn btn-azul mb14" onclick="toast(\'Visita solicitada — el propietario te contactará pronto 📅\',\'ok\')">📅 Solicitar visita</button>'
    + '<p class="sec-titulo">Comodidades</p>'
    + '<div class="amen-grid">' + (p.comod||[]).map(function(c){ return '<div class="amen">' + c + '</div>'; }).join('') + '</div>'
    + '<p class="sec-titulo">Descripción</p>'
    + '<p style="font-size:.75rem;color:#64748B;line-height:1.65;margin-bottom:14px">' + p.desc + '</p>'
    + '<p class="sec-titulo">Propietario</p>'
    + '<div class="owner-card">'
    + '<div class="av av-md" style="background:linear-gradient(135deg,#1B4F8A,#F5A623)">' + iniciales(p.prop) + '</div>'
    + '<div style="flex:1"><p style="font-weight:700;font-size:.82rem;color:#0D1F35">' + p.prop + '</p>'
    + '<p style="font-size:.65rem;color:#10B981;font-weight:700">✓ Propietario verificado</p>'
    + '<p style="font-size:.62rem;color:#64748B">Responde en menos de 1h</p></div>'
    + '<button class="btn btn-dark btn-sm" onclick="ir(\'chat\',{n:\'' + p.prop + '\',t:\'' + p.titulo + '\',pr:' + p.precio + '})">Chat</button>'
    + '</div>'
    + (p.opiniones && p.opiniones.length > 0
        ? '<p class="sec-titulo">Reseñas recientes</p>'
          + p.opiniones.map(function(o){
              return '<div class="resena">'
                + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">'
                + '<div class="av av-sm" style="background:' + o.c + '">' + o.i + '</div>'
                + '<span style="font-weight:700;font-size:.72rem;color:#0D1F35;flex:1">' + o.n + '</span>'
                + '<span style="font-size:.62rem;color:#F5A623">' + o.s + '</span>'
                + '</div><p style="font-size:.7rem;color:#64748B;line-height:1.55">' + o.t + '</p></div>';
            }).join('')
        : '')
    + '</div></div>';
}

/* ══════════════════════════════
   PÁGINA 6 — PUBLICAR (funcional)
══════════════════════════════ */
function pagPublicar() {
  /* Redirigir si no está autenticado */
  if (!S.usuario) {
    return '<div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 28px;text-align:center;background:#F5F7FB">'
      + '<span style="font-size:3rem;margin-bottom:16px">🔐</span>'
      + '<h2 style="font-family:\'Fraunces\',serif;font-size:1.4rem;font-weight:700;margin-bottom:10px">Inicia sesión primero</h2>'
      + '<p style="color:#64748B;font-size:.82rem;margin-bottom:24px">Necesitas una cuenta para publicar una propiedad en CasaRD.</p>'
      + '<button class="btn btn-azul" style="max-width:300px" onclick="ir(\'login\')">Iniciar sesión</button>'
      + '<button class="btn btn-out" style="max-width:300px;margin-top:10px;color:#64748B;border-color:#E2EAF4" onclick="ir(\'registro\')">Crear cuenta gratis</button>'
      + '</div>';
  }

  var tipos = [['🏠','Casa'],['🏢','Apartamento'],['🏡','Villa'],['🛖','Cabaña'],['🏩','Estudio'],['🏗️','Otro']];
  var comods = ['📶 WiFi','❄️ A/C','⚡ Planta eléc.','🚗 Parqueo','🏊 Piscina','🌿 Jardín','🐾 Mascotas OK','🔐 Seguridad 24h','🍳 Cocina equipada','🌊 Vista al mar'];

  return '<div class="pb-nav">'
    + '<div class="hero-oscuro">'
    + '<div class="sbar d"><span>9:41</span><span>●●● 100%</span></div>'
    + '<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.25rem;font-weight:700;margin-bottom:3px">Publicar propiedad</h2>'
    + '<p style="color:rgba(255,255,255,.45);font-size:.72rem">Paso 1 de 1 · Completa todos los campos</p>'
    + '</div>'
    + '<div class="page-body">'
    + '<div class="aviso av-wa"><span style="font-size:1.1rem;flex-shrink:0">💬</span>'
    + '<span><b>Tip:</b> Los inquilinos te contactarán por <b>WhatsApp</b>. Verifica que tu número esté correcto.</span>'
    + '</div>'
    /* Fotos */
    + '<div class="fsec">📸 Fotos de la propiedad</div>'
    + '<div id="fotos-preview" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px"></div>'
    + '<label style="display:flex;align-items:center;justify-content:center;gap:8px;border:2px dashed #E2EAF4;border-radius:16px;padding:20px;cursor:pointer;background:white;font-size:.82rem;color:#64748B;margin-bottom:4px">'
    + '<span style="font-size:1.5rem">📷</span> Agregar fotos'
    + '<input type="file" id="input-fotos" accept="image/*" multiple style="display:none" onchange="previsualizarFotos(this)"/>'
    + '</label>'
    + '<p style="font-size:.65rem;color:#94A3B8;margin-bottom:2px">Máximo 5 fotos · JPG, PNG</p>'
    /* Tipo */
    + '<div class="fsec">🏠 Tipo de propiedad</div>'
    + '<div class="tipo-grid" id="tipo-grid">'
    + tipos.map(function(t,i){ return '<button class="tipo-opt ' + (i===0?'on':'') + '" onclick="selTipo(this)" data-tipo="' + t[1] + '">' + t[0] + ' ' + t[1] + '</button>'; }).join('')
    + '</div>'
    /* Detalles */
    + '<div class="fsec">📝 Detalles</div>'
    + '<div class="fgroup"><label class="flabel">Título del anuncio *</label><input class="finput" id="pub-titulo" type="text" placeholder="Ej: Hermosa villa con piscina en Punta Cana"/></div>'
    + '<div class="frow">'
    + '<div class="fgroup"><label class="flabel">Precio / mes (RD$) *</label><input class="finput" id="pub-precio" type="number" placeholder="25000"/></div>'
    + '<div class="fgroup"><label class="flabel">Habitaciones *</label><input class="finput" id="pub-hab" type="number" placeholder="3" min="1"/></div>'
    + '</div>'
    + '<div class="frow">'
    + '<div class="fgroup"><label class="flabel">Baños</label><input class="finput" id="pub-ban" type="number" placeholder="2" min="1"/></div>'
    + '<div class="fgroup"><label class="flabel">Metros cuadrados</label><input class="finput" id="pub-m2" type="number" placeholder="120"/></div>'
    + '</div>'
    + '<div class="fgroup"><label class="flabel">Ciudad *</label><input class="finput" id="pub-ciudad" type="text" placeholder="Santo Domingo, Punta Cana, Santiago…"/></div>'
    + '<div class="fgroup"><label class="flabel">Sector / Barrio</label><input class="finput" id="pub-sector" type="text" placeholder="Naco, Los Jardines…"/></div>'
    + '<div class="fgroup"><label class="flabel">WhatsApp de contacto *</label><input class="finput finput-wa" id="pub-tel" type="tel" placeholder="+1 (809) 000-0000"/></div>'
    + '<div class="fgroup"><label class="flabel">Descripción *</label><textarea class="finput ftextarea" id="pub-desc" placeholder="Describe tu propiedad, menciona lo más importante…"></textarea></div>'
    /* Comodidades */
    + '<div class="fsec">✅ Comodidades</div>'
    + '<div class="como-grid">'
    + comods.map(function(c){ return '<button class="como-item" onclick="toggleComod(this)" data-comod="' + c + '"><div class="cbox off">✓</div>' + c + '</button>'; }).join('')
    + '</div>'
    /* Botón publicar */
    + '<button class="btn btn-azul" style="margin-top:6px" onclick="submitPublicar()">🚀 Publicar anuncio</button>'
    + '<button class="btn btn-out" style="margin-top:10px;color:#64748B;border-color:#E2EAF4" onclick="ir(\'explorar\')">Cancelar</button>'
    + '</div></div>';
}

function previsualizarFotos(input) {
  var prev = document.getElementById('fotos-preview');
  if (!prev) return;
  prev.innerHTML = '';
  var files = Array.from(input.files || []).slice(0, 5);
  files.forEach(function(f) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var div = document.createElement('div');
      div.style.cssText = 'width:72px;height:72px;border-radius:10px;background-image:url(' + e.target.result + ');background-size:cover;background-position:center;border:2px solid #E2EAF4';
      prev.appendChild(div);
    };
    reader.readAsDataURL(f);
  });
}

function submitPublicar() {
  var titulo  = document.getElementById('pub-titulo');
  var precio_ = document.getElementById('pub-precio');
  var hab     = document.getElementById('pub-hab');
  var ban     = document.getElementById('pub-ban');
  var m2      = document.getElementById('pub-m2');
  var ciudad  = document.getElementById('pub-ciudad');
  var sector  = document.getElementById('pub-sector');
  var tel     = document.getElementById('pub-tel');
  var desc    = document.getElementById('pub-desc');
  var tipoBtn = document.querySelector('.tipo-opt.on');
  var inpFoto = document.getElementById('input-fotos');

  /* Validaciones */
  if (!titulo  || !titulo.value.trim())   { toast('Escribe el título del anuncio','err');    return; }
  if (!precio_ || !precio_.value)         { toast('Escribe el precio por mes','err');        return; }
  if (!hab     || !hab.value)             { toast('Indica el número de habitaciones','err'); return; }
  if (!ciudad  || !ciudad.value.trim())   { toast('Escribe la ciudad','err');                return; }
  if (!tel     || !tel.value.trim())      { toast('Escribe tu número de WhatsApp','err');    return; }
  if (!desc    || !desc.value.trim())     { toast('Escribe una descripción','err');          return; }

  /* Recoger comodidades seleccionadas */
  var comodSelec = [];
  document.querySelectorAll('.como-item.on').forEach(function(b) {
    if (b.dataset.comod) comodSelec.push(b.dataset.comod);
  });

  var datos = {
    titulo:   titulo.value.trim(),
    tipo:     tipoBtn ? tipoBtn.dataset.tipo : 'Casa',
    precio:   precio_.value,
    hab:      hab.value,
    ban:      ban  ? ban.value  : 1,
    m2:       m2   ? m2.value   : 0,
    ciudad:   ciudad.value.trim(),
    sector:   sector ? sector.value.trim() : '',
    telefono: tel.value.trim(),
    desc:     desc.value.trim(),
    comod:    comodSelec,
  };

  var fotos = inpFoto ? leerFotos(inpFoto) : [];
  publicarPropiedad(datos, fotos);
}

/* ══════════════════════════════
   PÁGINA 7 — MENSAJES
══════════════════════════════ */
function pagMensajes() {
  return '<div class="pb-nav">'
    + '<div style="background:white;padding:44px 18px 14px;border-bottom:1px solid #E2EAF4;position:sticky;top:0;z-index:100">'
    + '<h2 style="font-family:\'Fraunces\',serif;font-size:1.15rem;font-weight:700;color:#0D1F35;margin-bottom:10px">Mensajes 💬</h2>'
    + '<div style="display:flex;align-items:center;gap:8px;background:#F5F7FB;border:1px solid #E2EAF4;border-radius:12px;padding:9px 12px;font-size:.76rem;color:#64748B">🔍 <span>Buscar conversaciones…</span></div>'
    + '</div>'
    + CONVS.map(function(c) {
        return '<div class="conv ' + (c.nr>0?'unread':'') + '" onclick="ir(\'chat\',{n:\'' + c.n + '\',cid:\'' + c.id + '\'})">'
          + '<div class="av av-md ' + (c.online?'av-on':'') + '" style="background:' + c.c + '">' + iniciales(c.n) + '</div>'
          + '<div class="conv-body">'
          + '<div class="conv-top"><span class="conv-name">' + c.n + '</span><span class="conv-time">' + c.h + '</span></div>'
          + '<p class="conv-prop">' + c.prop + '</p>'
          + '<p class="conv-last ' + (c.nr>0?'b':'') + '">' + c.ult + '</p>'
          + '</div>'
          + (c.nr>0 ? '<div class="ubadge">' + c.nr + '</div>' : '')
          + '</div>';
      }).join('')
    + '</div>';
}

/* ══════════════════════════════
   PÁGINA 8 — CHAT
══════════════════════════════ */
function pagChat(params) {
  params = params || {};
  var n  = params.n  || 'Roberto Vargas';
  var t  = params.t  || 'Villa Las Palmas';
  var pr = params.pr || 25000;

  return '<div class="chat-wrap">'
    + '<div class="chat-head">'
    + '<button onclick="ir(\'mensajes\')" style="font-size:1.1rem;color:#1B4F8A;font-weight:700;cursor:pointer;background:none;border:none">←</button>'
    + '<div class="av av-sm av-on" style="background:linear-gradient(135deg,#1B4F8A,#F5A623)">' + iniciales(n) + '</div>'
    + '<div style="flex:1"><p style="font-weight:700;font-size:.84rem;color:#0D1F35">' + n + ' ✓</p><p style="font-size:.63rem;color:#10B981;font-weight:700">● En línea ahora</p></div>'
    + '<span style="color:#64748B;font-size:1.1rem">⋮</span>'
    + '</div>'
    + '<div class="chat-prop-b">'
    + '<div style="width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,#FDEBC8,#F0B86E);display:flex;align-items:center;justify-content:center;font-size:1.3rem">🏠</div>'
    + '<div><p style="font-weight:700;font-size:.74rem;color:#0D1F35">' + t + '</p><p style="font-size:.66rem;color:#1B4F8A;font-weight:700">' + precio(pr) + ' / mes</p></div>'
    + '</div>'
    + '<div class="chat-msgs" id="chat-msgs">'
    + '<p style="text-align:center;font-size:.6rem;color:#64748B;margin-bottom:8px">Hoy, 10:32 AM</p>'
    + '<div><div class="bubble b-them">¡Hola! Vi su propiedad en CasaRD. ¿Está disponible?</div><p class="btime">10:32</p></div>'
    + '<div><div class="bubble b-me">¡Buenas! Sí, disponible desde el 1 de febrero. ¿Para cuántas personas?</div><p class="btime me">10:34 ✓✓</p></div>'
    + '<div><div class="bubble b-them">Somos familia de 4. ¿La planta eléctrica funciona bien?</div><p class="btime">10:36</p></div>'
    + '<div><div class="bubble b-me">Sí, planta de 20KVA. Incluye agua, internet y seguridad.</div><p class="btime me">10:38 ✓✓</p></div>'
    + '</div>'
    + '<button class="btn btn-wa" style="margin:8px 14px;width:calc(100% - 28px)" onclick="wa(\'18090000001\',\'¡Hola! Continuamos desde CasaRD 🏠🇩🇴\')">💬 Continuar en WhatsApp</button>'
    + '<div class="chat-ibar">'
    + '<span style="color:#64748B">📎</span>'
    + '<input class="chat-inp" id="cinput" placeholder="Escribe un mensaje…" onkeydown="if(event.key===\'Enter\')enviarMsg()"/>'
    + '<button class="send-btn" onclick="enviarMsg()">➤</button>'
    + '</div></div>';
}

/* ══════════════════════════════
   PÁGINA 9 — PERFIL
══════════════════════════════ */
function pagPerfil() {
  var u      = S.usuario || {};
  var nombre = u.nombre || 'Usuario CasaRD';

  var menuProps = [
    ['🏠','#EBF3FF','Mis anuncios',   '4 propiedades activas',  '4'],
    ['❤️','#FFF0EB','Favoritos',       '18 propiedades guardadas',''],
    ['📅','#EBFFF3','Mis reservas',    '2 reservas activas',     '2'],
  ];
  var menuCuenta = [
    ['💬','rgba(37,211,102,.12)','WhatsApp vinculado', u.telefono || '+1 (809) 000-0000'],
    ['🔔','#FFF8EB',              'Notificaciones',    'Gestionar alertas'],
    ['⚙️','#F5EBFF',              'Configuración',     'Idioma, moneda RD$'],
  ];

  return '<div class="pb-nav">'
    + '<div class="hero-oscuro" style="text-align:center;padding-bottom:26px">'
    + '<div class="sbar d"><span>9:41</span><span>●●● 100%</span></div>'
    + '<div style="position:relative;display:inline-block;margin-bottom:12px">'
    + (u.foto
        ? '<img src="' + u.foto + '" style="width:76px;height:76px;border-radius:50%;border:3px solid rgba(255,255,255,.2);object-fit:cover">'
        : '<div class="av av-lg" style="background:linear-gradient(135deg,#F5A623,#E85D3A);margin:0 auto">' + iniciales(nombre) + '</div>')
    + '<span style="position:absolute;bottom:2px;right:2px;width:22px;height:22px;border-radius:50%;background:#10B981;border:2px solid #0D1F35;display:flex;align-items:center;justify-content:center;font-size:.65rem;color:white">✓</span>'
    + '</div>'
    + '<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.15rem;font-weight:700">' + nombre + '</h2>'
    + '<p style="color:rgba(255,255,255,.4);font-size:.68rem;margin:4px 0 14px">' + (u.email || '') + '</p>'
    + '<div style="display:flex;border-top:1px solid rgba(255,255,255,.07);padding-top:14px">'
    + [['4','Anuncios'],['34','Reseñas'],['4.9','Calificación']].map(function(s,i,a){
        return '<div style="flex:1;text-align:center">'
          + '<span style="font-family:\'Fraunces\',serif;color:white;font-size:1.15rem;font-weight:700;display:block">' + s[0] + '</span>'
          + '<span style="color:rgba(255,255,255,.35);font-size:.6rem">' + s[1] + '</span>'
          + '</div>' + (i<a.length-1?'<div style="width:1px;background:rgba(255,255,255,.07)"></div>':'');
      }).join('')
    + '</div></div>'
    + '<div class="page-body">'
    + '<p class="secth">MIS PROPIEDADES</p>'
    + '<div class="pmenu">'
    + menuProps.map(function(m){
        return '<div class="pitem" onclick="toast(\'' + m[2] + ' — próximamente\',\'info\')">'
          + '<div class="pic" style="background:' + m[1] + '">' + m[0] + '</div>'
          + '<div class="ptxt"><p class="pm">' + m[2] + '</p><p class="ps">' + m[3] + '</p></div>'
          + (m[4]?'<span class="pbadge">' + m[4] + '</span>':'')
          + '<span style="color:#64748B;font-size:.8rem">›</span></div>';
      }).join('')
    + '</div>'
    + '<p class="secth" style="margin-top:16px">CUENTA</p>'
    + '<div class="pmenu">'
    + menuCuenta.map(function(m){
        return '<div class="pitem" onclick="toast(\'' + m[2] + ' — próximamente\',\'info\')">'
          + '<div class="pic" style="background:' + m[1] + '">' + m[0] + '</div>'
          + '<div class="ptxt"><p class="pm">' + m[2] + '</p><p class="ps">' + m[3] + '</p></div>'
          + '<span style="color:#64748B;font-size:.8rem">›</span></div>';
      }).join('')
    + '<div class="pitem" onclick="salir()">'
    + '<div class="pic" style="background:#FFEBEB">🚪</div>'
    + '<div class="ptxt"><p class="pm" style="color:#C0392B">Cerrar sesión</p><p class="ps">Terminar sesión actual</p></div>'
    + '<span style="color:#64748B;font-size:.8rem">›</span></div>'
    + '</div></div></div>';
}
