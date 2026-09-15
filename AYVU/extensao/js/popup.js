document.addEventListener('DOMContentLoaded', () => {
  const selectContraste = document.getElementById('contraste');
  const selectTamanhoFonte = document.getElementById('tamanhoFonte');

  
  chrome.storage.sync.get(['preferenciasUsuario'], (result) => {
    if (result.preferenciasUsuario) {
      selectContraste.value = result.preferenciasUsuario.contraste || 'nenhum';
      selectTamanhoFonte.value = result.preferenciasUsuario.tamanhoFonte || 'normal';
    }
  });

  function salvar() {
    const novasPrefs = {
      contraste: selectContraste.value,
      tamanhoFonte: selectTamanhoFonte.value
    };
    chrome.storage.sync.set({ preferenciasUsuario: novasPrefs });
  }

 
  selectContraste.addEventListener('change', salvar);
  selectTamanhoFonte.addEventListener('change', salvar);

 
  const btnSalvar = document.getElementById('btnSalvar');
  if (btnSalvar) {
    btnSalvar.addEventListener('click', () => {
      salvar();
      window.close();
    });
  }
});

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