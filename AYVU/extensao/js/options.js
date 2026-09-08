
document.addEventListener('DOMContentLoaded', carregarPreferencias);

const elemVelocidade = document.getElementById('velocidade');
const elemValorVelocidade = document.getElementById('valor-velocidade');
const elemVozGenero = document.getElementById('vozGenero');
const elemContraste = document.getElementById('contraste');
const elemTamanhoFonte = document.getElementById('tamanhoFonte');
const elemStatus = document.getElementById('status');


elemVelocidade.addEventListener('input', () => {
  elemValorVelocidade.textContent = `${elemVelocidade.value}x`;
});


function carregarPreferencias() {
  chrome.storage.sync.get(['preferenciasUsuario'], (result) => {
    if (!result.preferenciasUsuario) return;

    const prefs = result.preferenciasUsuario;

   
    if (prefs.velocidadeFala) {
      elemVelocidade.value = prefs.velocidadeFala;
      elemValorVelocidade.textContent = `${prefs.velocidadeFala}x`;
    }
    if (prefs.vozGenero) elemVozGenero.value = prefs.vozGenero;
    if (prefs.contraste) elemContraste.value = prefs.contraste;
    if (prefs.tamanhoFonte) elemTamanhoFonte.value = prefs.tamanhoFonte;
  });
}


function salvarPreferencias() {
  const configuracoes = {
    velocidadeFala: parseFloat(elemVelocidade.value),
    vozGenero: elemVozGenero.value,
    contraste: elemContraste.value,
    tamanhoFonte: elemTamanhoFonte.value
  };

  chrome.storage.sync.set({ preferenciasUsuario: configuracoes }, () => {
   
    elemStatus.textContent = 'Preferências salvas com sucesso!';
    elemStatus.style.color = 'green';

    setTimeout(() => {
      elemStatus.textContent = '';
    }, 3000);
  });
}

document.getElementById('btnSalvar').addEventListener('click', salvarPreferencias);