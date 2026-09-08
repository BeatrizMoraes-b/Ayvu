
document.addEventListener('DOMContentLoaded', () => {
  const selectContraste = document.getElementById('contraste');
  const selectTamanhoFonte = document.getElementById('tamanhoFonte');

  
  chrome.storage.sync.get(['preferenciasUsuario'], (result) => {
    if (result.preferenciasUsuario) {
      if (result.preferenciasUsuario.contraste) {
        selectContraste.value = result.preferenciasUsuario.contraste;
      }
      if (result.preferenciasUsuario.tamanhoFonte) {
        selectTamanhoFonte.value = result.preferenciasUsuario.tamanhoFonte;
      }
    }
  });

  
  document.getElementById('btnSalvar').addEventListener('click', () => {
    const novasPrefs = {
      contraste: selectContraste.value,
      tamanhoFonte: selectTamanhoFonte.value
    };

    chrome.storage.sync.set({ preferenciasUsuario: novasPrefs }, () => {
      window.close(); 
    });
  });
});