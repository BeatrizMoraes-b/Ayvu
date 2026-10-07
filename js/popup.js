const btnCapturarVideo = document.getElementById('btnCapturarVideo');
const btnPararCapturaVideo = document.getElementById('btnPararCapturaVideo');

if (btnCapturarVideo) {
  btnCapturarVideo.addEventListener('click', () => {
    chrome.runtime.sendMessage({
      acao: 'CAPTURAR_AUDIO_VIDEO'
    }).catch((erro) => {
      console.error('[AYVU] Erro ao iniciar captura:', erro);
    });

    window.close();
  });
}

if (btnPararCapturaVideo) {
  btnPararCapturaVideo.addEventListener('click', () => {
    chrome.runtime.sendMessage({
      acao: 'PARAR_CAPTURA_AUDIO_VIDEO'
    }).catch((erro) => {
      console.error('[AYVU] Erro ao parar captura:', erro);
    });

    window.close();
  });
}
