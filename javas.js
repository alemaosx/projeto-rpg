document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("ativo");
      const aberto = navLinks.classList.contains("ativo");
      menuToggle.textContent = aberto ? "✕" : "☰";
    });

    const linksMenu = navLinks.querySelectorAll("a");
    linksMenu.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("ativo");
        menuToggle.textContent = "☰";
      });
    });
  }

  const itensInventario = [
    { nome: "Poneglyph Roubado", tipo: "tesouro", raridade: "Lendário", desc: "Cópias dos segredos antigos." },
    { nome: "Lâminas Ocultas", tipo: "arma", raridade: "Raro", desc: "Armas duplas letais." },
    { nome: "Log Pose", tipo: "ferramenta", raridade: "Comum", desc: "Bússola de navegação." },
    { nome: "Poção de Vida", tipo: "pocao", raridade: "Comum", desc: "Recupera HP em combate." }
  ];

  const gridInventario = document.getElementById("inventario-grid");
  const contadorItens = document.getElementById("contador-itens");
  const botoesFiltro = document.querySelectorAll(".filtro-btn");

  function renderizarInventario(lista) {
    if (!gridInventario) return;
    gridInventario.innerHTML = "";

    lista.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("item-card", item.tipo);

      card.innerHTML = `
        <span class="raridade ${item.raridade.toLowerCase()}">${item.raridade}</span>
        <h3>${item.nome}</h3>
        <p>${item.desc}</p>
      `;

      gridInventario.appendChild(card);
    });

    if (contadorItens) {
      contadorItens.textContent = `${lista.length} itens exibidos`;
    }
  }

  renderizarInventario(itensInventario);

  botoesFiltro.forEach(botao => {
    botao.addEventListener("click", (e) => {
      botoesFiltro.forEach(b => b.classList.remove("ativo"));
      e.target.classList.add("ativo");

      const categoria = e.target.getAttribute("data-filtro");

      if (categoria === "todos") {
        renderizarInventario(itensInventario);
      } else {
        const filtrados = itensInventario.filter(item => item.tipo === categoria);
        renderizarInventario(filtrados);
      }
    });
  });

  const btnGanharXp = document.getElementById("btn-ganhar-xp");
  const barraXp = document.getElementById("xp-preenchida");
  const textoXp = document.getElementById("texto-xp");
  const mensagemNivel = document.getElementById("mensagem-nivel");

  let xpAtual = 20;
  let xpMaximo = 100;
  let nivelAtual = 1;

  if (btnGanharXp) {
    btnGanharXp.addEventListener("click", () => {
      xpAtual += 25;

      if (xpAtual >= xpMaximo) {
        xpAtual = 0;
        nivelAtual++;
        if (mensagemNivel) {
          mensagemNivel.textContent = `🎉 Level Up! Você avançou para o Nível ${nivelAtual}!`;
          mensagemNivel.style.color = "#27ae60";
        }
      } else {
        if (mensagemNivel) {
          mensagemNivel.textContent = "Missão concluída! Você ganhou 25 XP.";
          mensagemNivel.style.color = "#e5a93c";
        }
      }

      const porcentagem = (xpAtual / xpMaximo) * 100;
      if (barraXp) barraXp.style.width = `${porcentagem}%`;
      if (textoXp) textoXp.textContent = `Nível ${nivelAtual} | ${xpAtual} / ${xpMaximo} XP`;
    });
  }

  const btnVerMais = document.getElementById("btn-ver-mais");
  const historiaCompleta = document.getElementById("historia-completa");

  if (btnVerMais && historiaCompleta) {
    historiaCompleta.style.display = "none";

    btnVerMais.addEventListener("click", () => {
      const estaOculto = historiaCompleta.style.display === "none";
      historiaCompleta.style.display = estaOculto ? "block" : "none";
      btnVerMais.textContent = estaOculto ? "📜 Ver menos" : "📜 Ver história completa";
    });
  }

  const formGuilda = document.getElementById("form-guilda");
  const feedbackForm = document.getElementById("feedback-form");

  if (formGuilda) {
    formGuilda.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const nome = document.getElementById("nome-contato").value.trim();
      const email = document.getElementById("email-contato").value.trim();
      const mensagem = document.getElementById("mensagem-contato").value.trim();

      if (nome === "") {
        exibirFeedback("Preencha o seu nome!", "erro");
      } else if (email === "" || !email.includes("@")) {
        exibirFeedback("Insira um e-mail válido contendo '@'!", "erro");
      } else if (mensagem === "") {
        exibirFeedback("A mensagem não pode estar vazia!", "erro");
      } else {
        exibirFeedback("Sinal enviado com sucesso para a guilda! ⚓", "sucesso");
        formGuilda.reset();
      }
    });
  }

  function exibirFeedback(texto, tipo) {
    if (!feedbackForm) return;
    feedbackForm.textContent = texto;
    feedbackForm.className = `feedback-form ${tipo}`;
  }

  const btnDarkMode = document.getElementById("btn-dark-mode");
  if (btnDarkMode) {
    btnDarkMode.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      btnDarkMode.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Noturno";
    });
  }

  const containerSaudacao = document.getElementById("saudacao-visitante");
  if (containerSaudacao) {
    const horaAtual = new Date().getHours();
    let saudacao = "Bem-vindo, marujo! ⚓";

    if (horaAtual >= 5 && horaAtual < 12) {
      saudacao = "Bom dia, marujo! ☀️⚓";
    } else if (horaAtual >= 12 && horaAtual < 18) {
      saudacao = "Boa tarde, marujo! 🏴‍☠️⚓";
    } else {
      saudacao = "Boa noite, marujo! 🌙⚓";
    }

    containerSaudacao.textContent = saudacao;
  }
});