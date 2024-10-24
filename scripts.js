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

    const image = new Image();
    image.src = 'Mirella55.png';

    image.onload = () => {
        ctx.drawImage(image, 0, 0);
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);

        const maxWidth = 1071 - 377;
        const maxHeight = 869 - 733;

        const fontSize = fitText(ctx, username, maxWidth, maxHeight);
        ctx.font = `bold ${fontSize}px ${fontSelect.value}`;
        ctx.fillStyle = textColorInput.value;
        ctx.textAlign = 'center';

        if (textShadowCheckbox.checked) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 5;
        } else {
            ctx.shadowColor = 'transparent';
        }

        let x = (377 + 1071) / 2 - 50;
        let y = (733 + 869) / 2 + 30;

        ctx.fillText(username, x, y);

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
                // Caso o WhatsApp Web não suporte o compartilhamento de arquivos via Web Share API
                alert('Seu dispositivo não suporta o compartilhamento de arquivos. Compartilhe manualmente.');
            }
        });
    });

    // Função de compartilhamento via WhatsApp
    const shareViaWhatsApp = () => {
        const link = canvas.toDataURL('image/png');
        const urlWhatsApp = `https://wa.me/?text=Veja%20o%20flyer%20que%20personalizei%20para%20a%20campanha%20da%20Mirella!%20Confira%20a%20imagem%20aqui%20${encodeURIComponent(link)}`;
        window.open(urlWhatsApp, '_blank');
    };
});
