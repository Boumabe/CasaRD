/* ═══════════════════════════════════════════════════
   CASARD — PÁGINA CHAT
════════════════════════════════════════════════════ */
const PaginaChat = (() => {

  const MENSAJES_DEMO = [
    { yo:false, texto:'¡Hola! Vi su propiedad en CasaRD. ¿Está disponible la villa?', hora:'10:32' },
    { yo:true,  texto:'¡Buenas! Sí, disponible desde el 1 de febrero. ¿Para cuántas personas?', hora:'10:34' },
    { yo:false, texto:'Somos familia de 4. ¿La planta eléctrica funciona bien?', hora:'10:36' },
    { yo:true,  texto:'Sí, planta de 20KVA. El precio incluye agua, internet y seguridad. Solo la luz va aparte.', hora:'10:38' },
    { yo:false, texto:'¡Perfecto! ¿Podemos visitar este fin de semana?', hora:'10:40' },
    { yo:true,  texto:'¡Claro! ¿Sábado 10am? Les comparto la ubicación exacta 📍', hora:'10:41' },
  ];

  function render(params = {}) {
    const nombre = params.nombre || 'Roberto Vargas';

    return `
      <div class="chat-page">
        <!-- Cabecera -->
        <div class="chat-head">
          <button onclick="Router.ir('mensajes')" style="font-size:1.1rem;color:var(--azul);font-weight:700;background:none;border:none;cursor:pointer">←</button>
          <div class="avatar avatar-sm avatar-online"
            style="background:linear-gradient(135deg,var(--azul),var(--dorado))">${Utils.iniciales(nombre)}</div>
          <div style="flex:1">
            <p style="font-weight:700;font-size:var(--text-base);color:var(--oscuro)">${nombre} ✓</p>
            <p style="font-size:var(--text-xs);color:var(--verde);font-weight:700">● En línea ahora</p>
          </div>
          <span style="color:var(--gris);font-size:1.2rem">⋮</span>
        </div>

        <!-- Banner propiedad -->
        <div class="chat-prop-banner">
          <div style="width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,#FDEBC8,#F0B86E);display:flex;align-items:center;justify-content:center;font-size:1.3rem">🏠</div>
          <div>
            <p style="font-weight:700;font-size:var(--text-sm);color:var(--oscuro)">Villa Las Palmas · Punta Cana</p>
            <p style="font-size:var(--text-xs);color:var(--azul);font-weight:700">${Utils.precio(25000)} / mes</p>
          </div>
        </div>

        <!-- Mensajes -->
        <div class="chat-msgs" id="chat-msgs">
          <p style="text-align:center;font-size:var(--text-xs);color:var(--gris);margin-bottom:8px">Hoy, 10:32 AM</p>
          ${MENSAJES_DEMO.map(m => `
            <div>
              <div class="bubble ${m.yo ? 'bubble-me' : 'bubble-them'}">${m.texto}</div>
              <p class="bubble-time ${m.yo ? 'me' : ''}">${m.hora}${m.yo ? ' ✓✓' : ''}</p>
            </div>
          `).join('')}
        </div>

        <!-- Botón WhatsApp -->
        <button class="btn btn-whatsapp"
          style="margin:8px 16px;width:calc(100% - 32px)"
          onclick="Utils.abrirWhatsapp('18090000001','¡Hola! Continuamos la conversación desde CasaRD 🏠🇩🇴')">
          💬 Continuar en WhatsApp
        </button>

        <!-- Input -->
        <div class="chat-input-bar">
          <span style="color:var(--gris);font-size:1.1rem">📎</span>
          <input class="chat-input-field" id="chat-input"
            type="text" placeholder="Escribe un mensaje…"
            onkeydown="if(event.key==='Enter')PaginaChat.enviar()" />
          <button class="send-btn" onclick="PaginaChat.enviar()">➤</button>
        </div>
      </div>
    `;
  }

  function enviar() {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;
    const msgs = document.getElementById('chat-msgs');
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="bubble bubble-me">${input.value}</div>
      <p class="bubble-time me">Ahora ✓</p>
    `;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    input.value = '';
  }

  function onMount() {
    const msgs = document.getElementById('chat-msgs');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  return { render, onMount, enviar };
})();
