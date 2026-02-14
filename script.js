// Fecha objetivo: 14 de febrero de 2026
const targetDate = new Date('February 14, 2026 00:00:00').getTime();

// Detección mejorada de dispositivo móvil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                 window.innerWidth < 768 || 
                 ('ontouchstart' in window) || 
                 (navigator.maxTouchPoints > 0);

// Detección de capacidad de rendimiento
const isLowPerformance = isMobile || navigator.hardwareConcurrency <= 4;

// Variables para controlar intervalos y mejorar performance
let activeIntervals = [];
let animationFrameId = null;
let particleCount = 0;
const MAX_PARTICLES = isMobile ? 15 : 30;

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
    if (distance <= 0) {
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
    
    // Deshabilitar combos cuando aparece la carta
    comboEnabled = false;
    removeComboDisplay();
    
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
                        
                        <p class="letter-text">
                            Eres una mujer fuerte, valiente e increíble. Estoy muy orgulloso de todo lo que haces,
                            de cada logro, de cada paso que das. Siempre he confiado en ti y voy a confiar en ti,
                            porque sé que eres capaz de alcanzar cualquier meta que te propongas.
                        </p>
                        
                        <p class="letter-text">
                            Yo sé que vas a ser de las mejores ingenieras del mundo. Tu dedicación, tu inteligencia
                            y tu pasión te llevarán a lugares extraordinarios. Y yo estaré ahí, aplaudiéndote,
                            apoyándote y amándote en cada momento.
                        </p>
                        
                        <p class="letter-text">
                            Espero estar con vida para amarte y apoyarte hasta que estemos viejitos, 
                            tomados de la mano, recordando todos estos momentos hermosos que hemos vivido juntos.
                            Porque contigo, mi amor, quiero pasar cada día de mi vida.
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
    // Ajustar cantidad según dispositivo y rendimiento
    const particleCount = isLowPerformance ? 15 : (isMobile ? 20 : 35);
    
    for (let i = 0; i < particleCount; i++) {
        const heart = document.createElement('div');
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = isMobile ? (150 + Math.random() * 200) : (200 + Math.random() * 300);
        const size = isMobile ? (15 + Math.random() * 20) : (20 + Math.random() * 30);
        
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
            padding: 15px;
            display: inline-block;
            line-height: 1;
            transform: translateZ(0);
            will-change: transform, opacity;
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
    const heartInterval = isLowPerformance ? 1200 : (isMobile ? 900 : 600);
    
    const heartIntervalId = setInterval(() => {
        // Control de partículas máximas
        if (particleCount >= MAX_PARTICLES) return;
        
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = isMobile ? (Math.random() * 20 + 20) + 'px' : (Math.random() * 30 + 25) + 'px';
        heart.style.setProperty('--random-x', (Math.random() * 200 - 100) + 'px');
        heartsContainer.appendChild(heart);
        particleCount++;
        
        setTimeout(() => {
            heart.remove();
            particleCount = Math.max(0, particleCount - 1);
        }, 8000);
    }, heartInterval);
    
    activeIntervals.push(heartIntervalId);
    
    // Partículas adicionales de corazones pequeños (solo desktop con buen rendimiento)
    if (!isMobile && !isLowPerformance) {
        const smallHeartIntervalId = setInterval(() => {
            if (particleCount >= MAX_PARTICLES) return;
            
            const smallHeart = document.createElement('div');
            smallHeart.className = 'floating-heart';
            smallHeart.innerHTML = '💕';
            smallHeart.style.left = Math.random() * 100 + 'vw';
            smallHeart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            smallHeart.style.fontSize = (Math.random() * 15 + 10) + 'px';
            smallHeart.style.setProperty('--random-x', (Math.random() * 150 - 75) + 'px');
            smallHeart.style.opacity = '0.6';
            heartsContainer.appendChild(smallHeart);
            particleCount++;
            
            setTimeout(() => {
                smallHeart.remove();
                particleCount = Math.max(0, particleCount - 1);
            }, 5000);
        }, 1200);
        
        activeIntervals.push(smallHeartIntervalId);
    }
    
    // Crear partículas brillantes (solo en desktop)
    if (!isLowPerformance && !isMobile) {
        createSparkles();
    }
}

// Función para crear partículas brillantes
function createSparkles() {
    const sparkleInterval = isLowPerformance ? 1000 : (isMobile ? 800 : 400);
    
    const sparkleIntervalId = setInterval(() => {
        if (particleCount >= MAX_PARTICLES) return;
        
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.bottom = '0px';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(sparkle);
        particleCount++;
        
        setTimeout(() => {
            sparkle.remove();
            particleCount = Math.max(0, particleCount - 1);
        }, 4000);
    }, sparkleInterval);
    
    activeIntervals.push(sparkleIntervalId);
}

// Actualizar cada segundo
setInterval(updateCountdown, 1000);

// Ejecutar inmediatamente al cargar
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
});

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
    // Efectos hover deshabilitados para evitar lag
    // Solo mantener las animaciones CSS nativas
}

