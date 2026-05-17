/* ═══════════════════════════════════════════════════
   CASARD — PAGINAS.JS
   Las 7 páginas de la app. Cada función devuelve
   el HTML de su página. Modificar una no afecta las demás.
════════════════════════════════════════════════════ */

/* ══════════════════════════════
   TARJETAS (usadas en explorar)
══════════════════════════════ */

function tarjetaH(p) {
  return '<div class="hcard" onclick="ir(\'detalle\',{id:\'' + p.id + '\'})">'
    + '<div class="hcard-img" style="background:' + p.grad + '">'
    + p.emoji
    + (p.top   ? '<span class="badge b-tl b-top">⭐ TOP</span>' : '')
    + (p.nuevo ? '<span class="badge b-tl b-nuevo">NUEVO</span>' : '')
    + '<span class="b-fav" onclick="event.stopPropagation();toast(\'Guardado en favoritos ❤️\',\'ok\')">🤍</span>'
    + '</div>'
    + '<div class="hcard-body">'
    + '<p class="hcard-name">' + p.titulo + '</p>'
    + '<p class="hcard-loc">📍 ' + p.ciudad + ' · ' + p.dist + '</p>'
    + '<div class="hcard-ft">'
    + '<span class="price">' + precio(p.precio) + '<small>/mes</small></span>'
    + '<span class="stars">★ ' + p.val + '</span>'
    + '</div></div></div>';
}

