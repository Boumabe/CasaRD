/* ═══════════════════════════════════════════════════
   CASARD — PAGINAS.JS  (versión profesional)
   9 páginas. Cada función devuelve HTML puro.
════════════════════════════════════════════════════ */

/* ── SVG ICONS helpers (inline, no emojis en UI) ── */
var ICO = {
  pin:  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  bed:  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9V19"/><path d="M22 9V19"/><path d="M2 9a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5"/><path d="M2 14h20"/></svg>',
  bath: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',
  star: '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  wa:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  back: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>',
  heart:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  chev: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  send: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  cam:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  clip: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',
  filter:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
  map:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
  bell: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  cog:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  out:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0392B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  user: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  cal:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  home2:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  fav:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
};

/* ══════════════════════════════
   TARJETAS REUTILIZABLES
══════════════════════════════ */
function tarjetaH(p) {
  var bg = 'background:' + p.grad + (p.foto ? ';background-image:url("'+p.foto+'");background-size:cover;background-position:center' : '');
  var usd = Math.round(p.precio / 60);
  return '<div class="hcard" onclick="ir(\'detalle\',{id:\''+p.id+'\'})">'
    +'<div class="hcard-img" style="'+bg+'">'
    +(p.foto ? '' : '<span style="font-size:2.6rem;opacity:.7">'+p.emoji+'</span>')
    +(p.top   ? '<span class="badge b-tl b-top">TOP</span>' : '')
    +(p.nuevo ? '<span class="badge b-tl b-nuevo">NUEVO</span>' : '')
    +'<button class="b-fav" onclick="event.stopPropagation();this.classList.toggle(\'on\');toast(this.classList.contains(\'on\')?\'Guardado en favoritos\':\'Eliminado de favoritos\',\'ok\')" aria-label="Guardar">'
    +ICO.heart+'</button>'
    +'</div>'
    +'<div class="hcard-body">'
    +'<p class="hcard-name">'+p.titulo+'</p>'
    +'<p class="hcard-loc" style="color:#64748B">'+ICO.pin+' '+p.ciudad+(p.dist?' · '+p.dist:'')+'</p>'
    +'<div class="hcard-ft">'
    +'<div>'
    +'<span class="price">'+precio(p.precio)+'<small>/mes</small></span>'
    +'<span class="price-usd">≈$'+usd+'</span>'
    +'</div>'
    +'<span class="stars" style="color:#E8A020">'+ICO.star+' '+p.val+'</span>'
    +'</div></div></div>';
}

