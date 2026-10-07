let criandoOffscreen = null;

async function criarDocumentoOffscreen() {
  const url = chrome.runtime.getURL('offscreen/offscreen.html');

  const contexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [url]
  });

  if (contexts.length > 0) {
    console.log('[AYVU] Offscreen já existe.');
    return;
  }

  if (!criandoOffscreen) {
    console.log('[AYVU] Criando offscreen...');

    criandoOffscreen = chrome.offscreen.createDocument({
      url: 'offscreen/offscreen.html',
      reasons: ['USER_MEDIA'],
      justification: 'Capturar áudio do vídeo para acessibilidade.'
    });
  }

  try {
    await criandoOffscreen;
    console.log('[AYVU] Offscreen criado e carregado.');
  } finally {
    criandoOffscreen = null;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.acao === 'CAPTURAR_AUDIO_VIDEO') {
    iniciarCaptura();
    sendResponse({ status: 'OK' });
    return true;
  }

  if (request.acao === 'PARAR_CAPTURA_AUDIO_VIDEO') {
    chrome.runtime.sendMessage({
      target: 'offscreen',
      acao: 'PARAR_CAPTURA_AUDIO'
    }).then(() => {
      console.log('[AYVU] Comando PARAR enviado.');
    }).catch((erro) => {
      console.error('[AYVU] Erro PARAR:', erro);
    });

    sendResponse({ status: 'OK' });
    return true;
  }
  
if (request.acao === 'AUDIO_PROCESSADO') {
  console.log('[AYVU] AUDIO_PROCESSADO recebido:', request.tamanho, 'bytes');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0]?.id;
    console.log('[AYVU] Aba ativa encontrada:', tabId);

    if (!tabId) {
      console.error('[AYVU] Nenhuma aba ativa encontrada.');
      return;
    }

    chrome.tabs.sendMessage(tabId, {
      acao: 'EXIBIR_TEXTO_TELA',
      texto: 'Áudio capturado com sucesso! Tamanho: ' + request.tamanho + ' bytes'
    }).then(() => {
      console.log('[AYVU] Mensagem enviada para content.js com sucesso.');
    }).catch((erro) => {
      console.error('[AYVU] Erro ao enviar para content.js:', erro);
    });
  });

  return true;
}

});

async function iniciarCaptura() {
  try {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    const tab = tabs[0];

    if (!tab?.id) {
      console.error('[AYVU] Aba não encontrada.');
      return;
    }

    await criarDocumentoOffscreen();

    const streamId = await new Promise((resolve, reject) => {
      chrome.tabCapture.getMediaStreamId(
        { targetTabId: tab.id },
        (id) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }

          resolve(id);
        }
      );
    });

    console.log('[AYVU] Stream ID obtido:', streamId);

    await chrome.runtime.sendMessage({
      target: 'offscreen',
      acao: 'INICIAR_CAPTURA_AUDIO',
      streamId: streamId
    });

    console.log('[AYVU] INICIAR enviado para offscreen.');
  } catch (erro) {
    console.error('[AYVU] Erro ao iniciar:', erro);
  }
}