// Efectos profesionales de fondo y ambiente
function initProfessionalEffects() {
    // Solo habilitar parallax en dispositivos con buen rendimiento
    if (!isMobile && !isLowPerformance) {
        // Parallax sutil y profesional (más controlado)
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        
        const handleParallax = throttle((e) => {
            // Movimiento más sutil y profesional
            targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
            targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
        }, 32); // Reducido de 16ms a 32ms para mejor performance
        
        document.addEventListener('mousemove', handleParallax);
        
        // Smooth animation loop para parallax sutil
        function animateParallax() {
            currentX += (targetX - currentX) * 0.05;
            currentY += (targetY - currentY) * 0.05;
            
            const container = document.querySelector('.countdown-container');
            if (container && !document.hidden) {
                container.style.transform = `
                    perspective(1500px)
                    rotateY(${currentX * 1.5}deg)
                    rotateX(${-currentY * 1.5}deg)
                    translateZ(0)
                `;
            }
            
            // Parallax mínimo para el logo
            const logo = document.querySelector('.logo');
            if (logo && !document.hidden) {
                logo.style.transform = `
                    translateX(${currentX * 5}px)
                    translateY(${currentY * 5}px)
                `;
            }
            
            animationFrameId = requestAnimationFrame(animateParallax);
        }
        
        animateParallax();
    }
}

// Actualizar atributos data para el efecto glow
function updateDataAttributes() {
    daysElement.setAttribute('data-value', daysElement.textContent);
    hoursElement.setAttribute('data-value', hoursElement.textContent);
    minutesElement.setAttribute('data-value', minutesElement.textContent);
    secondsElement.setAttribute('data-value', secondsElement.textContent);
}

setInterval(updateDataAttributes, 1000);

// Manejar cambios de orientación y redimensionamiento
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Actualizar detección de móvil en caso de rotación
        const currentIsMobile = window.innerWidth < 768;
        if (currentIsMobile !== isMobile) {
            location.reload(); // Recargar si cambia el tipo de dispositivo
        }
    }, 250);
});

// Prevenir zoom en doble tap en iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// Optimización: Pausar animaciones cuando la pestaña no está visible
document.addEventListener('visibilitychange', () => {
    const timeBoxes = document.querySelectorAll('.time-box');
    if (document.hidden) {
        // Pausar animaciones cuando no está visible
        timeBoxes.forEach(box => {
            const value = box.querySelector('.time-value');
            if (value) {
                value.style.animationPlayState = 'paused';
            }
        });
        
        // Cancelar requestAnimationFrame
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    } else {
        // Reanudar animaciones cuando vuelve a estar visible
        timeBoxes.forEach(box => {
            const value = box.querySelector('.time-value');
            if (value) {
                value.style.animationPlayState = 'running';
            }
        });
        
        // Reiniciar parallax si estaba activo
        if (!isMobile && !isLowPerformance && !animationFrameId) {
            initProfessionalEffects();
        }
    }
});

// ========== SISTEMA INTERACTIVO DE JUEGOS Y ANIMACIONES ==========

