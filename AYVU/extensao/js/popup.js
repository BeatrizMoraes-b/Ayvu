
document.addEventListener('DOMContentLoaded', () => {
  const btnLerTexto = document.getElementById('btnLerTexto');
  const btnPararLeitura = document.getElementById('btnPararLeitura');

  if (btnLerTexto) {
    btnLerTexto.addEventListener('click', async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (tab && tab.id) {
          chrome.tabs.sendMessage(tab.id, { acao: 'LER_TEXTO_AUTOMATICO' }).catch((err) => {
            console.warn('Não foi possível se comunicar com a aba ativa:', err);
          });
        }
      } catch (error) {
        console.error('Erro ao buscar a aba ativa:', error);
      }
    });
  }


  if (btnPararLeitura) {
    btnPararLeitura.addEventListener('click', async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (tab && tab.id) {
          chrome.tabs.sendMessage(tab.id, { acao: 'PARAR_LEITURA' }).catch(() => {});
        }
      } catch (error) {
        console.error('Erro ao buscar a aba ativa:', error);
      }
    });
  }
});
