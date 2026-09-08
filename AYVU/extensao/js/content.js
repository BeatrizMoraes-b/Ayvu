function aplicarFiltroVisao(tipoFiltro) {
  const html = document.documentElement;


  html.style.filter = 'none';

  switch (tipoFiltro) {
    case 'alto-contraste':
      html.style.filter = 'invert(100%) hue-rotate(180deg)';
      break;
    case 'protanopia':

      html.style.filter = 'contrast(120%) saturate(130%)'; 
      break;
    case 'deuteranopia':
   
      html.style.filter = 'contrast(115%) brightness(105%)';
      break;
    case 'tritanopia':
      html.style.filter = 'hue-rotate(45deg)';
      break;
    default:
      html.style.filter = 'none';
  }
}