// Función throttle para limitar frecuencia de eventos
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

// Variables globales para interacciones
let mouseX = 0;
let mouseY = 0;
let isMouseDown = false;
let particles = [];
let cursorTrailEnabled = true;
let interactionScore = 0;
let currentParticles = 0;
let maxParticles = isMobile ? 30 : 50;
let isScrolling = false;
let scrollTimeout;

// Sistema de combos
let comboCount = 0;
let comboTimer = null;
let lastComboTime = 0;
const COMBO_TIMEOUT = 1000; // 1 segundo para mantener combo
const COMBO_MULTIPLIERS = {
    1: 1,
    2: 1.2,
    3: 1.5,
    5: 2,
    10: 3,
    15: 4,
    20: 5
};
let comboEnabled = true; // Solo habilitado en countdown

// Crear contador de interacciones (mini-juego)
function createInteractionCounter() {
    const counter = document.createElement('div');
    counter.id = 'interaction-counter';
    counter.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(28, 28, 30, 0.7);
        backdrop-filter: blur(20px);
        padding: 10px 20px;
        border-radius: 20px;
        color: white;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 600;
        z-index: 10001;
        opacity: 0;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        pointer-events: none;
    `;
    counter.innerHTML = `✨ Interacciones: <span id="score">0</span>`;
    document.body.appendChild(counter);
    
    // Mostrar el contador después de la primera interacción
    setTimeout(() => {
        counter.style.opacity = '0.8';
    }, 100);
    
    return counter;
}

// ========== SISTEMA DE COMBOS ==========

// Incrementar combo (solo en countdown)
function incrementCombo() {
    if (!comboEnabled) return;
    
    const now = Date.now();
    
    // Si han pasado más de 1 segundo, resetear combo
    if (now - lastComboTime > COMBO_TIMEOUT) {
        if (comboCount > 1) {
            // Mostrar combo terminado
            showComboBreak(comboCount);
        }
        comboCount = 0;
    }
    
    comboCount++;
    lastComboTime = now;
    
    // Actualizar o crear display de combo
    updateComboDisplay();
    
    // Limpiar timer previo
    if (comboTimer) {
        clearTimeout(comboTimer);
    }
    
    // Configurar nuevo timer para resetear combo
    comboTimer = setTimeout(() => {
        if (comboCount > 1) {
            showComboBreak(comboCount);
        }
        comboCount = 0;
        removeComboDisplay();
    }, COMBO_TIMEOUT);
}

// Obtener multiplicador actual basado en combo
function getComboMultiplier() {
    // Buscar el multiplicador más alto que aplique
    let multiplier = 1;
    for (const [threshold, mult] of Object.entries(COMBO_MULTIPLIERS)) {
        if (comboCount >= parseInt(threshold)) {
            multiplier = mult;
        }
    }
    return multiplier;
}

// Actualizar display de combo
function updateComboDisplay() {
    let comboDisplay = document.getElementById('combo-display');
    
    if (!comboDisplay) {
        comboDisplay = document.createElement('div');
        comboDisplay.id = 'combo-display';
        comboDisplay.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%) scale(0);
            background: linear-gradient(135deg, rgba(255, 107, 157, 0.95), rgba(255, 23, 68, 0.95));
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 28px;
            font-weight: 800;
            z-index: 10003;
            box-shadow: 0 8px 30px rgba(255, 23, 68, 0.6);
            border: 3px solid white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            pointer-events: none;
        `;
        document.body.appendChild(comboDisplay);
    }
    
    const multiplier = getComboMultiplier();
    const multiplierText = multiplier > 1 ? ` x${multiplier}` : '';
    
    comboDisplay.innerHTML = `🔥 ${comboCount} COMBO${multiplierText}`;
    
    // Animación de entrada
    comboDisplay.style.transform = 'translateX(-50%) scale(1.2)';
    setTimeout(() => {
        comboDisplay.style.transform = 'translateX(-50%) scale(1)';
    }, 100);
    
    // Cambiar color según combo
    if (comboCount >= 20) {
        comboDisplay.style.background = 'linear-gradient(135deg, #ff1744, #c2185b)';
        comboDisplay.style.fontSize = '36px';
    } else if (comboCount >= 10) {
        comboDisplay.style.background = 'linear-gradient(135deg, #ff6b9d, #ff1744)';
        comboDisplay.style.fontSize = '32px';
    } else if (comboCount >= 5) {
        comboDisplay.style.fontSize = '30px';
    }
}

