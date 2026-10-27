// função para aplicar o filtro de daltonismo
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


//função para alinhar o filtro com as preferências

function falarTexto(texto, velocidade = 1.0, vozGenero = 'padrao') {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  if (!texto || texto.trim() === '') return;

  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'pt-BR';
  utterance.rate = velocidade;

  const selecionarVoz = () => {
    const vozes = window.speechSynthesis.getVoices();

    if (vozGenero !== 'padrao') {
      const vozSelecionada = vozes.find(voz =>
        voz.lang.toLowerCase().startsWith('pt') &&
        (
          vozGenero === 'feminino'
            ? /female|feminina|francisca|maria/i.test(voz.name)
            : /male|masculina/i.test(voz.name)
        )
      );

      if (vozSelecionada) {
        utterance.voice = vozSelecionada;
      }
    }

    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    selecionarVoz();
  } else {
    window.speechSynthesis.addEventListener(
      'voiceschanged',
      selecionarVoz,
      { once: true }
    );
  }
}

//aqui ela aplica as preferências 
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

function selecionarERealcarTexto() {
  const elementoAlvo = 
      document.querySelector('article') || 
      document.querySelector('main') || 
      document.querySelector('p');

  if (!elementoAlvo) {
    console.warn('[Acessibilidade] Nenhum bloco de texto encontrado.');
    return '';
  }

 
  elementoAlvo.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const range = document.createRange();
  range.selectNodeContents(elementoAlvo);

  const selecao = window.getSelection();
  selecao.removeAllRanges();
  selecao.addRange(range);

  return elementoAlvo.innerText.trim();
}


chrome.runtime.onMessage.addListener((request) => {
  if (request.acao === 'ATUALIZAR_PREFERENCIAS') {
    aplicarPreferencias(request.preferencias);
  }

  if (request.acao === 'LER_TEXTO_AUTOMATICO') {
    
    const textoParaLer = selecionarERealcarTexto();

   
    if (textoParaLer) {
      chrome.storage.sync.get(['preferenciasUsuario'], (result) => {
        const prefs = result.preferenciasUsuario || {};
        const velocidade = prefs.velocidadeFala || 1.0;
        falarTexto(textoParaLer, velocidade, prefs.vozGenero);
      });
    }
  }

  if (request.acao === 'PARAR_LEITURA') {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.getSelection().removeAllRanges();
    }
  }
});
