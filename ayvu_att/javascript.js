const root = document.documentElement;
const botao = document.getElementById('toggle-tema');

const salvo = localStorage.getItem('tema');
const sistemaEscuro = window.matchMedia('(prefers-color-scheme:dark)').matches;
root.dataset.theme = salvo || (sistemaEscuro ? 'dark':'light');

function atualizarBotao() {
    botao.setAttribute('aria-pressed', root.dataset.theme === 'dark');
}
atualizarBotao();

botao.addEventListener('click', () => {
    const novo = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = novo;
    localStorage.setItem('tema', novo);
    atualizarBotao();
});
