function drawSideCatSilhouette() {
    const canvas = document.getElementById('cat-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";

    // Тело
    ctx.beginPath();
    ctx.ellipse(200, 100, 80, 40, 0, 0, Math.PI * 2);
    ctx.fill();

    // Голова
    ctx.beginPath();
    ctx.arc(300, 80, 25, 0, Math.PI * 2);
    ctx.fill();

    // Уши
    ctx.beginPath();
    ctx.moveTo(290, 60);
    ctx.lineTo(285, 40);
    ctx.lineTo(295, 55);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(310, 60);
    ctx.lineTo(315, 40);
    ctx.lineTo(305, 55);
    ctx.fill();

    // Лапы передние
    ctx.fillRect(270, 140, 10, 30);
    ctx.fillRect(285, 140, 10, 30);

    // Лапы задние
    ctx.fillRect(130, 140, 10, 30);
    ctx.fillRect(145, 140, 10, 30);

    // Хвост
    ctx.beginPath();
    ctx.moveTo(120, 100);
    ctx.quadraticCurveTo(60, 80, 90, 130);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
}

// Вызов отложенно, после загрузки
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(drawSideCatSilhouette, 3000);
});
