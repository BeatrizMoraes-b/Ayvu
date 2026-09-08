
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

chrome.storage.sync.get(['preferenciasUsuario'], (result) => {
  if (result.preferenciasUsuario && result.preferenciasUsuario.contraste) {
    aplicarFiltro(result.preferenciasUsuario.contraste);
  }
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.preferenciasUsuario) {
    const novasPrefs = changes.preferenciasUsuario.newValue;
    if (novasPrefs && novasPrefs.contraste) {
      aplicarFiltro(novasPrefs.contraste);
    }
  }
});