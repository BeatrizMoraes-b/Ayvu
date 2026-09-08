function falarTexto(texto) {
  chrome.storage.sync.get(['preferenciasUsuario'], (result) => {
    const prefs = result.preferenciasUsuario || {};
    
    const utterance = new SpeechSynthesisUtterance(texto);
    
  
    utterance.rate = prefs.velocidadeFala || 1.0;

  
    const voices = window.speechSynthesis.getVoices();
    if (prefs.vozGenero) {
      const vozSelecionada = voices.find(v => 
        v.lang.startsWith('pt') && v.name.toLowerCase().includes(prefs.vozGenero)
      );
      if (vozSelecionada) utterance.voice = vozSelecionada;
    }

    window.speechSynthesis.speak(utterance);
  });
}