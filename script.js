document.addEventListener('DOMContentLoaded', function() {
    console.log('Script.js carregado e DOM content loaded.'); // Mensagem de depuração

    // Seleciona todos os botões com a classe 'btn-toggle-content'
    const toggleButtons = document.querySelectorAll('.btn-toggle-content');

    if (toggleButtons.length === 0) {
        console.warn('Nenhum botão com a classe "btn-toggle-content" encontrado.'); // Aviso se nenhum botão for encontrado
    } else {
        console.log(`Encontrados ${toggleButtons.length} botões de alternância.`);
    }

    // Itera sobre cada botão e adiciona um event listener
    toggleButtons.forEach(button => {
        // Armazena o texto original do botão para referência futura, se necessário
        // const originalButtonText = button.textContent;

        button.addEventListener('click', function() {
            console.log('Botão clicado:', this.textContent); // Mensagem de depuração ao clicar

            // Obtém o ID da área de conteúdo alvo a partir do atributo 'data-target' do botão
            const targetId = this.dataset.target;
            const contentArea = document.getElementById(targetId);

            // Verifica se a área de conteúdo existe
            if (contentArea) {
                // Alterna a classe 'show-content' na área de conteúdo
                contentArea.classList.toggle('show-content');
                console.log(`Conteúdo '${targetId}' visibilidade alternada. Agora tem 'show-content': ${contentArea.classList.contains('show-content')}`);

                // --- Lógica removida: Não altera mais o texto do botão ---
                // if (contentArea.classList.contains('show-content')) {
                //     this.textContent = `Esconder ${originalButtonText}`;
                // } else {
                //     this.textContent = `Ver ${originalButtonText}`;
                // }

                // Opcional: Esconder outras áreas de conteúdo se estiverem abertas
                // Isso garante que apenas uma seção de treino esteja visível por vez
                document.querySelectorAll('.hidden-content.show-content').forEach(openContent => {
                    if (openContent.id !== targetId) {
                        openContent.classList.remove('show-content');
                        console.log(`Conteúdo '${openContent.id}' escondido.`);
                        // Não é necessário alterar o texto do botão correspondente aqui,
                        // pois o texto do botão principal não muda mais.
                    }
                });

            } else {
                console.error(`Área de conteúdo com ID '${targetId}' não encontrada. Verifique o HTML.`);
            }
        });
    });
});
