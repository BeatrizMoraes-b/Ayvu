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