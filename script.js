document.addEventListener("DOMContentLoaded", function() {
  console.log("Script.js carregado e DOM content loaded.");

  const LAST_RESET_KEY = "last_checkin_reset_date";

  // --- Funções de Lógica Principal ---

  /**
   * Configura os event listeners para os botões de alternância.
   * Quando um botão é clicado, ele exibe ou esconde o conteúdo correspondente,
   * enquanto esconde qualquer outro conteúdo que esteja visível.
   */
  function setupContentToggle() {
    const toggleButtons = document.querySelectorAll(".btn-toggle-content");

    if (toggleButtons.length === 0) {
      console.warn('Nenhum botão com a classe "btn-toggle-content" encontrado.');
    } else {
      console.log(`Encontrados ${toggleButtons.length} botões de alternância.`);
    }

    toggleButtons.forEach((button) => {
      button.addEventListener("click", function() {
        const targetId = this.dataset.target;
        const targetContent = document.getElementById(targetId);

        if (targetContent) {
          // Itera sobre todos os conteúdos visíveis e os esconde,
          // exceto o que está sendo clicado.
          document.querySelectorAll(".hidden-content.show-content").forEach((openContent) => {
            if (openContent.id !== targetId) {
              openContent.classList.remove("show-content");
            }
          });

          // Alterna a visibilidade da área de conteúdo alvo
          targetContent.classList.toggle("show-content");
          console.log(`Conteúdo '${targetId}' visibilidade alternada.`);
        } else {
          console.error(`Área de conteúdo com ID '${targetId}' não encontrada. Verifique o HTML.`);
        }
      });
    });
  }

  /**
   * Reseta o estado de todos os checkboxes e remove os dados do localStorage.
   */
  function resetCheckins() {
    document.querySelectorAll(".checkin").forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Limpa apenas os itens de check-in do localStorage, mantendo outros dados
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key.startsWith("checkin_")) {
        localStorage.removeItem(key);
      }
    }
    console.log("Todos os check-ins foram resetados!");

    // Salva a data do último reset para evitar repetições
    localStorage.setItem(LAST_RESET_KEY, new Date().toISOString().split("T")[0]);
  }

  /**
   * Verifica a data e hora atuais para determinar se um reset deve ser executado.
   * O reset ocorre apenas em domingos (dia 0) às 22h, uma vez por dia.
   */
  function checkAndReset() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Domingo é 0
    const hour = now.getHours(); // A hora atual

    const lastResetDate = localStorage.getItem(LAST_RESET_KEY);
    const today = now.toISOString().split("T")[0]; // Data atual no formato YYYY-MM-DD

    // Condição: é domingo? é 22h? o reset ainda não foi feito hoje?
    if (dayOfWeek === 0 && hour === 22 && lastResetDate !== today) {
      resetCheckins();
    }
  }

  /**
   * Carrega o estado salvo dos checkboxes do localStorage e adiciona os event listeners
   * para salvar as alterações.
   */
  function setupCheckinLogic() {
    document.querySelectorAll("table").forEach((table, tIndex) => {
      table.querySelectorAll(".checkin").forEach((checkbox, iIndex) => {
        const key = `checkin_${tIndex}_${iIndex}`;
        checkbox.checked = localStorage.getItem(key) === "true";
        checkbox.addEventListener("change", function() {
          localStorage.setItem(key, this.checked);
        });
      });
    });
    console.log("Lógica de check-in configurada e estados carregados.");
  }

  // --- Execução das Funções ---
  setupContentToggle();
  setupCheckinLogic();
  checkAndReset();
});
