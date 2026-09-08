
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



function falarTexto(texto, velocidade = 1.0) {
  if (!('speechSynthesis' in window)) return;


  window.speechSynthesis.cancel();
  if (!texto || texto.trim() === '') return;

  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'pt-BR';
  utterance.rate = velocidade;

  window.speechSynthesis.speak(utterance);
}

function aplicarPreferencias(prefs) {
  if (!prefs) return;
  aplicarFiltro(prefs.contraste);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.acao === 'ATUALIZAR_PREFERENCIAS') {
    aplicarPreferencias(request.preferencias);
    sendResponse({ status: 'OK'});
  }


  if (request.acao === 'LER_TEXTO_SELECIONADO') {
    const textoSelecionado = window.getSelection().toString();
    
   
    chrome.storage.sync.get(['preferenciasUsuario'], (result) => {
      const vel = result.preferenciasUsuario?.velocidadeFala || 1.0;
      falarTexto(textoSelecionado || request.texto, vel);
    });
  }
});