function tarjetaV(p) {
  var bg  = 'background:'+p.grad+(p.foto?';background-image:url("'+p.foto+'");background-size:cover;background-position:center':'');
  var msg = '¡Hola! Vi '+p.titulo+' en CasaRD ('+precio(p.precio)+'/mes en '+p.ciudad+'). ¿Sigue disponible? 🏠🇩🇴';
  var usd = Math.round(p.precio / 60);
  return '<div class="vcard" onclick="ir(\'detalle\',{id:\''+p.id+'\'})">'
    +'<div class="vcard-img" style="'+bg+'">'
    +(p.foto ? '' : '<span style="font-size:3.5rem;opacity:.65">'+p.emoji+'</span>')
    +(p.nuevo ? '<span class="badge b-tl b-nuevo">NUEVO</span>' : '')
    +(p.top   ? '<span class="badge b-tl b-top">TOP</span>' : '')
    +'<button class="b-fav" onclick="event.stopPropagation();this.classList.toggle(\'on\');toast(this.classList.contains(\'on\')?\'Guardado\':\'Eliminado\',\'ok\')" aria-label="Guardar">'
    +ICO.heart+'</button>'
    +'</div>'
    +'<div class="vcard-body">'
    +'<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">'
    +'<h3 style="font-family:\'Fraunces\',serif;font-size:.95rem;font-weight:700;color:#0B1E38;line-height:1.2;flex:1;margin-right:8px">'+p.titulo+'</h3>'
    +'<span class="stars" style="color:#E8A020;flex-shrink:0">'+ICO.star+' '+p.val+'</span>'
    +'</div>'
    +'<p style="font-size:.7rem;color:#64748B;margin-bottom:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">'
    +'<span style="display:flex;align-items:center;gap:3px">'+ICO.pin+' '+p.ciudad+'</span>'
    +'<span style="display:flex;align-items:center;gap:3px">'+ICO.bed+' '+p.hab+' hab.</span>'
    +'<span style="display:flex;align-items:center;gap:3px">'+ICO.bath+' '+p.ban+' baños</span>'
    +'</p>'
    +'<div style="display:flex;justify-content:space-between;align-items:center">'
    +'<div>'
    +'<span class="price">'+precio(p.precio)+'<small>/mes</small></span>'
    +'<span class="price-usd"> ≈ $'+usd+'</span>'
    +'</div>'
    +'<button class="btn btn-wa btn-sm" onclick="event.stopPropagation();wa(\''+p.wa+'\',\''+msg.replace(/'/g,"\\'")+'\')">'
    +ICO.wa+' WhatsApp'
    +'</button>'
    +'</div></div></div>';
}

/* ══════════════════════════════
   P1 — BIENVENIDA
══════════════════════════════ */
function pagBienvenida() {
  return '<div class="splash">'
    +'<div class="splash-grain"></div>'
    +'<div class="orb1"></div><div class="orb2"></div>'
    +'<div class="sp-logo"><span class="sp-logo-inner">C</span></div>'
    +'<h1 class="sp-titulo">CasaRD</h1>'
    +'<p class="sp-sub">🇩🇴 &nbsp;Alquileres en República Dominicana</p>'
    +'<p class="sp-desc">Encuentra tu hogar ideal cerca de ti — junto a la playa, en el campo o en el corazón de Santo Domingo.</p>'
    +'<div class="sp-trust">'
    +'<div><span class="sp-tn">100+</span><span class="sp-tl">Propiedades</span></div>'
    +'<div class="sp-tdiv"></div>'
    +'<div><span class="sp-tn">RD$</span><span class="sp-tl">Precios locales</span></div>'
    +'<div class="sp-tdiv"></div>'
    +'<div><span class="sp-tn" style="font-size:.9rem;margin-top:2px">💬</span><span class="sp-tl">WhatsApp</span></div>'
    +'</div>'
    +'<div class="sp-btns">'
    +'<button class="btn btn-dorado" onclick="ir(\'registro\')">Comenzar ahora →</button>'
    +'<button class="btn btn-out" onclick="ir(\'login\')">Ya tengo una cuenta</button>'
    +'</div>'
    +'<p class="sp-legal">Al continuar aceptas nuestros <u>Términos de uso</u> y la <u>Política de privacidad</u></p>'
    +'</div>';
}

/* ══════════════════════════════
   P2 — REGISTRO
══════════════════════════════ */
function pagRegistro() {
  return '<div style="min-height:100vh;background:linear-gradient(170deg,#060D1C,#0B1E38 40%,#0D2649)">'
    +'<div style="padding:calc(env(safe-area-inset-top,28px) + 24px) 28px 28px;text-align:center">'
    +'<div class="sp-logo" style="margin:0 auto 16px"><span class="sp-logo-inner">C</span></div>'
    +'<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.7rem;font-weight:900;margin-bottom:6px;letter-spacing:-.5px">Crear cuenta</h2>'
    +'<p style="color:rgba(255,255,255,.4);font-size:.8rem">Únete a CasaRD — es gratis 🇩🇴</p>'
    +'</div>'
    +'<div style="background:white;border-radius:28px 28px 0 0;padding:28px 24px;min-height:60vh">'
    /* Google */
    +'<button class="btn" style="background:#F8FAFC;border:1.5px solid #DDE5F0;color:#0B1E38;margin-bottom:14px;font-weight:600;gap:10px" onclick="loginGoogle()">'
    +'<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>'
    +'Continuar con Google'
    +'</button>'
    +'<div class="divider-or">o con tu correo</div>'
    +'<div class="fgroup"><label class="flabel">Nombre completo *</label>'
    +'<input class="finput" id="reg-nombre" type="text" placeholder="Ej: Juan Pérez" autocomplete="name"/></div>'
    +'<div class="fgroup"><label class="flabel">Correo electrónico *</label>'
    +'<input class="finput" id="reg-email" type="email" placeholder="juan@ejemplo.com" autocomplete="email"/></div>'
    +'<div class="fgroup"><label class="flabel">WhatsApp / Teléfono</label>'
    +'<input class="finput finput-wa" id="reg-tel" type="tel" placeholder="+1 (809) 000-0000" autocomplete="tel"/></div>'
    +'<div class="fgroup"><label class="flabel">Contraseña * (mín. 6 caracteres)</label>'
    +'<input class="finput" id="reg-pass" type="password" placeholder="••••••••" autocomplete="new-password"/></div>'
    +'<button class="btn btn-azul" style="margin-top:8px" onclick="submitRegistro()">Crear mi cuenta gratis →</button>'
    +'<p style="text-align:center;margin-top:20px;font-size:.76rem;color:#64748B">'
    +'¿Ya tienes cuenta? <span style="color:#1B4F8A;font-weight:700;cursor:pointer" onclick="ir(\'login\')">Iniciar sesión</span>'
    +'</p>'
    +'</div></div>';
}

/* ══════════════════════════════
   P3 — LOGIN
══════════════════════════════ */
function pagLogin() {
  return '<div style="min-height:100vh;background:linear-gradient(170deg,#060D1C,#0B1E38 40%,#0D2649)">'
    +'<div style="padding:calc(env(safe-area-inset-top,28px) + 24px) 28px 28px;text-align:center">'
    +'<div class="sp-logo" style="margin:0 auto 16px"><span class="sp-logo-inner">C</span></div>'
    +'<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.7rem;font-weight:900;margin-bottom:6px;letter-spacing:-.5px">Bienvenido de vuelta</h2>'
    +'<p style="color:rgba(255,255,255,.4);font-size:.8rem">Ingresa a tu cuenta CasaRD 🇩🇴</p>'
    +'</div>'
    +'<div style="background:white;border-radius:28px 28px 0 0;padding:28px 24px;min-height:60vh">'
    +'<button class="btn" style="background:#F8FAFC;border:1.5px solid #DDE5F0;color:#0B1E38;margin-bottom:14px;font-weight:600;gap:10px" onclick="loginGoogle()">'
    +'<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>'
    +'Continuar con Google'
    +'</button>'
    +'<div class="divider-or">o con tu correo</div>'
    +'<div class="fgroup"><label class="flabel">Correo electrónico</label>'
    +'<input class="finput" id="log-email" type="email" placeholder="juan@ejemplo.com" autocomplete="email"/></div>'
    +'<div class="fgroup"><label class="flabel">Contraseña</label>'
    +'<input class="finput" id="log-pass" type="password" placeholder="••••••••" autocomplete="current-password"/></div>'
    +'<button class="btn btn-azul" style="margin-top:8px" onclick="submitLogin()">Iniciar sesión →</button>'
    +'<p style="text-align:center;margin-top:14px;font-size:.74rem;color:#94A3B8;cursor:pointer" onclick="toast(\'Recuperación de contraseña próximamente\',\'info\')">'
    +'¿Olvidaste tu contraseña?'
    +'</p>'
    +'<p style="text-align:center;margin-top:16px;font-size:.76rem;color:#64748B">'
    +'¿No tienes cuenta? <span style="color:#1B4F8A;font-weight:700;cursor:pointer" onclick="ir(\'registro\')">Crear cuenta gratis</span>'
    +'</p>'
    +'</div></div>';
}

/* ══════════════════════════════
   P4 — EXPLORAR
══════════════════════════════ */
function pagExplorar(p) {
  p = p || {};
  var tipo  = p.tipo || 'Todos';
  var tipos = ['Todos','Casa','Apartamento','Villa','Cabaña','Estudio'];
  var todas = S.propiedades.length > 0 ? S.propiedades : PROPS_DEMO;
  var lista = tipo === 'Todos' ? todas : todas.filter(function(x){ return x.tipo === tipo; });
  var dest  = todas.filter(function(x){ return x.top || x.nuevo; });
  if (!dest.length) dest = todas.slice(0, 3);
  var hora  = new Date().getHours();
  var saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';

  return '<div class="pb-nav">'
    /* ── HERO ── */
    +'<div class="hero-azul">'
    +'<div class="sbar d"><span style="font-family:\'Fraunces\',serif;font-size:.72rem;letter-spacing:-.2px">CasaRD</span><span style="font-size:.7rem">🇩🇴</span></div>'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">'
    +'<div>'
    +'<p style="font-size:.7rem;color:rgba(255,255,255,.48);margin-bottom:2px">'+saludo+' 👋</p>'
    +'<p style="font-family:\'Fraunces\',serif;font-size:1.1rem;font-weight:700;letter-spacing:-.3px">'+(S.usuario ? S.usuario.nombre : 'Bienvenido')+'</p>'
    +'</div>'
    +'<div style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.12);border:1.5px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden" onclick="ir(\'perfil\')">'
    +(S.usuario && S.usuario.foto
      ? '<img src="'+S.usuario.foto+'" style="width:100%;height:100%;object-fit:cover"/>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>')
    +'</div>'
    +'</div>'
    /* Barra búsqueda */
    +'<div class="s-bar">'
    +'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>'
    +'<input type="text" id="inp-buscar" placeholder="Ciudad, barrio, tipo…" oninput="buscar(this.value)"/>'
    +'<div class="fbtn" onclick="toast(\'Filtros avanzados próximamente\',\'info\')">'+ICO.filter+'</div>'
    +'</div>'
    /* Chips tipo */
    +'<div class="chips">'
    +tipos.map(function(t){
        return '<button class="chip '+(t===tipo?'on':'')+'" onclick="ir(\'explorar\',{tipo:\''+t+'\'})">'+t+'</button>';
      }).join('')
    +'</div></div>'

    /* ── DESTACADOS ── */
    +'<div class="sec-h"><span class="sec-t">Destacados</span><span class="sec-a" onclick="ir(\'explorar\')">Ver todos</span></div>'
    +'<div class="hscroll">'+dest.map(tarjetaH).join('')+'</div>'

    /* ── MAPA ── */
    +'<div class="sec-h" style="margin-top:4px"><span class="sec-t">Explorar mapa</span><span class="sec-a" style="display:flex;align-items:center;gap:3px">'+ICO.map+' Ampliar</span></div>'
    +'<div class="map-box" onclick="toast(\'Mapa interactivo próximamente 🗺️\',\'info\')">'
    +'<div class="map-rh"></div><div class="map-rv"></div>'
    +'<div class="map-pin" style="background:#0B2D5E;top:28px;left:55px"></div>'
    +'<div class="map-pin" style="background:#E85D3A;top:58px;left:132px"></div>'
    +'<div class="map-pin" style="background:#10B981;top:22px;right:48px"></div>'
    +'<div class="map-lbl">'+ICO.pin+' '+todas.length+' propiedades disponibles</div>'
    +'</div>'

    /* ── LISTA ── */
    +'<div class="sec-h" style="margin-top:8px">'
    +'<span class="sec-t">Todas las propiedades</span>'
    +'<span style="font-size:.68rem;color:#64748B;font-weight:500">'+lista.length+' disponibles</span>'
    +'</div>'
    +'<div class="page-body" id="lista-v">'+lista.map(tarjetaV).join('')+'</div>'
    +'</div>';
}

/* ══════════════════════════════
   P5 — DETALLE
══════════════════════════════ */
function pagDetalle(p) {
  p = p || {};
  var todas = S.propiedades.length > 0 ? S.propiedades : PROPS_DEMO;
  var prop  = todas.filter(function(x){ return x.id === p.id; })[0] || todas[0];
  var bg    = 'background:'+prop.grad+(prop.foto?';background-image:url("'+prop.foto+'");background-size:cover;background-position:center':'');
  var msg   = '¡Hola! Vi '+prop.titulo+' en CasaRD ('+precio(prop.precio)+'/mes en '+prop.ciudad+'). ¿Sigue disponible? 🏠🇩🇴';
  var usd   = Math.round(prop.precio / 60);

  return '<div style="background:#F0F4FA;padding-bottom:90px">'
    /* Imagen hero */
    +'<div class="det-img" style="'+bg+'">'
    +(prop.foto ? '' : '<span style="font-size:5rem;opacity:.5">'+prop.emoji+'</span>')
    +'<button class="det-back" onclick="ir(\'explorar\')">'+ICO.back+' Volver</button>'
    +'<button class="det-fav" onclick="this.classList.toggle(\'on\');toast(this.classList.contains(\'on\')?\'Guardado en favoritos\':\'Eliminado de favoritos\',\'ok\')" aria-label="Favorito">'
    +ICO.heart+'</button>'
    +'<div class="det-dots"><div class="ddot on"></div><div class="ddot"></div><div class="ddot"></div></div>'
    +'</div>'
    /* Body */
    +'<div style="background:white;border-radius:24px 24px 0 0;margin-top:-20px;padding:20px 18px 0;position:relative">'
    /* Tags */
    +'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">'
    +'<span class="dtag">'+ICO.bed+' '+prop.hab+' hab.</span>'
    +'<span class="dtag">'+ICO.bath+' '+prop.ban+' baños</span>'
    +(prop.m2 ? '<span class="dtag">📐 '+prop.m2+'m²</span>' : '')
    +'<span class="dtag" style="display:flex;align-items:center;gap:4px">'+ICO.pin+' '+prop.ciudad+'</span>'
    +'</div>'
    +'<h1 style="font-family:\'Fraunces\',serif;font-size:1.35rem;font-weight:700;color:#0B1E38;margin-bottom:4px;line-height:1.25;letter-spacing:-.4px">'+prop.titulo+'</h1>'
    +'<p style="font-size:.74rem;color:#64748B;margin-bottom:14px;display:flex;align-items:center;gap:4px">'+ICO.pin+' '+prop.ciudad+(prop.sector?', '+prop.sector:'')+'</p>'
    /* Precio */
    +'<div class="det-pr-row">'
    +'<div>'
    +'<span class="det-pr">'+precio(prop.precio)+'</span>'
    +'<span style="font-size:.7rem;color:#64748B">/mes</span>'
    +'<span style="font-size:.7rem;color:#94A3B8;margin-left:6px">≈ $'+usd+' USD</span>'
    +'</div>'
    +'<div style="display:flex;align-items:center;gap:4px">'
    +'<span style="font-size:.85rem;color:#E8A020;display:flex">'+ICO.star+'</span>'
    +'<span style="font-size:.82rem;font-weight:700;color:#0B1E38">'+prop.val+'</span>'
    +'<span style="font-size:.65rem;color:#94A3B8">('+prop.res+' reseñas)</span>'
    +'</div>'
    +'</div>'
    /* CTA Buttons */
    +'<button class="btn btn-wa mb10" onclick="wa(\''+prop.wa+'\',\''+msg.replace(/'/g,"\\'")+'\')">'+ICO.wa+' Contactar por WhatsApp</button>'
    +'<button class="btn btn-azul mb14" onclick="toast(\'Visita solicitada — el propietario te contactará 📅\',\'ok\')">'+ICO.cal+' Solicitar visita</button>'
    /* Divider */
    +'<div style="height:1px;background:#DDE5F0;margin:4px 0 14px"></div>'
    /* Comodidades */
    +'<p class="sec-titulo">Comodidades</p>'
    +'<div class="amen-grid">'
    +(prop.comod||[]).map(function(c){ return '<div class="amen">'+c+'</div>'; }).join('')
    +'</div>'
    /* Descripción */
    +'<p class="sec-titulo">Descripción</p>'
    +'<p style="font-size:.76rem;color:#64748B;line-height:1.7;margin-bottom:16px">'+prop.desc+'</p>'
    /* Propietario */
    +'<p class="sec-titulo">Propietario</p>'
    +'<div class="owner-card">'
    +'<div class="av av-md" style="background:linear-gradient(135deg,#1B4F8A,#E8A020)">'+iniciales(prop.prop)+'</div>'
    +'<div style="flex:1">'
    +'<p style="font-weight:700;font-size:.84rem;color:#0B1E38;margin-bottom:2px">'+prop.prop+'</p>'
    +'<span class="ver-badge">✓ Verificado</span>'
    +'<p style="font-size:.63rem;color:#64748B;margin-top:3px">Responde en menos de 1h</p>'
    +'</div>'
    +'<button class="btn btn-dark btn-sm" onclick="ir(\'chat\',{n:\''+prop.prop+'\',t:\''+prop.titulo+'\',pr:'+prop.precio+'})">Chat</button>'
    +'</div>'
    /* Reseñas */
    +(prop.opiniones && prop.opiniones.length
      ? '<p class="sec-titulo">Reseñas recientes</p>'
        +prop.opiniones.map(function(o){
          return '<div class="resena">'
            +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
            +'<div class="av av-sm" style="background:'+o.c+'">'+o.i+'</div>'
            +'<span style="font-weight:700;font-size:.74rem;color:#0B1E38;flex:1">'+o.n+'</span>'
            +'<span style="font-size:.65rem;color:#E8A020;display:flex;gap:1px">'+ICO.star+' '+o.s.replace(/[★☆]/g,'').replace('★','')+'</span>'
            +'</div><p style="font-size:.72rem;color:#64748B;line-height:1.6">'+o.t+'</p></div>';
        }).join('')
      : '')
    +'</div></div>';
}

/* ══════════════════════════════
   P6 — PUBLICAR
══════════════════════════════ */
function pagPublicar() {
  if (!S.usuario) {
    return '<div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 28px;text-align:center;background:#F0F4FA">'
      +'<div style="width:80px;height:80px;border-radius:50%;background:#EBF3FF;display:flex;align-items:center;justify-content:center;margin-bottom:20px">'
      +'<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1B4F8A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
      +'</div>'
      +'<h2 style="font-family:\'Fraunces\',serif;font-size:1.4rem;font-weight:700;margin-bottom:10px;letter-spacing:-.3px">Inicia sesión primero</h2>'
      +'<p style="color:#64748B;font-size:.82rem;max-width:280px;margin:0 auto 26px;line-height:1.7">Necesitas una cuenta para publicar propiedades en CasaRD.</p>'
      +'<button class="btn btn-azul" style="max-width:300px" onclick="ir(\'login\')">Iniciar sesión</button>'
      +'<button class="btn btn-ghost" style="max-width:300px;margin-top:10px" onclick="ir(\'registro\')">Crear cuenta gratis</button>'
      +'</div>';
  }

  var tipos = [['🏠','Casa'],['🏢','Apartamento'],['🏡','Villa'],['🛖','Cabaña'],['🏩','Estudio'],['🏗️','Otro']];
  var comods = ['📶 WiFi','❄️ A/C','⚡ Planta eléc.','🚗 Parqueo','🏊 Piscina','🌿 Jardín','🐾 Mascotas OK','🔐 Seguridad 24h','🍳 Cocina equipada','🌊 Vista al mar'];

  return '<div class="pb-nav">'
    +'<div class="hero-oscuro">'
    +'<div class="sbar d"><span style="font-family:\'Fraunces\',serif">CasaRD</span><span>🇩🇴</span></div>'
    +'<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.3rem;font-weight:700;margin-bottom:3px;letter-spacing:-.3px">Publicar propiedad</h2>'
    +'<p style="color:rgba(255,255,255,.42);font-size:.74rem">Completa todos los campos obligatorios *</p>'
    +'</div>'
    +'<div class="page-body">'
    /* Aviso WhatsApp */
    +'<div class="aviso av-wa"><span style="font-size:1.1rem;flex-shrink:0">💬</span>'
    +'<span style="font-size:.76rem"><b>Tip:</b> Los inquilinos te contactarán por <b>WhatsApp</b>. Verifica que tu número esté correcto.</span>'
    +'</div>'
    /* Fotos */
    +'<div class="fsec">'+ICO.cam+' Fotos de la propiedad</div>'
    +'<div id="fotos-prev" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;min-height:4px"></div>'
    +'<label style="display:flex;align-items:center;justify-content:center;gap:10px;border:2px dashed #DDE5F0;border-radius:16px;padding:18px;cursor:pointer;background:white;font-size:.82rem;color:#64748B;margin-bottom:4px;transition:border-color .2s">'
    +ICO.cam+' Tocar para agregar fotos (máx. 5)'
    +'<input type="file" id="input-fotos" accept="image/*" multiple style="display:none" onchange="previsualizarFotos(this)"/>'
    +'</label>'
    /* Tipo */
    +'<div class="fsec" style="margin-top:16px">🏠 Tipo de propiedad *</div>'
    +'<div class="tipo-grid">'
    +tipos.map(function(t, i){
        return '<button class="tipo-opt '+(i===0?'on':'')+'" onclick="selTipo(this)" data-tipo="'+t[1]+'">'+t[0]+' '+t[1]+'</button>';
      }).join('')
    +'</div>'
    /* Detalles */
    +'<div class="fsec">📝 Detalles</div>'
    +'<div class="fgroup"><label class="flabel">Título del anuncio *</label>'
    +'<input class="finput" id="pub-titulo" type="text" placeholder="Ej: Hermosa villa con piscina en Punta Cana"/></div>'
    +'<div class="frow">'
    +'<div class="fgroup"><label class="flabel">Precio / mes (RD$) *</label>'
    +'<input class="finput" id="pub-precio" type="number" min="1" placeholder="25000"/></div>'
    +'<div class="fgroup"><label class="flabel">Habitaciones *</label>'
    +'<input class="finput" id="pub-hab" type="number" min="1" placeholder="3"/></div>'
    +'</div>'
    +'<div class="frow">'
    +'<div class="fgroup"><label class="flabel">Baños</label>'
    +'<input class="finput" id="pub-ban" type="number" min="1" placeholder="2"/></div>'
    +'<div class="fgroup"><label class="flabel">Metros cuadrados</label>'
    +'<input class="finput" id="pub-m2" type="number" min="1" placeholder="120"/></div>'
    +'</div>'
    +'<div class="fgroup"><label class="flabel">Ciudad *</label>'
    +'<input class="finput" id="pub-ciudad" type="text" placeholder="Santo Domingo, Punta Cana, Santiago…"/></div>'
    +'<div class="fgroup"><label class="flabel">Sector / Barrio</label>'
    +'<input class="finput" id="pub-sector" type="text" placeholder="Piantini, Naco, Los Jardines, Bella Vista…"/></div>'
    +'<div class="fgroup"><label class="flabel">WhatsApp de contacto *</label>'
    +'<input class="finput finput-wa" id="pub-tel" type="tel" placeholder="+1 (809) 000-0000"/></div>'
    +'<div class="fgroup"><label class="flabel">Descripción *</label>'
    +'<textarea class="finput ftextarea" id="pub-desc" placeholder="Describe tu propiedad — menciona lo más importante…"></textarea></div>'
    /* Comodidades */
    +'<div class="fsec">✅ Comodidades</div>'
    +'<div class="como-grid">'
    +comods.map(function(c){
        return '<button class="como-item" onclick="toggleComod(this)" data-comod="'+c+'">'
          +'<div class="cbox off"></div>'+c+'</button>';
      }).join('')
    +'</div>'
    +'<button class="btn btn-azul" style="margin-top:12px" onclick="submitPublicar()">'
    +'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
    +' Publicar anuncio'
    +'</button>'
    +'<button class="btn btn-ghost" style="margin-top:10px" onclick="ir(\'explorar\')">Cancelar</button>'
    +'</div></div>';
}

/* ══════════════════════════════
   P7 — MENSAJES
══════════════════════════════ */
function pagMensajes() {
  return '<div class="pb-nav">'
    +'<div style="background:white;padding:calc(env(safe-area-inset-top,28px) + 10px) 18px 14px;border-bottom:1px solid #DDE5F0;position:sticky;top:0;z-index:100">'
    +'<h2 style="font-family:\'Fraunces\',serif;font-size:1.2rem;font-weight:700;color:#0B1E38;margin-bottom:10px;letter-spacing:-.3px">Mensajes</h2>'
    +'<div style="display:flex;align-items:center;gap:8px;background:#F0F4FA;border:1px solid #DDE5F0;border-radius:12px;padding:9px 13px;font-size:.78rem;color:#94A3B8">'
    +'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>'
    +' Buscar conversaciones…</div>'
    +'</div>'
    +CONVS.map(function(c){
        return '<div class="conv '+(c.nr>0?'unread':'')+'" onclick="ir(\'chat\',{n:\''+c.n+'\',cid:\''+c.id+'\'})">'
          +'<div class="av av-md '+(c.online?'av-on':'')+'" style="background:'+c.c+'">'+iniciales(c.n)+'</div>'
          +'<div class="conv-body">'
          +'<div class="conv-top"><span class="conv-name">'+c.n+'</span><span class="conv-time">'+c.h+'</span></div>'
          +'<p class="conv-prop">'+c.prop+'</p>'
          +'<p class="conv-last '+(c.nr>0?'b':'')+'">'+c.ult+'</p>'
          +'</div>'
          +(c.nr>0?'<div class="ubadge">'+c.nr+'</div>':'')
          +'</div>';
      }).join('')
    +'</div>';
}

/* ══════════════════════════════
   P8 — CHAT
══════════════════════════════ */
function pagChat(p) {
  p = p || {};
  var n  = p.n  || 'Roberto Vargas';
  var t  = p.t  || 'Villa Las Palmas';
  var pr = p.pr || 25000;

  return '<div class="chat-wrap">'
    +'<div class="chat-head">'
    +'<button onclick="ir(\'mensajes\')" style="color:#1B4F8A;font-weight:700;background:none;border:none;cursor:pointer;padding:4px 6px;display:flex">'+ICO.back+'</button>'
    +'<div class="av av-sm av-on" style="background:linear-gradient(135deg,#1B4F8A,#E8A020)">'+iniciales(n)+'</div>'
    +'<div style="flex:1">'
    +'<p style="font-weight:700;font-size:.86rem;color:#0B1E38">'+n+'</p>'
    +'<p style="font-size:.64rem;color:#10B981;font-weight:700;display:flex;align-items:center;gap:3px">'
    +'<span style="width:7px;height:7px;border-radius:50%;background:#10B981;display:inline-block"></span> En línea</p>'
    +'</div>'
    +'</div>'
    /* Prop banner */
    +'<div class="chat-prop-b">'
    +'<div style="width:44px;height:44px;border-radius:11px;background:linear-gradient(135deg,#FDEBC8,#F0B86E);display:flex;align-items:center;justify-content:center;font-size:1.3rem">🏠</div>'
    +'<div><p style="font-weight:700;font-size:.76rem;color:#0B1E38;margin-bottom:1px">'+t+'</p>'
    +'<p style="font-size:.68rem;color:#1B4F8A;font-weight:700">'+precio(pr)+' / mes</p></div>'
    +'</div>'
    /* Mensajes */
    +'<div class="chat-msgs" id="chat-msgs">'
    +'<p style="text-align:center;font-size:.62rem;color:#94A3B8;margin-bottom:10px;padding:4px 12px;background:rgba(0,0,0,.04);border-radius:50px;align-self:center">Hoy</p>'
    +'<div><div class="bubble b-them">¡Hola! Vi su propiedad en CasaRD. ¿Está disponible?</div><p class="btime">10:32</p></div>'
    +'<div><div class="bubble b-me">¡Buenas! Sí, disponible. ¿Para cuántas personas?</div><p class="btime me">10:34 ✓✓</p></div>'
    +'<div><div class="bubble b-them">Somos familia de 4. ¿La planta eléctrica funciona bien?</div><p class="btime">10:36</p></div>'
    +'<div><div class="bubble b-me">Sí, planta de 20KVA. Incluye agua, internet y seguridad.</div><p class="btime me">10:38 ✓✓</p></div>'
    +'</div>'
    /* Continuar en WA */
    +'<button class="btn btn-wa" style="margin:8px 14px;width:calc(100% - 28px)" onclick="wa(\'18090000001\',\'¡Hola! Continuamos desde CasaRD 🏠🇩🇴\')">'+ICO.wa+' Continuar en WhatsApp</button>'
    /* Input */
    +'<div class="chat-ibar">'
    +'<span style="cursor:pointer;display:flex">'+ICO.clip+'</span>'
    +'<input class="chat-inp" id="cinput" placeholder="Escribe un mensaje…" onkeydown="if(event.key===\'Enter\')enviarMsg()"/>'
    +'<button class="send-btn" onclick="enviarMsg()">'+ICO.send+'</button>'
    +'</div></div>';
}

/* ══════════════════════════════
   P9 — PERFIL
══════════════════════════════ */
function pagPerfil() {
  var u      = S.usuario || {};
  var nombre = u.nombre  || 'Usuario CasaRD';

  return '<div class="pb-nav">'
    +'<div class="hero-oscuro" style="text-align:center;padding-bottom:28px">'
    +'<div class="sbar d"><span style="font-family:\'Fraunces\',serif">CasaRD</span><span>🇩🇴</span></div>'
    +'<div style="position:relative;display:inline-block;margin-bottom:14px">'
    +(u.foto
      ? '<img src="'+u.foto+'" style="width:78px;height:78px;border-radius:50%;border:3px solid rgba(255,255,255,.18);object-fit:cover">'
      : '<div class="av av-lg" style="background:linear-gradient(135deg,#E8A020,#E85D3A);margin:0 auto">'+iniciales(nombre)+'</div>')
    +'<span style="position:absolute;bottom:2px;right:2px;width:22px;height:22px;border-radius:50%;background:#10B981;border:2px solid #0B1E38;display:flex;align-items:center;justify-content:center;font-size:.65rem;color:white;font-weight:700">✓</span>'
    +'</div>'
    +'<h2 style="font-family:\'Fraunces\',serif;color:white;font-size:1.2rem;font-weight:700;letter-spacing:-.3px">'+nombre+'</h2>'
    +'<p style="color:rgba(255,255,255,.38);font-size:.7rem;margin:4px 0 18px">'+(u.email||'')+'</p>'
    /* Stats */
    +'<div style="display:flex;border-top:1px solid rgba(255,255,255,.06);padding-top:16px">'
    +[['4','Anuncios'],['34','Reseñas'],['4.9','Calificación']].map(function(s, i, a){
        return '<div style="flex:1;text-align:center">'
          +'<span style="font-family:\'Fraunces\',serif;color:white;font-size:1.18rem;font-weight:700;display:block;letter-spacing:-.3px">'+s[0]+'</span>'
          +'<span style="color:rgba(255,255,255,.3);font-size:.62rem">'+s[1]+'</span>'
          +'</div>'+(i < a.length-1 ? '<div style="width:1px;background:rgba(255,255,255,.06)"></div>' : '');
      }).join('')
    +'</div></div>'
    /* Menús */
    +'<div class="page-body">'
    +'<p class="secth">Mis propiedades</p>'
    +'<div class="pmenu">'
    +[['#EBF3FF',ICO.home2,'Mis anuncios',   '4 propiedades activas',   '4'],
      ['#FFF0EB',ICO.fav,  'Favoritos',       '18 propiedades guardadas',''],
      ['#EBFFF3',ICO.cal,  'Mis reservas',    '2 reservas activas',      '2']].map(function(m){
        return '<div class="pitem" onclick="toast(\''+m[2]+' — próximamente\',\'info\')">'
          +'<div class="pic" style="background:'+m[0]+'">'+m[1]+'</div>'
          +'<div class="ptxt"><p class="pm">'+m[2]+'</p><p class="ps">'+m[3]+'</p></div>'
          +(m[4]?'<span class="pbadge">'+m[4]+'</span>':'')
          +'<span>'+ICO.chev+'</span></div>';
      }).join('')
    +'</div>'
    +'<p class="secth" style="margin-top:16px">Cuenta</p>'
    +'<div class="pmenu">'
    +[['var(--wa-bg)',ICO.wa,  'WhatsApp vinculado', u.telefono||'+1 (809) 000-0000'],
      ['#FFF8EB',     ICO.bell,'Notificaciones',     'Gestionar alertas'],
      ['#F0EBFF',     ICO.cog, 'Configuración',      'Idioma, moneda RD$']].map(function(m){
        return '<div class="pitem" onclick="toast(\''+m[2]+' — próximamente\',\'info\')">'
          +'<div class="pic" style="background:'+m[0]+'">'+m[1]+'</div>'
          +'<div class="ptxt"><p class="pm">'+m[2]+'</p><p class="ps">'+m[3]+'</p></div>'
          +'<span>'+ICO.chev+'</span></div>';
      }).join('')
    +'<div class="pitem" onclick="salir()">'
    +'<div class="pic" style="background:#FFEBEB">'+ICO.out+'</div>'
    +'<div class="ptxt"><p class="pm" style="color:#C0392B">Cerrar sesión</p><p class="ps">Terminar sesión actual</p></div>'
    +'<span>'+ICO.chev+'</span>'
    +'</div></div></div></div>';
     }
