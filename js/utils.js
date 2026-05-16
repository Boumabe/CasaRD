/* ═══════════════════════════════════════════════════
   CASARD — UTILIDADES COMPARTIDAS
   ─────────────────────────────────────────────────
   Funciones reutilizables en toda la app.
   Agregar aquí cualquier función de uso general.
════════════════════════════════════════════════════ */

const Utils = (() => {

  /* ─────────────────────────────────────────────
     TOAST — mensaje de notificación
     Uso: Utils.toast('¡Anuncio publicado!', 'success')
     Tipos: 'success' | 'error' | 'info'
  ───────────────────────────────────────────── */
  function toast(mensaje, tipo = 'info', duracion = 3000) {
    const el = document.getElementById('toast');
    el.textContent = mensaje;
    el.className = `toast toast-${tipo}`;
    el.classList.remove('hidden');

    setTimeout(() => {
      el.classList.add('hidden');
    }, duracion);
  }

  /* ─────────────────────────────────────────────
     LOADER — pantalla de carga
     Uso: Utils.loader(true)  → mostrar
          Utils.loader(false) → ocultar
  ───────────────────────────────────────────── */
  function loader(mostrar, texto = 'Cargando…') {
    const el = document.getElementById('loader');
    const txt = el.querySelector('.loader-text');
    if (txt) txt.textContent = texto;

    if (mostrar) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  }

  /* ─────────────────────────────────────────────
     FORMATO DE PRECIO en RD$
     Uso: Utils.precio(25000) → "RD$25,000"
  ───────────────────────────────────────────── */
  function precio(valor) {
    return 'RD$' + Number(valor).toLocaleString('es-DO');
  }

  /* ─────────────────────────────────────────────
     FORMATO DE FECHA
     Uso: Utils.fecha(timestamp) → "14 may 2025"
  ───────────────────────────────────────────── */
  function fecha(timestamp) {
    if (!timestamp) return '';
    const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return d.toLocaleDateString('es-DO', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  /* ─────────────────────────────────────────────
     TIEMPO RELATIVO
     Uso: Utils.tiempoRelativo(timestamp) → "hace 2h"
  ───────────────────────────────────────────── */
  function tiempoRelativo(timestamp) {
    if (!timestamp) return '';
    const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const diff = Date.now() - d.getTime();
    const mins  = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias  = Math.floor(diff / 86400000);

    if (mins < 1)   return 'Ahora';
    if (mins < 60)  return `${mins}m`;
    if (horas < 24) return `${horas}h`;
    if (dias < 7)   return `${dias}d`;
    return Utils.fecha(timestamp);
  }

  /* ─────────────────────────────────────────────
     INICIALES de un nombre
     Uso: Utils.iniciales("María González") → "MG"
  ───────────────────────────────────────────── */
  function iniciales(nombre) {
    if (!nombre) return '?';
    return nombre
      .split(' ')
      .slice(0, 2)
      .map(n => n[0].toUpperCase())
      .join('');
  }

  /* ─────────────────────────────────────────────
     ABRIR WHATSAPP
     Uso: Utils.abrirWhatsapp('8090001234', 'Hola!')
  ───────────────────────────────────────────── */
  function abrirWhatsapp(telefono, mensaje = '') {
    const num = telefono.replace(/\D/g, '');
    const url = `https://wa.me/${num}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  /* ─────────────────────────────────────────────
     MENSAJE TIPO WHATSAPP para propiedades
     Uso: Utils.mensajeWhatsapp(propiedad)
  ───────────────────────────────────────────── */
  function mensajeWhatsapp(propiedad) {
    return `¡Hola! Vi su propiedad "${propiedad.titulo}" en CasaRD (${Utils.precio(propiedad.precio)}/mes en ${propiedad.ciudad}). ¿Sigue disponible? 🏠🇩🇴`;
  }

  /* ─────────────────────────────────────────────
     VALIDAR TELÉFONO dominicano
     Uso: Utils.validarTelefono('8090001234') → true
  ───────────────────────────────────────────── */
  function validarTelefono(tel) {
    const num = tel.replace(/\D/g, '');
    return num.length >= 10;
  }

  /* ─────────────────────────────────────────────
     VALIDAR EMAIL
  ───────────────────────────────────────────── */
  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ─────────────────────────────────────────────
     AVATAR HTML — genera el HTML de un avatar
     Uso: Utils.avatarHTML('María González', 'md', true)
  ───────────────────────────────────────────── */
  function avatarHTML(nombre, tamaño = 'md', verificado = false, online = false) {
    const clases = [
      'avatar',
      `avatar-${tamaño}`,
      verificado ? 'avatar-verified' : '',
      online     ? 'avatar-online'   : '',
    ].filter(Boolean).join(' ');

    return `<div class="${clases}">${Utils.iniciales(nombre)}</div>`;
  }

  /* ─────────────────────────────────────────────
     ESTRELLAS HTML
     Uso: Utils.estrellasHTML(4.5) → "★★★★½"
  ───────────────────────────────────────────── */
  function estrellasHTML(valoracion) {
    const val = Math.round(valoracion * 2) / 2;
    return `⭐ ${val}`;
  }

  /* ─────────────────────────────────────────────
     COLORES RANDOM para avatares sin foto
  ───────────────────────────────────────────── */
  const COLORES_AVATAR = [
    'linear-gradient(135deg,#1B4F8A,#2563EB)',
    'linear-gradient(135deg,#F5A623,#E85D3A)',
    'linear-gradient(135deg,#10B981,#059669)',
    'linear-gradient(135deg,#6B3FA0,#9B59B6)',
    'linear-gradient(135deg,#E74C3C,#C0392B)',
    'linear-gradient(135deg,#1A8A8A,#0E6655)',
  ];

  function colorAvatar(nombre) {
    const i = (nombre || '').charCodeAt(0) % COLORES_AVATAR.length;
    return COLORES_AVATAR[i];
  }

  /* ─────────────────────────────────────────────
     DEBOUNCE — evitar llamadas repetidas
     Uso: input.oninput = Utils.debounce(buscar, 400)
  ───────────────────────────────────────────── */
  function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  /* API pública */
  return {
    toast,
    loader,
    precio,
    fecha,
    tiempoRelativo,
    iniciales,
    abrirWhatsapp,
    mensajeWhatsapp,
    validarTelefono,
    validarEmail,
    avatarHTML,
    estrellasHTML,
    colorAvatar,
    debounce,
  };

})();
