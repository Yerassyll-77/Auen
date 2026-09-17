const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Настройка размеров канваса
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

// Тексты для отображения, которые будут автоматически меняться
const texts = [
    "Aıta ber áńgimeńdi",
    "Tańǵa deıin jalǵap",
    "Qulaq túrip tyńdap",
    "Otyraıyn tańdana"
];

let textIndex = 0;
const textContainer = document.getElementById('text-container');

// Функция для смены текста
function changeText() {
    textContainer.innerText = texts[textIndex];
    textIndex = (textIndex + 1) % texts.length;
}

// Смена текста каждые 3 секунды
setInterval(changeText, 3000);

// Инициализировать текст при загрузке
changeText();

// Создаем класс для частиц
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = 'rgba(255, 69, 0, 0.8)'; // Оранжевый цвет частиц
    }

    // Метод для обновления положения частицы
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Чтобы частицы возвращались, когда выходят за границы канваса
        if (this.x < 0 || this.x > canvas.width) {
            this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.speedY = -this.speedY;
        }
    }

    // Метод для отрисовки частицы
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Функция для создания частиц
function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Функция для анимации частиц
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

// Запуск анимации
initParticles();
animate();

// Обновление размеров канваса при изменении размера окна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});