// Mostrar multiplicador de combo
function showComboMultiplier(multiplier, points) {
    const mult = document.createElement('div');
    mult.style.cssText = `
        position: fixed;
        top: 25%;
        left: 50%;
        transform: translate(-50%, 20px);
        color: #ff6b9d;
        font-size: 20px;
        font-weight: 800;
        z-index: 10002;
        pointer-events: none;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        opacity: 0;
        animation: comboPointsFloat 1s ease-out forwards;
    `;
    mult.textContent = `+${points} pts`;
    document.body.appendChild(mult);
    
    setTimeout(() => mult.remove(), 1000);
}

// Mostrar cuando se rompe el combo
function showComboBreak(finalCombo) {
    const breakMsg = document.createElement('div');
    breakMsg.style.cssText = `
        position: fixed;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: rgba(194, 24, 91, 0.9);
        color: white;
        padding: 12px 25px;
        border-radius: 30px;
        font-size: 18px;
        font-weight: 700;
        z-index: 10003;
        box-shadow: 0 5px 20px rgba(194, 24, 91, 0.5);
        pointer-events: none;
        animation: comboBreakAnim 1.5s ease-out forwards;
    `;
    breakMsg.textContent = `Combo Terminado: ${finalCombo}`;
    document.body.appendChild(breakMsg);
    
    setTimeout(() => breakMsg.remove(), 1500);
}

// Remover display de combo
function removeComboDisplay() {
    const comboDisplay = document.getElementById('combo-display');
    if (comboDisplay) {
        comboDisplay.style.transform = 'translateX(-50%) scale(0)';
        setTimeout(() => comboDisplay.remove(), 200);
    }
}

// Actualizar score con sistema de combos
function updateScore(points = 1) {
    // Calcular multiplicador de combo
    const multiplier = getComboMultiplier();
    const finalPoints = Math.floor(points * multiplier);
    
    interactionScore += finalPoints;
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = interactionScore;
        
        // Animación de actualización
        scoreElement.style.transform = 'scale(1.3)';
        scoreElement.style.color = '#ff6b9d';
        setTimeout(() => {
            scoreElement.style.transform = 'scale(1)';
            scoreElement.style.color = 'white';
        }, 200);
    }
    
    // Mostrar combo si hay multiplicador
    if (multiplier > 1) {
        showComboMultiplier(multiplier, finalPoints);
    }
    
    // Logros especiales
    if (interactionScore === 50) {
        showAchievement('🎉 ¡50 Interacciones!');
    } else if (interactionScore === 100) {
        showAchievement('🌟 ¡100 Interacciones! ¡Increíble!');
    } else if (interactionScore === 200) {
        showAchievement('💝 ¡200 Interacciones! ¡Eres Genial!');
    }
}

