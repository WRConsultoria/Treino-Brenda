document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Script.js carregado e DOM content loaded.");

  const LAST_RESET_KEY = "last_checkin_reset_date";

  // ===============================
  // Alternância de Conteúdo (botões principais)
  // ===============================
  function setupContentToggle() {
    const toggleButtons = document.querySelectorAll(".btn-toggle-content");

    if (toggleButtons.length === 0) {
      console.warn('⚠️ Nenhum botão com a classe "btn-toggle-content" encontrado.');
    } else {
      console.log(`Encontrados ${toggleButtons.length} botões de alternância.`);
    }

    toggleButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const targetId = this.dataset.target;
        const targetContent = document.getElementById(targetId);

        if (targetContent) {
          // Fecha qualquer outro conteúdo aberto
          document
            .querySelectorAll(".hidden-content.show-content")
            .forEach((openContent) => {
              if (openContent.id !== targetId) {
                openContent.classList.remove("show-content");
              }
            });

          // Alterna a visibilidade da área de conteúdo alvo
          targetContent.classList.toggle("show-content");
          console.log(`🔄 Conteúdo '${targetId}' visibilidade alternada.`);
        } else {
          console.error(
            `❌ Área de conteúdo com ID '${targetId}' não encontrada. Verifique o HTML.`
          );
        }
      });
    });
  }

  // ===============================
  // Alternância de Vídeos dos Exercícios
  // ===============================
  function setupVideoToggle() {
    const exerciseButtons = document.querySelectorAll(".exercise-name");

    if (exerciseButtons.length === 0) {
      console.warn("⚠️ Nenhum botão de exercício encontrado.");
    }

    exerciseButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const video = this.nextElementSibling;

        if (video && video.classList.contains("exercise-video")) {
          video.classList.toggle("show");
          console.log(
            `🎥 Vídeo de '${this.textContent.trim()}' ${
              video.classList.contains("show") ? "aberto" : "fechado"
            }.`
          );
        } else {
          console.error("❌ Estrutura HTML incorreta para o botão de exercício.");
        }
      });
    });
  }

  // ===============================
  // Reset de Check-ins
  // ===============================
  function resetCheckins() {
    document.querySelectorAll(".checkin").forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Limpa apenas os itens de check-in do localStorage
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key.startsWith("checkin_")) {
        localStorage.removeItem(key);
      }
    }
    console.log("✅ Todos os check-ins foram resetados!");

    // Salva a data do último reset
    localStorage.setItem(
      LAST_RESET_KEY,
      new Date().toISOString().split("T")[0]
    );
  }

  // ===============================
  // Checagem de reset automático
  // ===============================
  function checkAndReset() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Domingo é 0
    const hour = now.getHours(); // Hora atual
    const lastResetDate = localStorage.getItem(LAST_RESET_KEY);
    const today = now.toISOString().split("T")[0];

    if (dayOfWeek === 0 && hour === 22 && lastResetDate !== today) {
      resetCheckins();
    }
  }

  // ===============================
  // Carregar e salvar estado dos check-ins
  // ===============================
  function setupCheckinLogic() {
    document.querySelectorAll("table").forEach((table, tIndex) => {
      table.querySelectorAll(".checkin").forEach((checkbox, iIndex) => {
        const key = `checkin_${tIndex}_${iIndex}`;
        checkbox.checked = localStorage.getItem(key) === "true";
        checkbox.addEventListener("change", function () {
          localStorage.setItem(key, this.checked);
        });
      });
    });
    console.log("📌 Lógica de check-in configurada e estados carregados.");
  }

  // --- Execução das Funções ---
  setupContentToggle();
  setupVideoToggle();
  setupCheckinLogic();
  checkAndReset();
});
