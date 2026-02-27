// ============ COUNTDOWN ============
const countdownSection = document.getElementById('countdown');
const fecha = countdownSection.dataset.fecha || '2026-03-15';
const hora = countdownSection.dataset.hora || '21:00';
const targetDate = new Date(`${fecha}T${hora}:00`).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days < 10 ? `0${days}` : days;
    document.getElementById('hours').textContent = hours < 10 ? `0${hours}` : hours;
    document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============ SLIDER ============
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-slide');
const dots = document.querySelectorAll('.slider-dot');
const wrapper = document.getElementById('sliderWrapper');
let autoSlideInterval;
let isTransitioning = false;

function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentSlide = index;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    setTimeout(() => {
        isTransitioning = false;
    }, 600);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
}

// Iniciar slider después de que las imágenes estén cargadas
window.addEventListener('load', () => {
    startAutoSlide();
});

// ============ MÚSICA ============
const audio = document.getElementById('audio');
const btnMusica = document.getElementById('btn-musica');
let musicaIniciada = false;

function iniciarMusica() {
    if (!musicaIniciada) {
        audio.play().then(() => {
            musicaIniciada = true;
            actualizarBotonMusica(true);
        }).catch(() => {
            console.log('Navegador bloquó reproducción automática');
        });
    }
}

function toggleMusica() {
    if (audio.paused) {
        audio.play();
        actualizarBotonMusica(true);
    } else {
        audio.pause();
        actualizarBotonMusica(false);
    }
}

function actualizarBotonMusica(playing) {
    const icono = btnMusica.querySelector('i');
    if (playing) {
        icono.className = 'fas fa-pause';
        btnMusica.classList.add('playing');
    } else {
        icono.className = 'fas fa-play';
        btnMusica.classList.remove('playing');
    }
}

// ============ MODAL ============
function openModal() {
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(event) {
    if (!event || event.target === document.getElementById('modal') || event.target.classList.contains('modal-cerrar')) {
        document.getElementById('modal').classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animaciones a elementos
document.querySelectorAll('.count-block, .slider-container, .fecha-container, .frase-container, .ubicacion-container, .dresscode-container, .regalos-container, .instagram-container, .especial-container, .confirmar-container, .footer-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