// Mostrar logro
function showAchievement(text) {
    const achievement = document.createElement('div');
    achievement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, #ff6b9d, #ff1744);
        color: white;
        padding: 20px 40px;
        border-radius: 20px;
        font-size: 24px;
        font-weight: 700;
        z-index: 10002;
        box-shadow: 0 10px 40px rgba(255, 23, 68, 0.5);
        animation: achievementPop 2s ease-out forwards;
    `;
    achievement.textContent = text;
    document.body.appendChild(achievement);
    
    setTimeout(() => achievement.remove(), 2000);
}

// Actualizar posición del cursor/dedo con throttle
const handleMouseMove = throttle((e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Crear partículas de rastro del cursor
    if (cursorTrailEnabled && !isScrolling && Math.random() > 0.8) {
        createCursorParticle(mouseX, mouseY);
    }
}, 16); // ~60fps

document.addEventListener('mousemove', handleMouseMove);

const handleTouchMove = throttle((e) => {
    if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        
        if (cursorTrailEnabled && !isScrolling && Math.random() > 0.8) {
            createCursorParticle(mouseX, mouseY);
        }
    }
}, 16);

document.addEventListener('touchmove', handleTouchMove, { passive: true });

// Detectar clicks y touches
document.addEventListener('mousedown', () => { isMouseDown = true; });
document.addEventListener('mouseup', () => { isMouseDown = false; });
document.addEventListener('touchstart', () => { isMouseDown = true; }, { passive: true });
document.addEventListener('touchend', () => { isMouseDown = false; }, { passive: true });

// Sistema de "pintura" con el cursor - crear estelas cuando se arrastra
let paintingInterval;

document.addEventListener('mousedown', (e) => {
    // Ignorar elementos específicos para evitar lag
    if (e.target.closest('.love-letter-container') || 
        e.target.closest('.letter-text') ||
        e.target.closest('.time-box') ||
        e.target.closest('.logo')) {
        return;
    }
    isMouseDown = true;
    startPainting(e.clientX, e.clientY);
});

document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        
        // Ignorar elementos específicos para evitar lag
        if (target && (target.closest('.love-letter-container') || 
            target.closest('.letter-text') ||
            target.closest('.time-box') ||
            target.closest('.logo'))) {
            return;
        }
        isMouseDown = true;
        startPainting(touch.clientX, touch.clientY);
    }
}, { passive: true });

document.addEventListener('mouseup', stopPainting);
document.addEventListener('touchend', stopPainting);

function startPainting(x, y) {
    // Crear partículas más frecuentes cuando se mantiene presionado
    const interval = isMobile ? 80 : 50;
    paintingInterval = setInterval(() => {
        if (isMouseDown && !isScrolling) {
            createCursorParticle(mouseX, mouseY);
            
            // Efecto de estela mágica (reducido para evitar lag)
            if (!isMobile && Math.random() > 0.5) {
                const offset = 20;
                createCursorParticle(
                    mouseX + (Math.random() - 0.5) * offset,
                    mouseY + (Math.random() - 0.5) * offset
                );
            }
        }
    }, interval);
}

function stopPainting() {
    isMouseDown = false;
    if (paintingInterval) {
        clearInterval(paintingInterval);
    }
}

// Crear partículas de rastro del cursor
function createCursorParticle(x, y) {
    if (currentParticles >= maxParticles || isScrolling) return;
    
    currentParticles++;
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    
    const colors = ['#ff6b9d', '#ff1744', '#c2185b', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 4 + 2;
    
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.8;
        animation: cursorParticleFade 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    setTimeout(() => {
        particle.remove();
        currentParticles--;
    }, 800);
}

// Efecto ripple (ondas) al hacer clic
function createRipple(x, y, container = document.body) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const isLoveLetterActive = document.querySelector('.love-letter-container') !== null;
    const color = isLoveLetterActive 
        ? 'rgba(255, 107, 157, 0.4)' 
        : 'rgba(255, 255, 255, 0.3)';
    
    ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: ${color};
        border: 2px solid ${isLoveLetterActive ? 'rgba(255, 107, 157, 0.6)' : 'rgba(255, 255, 255, 0.5)'};
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%, -50%);
        animation: rippleExpand 0.8s ease-out forwards;
    `;
    
    container.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
}

