
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

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.preferenciasUsuario) {
    aplicarPreferencias(changes.preferenciasUsuario.newValue || {});
  }
});

chrome.storage.sync.get(['preferenciasUsuario'], (result) => {
  if (result.preferenciasUsuario) {
    aplicarPreferencias(result.preferenciasUsuario);
  }
});

// Seleciona
function selecionarERealcarTexto() {
  const elementoAlvo =
    document.querySelector('article') ||
    document.querySelector('main') ||
    document.querySelector('p');

  if (!elementoAlvo) {
    console.warn('[Acessibilidade] Nenhum bloco de texto encontrado.');
    return '';
  }

  elementoAlvo.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });

  const range = document.createRange();
  range.selectNodeContents(elementoAlvo);

  const selecao = window.getSelection();
  selecao.removeAllRanges();
  selecao.addRange(range);

  return elementoAlvo.innerText.trim();
}

function exibirTextoNaTela(texto) {
  let container = document.getElementById('ayvu-transcricao-box');

  if (!container) {
    container = document.createElement('div');
    container.id = 'ayvu-transcricao-box';

    container.style.cssText =
      'position:fixed;' +
      'bottom:20px;' +
      'right:20px;' +
      'background:#000 !important;' +
      'color:#fff !important;' +
      'padding:15px;' +
      'border-radius:8px;' +
      'z-index:2147483647;' +
      'width:400px;' +
      'max-width:calc(100vw - 40px);' +
      'font-family:Arial,sans-serif;' +
      'font-size:16px;' +
      'line-height:1.5;' +
      'box-shadow:0 4px 12px rgba(0,0,0,.5);' +
      'border:1px solid #444;' +
      'word-wrap:break-word;' +
      'display:block;' +
      'visibility:visible;' +
      'opacity:1;' +
      'pointer-events:auto;';

    document.documentElement.appendChild(container);
  }

  container.textContent =
    'AYVU Acessibilidade: ' + (texto || 'Mensagem recebida.');
}


// Gerenciador
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.acao === 'ATUALIZAR_PREFERENCIAS') {
    aplicarPreferencias(request.preferencias);
    sendResponse({ status: 'OK' });
    return true;
  }

  if (request.acao === 'LER_TEXTO_SELECIONADO') {
    const textoSelecionado = window.getSelection().toString();

    chrome.storage.sync.get(['preferenciasUsuario'], (result) => {
      const vel = result.preferenciasUsuario?.velocidadeFala || 1.0;
      falarTexto(textoSelecionado || request.texto, vel);
    });

    return true;
  }

  if (request.acao === 'LER_TEXTO_AUTOMATICO') {
    const textoParaLer = selecionarERealcarTexto();

    if (textoParaLer) {
      chrome.storage.sync.get(['preferenciasUsuario'], (result) => {
        const velocidade =
          result.preferenciasUsuario?.velocidadeFala || 1.0;

        falarTexto(textoParaLer, velocidade);
      });
    }

    return true;
  }

  if (request.acao === 'PARAR_LEITURA') {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.getSelection().removeAllRanges();
    }

    return true;
  }

  // Recebe do background 
  if (request.acao === 'EXIBIR_TEXTO_TELA') {
    console.log(
      '[AYVU] Mensagem recebida para exibir na página:',
      request.texto
    );

    exibirTextoNaTela(request.texto);

    sendResponse({ status: 'OK' });
    return true;
  }

  return false;
});