function tarjetaV(p) {
  var msgWa = '¡Hola! Vi ' + p.titulo + ' en CasaRD (' + precio(p.precio) + '/mes en ' + p.ciudad + '). ¿Sigue disponible? 🏠🇩🇴';
  return '<div class="vcard" onclick="ir(\'detalle\',{id:\'' + p.id + '\'})">'
    + '<div class="vcard-img" style="background:' + p.grad + '">'
    + p.emoji
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
    + '<button class="btn btn-wa btn-sm" onclick="event.stopPropagation();wa(\'' + p.wa + '\',\'' + msgWa.replace(/'/g, "\\'") + '\')">💬 WhatsApp</button>'
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
    + '<p class="sp-desc">Encuentra tu hogar ideal cerca de ti,<br>junto a la playa, en el campo o en el<br>corazón de la ciudad dominicana.</p>'
    + '<div class="sp-trust">'
    + '<div><span class="sp-tn">100+</span><span class="sp-tl">Propiedades</span></div>'
    + '<div class="sp-tdiv"></div>'
    + '<div><span class="sp-tn">RD$</span><span class="sp-tl">Precios locales</span></div>'
    + '<div class="sp-tdiv"></div>'
    + '<div><span class="sp-tn">💬</span><span class="sp-tl">WhatsApp</span></div>'
    + '</div>'
    + '<div class="sp-btns">'
    + '<button class="btn btn-dorado" onclick="entrar()">Comenzar ahora →</button>'
    + '<button class="btn btn-out" onclick="entrar()">Ya tengo una cuenta</button>'
    + '</div>'
    + '<p class="sp-legal">Al continuar aceptas nuestros <u>Términos de uso</u> y la <u>Política de privacidad</u></p>'
    + '</div>';
}

/* ══════════════════════════════
   PÁGINA 2 — EXPLORAR
══════════════════════════════ */
function pagExplorar(params) {
  params = params || {};
  var tipo  = params.tipo || 'Todos';
  var lista = tipo === 'Todos' ? PROPS : PROPS.filter(function(p) { return p.tipo === tipo; });
  var dest  = PROPS.filter(function(p) { return p.top || p.nuevo; });
  var tipos = ['Todos','Casa','Apartamento','Villa','Cabaña','Estudio'];

  return '<div class="pb-nav">'
    /* HERO */
    + '<div class="hero-azul">'
    + '<div class="sbar d"><span>9:41</span><span>●●● 100%</span></div>'
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">'
    + '<div>'
    + '<p style="font-size:.68rem;color:rgba(255,255,255,.5)">Buenos días 👋</p>'
    + '<p style="font-family:\'Fraunces\',serif;font-size:1.05rem;font-weight:700">' + (S.usuario ? S.usuario.nombre : 'Bienvenido') + '</p>'
    + '</div>'
    + '<div style="width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:1rem">🔔</div>'
    + '</div>'
    + '<div class="s-bar">'
    + '<span style="color:rgba(255,255,255,.5)">🔍</span>'
    + '<input type="text" id="inp-buscar" placeholder="Ciudad, barrio, sector…" oninput="buscar(this.value)"/>'
    + '<div class="fbtn">🎛</div>'
    + '</div>'
    + '<div class="chips">'
    + tipos.map(function(t) {
        return '<button class="chip ' + (t === tipo ? 'on' : '') + '" onclick="ir(\'explorar\',{tipo:\'' + t + '\'})">' + t + '</button>';
      }).join('')
    + '</div>'
    + '</div>'
    /* DESTACADOS */
    + '<div class="sec-h"><span class="sec-t">Destacados ✨</span><span class="sec-a">Ver todos</span></div>'
    + '<div class="hscroll">' + dest.map(tarjetaH).join('') + '</div>'
    /* MAPA */
    + '<div class="sec-h" style="margin-top:6px"><span class="sec-t">Mapa 🗺️</span><span class="sec-a">Ampliar</span></div>'
    + '<div class="map-box" onclick="toast(\'Mapa interactivo próximamente 🗺️\',\'info\')">'
    + '<div class="map-grid"></div><div class="map-rh"></div><div class="map-rv"></div>'
    + '<div class="map-pin" style="background:#1B4F8A;top:26px;left:55px"></div>'
    + '<div class="map-pin" style="background:#E85D3A;top:54px;left:130px"></div>'
    + '<div class="map-pin" style="background:#10B981;top:20px;right:46px"></div>'
    + '<div class="map-lbl">🏠 ' + PROPS.length + ' propiedades disponibles</div>'
    + '</div>'
    /* LISTA */
    + '<div class="sec-h" style="margin-top:6px"><span class="sec-t">Todas las propiedades</span><span class="sec-a">' + lista.length + ' disponibles</span></div>'
    + '<div class="page-body" id="lista-v">' + lista.map(tarjetaV).join('') + '</div>'
    + '</div>';
}

/* ══════════════════════════════
   PÁGINA 3 — DETALLE
══════════════════════════════ */
function pagDetalle(params) {
  params = params || {};
  var p = PROPS.filter(function(x) { return x.id === params.id; })[0] || PROPS[0];
  var msgWa = '¡Hola! Vi ' + p.titulo + ' en CasaRD (' + precio(p.precio) + '/mes en ' + p.ciudad + '). ¿Sigue disponible? 🏠🇩🇴';

  return '<div style="background:white;padding-bottom:90px">'
    /* IMAGEN */
    + '<div class="det-img" style="background:' + p.grad + '">'
    + '<span style="font-size:5rem">' + p.emoji + '</span>'
    + '<button class="det-back" onclick="ir(\'explorar\')">← Volver</button>'
    + '<button class="det-fav" onclick="toast(\'Guardado en favoritos ❤️\',\'ok\')">❤️</button>'
    + '<div class="det-dots"><div class="ddot on"></div><div class="ddot"></div><div class="ddot"></div></div>'
    + '</div>'
    /* CUERPO */
    + '<div class="page-body">'
    /* Tags */
    + '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">'
    + '<span class="dtag">🛏 ' + p.hab + ' hab.</span>'
    + '<span class="dtag">🛁 ' + p.ban + ' baños</span>'
    + '<span class="dtag">📐 ' + p.m2 + 'm²</span>'
    + '<span class="dtag">🚗 Parqueo</span>'
    + '</div>'
    /* Título */
    + '<h1 style="font-family:\'Fraunces\',serif;font-size:1.3rem;font-weight:700;color:#0D1F35;margin-bottom:4px">' + p.titulo + '</h1>'
    + '<p style="font-size:.73rem;color:#64748B;margin-bottom:10px">📍 ' + p.ciudad + ', ' + p.sector + ' · ' + p.dist + ' de ti</p>'
    /* Precio */
    + '<div class="det-pr-row">'
    + '<div><span class="det-pr">' + precio(p.precio) + '</span><span style="font-size:.7rem;color:#64748B">/mes</span></div>'
    + '<div style="display:flex;align-items:center;gap:4px;font-size:.78rem;font-weight:700">⭐ ' + p.val + ' <span style="color:#64748B;font-size:.65rem">(' + p.res + ')</span></div>'
    + '</div>'
    /* Botones */
    + '<button class="btn btn-wa mb10" onclick="wa(\'' + p.wa + '\',\'' + msgWa.replace(/'/g, "\\'") + '\')">💬 Contactar por WhatsApp</button>'
    + '<button class="btn btn-azul mb14" onclick="toast(\'Visita solicitada — el propietario te contactará pronto 📅\',\'ok\')">📅 Solicitar visita</button>'
    /* Comodidades */
    + '<p class="sec-titulo">Comodidades</p>'
    + '<div class="amen-grid">' + p.comod.map(function(c) { return '<div class="amen">' + c + '</div>'; }).join('') + '</div>'
    /* Descripción */
    + '<p class="sec-titulo">Descripción</p>'
    + '<p style="font-size:.75rem;color:#64748B;line-height:1.65;margin-bottom:14px">' + p.desc + '</p>'
    /* Propietario */
    + '<p class="sec-titulo">Propietario</p>'
    + '<div class="owner-card">'
    + '<div class="av av-md" style="background:linear-gradient(135deg,#1B4F8A,#F5A623)">' + iniciales(p.prop) + '</div>'
    + '<div style="flex:1">'
    + '<p style="font-weight:700;font-size:.82rem;color:#0D1F35">' + p.prop + '</p>'
    + '<p style="font-size:.65rem;color:#10B981;font-weight:700">✓ Propietario verificado</p>'
    + '<p style="font-size:.62rem;color:#64748B">Responde en menos de 1h</p>'
    + '</div>'
    + '<button class="btn btn-dark btn-sm" onclick="ir(\'chat\',{n:\'' + p.prop + '\',t:\'' + p.titulo + '\',pr:' + p.precio + '})">Chat</button>'
    + '</div>'
    /* Reseñas */
    + '<p class="sec-titulo">Reseñas recientes</p>'
    + p.opiniones.map(function(o) {
        return '<div class="resena">'
          + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">'
          + '<div class="av av-sm" style="background:' + o.c + '">' + o.i + '</div>'
          + '<span style="font-weight:700;font-size:.72rem;color:#0D1F35;flex:1">' + o.n + '</span>'
          + '<span style="font-size:.62rem;color:#F5A623">' + o.s + '</span>'
          + '</div>'
          + '<p style="font-size:.7rem;color:#64748B;line-height:1.55">' + o.t + '</p>'
          + '</div>';
      }).join('')
    + '</div></div>';
}

/* ══════════════════════════════
   PÁGINA 4 — PUBLICAR
══════════════════════════════ */
function pagPublicar() {
  var tipos = [['🏠','Casa'],['🏢','Apartamento'],['🏡','Villa'],['🛖','Cabaña'],['🏩','Estudio'],['🏗️','Otro']];
  return '<div class="pb-nav">'
    + '<div class="hero-oscuro">'
    + '<div class="sbar d"><span>9:41</span><span>●●● 100%</span></div>'
    + '<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.25rem;font-weight:700;margin-bottom:3px">Publicar propiedad</h2>'
    + '<p style="color:rgba(255,255,255,.45);font-size:.72rem">Paso 1 de 3 · Información básica</p>'
    + '<div class="steps"><div class="step done"></div><div class="step now"></div><div class="step"></div></div>'
    + '</div>'
    + '<div class="page-body">'
    + '<div class="aviso av-wa"><span style="font-size:1.1rem;flex-shrink:0">💬</span>'
    + '<span><b>Tip:</b> Los inquilinos te contactarán directamente por <b>WhatsApp</b>. Asegúrate de poner tu número correcto.</span>'
    + '</div>'
    + '<div class="fsec">🏠 Tipo de propiedad</div>'
    + '<div class="tipo-grid">'
    + tipos.map(function(t, i) {
        return '<button class="tipo-opt ' + (i === 0 ? 'on' : '') + '" onclick="selTipo(this)">' + t[0] + ' ' + t[1] + '</button>';
      }).join('')
    + '</div>'
    + '<div class="fsec">📝 Detalles</div>'
    + '<div class="fgroup"><label class="flabel">Título del anuncio</label><input class="finput" placeholder="Ej: Hermosa villa con piscina…"/></div>'
    + '<div class="frow">'
    + '<div class="fgroup"><label class="flabel">Precio / mes (RD$)</label><input class="finput" type="number" placeholder="25000"/></div>'
    + '<div class="fgroup"><label class="flabel">Habitaciones</label><input class="finput" type="number" placeholder="3"/></div>'
    + '</div>'
    + '<div class="fgroup"><label class="flabel">Ciudad / Sector</label><input class="finput" placeholder="Punta Cana…"/></div>'
    + '<div class="fgroup"><label class="flabel">WhatsApp de contacto</label><input class="finput finput-wa" type="tel" placeholder="+1 (809) 000-0000"/></div>'
    + '<div class="fgroup"><label class="flabel">Descripción</label><textarea class="finput ftextarea" placeholder="Describe tu propiedad…"></textarea></div>'
    + '<button class="btn btn-azul" onclick="toast(\'¡Guardado! Continúa al paso 2 →\',\'ok\')">Continuar →</button>'
    + '</div></div>';
}

/* ══════════════════════════════
   PÁGINA 5 — MENSAJES
══════════════════════════════ */
function pagMensajes() {
  return '<div class="pb-nav">'
    + '<div style="background:white;padding:44px 18px 14px;border-bottom:1px solid #E2EAF4">'
    + '<h2 style="font-family:\'Fraunces\',serif;font-size:1.15rem;font-weight:700;color:#0D1F35;margin-bottom:10px">Mensajes 💬</h2>'
    + '<div style="display:flex;align-items:center;gap:8px;background:#F5F7FB;border:1px solid #E2EAF4;border-radius:12px;padding:9px 12px;font-size:.76rem;color:#64748B">🔍 <span>Buscar conversaciones…</span></div>'
    + '</div>'
    + CONVS.map(function(c) {
        return '<div class="conv ' + (c.nr > 0 ? 'unread' : '') + '" onclick="ir(\'chat\',{n:\'' + c.n + '\',cid:\'' + c.id + '\'})">'
          + '<div class="av av-md ' + (c.online ? 'av-on' : '') + '" style="background:' + c.c + '">' + iniciales(c.n) + '</div>'
          + '<div class="conv-body">'
          + '<div class="conv-top"><span class="conv-name">' + c.n + '</span><span class="conv-time">' + c.h + '</span></div>'
          + '<p class="conv-prop">' + c.prop + '</p>'
          + '<p class="conv-last ' + (c.nr > 0 ? 'b' : '') + '">' + c.ult + '</p>'
          + '</div>'
          + (c.nr > 0 ? '<div class="ubadge">' + c.nr + '</div>' : '')
          + '</div>';
      }).join('')
    + '</div>';
}

/* ══════════════════════════════
   PÁGINA 6 — CHAT
══════════════════════════════ */
function pagChat(params) {
  params = params || {};
  var n  = params.n  || 'Roberto Vargas';
  var t  = params.t  || 'Villa Las Palmas';
  var pr = params.pr || 25000;

  return '<div class="chat-wrap">'
    /* Cabecera */
    + '<div class="chat-head">'
    + '<button onclick="ir(\'mensajes\')" style="font-size:1.1rem;color:#1B4F8A;font-weight:700;cursor:pointer">←</button>'
    + '<div class="av av-sm av-on" style="background:linear-gradient(135deg,#1B4F8A,#F5A623)">' + iniciales(n) + '</div>'
    + '<div style="flex:1">'
    + '<p style="font-weight:700;font-size:.84rem;color:#0D1F35">' + n + ' ✓</p>'
    + '<p style="font-size:.63rem;color:#10B981;font-weight:700">● En línea ahora</p>'
    + '</div>'
    + '<span style="color:#64748B;font-size:1.1rem">⋮</span>'
    + '</div>'
    /* Banner propiedad */
    + '<div class="chat-prop-b">'
    + '<div style="width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,#FDEBC8,#F0B86E);display:flex;align-items:center;justify-content:center;font-size:1.3rem">🏠</div>'
    + '<div>'
    + '<p style="font-weight:700;font-size:.74rem;color:#0D1F35">' + t + ' · Punta Cana</p>'
    + '<p style="font-size:.66rem;color:#1B4F8A;font-weight:700">' + precio(pr) + ' / mes</p>'
    + '</div>'
    + '</div>'
    /* Mensajes */
    + '<div class="chat-msgs" id="chat-msgs">'
    + '<p style="text-align:center;font-size:.6rem;color:#64748B;margin-bottom:8px">Hoy, 10:32 AM</p>'
    + '<div><div class="bubble b-them">¡Hola! Vi su propiedad en CasaRD. ¿Está disponible?</div><p class="btime">10:32</p></div>'
    + '<div><div class="bubble b-me">¡Buenas! Sí, disponible desde el 1 de febrero. ¿Para cuántas personas?</div><p class="btime me">10:34 ✓✓</p></div>'
    + '<div><div class="bubble b-them">Somos familia de 4. ¿La planta eléctrica funciona bien?</div><p class="btime">10:36</p></div>'
    + '<div><div class="bubble b-me">Sí, planta de 20KVA. El precio incluye agua, internet y seguridad. Solo la luz va aparte.</div><p class="btime me">10:38 ✓✓</p></div>'
    + '<div><div class="bubble b-them">¡Perfecto! ¿Podemos visitar este fin de semana?</div><p class="btime">10:40</p></div>'
    + '<div><div class="bubble b-me">¡Claro! ¿Sábado 10am? Les comparto la ubicación exacta 📍</div><p class="btime me">10:41 ✓✓</p></div>'
    + '</div>'
    /* Botón WhatsApp */
    + '<button class="btn btn-wa" style="margin:8px 14px;width:calc(100% - 28px)" onclick="wa(\'18090000001\',\'¡Hola! Continuamos la conversación desde CasaRD 🏠🇩🇴\')">💬 Continuar en WhatsApp</button>'
    /* Input */
    + '<div class="chat-ibar">'
    + '<span style="color:#64748B">📎</span>'
    + '<input class="chat-inp" id="cinput" placeholder="Escribe un mensaje…" onkeydown="if(event.key===\'Enter\')enviarMsg()"/>'
    + '<button class="send-btn" onclick="enviarMsg()">➤</button>'
    + '</div>'
    + '</div>';
}

/* ══════════════════════════════
   PÁGINA 7 — PERFIL
══════════════════════════════ */
function pagPerfil() {
  var u      = S.usuario || {};
  var nombre = u.nombre || 'Usuario CasaRD';
  var ini    = iniciales(nombre);

  var menuProps = [
    ['🏠','#EBF3FF','Mis anuncios',    '4 propiedades activas', '4'],
    ['❤️','#FFF0EB','Favoritos',        '18 propiedades guardadas', ''],
    ['📅','#EBFFF3','Mis reservas',     '2 reservas activas',    '2'],
  ];
  var menuCuenta = [
    ['💬','rgba(37,211,102,.12)','WhatsApp vinculado', '+1 (809) 000-0000'],
    ['🔔','#FFF8EB',              'Notificaciones',     'Gestionar alertas'],
    ['⚙️','#F5EBFF',              'Configuración',      'Idioma, moneda RD$'],
  ];

  function itemMenu(ic, bg, t, s, badge) {
    return '<div class="pitem" onclick="toast(\'' + t + ' — próximamente\',\'info\')">'
      + '<div class="pic" style="background:' + bg + '">' + ic + '</div>'
      + '<div class="ptxt"><p class="pm">' + t + '</p><p class="ps">' + s + '</p></div>'
      + (badge ? '<span class="pbadge">' + badge + '</span>' : '')
      + '<span style="color:#64748B;font-size:.8rem">›</span>'
      + '</div>';
  }

  return '<div class="pb-nav">'
    /* Hero */
    + '<div class="hero-oscuro" style="text-align:center;padding-bottom:26px">'
    + '<div class="sbar d"><span>9:41</span><span>●●● 100%</span></div>'
    + '<div style="position:relative;display:inline-block;margin-bottom:12px">'
    + '<div class="av av-lg" style="background:linear-gradient(135deg,#F5A623,#E85D3A);margin:0 auto">' + ini + '</div>'
    + '<span style="position:absolute;bottom:2px;right:2px;width:22px;height:22px;border-radius:50%;background:#10B981;border:2px solid #0D1F35;display:flex;align-items:center;justify-content:center;font-size:.65rem;color:white">✓</span>'
    + '</div>'
    + '<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.15rem;font-weight:700">' + nombre + '</h2>'
    + '<p style="color:rgba(255,255,255,.4);font-size:.68rem;margin:4px 0 14px">📍 Santo Domingo, RD · Miembro desde 2024</p>'
    + '<div style="display:flex;border-top:1px solid rgba(255,255,255,.07);padding-top:14px">'
    + [['4','Anuncios'],['34','Reseñas'],['4.9','Calificación']].map(function(s, i, a) {
        return '<div style="flex:1;text-align:center">'
          + '<span style="font-family:\'Fraunces\',serif;color:white;font-size:1.15rem;font-weight:700;display:block">' + s[0] + '</span>'
          + '<span style="color:rgba(255,255,255,.35);font-size:.6rem">' + s[1] + '</span>'
          + '</div>'
          + (i < a.length - 1 ? '<div style="width:1px;background:rgba(255,255,255,.07)"></div>' : '');
      }).join('')
    + '</div>'
    + '</div>'
    /* Cuerpo */
    + '<div class="page-body">'
    + '<p class="secth">MIS PROPIEDADES</p>'
    + '<div class="pmenu">' + menuProps.map(function(m) { return itemMenu(m[0],m[1],m[2],m[3],m[4]); }).join('') + '</div>'
    + '<p class="secth" style="margin-top:16px">CUENTA</p>'
    + '<div class="pmenu">'
    + menuCuenta.map(function(m) { return itemMenu(m[0],m[1],m[2],m[3],''); }).join('')
    + '<div class="pitem" onclick="salir()">'
    + '<div class="pic" style="background:#FFEBEB">🚪</div>'
    + '<div class="ptxt"><p class="pm" style="color:#C0392B">Cerrar sesión</p><p class="ps">Terminar sesión actual</p></div>'
    + '<span style="color:#64748B;font-size:.8rem">›</span>'
    + '</div>'
    + '</div>'
    + '</div></div>';
}
