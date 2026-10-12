
document.addEventListener('DOMContentLoaded', () => {
  const btnLerTexto = document.getElementById('btnLerTexto');
  const btnPararLeitura = document.getElementById('btnPararLeitura');

  
  if (btnLerTexto) {
    btnLerTexto.addEventListener('click', async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (tab?.id) {
        chrome.tabs.sendMessage(tab.id, { acao: 'LER_TEXTO_AUTOMATICO' }).catch(() => {
          console.warn('Não foi possível se comunicar com a aba ativa.');
        });
      }
    });
  }


  if (btnPararLeitura) {
    btnPararLeitura.addEventListener('click', async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (tab?.id) {
        chrome.tabs.sendMessage(tab.id, { acao: 'PARAR_LEITURA' });
      }
    });
  }
});