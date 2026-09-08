document.addEventListener('DOMContentLoaded', carregarPreferencias);

const elemVelocidade = document.getElementById('velocidade');
const elemValorVelocidade = document.getElementById('valor-velocidade');
const elemVozGenero = document.getElementById('vozGenero');
const elemContraste = document.getElementById('contraste');
const elemStatus = document.getElementById('status');


if (elemVelocidade && elemValorVelocidade) {
  elemVelocidade.addEventListener('input', () => {
    elemValorVelocidade.textContent = `${elemVelocidade.value}x`;
  });
}

function carregarPreferencias() {
  chrome.storage.sync.get(['preferenciasUsuario'], (result) => {
    if (!result.preferenciasUsuario) return;

    const prefs = result.preferenciasUsuario;

    if (prefs.velocidadeFala && elemVelocidade && elemValorVelocidade) {
      elemVelocidade.value = prefs.velocidadeFala;
      elemValorVelocidade.textContent = `${prefs.velocidadeFala}x`;
    }
    if (prefs.vozGenero && elemVozGenero) {
      elemVozGenero.value = prefs.vozGenero;
    }
    if (prefs.contraste && elemContraste) {
      elemContraste.value = prefs.contraste;
    }
  });
}

function salvarPreferencias() {
  const configuracoes = {
    velocidadeFala: elemVelocidade ? parseFloat(elemVelocidade.value) : 1.0,
    vozGenero: elemVozGenero ? elemVozGenero.value : 'feminino',
    contraste: elemContraste ? elemContraste.value : 'nenhum'
  };

  chrome.storage.sync.set({ preferenciasUsuario: configuracoes }, () => {
    if (elemStatus) {
      elemStatus.textContent = 'Preferências salvas com sucesso!';
      elemStatus.style.color = 'green';

      setTimeout(() => {
        elemStatus.textContent = '';
      }, 3000);
    }

    
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            acao: 'ATUALIZAR_PREFERENCIAS',
            preferencias: configuracoes
          }).catch(() => {
          
          });
        }
      });
    });
  });
}

const btnSalvar = document.getElementById('btnSalvar');
if (btnSalvar) {
  btnSalvar.addEventListener('click', salvarPreferencias);
}