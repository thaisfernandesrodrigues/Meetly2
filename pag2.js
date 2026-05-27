/*pegando os elementos*/
const inputNome = document.getElementById('nome');
const btnConfirmar = document.getElementById('confirmarBtn');
const btnCancelar = document.getElementById('cancelarBtn');
const tagMensagem = document.getElementById('mensagem');

const botoesEscolher = document.querySelectorAll('.btn-escolher');
let linhaSelecionadaAtualmente = null;

botoesEscolher.forEach(function(botao) {
  botao.addEventListener('click', function() {
    if (linhaSelecionadaAtualmente !== null) {
      linhaSelecionadaAtualmente.classList.remove('linha-selecionada');
    }
    
    const tdPai = botao.parentElement;
    const trPai = tdPai.parentElement;
    
    linhaSelecionadaAtualmente = trPai;
    linhaSelecionadaAtualmente.classList.add('linha-selecionada');
    
    tagMensagem.textContent = "";
  });
});

/* função de confi*/ 
btnConfirmar.addEventListener('click', function() {
  const nomeDigitado = inputNome.value.trim();

  if (linhaSelecionadaAtualmente === null) {
    tagMensagem.style.color = "red";
    tagMensagem.textContent = "Por favor, escolha um horário na tabela antes de confirmar.";
    return;
  }

  /* caso o nome esteja vazio*/ 
  if (nomeDigitado === "") {
    tagMensagem.style.color = "red";
    tagMensagem.textContent = "Por favor, preencha o seu nome antes de confirmar.";
    return;
  }

  /*caso n tenha erro, vai dá certo*/ 
  const celulaStatus = linhaSelecionadaAtualmente.querySelector('.status');
  const celulaParticipante = linhaSelecionadaAtualmente.querySelector('.participante');
  const botaoDaLinha = linhaSelecionadaAtualmente.querySelector('.btn-escolher');
  const horarioEscolhido = linhaSelecionadaAtualmente.cells[0].textContent;

  celulaStatus.textContent = "Agendado";
  celulaStatus.classList.add('texto-agendado');
  celulaParticipante.textContent = nomeDigitado;

  botaoDaLinha.textContent = "Indisponível";
  botaoDaLinha.disabled = true;

  linhaSelecionadaAtualmente.classList.remove('linha-selecionada');

  tagMensagem.style.color = "green";
  tagMensagem.textContent = `Reunião agendada para ${nomeDigitado} às ${horarioEscolhido}.`;

  inputNome.value = "";
  linhaSelecionadaAtualmente = null;
});

/*alterações do cancelamento*/ 
btnCancelar.addEventListener('click', function() {
  /*limpa tudo*/ 
  if (linhaSelecionadaAtualmente !== null) {
    linhaSelecionadaAtualmente.classList.remove('linha-selecionada');
    linhaSelecionadaAtualmente = null;
  }
  
  inputNome.value = "";
  tagMensagem.textContent = "";
});
