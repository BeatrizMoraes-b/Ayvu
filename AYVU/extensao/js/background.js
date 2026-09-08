
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {

    const preferenciasPadrao = {
      velocidadeFala: 1.0,
      vozGenero: 'padrao',
      contraste: 'normal',
      tamanhoFonte: 'normal'
    };


    chrome.storage.sync.set({ preferenciasUsuario: preferenciasPadrao }, () => {
      console.log('Extensão instalada!');
    });
  }
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.acao === 'OBTER_STATUS') {
    sendResponse({ status: 'Service Worker ativo' });
    return false;
  } 
});