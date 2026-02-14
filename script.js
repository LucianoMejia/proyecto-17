// Fecha objetivo: 14 de febrero de 2026
const targetDate = new Date('February 14, 2026 00:00:00').getTime();

// Elementos del DOM
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Variable para controlar si ya se mostró la carta
let loveLetterShown = false;

// Función para agregar ceros a la izquierda
function padNumber(num) {
    return num.toString().padStart(2, '0');
}

// Función para animar el cambio de número con efecto profesional
function animateChange(element, newValue) {
    const currentValue = element.textContent;
    if (currentValue !== newValue) {
        element.classList.add('update');
        element.setAttribute('data-value', newValue);
        
        // Remover después de la animación
        setTimeout(() => {
            element.classList.remove('update');
        }, 600);
        
        // Efecto adicional en el contenedor padre
        const timeBox = element.closest('.time-box');
        if (timeBox) {
            timeBox.style.transform = 'scale(1.05)';
            setTimeout(() => {
                timeBox.style.transform = '';
            }, 300);
        }
    }
}

// Función principal de cuenta regresiva
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Si la cuenta regresiva ha terminado
    if (distance < 0) {
        // Mostrar la carta de amor solo una vez
        if (!loveLetterShown) {
            loveLetterShown = true;
            showLoveLetter();
        }
        return;
    }

    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar valores con animación
    const newDays = padNumber(days);
    const newHours = padNumber(hours);
    const newMinutes = padNumber(minutes);
    const newSeconds = padNumber(seconds);

    animateChange(daysElement, newDays);
    animateChange(hoursElement, newHours);
    animateChange(minutesElement, newMinutes);
    animateChange(secondsElement, newSeconds);

    daysElement.textContent = newDays;
    hoursElement.textContent = newHours;
    minutesElement.textContent = newMinutes;
    secondsElement.textContent = newSeconds;
}

// Función para mostrar la carta de amor
function showLoveLetter() {
    const container = document.querySelector('.container');
    const body = document.body;
    
    // Cambiar el título de la página
    document.title = '💕 Amor y Amistad 💕';
    
    // Animación de explosión de corazones inicial
    createHeartExplosion();
    
    // Flash de luz romántico
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255, 107, 157, 0.6) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        animation: loveFlash 2s ease-out;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 2000);
    
    // Cambiar fondo a tonos románticos
    body.style.transition = 'all 1.5s ease';
    body.style.background = 'linear-gradient(135deg, #1a0a0f 0%, #0a0005 50%, #1a0510 100%)';
    
    // Actualizar los pseudo-elementos con fondos románticos
    const style = document.createElement('style');
    style.innerHTML = `
        body::before {
            background: 
                radial-gradient(circle at 20% 50%, rgba(255, 23, 68, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(194, 24, 91, 0.12) 0%, transparent 40%),
                radial-gradient(circle at 40% 20%, rgba(255, 107, 157, 0.1) 0%, transparent 45%);
        }
        body::after {
            background: linear-gradient(135deg, 
                rgba(255, 23, 68, 0.1) 0%, 
                transparent 25%, 
                rgba(194, 24, 91, 0.08) 50%, 
                transparent 75%, 
                rgba(255, 107, 157, 0.05) 100%);
        }
    `;
    document.head.appendChild(style);
    
    // Animación de salida
    container.style.opacity = '0';
    container.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        // Cambiar el contenido
        container.innerHTML = `
            <div class="love-letter-container">
                <h1 class="love-title">Amor y Amistad</h1>
                
                <div class="letter-card">
                    <div class="letter-header">
                        <span class="heart-icon">❤️</span>
                        <h2>Para mi amor, Kemberli</h2>
                        <span class="heart-icon">❤️</span>
                    </div>
                    
                    <div class="letter-content">
                        <p class="letter-text">
                            En este día especial quiero que sepas que eres la persona más importante en mi vida.
                            Cada momento a tu lado es un regalo que atesoro en mi corazón.
                        </p>
                        
                        <p class="letter-text">
                            Tu sonrisa ilumina mis días, tu voz calma mis preocupaciones y tu amor me hace 
                            la persona más afortunada del mundo. Gracias por existir, por estar aquí, por ser tú.
                        </p>
                        
                        <p class="letter-text">
                            Hoy celebramos nuestro amor y nuestra amistad, esos lazos que nos unen más allá 
                            del tiempo y la distancia. Eres mi compañera, mi confidente, mi todo.
                        </p>
                        
                        <p class="letter-text signature">
                            Te amo hoy y siempre,<br>
                            Tu amor eterno 💕
                        </p>
                    </div>
                    
                </div>
                
                <footer class="love-footer">
                    <p class="credits">Con amor para <span class="name-highlight">Kemberli</span></p>
                    <p class="credits-small">Diseñado por José Luciano Mejia Arias</p>
                </footer>
            </div>
        `;
        
        // Crear corazones flotantes
        createFloatingHearts();
        
        // Animación de entrada
        setTimeout(() => {
            container.style.transition = 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, 100);
        
    }, 600);
}

