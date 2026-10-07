let mediaRecorder = null;
let audioChunks = [];
let audioContext = null;
let mediaStream = null;

console.log('[AYVU Offscreen] offscreen.js carregado.');

chrome.runtime.onMessage.addListener((message) => {
  console.log('[AYVU Offscreen] Mensagem recebida:', message);

  if (message.target !== 'offscreen') {
    console.log('[AYVU Offscreen] Mensagem ignorada: target diferente de offscreen.');
    return;
  }

  if (message.acao === 'INICIAR_CAPTURA_AUDIO') {
    console.log('[AYVU Offscreen] Comando INICIAR_CAPTURA_AUDIO recebido.');
    console.log('[AYVU Offscreen] Stream ID:', message.streamId);
    startCapture(message.streamId);
  }

  if (message.acao === 'PARAR_CAPTURA_AUDIO') {
    console.log('[AYVU Offscreen] Comando PARAR_CAPTURA_AUDIO recebido.');
    stopCapture();
  }
});

async function startCapture(streamId) {
  try {
    if (!streamId) {
      console.error('[AYVU Offscreen] Stream ID não informado.');
      return;
    }

    console.log('[AYVU Offscreen] Solicitando acesso ao áudio...');

    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: 'tab',
          chromeMediaSourceId: streamId
        }
      },
      video: false
    });

    console.log('[AYVU Offscreen] MediaStream obtido com sucesso.');
    console.log('[AYVU Offscreen] Faixas de áudio:', mediaStream.getAudioTracks().length);

    audioContext = new AudioContext();

    const source = audioContext.createMediaStreamSource(mediaStream);
    source.connect(audioContext.destination);

    console.log('[AYVU Offscreen] Áudio conectado à saída.');

    audioChunks = [];

    let mimeType = 'audio/webm';

    if (!MediaRecorder.isTypeSupported('audio/webm')) {
      console.warn('[AYVU Offscreen] audio/webm não suportado. Usando padrão.');
      mimeType = '';
    }

    mediaRecorder = mimeType
      ? new MediaRecorder(mediaStream, { mimeType })
      : new MediaRecorder(mediaStream);

    console.log('[AYVU Offscreen] MediaRecorder criado.');

    mediaRecorder.ondataavailable = (event) => {
      console.log(
        '[AYVU Offscreen] Dados de áudio recebidos:',
        event.data.size,
        'bytes'
      );

      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onerror = (event) => {
      console.error('[AYVU Offscreen] Erro no MediaRecorder:', event);
    };

    mediaRecorder.onstart = () => {
      console.log('[AYVU Offscreen] 🎙️ GRAVAÇÃO INICIADA.');
    };

    mediaRecorder.onstop = async () => {
      console.log('[AYVU Offscreen] ⏹️ GRAVAÇÃO PARADA.');

      const audioBlob = new Blob(audioChunks, {
        type: mimeType || 'audio/webm'
      });

      console.log(
        '[AYVU Offscreen] Áudio gravado com sucesso!',
        'Tamanho:',
        audioBlob.size,
        'bytes'
      );

      const audioUrl = URL.createObjectURL(audioBlob);

      console.log('[AYVU Offscreen] Enviando AUDIO_PROCESSADO para background...');

      chrome.runtime.sendMessage({
        acao: 'AUDIO_PROCESSADO',
        url: audioUrl,
        tamanho: audioBlob.size
      }, () => {
        if (chrome.runtime.lastError) {
          console.error(
            '[AYVU Offscreen] Erro ao enviar AUDIO_PROCESSADO:',
            chrome.runtime.lastError.message
          );
        } else {
          console.log('[AYVU Offscreen] AUDIO_PROCESSADO enviado.');
        }
      });
    };

    mediaRecorder.start(1000);

    console.log('[AYVU Offscreen] mediaRecorder.start() executado.');

  } catch (error) {
    console.error('[AYVU Offscreen] ❌ Erro na captura:', error);
  }
}

function stopCapture() {
  if (!mediaRecorder) {
    console.warn('[AYVU Offscreen] Nenhum MediaRecorder ativo.');
    return;
  }

  if (mediaRecorder.state === 'recording') {
    console.log('[AYVU Offscreen] Parando MediaRecorder...');
    mediaRecorder.stop();
  } else {
    console.log(
      '[AYVU Offscreen] MediaRecorder não está gravando. Estado:',
      mediaRecorder.state
    );
  }
}
