function msgHtml(msg, level) {
  return `
    <p class="message-box-text">
      <i class="icon icon-${level}"></i>
      <span>${msg}</span>
    </p>
  `;
}

function propFormat(name, value) {
  return `${name}: <b>${value.toFixed(2)}</b>`;
}

function deviceHtml(name, props, state) {
  const propsList = Object.values(props).map(p => `<li data-uuid="${p.uuid}">${propFormat(p.name, p.value)}</li>`).join('');
  return `
    <h2 class="message-box-subheader">${name}</h2>

    <p class="message-box-text">Свойства устройства:</p>
    <ul class="message-box-props">
      ${propsList}
    </ul>

    <p class="message-box-state">${state}</p>
  `;
}

const $box = document.getElementById('message-box');
const $boxInfo = $box.querySelector('.message-box__info');

const MessageBox = {
  // props
  hidden: true,
  currentDevice: null,

  // methods
  show() {
    $box.style.display = 'block';
    this.hidden = false;
  },

  hide() {
    $box.style.display = 'none';
    this.hidden = true;
  },

  _plainMessage(msg, className) {
    this.currentDevice = null;
    MessageBox.show();
    $box.innerHTMl = msgHtml(msg, className);
  },

  warn(msg) {
    _plainMessage(msg, 'warn');
  },

  info(msg) {
    _plainMessage(msg, 'info');
  },

  showDevice({ uuid, name, parameters, state }) {
    MessageBox.show();
    this.currentDevice = uuid;
    $boxInfo.innerHTML = deviceHtml(name, parameters, state);
  },

  updateDevice({ uuid, name, value }) {
    // Ничего не делать, если устройство не показано в данный момент
    if (hidden || (this.currentDevice !== uuid)) {
      return;
    }

    const $li = $boxInfo.querySelector(`[data-uuid=${uuid}]`);
    $li.innerHTML = propFormat(name, value);
  },
};

const $close = $box.querySelector('.icon-close');
$close.addEventListener('click', () => {
  MessageBox.hide();
});

export default MessageBox;