// Crear corazones interactivos al hacer clic (OPTIMIZADO)
function createInteractiveHeart(x, y, addScore = false, shouldIncrementCombo = true) {
    if (currentParticles >= maxParticles || isScrolling) return;
    
    currentParticles++;
    
    // Incrementar combo solo si corresponde
    if (shouldIncrementCombo) {
        incrementCombo();
    }
    
    const heart = document.createElement('div');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓'];
    const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    heart.innerHTML = emoji;
    heart.className = 'interactive-heart';
    
    // Animación simplificada para mejor rendimiento
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 40;
    const size = Math.random() * 15 + 18;
    
    heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${size}px;
        pointer-events: none;
        z-index: 9999;
        will-change: transform, opacity;
        --tx: ${Math.cos(angle) * distance}px;
        --ty: ${Math.sin(angle) * distance}px;
    `;
    
    document.body.appendChild(heart);
    setTimeout(() => {
        heart.remove();
        currentParticles--;
    }, 1000); // Reducido de 1500 a 1000ms
}

// Crear explosión de confetti
function createConfetti(x, y) {
    if (isScrolling) return;
    
    const colors = ['#ff6b9d', '#ff1744', '#c2185b', '#ff9999', '#ffb3d9', '#fff'];
    const particleCount = isMobile ? 12 : 20; // Reducido para mejor rendimiento
    
    for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 150 + 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotation = Math.random() * 360;
        
        confetti.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: ${color};
            pointer-events: none;
            z-index: 9996;
            animation: confettiFly 1.2s ease-out forwards;
            --angle-x: ${Math.cos(angle) * velocity}px;
            --angle-y: ${Math.sin(angle) * velocity}px;
            --rotation: ${rotation}deg;
        `;
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1200);
    }
}

// Evento de clic en cualquier parte
let lastClickTime = 0;
let lastClickX = 0;
let lastClickY = 0;

document.addEventListener('click', (e) => {    
    // Ignorar clics dentro de elementos específicos
    const isInsideSpecialElement = e.target.closest('.love-letter-container') || 
                                     e.target.closest('.time-box') ||
                                     e.target.closest('.logo');
    
    if (isInsideSpecialElement) {
        return;
    }
    
    const now = Date.now();
    const timeDiff = now - lastClickTime;
    const distance = Math.sqrt(
        Math.pow(e.clientX - lastClickX, 2) + 
        Math.pow(e.clientY - lastClickY, 2)
    );
    
    // Detectar doble clic (dentro de 400ms y cerca del mismo punto)
    if (timeDiff < 400 && distance < 50) {
        // ¡MEGA EXPLOSIÓN!
        createMegaExplosion(e.clientX, e.clientY);
        lastClickTime = 0; // Reset para evitar triple click
    } else {
        // Clic normal
        createRipple(e.clientX, e.clientY);
        
        // Incrementar combo solo una vez
        incrementCombo();
        
        // 50% chance de crear corazón o confetti (sin incrementar combo adicional)
        if (Math.random() > 0.5) {
            createInteractiveHeart(e.clientX, e.clientY, false, false);
        } else {
            createConfetti(e.clientX, e.clientY);
        }
        updateScore(1);
        
        lastClickTime = now;
        lastClickX = e.clientX;
        lastClickY = e.clientY;
    }
});

// Función para mega explosión
function createMegaExplosion(x, y) {
    // Incrementar combo solo una vez
    incrementCombo();
    
    // ¡Puntos extra por doble clic!
    updateScore(10);
    
    // Crear múltiples capas de efectos
    
    // Capa 1: Ripple grande
    const bigRipple = document.createElement('div');
    bigRipple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 107, 157, 0.6), transparent);
        border: 3px solid rgba(255, 107, 157, 0.9);
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%, -50%);
        animation: megaRipple 1.5s ease-out forwards;
    `;
    document.body.appendChild(bigRipple);
    setTimeout(() => bigRipple.remove(), 1500);
    
    // Capa 2: Flash de luz
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        inset: 0;
        background: radial-gradient(circle at ${x}px ${y}px, 
            rgba(255, 255, 255, 0.5), transparent 40%);
        pointer-events: none;
        z-index: 9998;
        animation: flashFade 0.5s ease-out forwards;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
    
    // Capa 3: Explosión masiva de corazones (sin incrementar combo adicional)
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const angle = (Math.PI * 2 * i) / 40;
            const distance = 150 + Math.random() * 100;
            const targetX = x + Math.cos(angle) * distance;
            const targetY = y + Math.sin(angle) * distance;
            createInteractiveHeart(targetX, targetY, false, false);
        }, i * 30);
    }
    
    // Capa 4: Confetti masivo
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createConfetti(x, y);
            }, i * 150);
        }
    }, 200);
    
    // Mostrar mensaje especial
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y - 100}px;
        transform: translate(-50%, -50%) scale(0);
        color: #ff6b9d;
        font-size: 32px;
        font-weight: 700;
        pointer-events: none;
        z-index: 10000;
        text-shadow: 0 0 20px rgba(255, 23, 68, 0.8);
        animation: messagePop 1.5s ease-out forwards;
    `;
    message.textContent = '💥 ¡MEGA EXPLOSIÓN! +10';
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 1500);
}

