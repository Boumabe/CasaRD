/* ═══════════════════════════════════════════════════
   CASARD PRIME — PAGINAS.JS
   Interfaz más profesional y localizada para RD.
════════════════════════════════════════════════════ */

function tarjetaH(p) {
  var bg = 'background:' + p.grad + (p.foto ? ';background-image:url("' + p.foto + '");background-size:cover;background-position:center' : '');
  return '<div class="hcard" onclick="ir(\'detalle\',{id:\'' + p.id + '\'})">'
    + '<div class="hcard-img" style="' + bg + '">'
    + (p.foto ? '' : p.emoji)
    + (p.top ? '<span class="badge b-tl b-top">DESTACADO</span>' : '')
    + (!p.top && p.nuevo ? '<span class="badge b-tl b-nuevo">NUEVO</span>' : '')
    + '<span class="b-fav" onclick="event.stopPropagation();toast(\'Guardado en favoritos.\',\'ok\')">🤍</span>'
    + '</div>'
    + '<div class="hcard-body">'
    + '<div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start;margin-bottom:4px">'
    + '<p class="hcard-name" style="white-space:normal;line-height:1.35">' + p.titulo + '</p>'
    + '<span class="stars">★ ' + p.val + '</span>'
    + '</div>'
    + '<p class="hcard-loc">' + p.tipo + ' · ' + p.ciudad + (p.sector ? ' · ' + p.sector : '') + '</p>'
    + '<div class="hcard-ft">'
    + '<span class="price">' + precio(p.precio) + '<small>/mes</small></span>'
    + '<span style="font-size:.62rem;color:#64748B;font-weight:700">' + p.hab + ' hab.</span>'
    + '</div>'
    + '</div>'
    + '</div>';
}