// Función para crear explosión de corazones
function createHeartExplosion() {
    const explosionContainer = document.createElement('div');
    explosionContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        pointer-events: none;
    `;
    document.body.appendChild(explosionContainer);
    
    const heartTypes = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓', '💘'];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const heart = document.createElement('div');
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 200 + Math.random() * 400;
        const size = 20 + Math.random() * 40;
        
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heart.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            left: 0;
            top: 0;
            opacity: 1;
            animation: explodeHeart 2s ease-out forwards;
            --angle-x: ${Math.cos(angle) * velocity}px;
            --angle-y: ${Math.sin(angle) * velocity}px;
        `;
        
        explosionContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
    }
    
    setTimeout(() => explosionContainer.remove(), 2000);
}

// Función para crear corazones flotantes
function createFloatingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'hearts-container';
    document.body.appendChild(heartsContainer);
    
    const heartTypes = ['❤️', '💕', '💖', '💗', '💝', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 30 + 25) + 'px';
        heart.style.setProperty('--random-x', (Math.random() * 200 - 100) + 'px');
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 400);
    
    // Partículas adicionales de corazones pequeños
    setInterval(() => {
        const smallHeart = document.createElement('div');
        smallHeart.className = 'floating-heart';
        smallHeart.innerHTML = '💕';
        smallHeart.style.left = Math.random() * 100 + 'vw';
        smallHeart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        smallHeart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        smallHeart.style.setProperty('--random-x', (Math.random() * 150 - 75) + 'px');
        smallHeart.style.opacity = '0.6';
        heartsContainer.appendChild(smallHeart);
        
        setTimeout(() => {
            smallHeart.remove();
        }, 5000);
    }, 800);
    
    // Crear partículas brillantes
    createSparkles();
}

// Función para crear partículas brillantes
function createSparkles() {
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.bottom = '0px';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 4000);
    }, 200);
}

// Actualizar cada segundo
setInterval(updateCountdown, 1000);

// Ejecutar inmediatamente
updateCountdown();

// Animaciones de entrada mejoradas
document.addEventListener('DOMContentLoaded', () => {
    // Efecto de entrada sincronizado profesional para las cajas de tiempo
    const timeBoxes = document.querySelectorAll('.time-box');
    timeBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(40px) scale(0.8)';
        setTimeout(() => {
            box.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
            box.style.opacity = '1';
            box.style.transform = 'translateY(0) scale(1)';
        }, 800 + (index * 120));
    });
    
    // Añadir interactividad profesional
    addInteractiveEffects();
    
    // Iniciar efectos profesionales
    initProfessionalEffects();
});

// Efectos interactivos mejorados
function addInteractiveEffects() {
    const timeBoxes = document.querySelectorAll('.time-box');
    
    timeBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            // Añadir efecto de intensidad al valor
            const value = this.querySelector('.time-value');
            if (value) {
                value.style.animationPlayState = 'paused';
            }
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            // Reanudar animación
            const value = this.querySelector('.time-value');
            if (value) {
                value.style.animationPlayState = 'running';
            }
        });
    });
}

// Efectos profesionales de fondo y ambiente
function initProfessionalEffects() {
    // Parallax sutil y profesional (más controlado)
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        // Movimiento más sutil y profesional
        targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
        targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });
    
    // Smooth animation loop para parallax sutil
    function animateParallax() {
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        
        const container = document.querySelector('.countdown-container');
        if (container) {
            container.style.transform = `
                perspective(1500px)
                rotateY(${currentX * 1.5}deg)
                rotateX(${-currentY * 1.5}deg)
                translateZ(0)
            `;
        }
        
        // Parallax mínimo para el logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.transform = `
                translateX(${currentX * 5}px)
                translateY(${currentY * 5}px)
            `;
        }
        
        requestAnimationFrame(animateParallax);
    }
    
    animateParallax();
}

// Actualizar atributos data para el efecto glow
function updateDataAttributes() {
    daysElement.setAttribute('data-value', daysElement.textContent);
    hoursElement.setAttribute('data-value', hoursElement.textContent);
    minutesElement.setAttribute('data-value', minutesElement.textContent);
    secondsElement.setAttribute('data-value', secondsElement.textContent);
}

setInterval(updateDataAttributes, 1000);