document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        
        // Ignorar toques dentro de elementos específicos para evitar contar doble
        if (target && (target.closest('.love-letter-container') || 
            target.closest('.letter-text') ||
            target.closest('.time-box') ||
            target.closest('.logo'))) {
            return;
        }
        
        createRipple(touch.clientX, touch.clientY);
        
        // Incrementar combo solo una vez
        incrementCombo();
        
        // 50% chance de crear corazón o confetti (sin incrementar combo adicional)
        if (Math.random() > 0.5) {
            createInteractiveHeart(touch.clientX, touch.clientY, false, false);
        } else {
            createConfetti(touch.clientX, touch.clientY);
        }
        updateScore(1);
    }
}, { passive: true });

// Efecto especial en las cajas de tiempo
function initTimeBoxInteractions() {
    const timeBoxes = document.querySelectorAll('.time-box');
    
    timeBoxes.forEach(box => {
        box.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Incrementar combo solo una vez
            incrementCombo();
            
            // Explosión de partículas especial
            const rect = box.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Crear múltiples corazones sin incrementar combo adicional
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createInteractiveHeart(centerX, centerY, false, false);
                }, i * 100);
            }
            updateScore(5);
            
            // Efecto de brillo (reducido para mejor performance)
            box.style.filter = 'brightness(1.3)';
            setTimeout(() => {
                box.style.filter = '';
            }, 300);
        });
    });
}

// Inicializar interacciones cuando carga la página
setTimeout(() => {
    initTimeBoxInteractions();
    initLogoInteraction();
    createInteractionCounter();
}, 1000);

// Interacción especial con el logo
function initLogoInteraction() {
    const logo = document.querySelector('.logo');
    if (logo) {
        let clickCount = 0;
        
        logo.addEventListener('click', (e) => {
            e.stopPropagation();
            clickCount++;
            
            // Incrementar combo solo una vez
            incrementCombo();
            
            const rect = logo.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Explosión especial cada 3 clics
            if (clickCount % 3 === 0) {
                // Mega explosión - crear corazones sin incrementar combo adicional
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        createInteractiveHeart(
                            centerX + (Math.random() - 0.5) * 100,
                            centerY + (Math.random() - 0.5) * 100,
                            false,
                            false
                        );
                    }, i * 50);
                }
                
                // Confetti adicional
                setTimeout(() => {
                    createConfetti(centerX, centerY);
                }, 200);
                
                updateScore(15);
            } else {
                // Explosión normal - crear corazones sin incrementar combo adicional
                for (let i = 0; i < 8; i++) {
                    setTimeout(() => {
                        createInteractiveHeart(centerX, centerY, false, false);
                    }, i * 80);
                }
                updateScore(8);
            }
            
            // Efecto de brillo
            logo.style.filter = 'brightness(1.8) drop-shadow(0 0 100px rgba(255, 255, 255, 1))';
            logo.style.transform = 'scale(1.1) rotate(5deg)';
            
            setTimeout(() => {
                logo.style.filter = '';
                logo.style.transform = '';
            }, 400);
        });
    }
}

// Reinicializar interacciones cuando aparece la carta
const originalShowLoveLetter = showLoveLetter;