function tarjetaV(p) {
  var bg = 'background:' + p.grad + (p.foto ? ';background-image:url("' + p.foto + '");background-size:cover;background-position:center' : '');
  var msg = mensajeContacto(p).replace(/'/g, "\\'");
  return '<div class="vcard" onclick="ir(\'detalle\',{id:\'' + p.id + '\'})">'
    + '<div class="vcard-img" style="' + bg + '">'
    + (p.foto ? '' : p.emoji)
    + (p.nuevo ? '<span class="badge b-tl b-nuevo">RECIENTE</span>' : '')
    + '<span class="b-fav" onclick="event.stopPropagation();toast(\'Guardado en favoritos.\',\'ok\')">🤍</span>'
    + '</div>'
    + '<div class="vcard-body">'
    + '<div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:6px">'
    + '<div style="flex:1">'
    + '<h3 style="font-size:.96rem;font-weight:800;color:#0D1F35;line-height:1.35">' + p.titulo + '</h3>'
    + '<p style="font-size:.71rem;color:#64748B;margin-top:2px">' + p.tipo + ' · ' + p.ciudad + (p.sector ? ' · ' + p.sector : '') + '</p>'
    + '</div>'
    + '<span class="stars">★ ' + p.val + '</span>'
    + '</div>'
    + '<div class="meta-row">'
    + '<span class="meta-chip">🛏 ' + p.hab + ' ' + plural(p.hab, 'hab.', 'hab.') + '</span>'
    + '<span class="meta-chip">🛁 ' + p.ban + ' baños</span>'
    + (p.m2 ? '<span class="meta-chip">📐 ' + p.m2 + ' m²</span>' : '')
    + '</div>'
    + '<p style="font-size:.72rem;color:#64748B;line-height:1.6;margin-bottom:10px">' + p.desc.substring(0, 110) + (p.desc.length > 110 ? '…' : '') + '</p>'
    + '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px">'
    + '<span class="price">' + precio(p.precio) + '<small>/mes</small></span>'
    + '<button class="btn btn-wa btn-sm" onclick="event.stopPropagation();wa(\'' + p.wa + '\',\'' + msg + '\')">WhatsApp</button>'
    + '</div>'
    + '</div>'
    + '</div>';
}

function pagBienvenida() {
  return '<div class="splash">'
    + '<div class="orb1"></div><div class="orb2"></div>'
    + '<div class="sp-logo">🏡</div>'
    + '<h1 class="sp-titulo">CasaRD Prime</h1>'
    + '<p class="sp-sub">Plataforma de alquileres para República Dominicana</p>'
    + '<p class="sp-desc">Una experiencia más clara, premium y orientada al mercado dominicano: zonas clave, precios en RD$, contacto directo por WhatsApp y anuncios mejor presentados.</p>'
    + '<div class="sp-trust">'
    + '<div><span class="sp-tn">RD$</span><span class="sp-tl">Moneda local</span></div>'
    + '<div class="sp-tdiv"></div>'
    + '<div><span class="sp-tn">24h</span><span class="sp-tl">Respuesta rápida</span></div>'
    + '<div class="sp-tdiv"></div>'
    + '<div><span class="sp-tn">🇩🇴</span><span class="sp-tl">Zonas clave</span></div>'
    + '</div>'
    + '<div class="soft-card" style="width:100%;max-width:420px;margin-bottom:18px;text-align:left">'
    + '<p class="soft-title">Cobertura sugerida</p>'
    + '<p class="soft-copy">Santo Domingo, Santiago, Punta Cana, Jarabacoa, La Romana y zonas de alta intención de búsqueda como Naco, Piantini, Bella Vista, Bávaro y Cocotal.</p>'
    + '</div>'
    + '<div class="sp-btns">'
    + '<button class="btn btn-dorado" onclick="ir(\'registro\')">Crear cuenta</button>'
    + '<button class="btn btn-out" onclick="ir(\'login\')">Ya tengo acceso</button>'
    + '</div>'
    + '<p class="sp-legal">Al continuar aceptas nuestros <u>Términos</u> y la <u>Política de privacidad</u>.</p>'
    + '</div>';
}

function pagRegistro() {
  return '<div style="min-height:100vh;background:linear-gradient(170deg,#080F1C,#0D1F35 45%,#132B50);padding-bottom:40px">'
    + '<div style="padding:52px 28px 28px;text-align:center">'
    + '<div class="sp-logo" style="margin:0 auto 16px">🏡</div>'
    + '<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.7rem;font-weight:900;margin-bottom:6px">Crear cuenta</h2>'
    + '<p style="color:rgba(255,255,255,.5);font-size:.8rem">Empieza a publicar o encontrar alquileres en RD.</p>'
    + '</div>'
    + '<div style="background:white;border-radius:28px 28px 0 0;padding:28px 24px;min-height:60vh">'
    + '<button class="btn" style="background:#F5F7FB;border:1.5px solid #E2EAF4;color:#0D1F35;margin-bottom:14px;font-weight:600" onclick="loginGoogle()">'
    + '<span style="font-size:1.1rem">G</span> Continuar con Google'
    + '</button>'
    + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;color:#94A3B8;font-size:.72rem">'
    + '<div style="flex:1;height:1px;background:#E2EAF4"></div>o con tu correo<div style="flex:1;height:1px;background:#E2EAF4"></div>'
    + '</div>'
    + '<div class="soft-card" style="margin-bottom:16px">'
    + '<p class="soft-title">Enfoque local</p>'
    + '<p class="soft-copy">Usa tu número de WhatsApp con prefijo 809, 829 o 849 para facilitar el contacto con clientes en República Dominicana.</p>'
    + '</div>'
    + '<div class="fgroup"><label class="flabel">Nombre completo *</label><input class="finput" id="reg-nombre" type="text" placeholder="Ej. Laura Gómez" autocomplete="name"/></div>'
    + '<div class="fgroup"><label class="flabel">Correo electrónico *</label><input class="finput" id="reg-email" type="email" placeholder="laura@correo.com" autocomplete="email"/></div>'
    + '<div class="fgroup"><label class="flabel">WhatsApp / Teléfono</label><input class="finput finput-wa" id="reg-tel" type="tel" placeholder="809-555-0101" autocomplete="tel"/></div>'
    + '<div class="fgroup"><label class="flabel">Contraseña * (mín. 6 caracteres)</label><input class="finput" id="reg-pass" type="password" placeholder="••••••••" autocomplete="new-password"/></div>'
    + '<button class="btn btn-azul" style="margin-top:6px" onclick="submitRegistro()">Crear mi cuenta</button>'
    + '<p style="text-align:center;margin-top:18px;font-size:.75rem;color:#64748B">¿Ya tienes cuenta? <span style="color:#1B4F8A;font-weight:700;cursor:pointer" onclick="ir(\'login\')">Iniciar sesión</span></p>'
    + '</div></div>';
}

function pagLogin() {
  return '<div style="min-height:100vh;background:linear-gradient(170deg,#080F1C,#0D1F35 45%,#132B50);padding-bottom:40px">'
    + '<div style="padding:52px 28px 28px;text-align:center">'
    + '<div class="sp-logo" style="margin:0 auto 16px">🏡</div>'
    + '<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.7rem;font-weight:900;margin-bottom:6px">Bienvenido</h2>'
    + '<p style="color:rgba(255,255,255,.5);font-size:.8rem">Accede a una versión más profesional de tu marketplace.</p>'
    + '</div>'
    + '<div style="background:white;border-radius:28px 28px 0 0;padding:28px 24px;min-height:60vh">'
    + '<button class="btn" style="background:#F5F7FB;border:1.5px solid #E2EAF4;color:#0D1F35;margin-bottom:14px;font-weight:600" onclick="loginGoogle()">'
    + '<span style="font-size:1.1rem">G</span> Continuar con Google'
    + '</button>'
    + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;color:#94A3B8;font-size:.72rem">'
    + '<div style="flex:1;height:1px;background:#E2EAF4"></div>o con tu correo<div style="flex:1;height:1px;background:#E2EAF4"></div>'
    + '</div>'
    + '<div class="fgroup"><label class="flabel">Correo electrónico</label><input class="finput" id="log-email" type="email" placeholder="laura@correo.com" autocomplete="email"/></div>'
    + '<div class="fgroup"><label class="flabel">Contraseña</label><input class="finput" id="log-pass" type="password" placeholder="••••••••" autocomplete="current-password"/></div>'
    + '<button class="btn btn-azul" style="margin-top:6px" onclick="submitLogin()">Iniciar sesión</button>'
    + '<p style="text-align:center;margin-top:18px;font-size:.75rem;color:#64748B">¿No tienes cuenta? <span style="color:#1B4F8A;font-weight:700;cursor:pointer" onclick="ir(\'registro\')">Crear cuenta gratis</span></p>'
    + '<p style="text-align:center;margin-top:10px;font-size:.72rem"><span style="color:#94A3B8;cursor:pointer" onclick="toast(\'Recuperación de contraseña próximamente.\',\'info\')">Recuperar acceso</span></p>'
    + '</div></div>';
}

function pagExplorar(p) {
  p = p || {};
  var tipo = p.tipo || S.filtros.tipo || 'Todos';
  S.filtros.tipo = tipo;
  var tipos = ['Todos','Apartamento','Casa','Villa','Cabaña','Estudio'];
  var todas = S.propiedades.length ? S.propiedades : PROPS_DEMO;
  var lista = tipo === 'Todos' ? todas : todas.filter(function(x) { return x.tipo === tipo; });
  var dest = todas.filter(function(x) { return x.top || x.nuevo; });
  var stats = resumenMercado();
  if (!dest.length) dest = todas.slice(0, 3);

  return '<div class="pb-nav">'
    + '<div class="hero-azul">'
    + '<div class="sbar d"><span>CasaRD Prime</span><span>Mercado 🇩🇴</span></div>'
    + '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:14px">'
    + '<div>'
    + '<p style="font-size:.68rem;color:rgba(255,255,255,.6)">Marketplace adaptado al mercado dominicano</p>'
    + '<p style="font-family:\'Fraunces\',serif;font-size:1.14rem;font-weight:700;line-height:1.3">Hola' + (S.usuario ? ', ' + S.usuario.nombre : '') + '</p>'
    + '</div>'
    + '<div style="width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;font-size:1rem;cursor:pointer" onclick="ir(\'perfil\')">👤</div>'
    + '</div>'
    + '<div class="s-bar">'
    + '<span style="color:rgba(255,255,255,.5)">🔍</span>'
    + '<input type="text" id="inp-buscar" placeholder="Busca por Naco, Piantini, Bávaro, Jarabacoa…" oninput="buscar(this.value)"/>'
    + '<div class="fbtn" onclick="toast(\'Filtros avanzados en la próxima iteración.\',\'info\')">🎛</div>'
    + '</div>'
    + '<div class="chips">'
    + tipos.map(function(t) {
      return '<button class="chip ' + (t === tipo ? 'on' : '') + '" onclick="ir(\'explorar\',{tipo:\'' + t + '\'})">' + t + '</button>';
    }).join('')
    + '</div>'
    + '<div class="kpi-row">'
    + '<div class="kpi-card"><span class="kpi-number">' + stats.total + '</span><span class="kpi-label">propiedades activas</span></div>'
    + '<div class="kpi-card"><span class="kpi-number">' + stats.ciudades + '</span><span class="kpi-label">ciudades clave</span></div>'
    + '<div class="kpi-card"><span class="kpi-number">' + precio(stats.promedio) + '</span><span class="kpi-label">ticket promedio</span></div>'
    + '</div>'
    + '</div>'
    + '<div class="page-body" style="padding-top:16px;padding-bottom:0">'
    + '<div class="soft-card">'
    + '<p class="soft-title">Recomendación comercial</p>'
    + '<p class="soft-copy">Prioriza publicaciones con fotos limpias, precio en RD$, sector exacto y beneficios incluidos como mantenimiento o línea blanca. Eso eleva la conversión en el mercado local.</p>'
    + '</div>'
    + '</div>'
    + '<div class="sec-h"><span class="sec-t">Propiedades destacadas</span><span class="sec-a" onclick="ir(\'explorar\')">Ver todo</span></div>'
    + '<div class="hscroll">' + dest.map(tarjetaH).join('') + '</div>'
    + '<div class="sec-h" style="margin-top:6px"><span class="sec-t">Zonas activas</span><span class="sec-a">República Dominicana</span></div>'
    + '<div class="page-body" style="padding-top:0">'
    + '<div class="city-grid">'
    + [
      ['Santo Domingo','Demanda corporativa y familiar'],
      ['Santiago','Residencial y clase media alta'],
      ['Punta Cana','Premium, turístico y relocación'],
      ['Jarabacoa','Montaña, descanso y short stay']
    ].map(function(c) {
      return '<div class="city-card"><p class="city-name">' + c[0] + '</p><p class="city-copy">' + c[1] + '</p></div>';
    }).join('')
    + '</div>'
    + '</div>'
    + '<div class="sec-h" style="margin-top:4px">'
    + '<span class="sec-t">Inventario disponible</span>'
    + '<span class="sec-a">' + lista.length + ' resultados</span>'
    + '</div>'
    + '<div class="page-body" id="lista-v">' + lista.map(tarjetaV).join('') + '</div>'
    + '</div>';
}

function pagDetalle(p) {
  p = p || {};
  var todas = S.propiedades.length ? S.propiedades : PROPS_DEMO;
  var prop = todas.filter(function(x) { return x.id === p.id; })[0] || todas[0];
  var bg = 'background:' + prop.grad + (prop.foto ? ';background-image:url("' + prop.foto + '");background-size:cover;background-position:center' : '');
  var msg = mensajeContacto(prop).replace(/'/g, "\\'");

  return '<div style="background:white;padding-bottom:90px">'
    + '<div class="det-img" style="' + bg + '">'
    + (prop.foto ? '' : '<span style="font-size:5rem">' + prop.emoji + '</span>')
    + '<button class="det-back" onclick="ir(\'explorar\')">← Volver</button>'
    + '<button class="det-fav" onclick="toast(\'Guardado en favoritos.\',\'ok\')">❤️</button>'
    + '<div class="det-dots"><div class="ddot on"></div><div class="ddot"></div><div class="ddot"></div></div>'
    + '</div>'
    + '<div class="page-body">'
    + '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">'
    + '<span class="dtag">' + prop.tipo + '</span>'
    + '<span class="dtag">🛏 ' + prop.hab + ' hab.</span>'
    + '<span class="dtag">🛁 ' + prop.ban + ' baños</span>'
    + (prop.m2 ? '<span class="dtag">📐 ' + prop.m2 + ' m²</span>' : '')
    + '<span class="dtag">📍 ' + prop.ciudad + '</span>'
    + '</div>'
    + '<h1 style="font-family:\'Fraunces\',serif;font-size:1.42rem;font-weight:800;color:#0D1F35;line-height:1.28;margin-bottom:4px">' + prop.titulo + '</h1>'
    + '<p style="font-size:.76rem;color:#64748B;margin-bottom:12px">' + prop.sector + (prop.dist ? ' · ' + prop.dist : '') + '</p>'
    + '<div class="det-pr-row">'
    + '<div><span class="det-pr">' + precio(prop.precio) + '</span><span style="font-size:.72rem;color:#64748B">/mes</span></div>'
    + '<div style="display:flex;align-items:center;gap:4px;font-size:.78rem;font-weight:700">⭐ ' + prop.val + ' <span style="color:#64748B;font-size:.65rem">(' + prop.res + ' reseñas)</span></div>'
    + '</div>'
    + '<div class="cta-stack">'
    + '<button class="btn btn-wa" onclick="wa(\'' + prop.wa + '\',\'' + msg + '\')">Contactar por WhatsApp</button>'
    + '<button class="btn btn-azul" onclick="toast(\'Solicitud de visita enviada.\',\'ok\')">Solicitar visita</button>'
    + '</div>'
    + '<div class="soft-card" style="margin-top:14px">'
    + '<p class="soft-title">Resumen comercial</p>'
    + '<p class="soft-copy">Propiedad orientada a ' + (prop.tipo === 'Apartamento' ? 'cliente ejecutivo o familiar' : prop.tipo === 'Villa' ? 'renta premium o familia grande' : prop.tipo === 'Cabaña' ? 'descanso de montaña o short stay' : 'mercado residencial') + '. Tiempo de respuesta estimado del anunciante: ' + (prop.tiempoResp || '1 h') + '.</p>'
    + '</div>'
    + '<p class="sec-titulo">Comodidades</p>'
    + '<div class="amen-grid">' + (prop.comod || []).map(function(c) { return '<div class="amen">' + c + '</div>'; }).join('') + '</div>'
    + ((prop.incluye && prop.incluye.length)
      ? '<p class="sec-titulo">Incluye</p><div class="meta-row" style="margin-bottom:14px">' + prop.incluye.map(function(i) { return '<span class="meta-chip">✅ ' + i + '</span>'; }).join('') + '</div>'
      : '')
    + '<p class="sec-titulo">Descripción</p>'
    + '<p style="font-size:.75rem;color:#64748B;line-height:1.75;margin-bottom:16px">' + prop.desc + '</p>'
    + '<p class="sec-titulo">Anunciante</p>'
    + '<div class="owner-card">'
    + '<div class="av av-md" style="background:linear-gradient(135deg,#1B4F8A,#F5A623)">' + iniciales(prop.prop) + '</div>'
    + '<div style="flex:1">'
    + '<p style="font-weight:800;font-size:.84rem;color:#0D1F35">' + prop.prop + '</p>'
    + '<p style="font-size:.66rem;color:#10B981;font-weight:800">✓ Perfil verificado</p>'
    + '<p style="font-size:.64rem;color:#64748B">WhatsApp: ' + telefonoBonito(prop.wa) + '</p>'
    + '</div>'
    + '<button class="btn btn-dark btn-sm" onclick="ir(\'chat\',{n:\'' + prop.prop + '\',t:\'' + prop.titulo + '\',pr:' + prop.precio + ',wa:\'' + prop.wa + '\'})">Chat</button>'
    + '</div>'
    + ((prop.opiniones && prop.opiniones.length)
      ? '<p class="sec-titulo">Reseñas</p>' + prop.opiniones.map(function(o) {
          return '<div class="resena">'
            + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">'
            + '<div class="av av-sm" style="background:' + o.c + '">' + o.i + '</div>'
            + '<span style="font-weight:700;font-size:.72rem;color:#0D1F35;flex:1">' + o.n + '</span>'
            + '<span style="font-size:.62rem;color:#F5A623">' + o.s + '</span>'
            + '</div>'
            + '<p style="font-size:.7rem;color:#64748B;line-height:1.55">' + o.t + '</p>'
            + '</div>';
        }).join('')
      : '')
    + '</div></div>';
}

function pagPublicar() {
  if (!S.usuario) {
    return '<div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 28px;text-align:center;background:#F5F7FB">'
      + '<span style="font-size:3.5rem;margin-bottom:18px">🔐</span>'
      + '<h2 style="font-family:\'Fraunces\',serif;font-size:1.45rem;font-weight:700;margin-bottom:10px">Acceso requerido</h2>'
      + '<p style="color:#64748B;font-size:.84rem;max-width:320px;margin:0 auto 24px">Inicia sesión para publicar propiedades con una presentación profesional adaptada al mercado dominicano.</p>'
      + '<button class="btn btn-azul" style="max-width:320px" onclick="ir(\'login\')">Iniciar sesión</button>'
      + '<button class="btn" style="max-width:320px;margin-top:10px;color:#64748B;border:1.5px solid #E2EAF4" onclick="ir(\'registro\')">Crear cuenta</button>'
      + '</div>';
  }

  var tipos = [['🏢','Apartamento'],['🏠','Casa'],['🏡','Villa'],['🛖','Cabaña'],['🏛️','Estudio'],['📍','Otro']];
  var comods = ['🛋️ Amueblado','❄️ A/C inverter','⚡ Planta full','🚗 Parqueo techado','🛡️ Seguridad 24h','🧺 Línea blanca','🏢 Área social','🌿 Balcón o terraza','💧 Cisterna','🧾 Mantenimiento incluido'];

  return '<div class="pb-nav">'
    + '<div class="hero-oscuro">'
    + '<div class="sbar d"><span>CasaRD Prime</span><span>Publicación profesional</span></div>'
    + '<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.3rem;font-weight:700;margin-bottom:4px">Publicar propiedad</h2>'
    + '<p style="color:rgba(255,255,255,.5);font-size:.74rem">Completa los campos clave para convertir mejor en República Dominicana.</p>'
    + '</div>'
    + '<div class="page-body">'
    + '<div class="aviso av-info"><span style="font-size:1.1rem;flex-shrink:0">📌</span><span><b>Buenas prácticas:</b> usa título claro, sector exacto, fotos luminosas y especifica si el precio incluye mantenimiento, línea blanca o mobiliario.</span></div>'
    + '<div class="fsec">📸 Fotos</div>'
    + '<div id="fotos-prev" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;min-height:4px"></div>'
    + '<label style="display:flex;align-items:center;justify-content:center;gap:10px;border:2px dashed #E2EAF4;border-radius:16px;padding:18px;cursor:pointer;background:white;font-size:.82rem;color:#64748B;margin-bottom:4px">'
    + '<span style="font-size:1.5rem">📷</span> Agregar hasta 5 fotos'
    + '<input type="file" id="input-fotos" accept="image/*" multiple style="display:none" onchange="previsualizarFotos(this)"/>'
    + '</label>'
    + '<div class="fsec">🏠 Tipo de propiedad *</div>'
    + '<div class="tipo-grid" id="tipo-grid">'
    + tipos.map(function(t, i) {
      return '<button class="tipo-opt ' + (i === 0 ? 'on' : '') + '" onclick="selTipo(this)" data-tipo="' + t[1] + '">' + t[0] + ' ' + t[1] + '</button>';
    }).join('')
    + '</div>'
    + '<div class="fsec">📝 Información comercial</div>'
    + '<div class="fgroup"><label class="flabel">Título del anuncio *</label><input class="finput" id="pub-titulo" type="text" placeholder="Ej. Apartamento amueblado en Naco con 2 parqueos"/></div>'
    + '<div class="frow">'
    + '<div class="fgroup"><label class="flabel">Precio mensual (RD$) *</label><input class="finput" id="pub-precio" type="number" min="1" placeholder="68000"/></div>'
    + '<div class="fgroup"><label class="flabel">Habitaciones *</label><input class="finput" id="pub-hab" type="number" min="1" placeholder="2"/></div>'
    + '</div>'
    + '<div class="frow">'
    + '<div class="fgroup"><label class="flabel">Baños</label><input class="finput" id="pub-ban" type="number" min="1" placeholder="2"/></div>'
    + '<div class="fgroup"><label class="flabel">Metros cuadrados</label><input class="finput" id="pub-m2" type="number" min="1" placeholder="118"/></div>'
    + '</div>'
    + '<div class="fgroup"><label class="flabel">Ciudad *</label><input class="finput" id="pub-ciudad" type="text" placeholder="Santo Domingo, Santiago, Punta Cana…"/></div>'
    + '<div class="fgroup"><label class="flabel">Sector / Barrio</label><input class="finput" id="pub-sector" type="text" placeholder="Naco, Piantini, Bella Vista, Bávaro…"/></div>'
    + '<div class="fgroup"><label class="flabel">WhatsApp de contacto *</label><input class="finput finput-wa" id="pub-tel" type="tel" placeholder="809-555-0101"/></div>'
    + '<div class="fgroup"><label class="flabel">Descripción *</label><textarea class="finput ftextarea" id="pub-desc" placeholder="Describe la propiedad, el perfil ideal del inquilino y lo que incluye el precio."></textarea></div>'
    + '<div class="fsec">✅ Amenidades y diferenciales</div>'
    + '<div class="como-grid">'
    + comods.map(function(c) {
      return '<button class="como-item" onclick="toggleComod(this)" data-comod="' + c + '"><div class="cbox off"></div>' + c + '</button>';
    }).join('')
    + '</div>'
    + '<button class="btn btn-azul" style="margin-top:10px" onclick="submitPublicar()">Publicar anuncio</button>'
    + '<button class="btn" style="margin-top:10px;color:#64748B;border:1.5px solid #E2EAF4" onclick="ir(\'explorar\')">Cancelar</button>'
    + '</div></div>';
}

function pagMensajes() {
  return '<div class="pb-nav">'
    + '<div style="background:white;padding:44px 18px 14px;border-bottom:1px solid #E2EAF4;position:sticky;top:0;z-index:100">'
    + '<h2 style="font-family:\'Fraunces\',serif;font-size:1.15rem;font-weight:700;color:#0D1F35;margin-bottom:10px">Mensajes</h2>'
    + '<div class="soft-card"><p class="soft-title">Canal principal</p><p class="soft-copy">Centraliza conversaciones de interés antes de llevarlas a WhatsApp.</p></div>'
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

function pagChat(p) {
  p = p || {};
  var n = p.n || 'María Fernanda Gómez';
  var t = p.t || 'Torre Naco Executive';
  var pr = p.pr || 68000;
  var waNum = p.wa || '18095550101';

  return '<div class="chat-wrap">'
    + '<div class="chat-head">'
    + '<button onclick="ir(\'mensajes\')" style="font-size:1.1rem;color:#1B4F8A;font-weight:700;background:none;border:none;cursor:pointer;padding:4px 8px">←</button>'
    + '<div class="av av-sm av-on" style="background:linear-gradient(135deg,#1B4F8A,#F5A623)">' + iniciales(n) + '</div>'
    + '<div style="flex:1">'
    + '<p style="font-weight:700;font-size:.84rem;color:#0D1F35">' + n + ' ✓</p>'
    + '<p style="font-size:.63rem;color:#10B981;font-weight:700">En línea</p>'
    + '</div>'
    + '</div>'
    + '<div class="chat-prop-b">'
    + '<div style="width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,#FDEBC8,#F0B86E);display:flex;align-items:center;justify-content:center;font-size:1.3rem">🏠</div>'
    + '<div><p style="font-weight:700;font-size:.74rem;color:#0D1F35">' + t + '</p><p style="font-size:.66rem;color:#1B4F8A;font-weight:700">' + precio(pr) + ' / mes</p></div>'
    + '</div>'
    + '<div class="chat-msgs" id="chat-msgs">'
    + '<p style="text-align:center;font-size:.6rem;color:#64748B;margin-bottom:8px">Hoy</p>'
    + '<div><div class="bubble b-them">Hola, vi esta propiedad en la plataforma. ¿Sigue disponible?</div><p class="btime">10:32</p></div>'
    + '<div><div class="bubble b-me">Sí, está disponible. Puedo compartirte condiciones y video.</div><p class="btime me">10:34 ✓✓</p></div>'
    + '<div><div class="bubble b-them">Perfecto. ¿Incluye mantenimiento y parqueo?</div><p class="btime">10:36</p></div>'
    + '<div><div class="bubble b-me">Sí, incluye mantenimiento y te confirmo el resto por WhatsApp.</div><p class="btime me">10:38 ✓✓</p></div>'
    + '</div>'
    + '<button class="btn btn-wa" style="margin:8px 14px;width:calc(100% - 28px)" onclick="wa(\'' + waNum + '\',\'Hola, seguimos la conversación desde CasaRD Prime.\')">Continuar en WhatsApp</button>'
    + '<div class="chat-ibar">'
    + '<span style="color:#64748B;font-size:1.1rem;cursor:pointer">📎</span>'
    + '<input class="chat-inp" id="cinput" placeholder="Escribe un mensaje…" onkeydown="if(event.key===\'Enter\')enviarMsg()"/>'
    + '<button class="send-btn" onclick="enviarMsg()">➤</button>'
    + '</div></div>';
}

function pagPerfil() {
  var u = S.usuario || {};
  var nombre = u.nombre || 'Usuario CasaRD';

  return '<div class="pb-nav">'
    + '<div class="hero-oscuro" style="text-align:center;padding-bottom:28px">'
    + '<div class="sbar d"><span>CasaRD Prime</span><span>Perfil</span></div>'
    + '<div style="position:relative;display:inline-block;margin-bottom:14px">'
    + (u.foto
      ? '<img src="' + u.foto + '" style="width:76px;height:76px;border-radius:50%;border:3px solid rgba(255,255,255,.2);object-fit:cover">'
      : '<div class="av av-lg" style="background:linear-gradient(135deg,#F5A623,#E85D3A);margin:0 auto">' + iniciales(nombre) + '</div>')
    + '<span style="position:absolute;bottom:2px;right:2px;width:22px;height:22px;border-radius:50%;background:#10B981;border:2px solid #0D1F35;display:flex;align-items:center;justify-content:center;font-size:.65rem;color:white;font-weight:700">✓</span>'
    + '</div>'
    + '<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.15rem;font-weight:700">' + nombre + '</h2>'
    + '<p style="color:rgba(255,255,255,.45);font-size:.68rem;margin:4px 0 16px">' + (u.email || 'perfil@casard.do') + '</p>'
    + '<div style="display:flex;border-top:1px solid rgba(255,255,255,.07);padding-top:14px">'
    + [['12','Leads'],['4.8','Rating'],['RD$','Moneda local']].map(function(s, i, a) {
      return '<div style="flex:1;text-align:center">'
        + '<span style="font-family:\'Fraunces\',serif;color:white;font-size:1.15rem;font-weight:700;display:block">' + s[0] + '</span>'
        + '<span style="color:rgba(255,255,255,.35);font-size:.6rem">' + s[1] + '</span>'
        + '</div>' + (i < a.length - 1 ? '<div style="width:1px;background:rgba(255,255,255,.07)"></div>' : '');
    }).join('')
    + '</div></div>'
    + '<div class="page-body">'
    + '<p class="secth">NEGOCIO</p>'
    + '<div class="pmenu">'
    + [['🏠','#EBF3FF','Mis anuncios','Gestiona inventario y visibilidad','4'],['❤️','#FFF0EB','Favoritos','Seguimiento de oportunidades',''],['📅','#EBFFF3','Visitas','Coordina citas y recorridos','2']].map(function(m) {
      return '<div class="pitem" onclick="toast(\'' + m[2] + ' próximamente.\',\'info\')">'
        + '<div class="pic" style="background:' + m[1] + '">' + m[0] + '</div>'
        + '<div class="ptxt"><p class="pm">' + m[2] + '</p><p class="ps">' + m[3] + '</p></div>'
        + (m[4] ? '<span class="pbadge">' + m[4] + '</span>' : '')
        + '<span style="color:#64748B;font-size:.8rem">›</span></div>';
    }).join('')
    + '</div>'
    + '<p class="secth" style="margin-top:16px">CUENTA</p>'
    + '<div class="pmenu">'
    + [['💬','rgba(37,211,102,.12)','WhatsApp vinculado', telefonoBonito(u.telefono || '18095550000')],['🔔','#FFF8EB','Notificaciones','Alertas de leads y visitas'],['⚙️','#F5EBFF','Configuración','Idioma y experiencia local']].map(function(m) {
      return '<div class="pitem" onclick="toast(\'' + m[2] + ' próximamente.\',\'info\')">'
        + '<div class="pic" style="background:' + m[1] + '">' + m[0] + '</div>'
        + '<div class="ptxt"><p class="pm">' + m[2] + '</p><p class="ps">' + m[3] + '</p></div>'
        + '<span style="color:#64748B;font-size:.8rem">›</span></div>';
    }).join('')
    + '<div class="pitem" onclick="salir()">'
    + '<div class="pic" style="background:#FFEBEB">🚪</div>'
    + '<div class="ptxt"><p class="pm" style="color:#C0392B">Cerrar sesión</p><p class="ps">Salir de la cuenta actual</p></div>'
    + '<span style="color:#64748B;font-size:.8rem">›</span>'
    + '</div></div></div></div>';
     }
