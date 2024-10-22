document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('flyerCanvas');
    const ctx = canvas.getContext('2d');
    const usernameInput = document.getElementById('username');
    const textColorInput = document.getElementById('textColor');
    const fontSelect = document.getElementById('fontSelect');
    const textShadowCheckbox = document.getElementById('textShadow');
    const downloadButton = document.getElementById('downloadButton');
    const shareButton = document.getElementById('shareButton');
    const feedbackMessage = document.getElementById('feedbackMessage');

    // Carregar a imagem base
    const image = new Image();
    image.src = 'mirella55.png';  // Atualize com o caminho correto da imagem

    image.onload = () => {
        ctx.drawImage(image, 0, 0);
        updateName('NOME');  // Exemplo de número já iniciado
    };

    // Função para calcular e ajustar o tamanho da fonte
    function fitText(ctx, text, maxWidth, maxHeight) {
        let fontSize = 150;  // Tamanho inicial da fonte
        do {
            fontSize--;
            ctx.font = `bold ${fontSize}px ${fontSelect.value}`;  // Usar a fonte selecionada
        } while (ctx.measureText(text).width > maxWidth || fontSize > maxHeight);
        return fontSize;
    }

    // Função para atualizar o nome na imagem
    function updateName(username) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpa o canvas
        ctx.drawImage(image, 0, 0);  // Redesenha a imagem

        const maxWidth = 1071 - 377;  // Largura do espaço disponível
        const maxHeight = 869 - 733;  // Altura do espaço disponível

        // Ajustar o tamanho da fonte
        const fontSize = fitText(ctx, username, maxWidth, maxHeight);
        ctx.font = `bold ${fontSize}px ${fontSelect.value}`;
        ctx.fillStyle = textColorInput.value;  // Cor personalizada
        ctx.textAlign = 'center';

        // Ativar sombra se a opção estiver selecionada
        if (textShadowCheckbox.checked) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 5;
        } else {
            ctx.shadowColor = 'transparent';  // Desativa a sombra
        }

        // Ajustar as coordenadas
        let x = (377 + 1071) / 2 - 50;  // Mover um pouco para a esquerda
        let y = (733 + 869) / 2 + 30;   // Descer um pouco

        ctx.fillText(username, x, y);

        // Exibir feedback visual
        feedbackMessage.classList.remove('hidden');
        setTimeout(() => feedbackMessage.classList.add('hidden'), 2000);  // Oculta após 2 segundos
    }

    // Pré-visualização ao vivo
    usernameInput.addEventListener('input', function() {
        const username = usernameInput.value || 'NOME';  // Se vazio, usar "55" como padrão
        updateName(username);
    });

    // Atualizar o flyer quando a cor for mudada
    textColorInput.addEventListener('input', function() {
        const username = usernameInput.value || 'NOME';  // Se vazio, usar "55" como padrão
        updateName(username);
    });

    // Atualizar o flyer quando a fonte for mudada
    fontSelect.addEventListener('change', function() {
        const username = usernameInput.value || 'NOME';  // Se vazio, usar "55" como padrão
        updateName(username);
    });

    // Baixar a imagem personalizada
    downloadButton.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'flyer-personalizado.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    // Compartilhar o flyer nas redes sociais
    shareButton.addEventListener('click', function() {
        const dataURL = canvas.toDataURL();
        const shareURL = `https://example.com/share?image=${encodeURIComponent(dataURL)}`;
        window.open(shareURL, '_blank'); // Substitua com a URL real do seu endpoint de compartilhamento
    });
});