// Sistema de partículas mágicas que flotan constantemente
function createMagicParticles() {
    const magicInterval = setInterval(() => {
        if (particleCount >= MAX_PARTICLES || document.hidden) return;
        
        if (!isLowPerformance && Math.random() > 0.8) {
            const x = Math.random() * window.innerWidth;
            const y = window.innerHeight + 20;
            
            const particle = document.createElement('div');
            particle.className = 'magic-particle';
            
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 1;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9995;
                animation: magicFloat ${duration}s ease-in ${delay}s forwards;
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
            `;
            
            document.body.appendChild(particle);
            particleCount++;
            setTimeout(() => {
                particle.remove();
                particleCount = Math.max(0, particleCount - 1);
            }, (duration + delay) * 1000);
        }
    }, 600);
    
    activeIntervals.push(magicInterval);
}

// Iniciar partículas mágicas (solo en desktop con buen rendimiento)
if (!isLowPerformance && !isMobile) {
    createMagicParticles();
}

// Efecto de texto interactivo en la carta (cuando aparece)
let letterTextInitialized = false;

function initLetterTextInteraction() {
    // Evitar inicializar múltiples veces
    if (letterTextInitialized) return;
    
    const letterTexts = document.querySelectorAll('.letter-text');
    if (letterTexts.length === 0) return;
    
    letterTextInitialized = true;
    const letterCard = document.querySelector('.letter-card');
    
    // Efectos hover deshabilitados para evitar lag
    // Solo mantener interacción de click simple
    
    letterTexts.forEach((text, index) => {
        let lastClickTime = 0;
        
        // Usar {once: false, capture: false} para evitar múltiples listeners
        const handleClick = function(e) {
            e.stopImmediatePropagation(); // Detener TODAS las propagaciones
            e.preventDefault();
            
            // Prevenir múltiples clics rápidos (debounce)
            const now = Date.now();
            if (now - lastClickTime < 500) { // Aumentado a 500ms
                return;
            }
            lastClickTime = now;
            
            // Incrementar combo una sola vez por click en texto
            incrementCombo();
            
            // Crear solo 1 corazón en vez de 3 para evitar lag
            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createInteractiveHeart(x, y, false, false);
            
            // Sumar puntos una sola vez por click
            updateScore(3);
        };
        
        // Remover listener anterior si existe (por si acaso)
        text.removeEventListener('click', handleClick);
        text.addEventListener('click', handleClick, { once: false, capture: false });
    });
}

// Observer para detectar cuando aparece la carta
const observer = new MutationObserver(() => {
    if (document.querySelector('.love-letter-container') && !letterTextInitialized) {
        setTimeout(() => {
            initLetterTextInteraction();
            // Desconectar observer después de inicializar
            observer.disconnect();
        }, 500);
    }
});

observer.observe(document.body, { childList: true, subtree: true });

// Detector de scroll global para pausar efectos y mejorar rendimiento
let scrollDetector;
document.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(scrollDetector);
    scrollDetector = setTimeout(() => {
        isScrolling = false;
    }, 150);
}, { passive: true, capture: true });

// Limpiar partículas en exceso periódicamente  
const cleanupIntervalId = setInterval(() => {
    if (document.hidden) return; // No limpiar si la pestaña está oculta
    
    const particles = document.querySelectorAll('.cursor-particle, .interactive-heart, .confetti-piece, .magic-particle');
    const currentMaxParticles = isMobile ? 15 : 30;
    
    if (particles.length > currentMaxParticles * 1.5) {
        // Remover las más antiguas
        const removeCount = Math.min(particles.length - currentMaxParticles, 10);
        for (let i = 0; i < removeCount; i++) {
            if (particles[i]) {
                particles[i].remove();
                particleCount = Math.max(0, particleCount - 1);
            }
        }
    }
}, 3000); // Aumentado de 2000 a 3000 para menos overhead

activeIntervals.push(cleanupIntervalId);

// Limpiar recursos cuando se cierra la página
window.addEventListener('beforeunload', () => {
    // Cancelar todos los intervalos activos
    activeIntervals.forEach(id => clearInterval(id));
    activeIntervals = [];
    
    // Cancelar animationFrame si existe
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
});
