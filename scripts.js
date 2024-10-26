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

    // Novo tamanho do canvas para stories do Instagram
    canvas.width = 1080;
    canvas.height = 1920;

    const image = new Image();
    image.src = 'Mirellanovo.png';

    image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        updateName('NOME');
    };

    function fitText(ctx, text, maxWidth, maxHeight) {
        let fontSize = 150;
        do {
            fontSize--;
            ctx.font = `bold ${fontSize}px ${fontSelect.value}`;
        } while (ctx.measureText(text).width > maxWidth || fontSize > maxHeight);
        return fontSize;
    }

    function updateName(username) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Desenha a imagem no tamanho do canvas
    
        const maxWidth = canvas.width * 0.6; // Largura máxima do texto
        const maxHeight = canvas.height * 0.1; // Altura máxima do texto
    
        const fontSize = fitText(ctx, username, maxWidth, maxHeight); // Ajusta o tamanho do texto para caber na área desejada
        ctx.font = `bold ${fontSize}px ${fontSelect.value}`;
        ctx.fillStyle = textColorInput.value;
        ctx.textAlign = 'center';
    
        // Configurações de sombra
        if (textShadowCheckbox.checked) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 5;
        } else {
            ctx.shadowColor = 'transparent';
        }
    
        // Define a posição x e y onde o texto será inserido na imagem
const x = canvas.width / 2; // Centraliza horizontalmente
const y = canvas.height * 0.58; // Ajusta verticalmente para 85% da altura do canvas

ctx.fillText(username, x, y); // Adiciona o texto no canvas

    
        feedbackMessage.classList.remove('hidden');
        setTimeout(() => feedbackMessage.classList.add('hidden'), 2000);
    }

    usernameInput.addEventListener('input', function() {
        const username = usernameInput.value || 'NOME';
        updateName(username);
    });

    textColorInput.addEventListener('input', function() {
        const username = usernameInput.value || 'NOME';
        updateName(username);
    });

    fontSelect.addEventListener('change', function() {
        const username = usernameInput.value || 'NOME';
        updateName(username);
    });

    downloadButton.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'flyer-personalizado.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    shareButton.addEventListener('click', function() {
        canvas.toBlob(function(blob) {
            const file = new File([blob], 'flyer-personalizado.png', { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({
                    files: [file],
                    title: 'Meu Flyer Personalizado',
                    text: 'Veja o flyer que personalizei para a campanha da Mirella!',
                }).catch((error) => console.error('Erro no compartilhamento:', error));
            } else {
                alert('Seu dispositivo não suporta o compartilhamento de arquivos. Compartilhe manualmente.');
            }
        });
    });
});
