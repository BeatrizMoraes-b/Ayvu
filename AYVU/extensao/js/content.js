
function aplicarFiltro(tipoFiltro) {
  const html = document.documentElement;

  switch (tipoFiltro) {
    case 'alto-contraste':
      html.style.filter = 'invert(100%) hue-rotate(180deg)';
      break;
    case 'protanopia':
      html.style.filter = 'contrast(120%) saturate(80%)';
      break;
    case 'deuteranopia':
      html.style.filter = 'contrast(110%) brightness(105%)';
      break;
    case 'tritanopia':
      html.style.filter = 'hue-rotate(45deg)';
      break;
    default:
      html.style.filter = 'none';
      break;
  }
}

function aplicarTamanhoFonte(tamanho) {
  let styleTag = document.getElementById('acessibilidade-fonte');
  
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'acessibilidade-fonte';
    document.head.appendChild(styleTag);
  }

  switch (tamanho) {
    case 'grande':
      styleTag.textContent = '* { font-size: 120% !important; }';
      break;
    case 'muito-grande':
      styleTag.textContent = '* { font-size: 140% !important; }';
      break;
    default:
      styleTag.textContent = '';
      break;
  }
}

function falarTexto(texto) {
  if (!('speechSynthesis' in window)) {
    console.warn('[Acessibilidade] Web Speech API não é suportada neste navegador.');
    return;
  }


  window.speechSynthesis.cancel();

  if (!texto || texto.trim() === '') return;

  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'pt-BR';
  utterance.rate = 1.0;

  window.speechSynthesis.speak(utterance);
}

chrome.storage.sync.get(['preferenciasUsuario'], (result) => {
  if (result.preferenciasUsuario) {
    aplicarPreferencias(result.preferenciasUsuario);
  }
});


chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.preferenciasUsuario) {
    const novasPrefs = changes.preferenciasUsuario.newValue || {};
    aplicarPreferencias(novasPrefs);
  }
});