// script.js

// Función para desplazamiento suave
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navegación activa
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar navegación activa al desplazarse
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Simulación de reproductor de podcast
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');
    
    let isPlaying = false;
    
    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        const icon = playBtn.querySelector('i');
        
        if (isPlaying) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            // Simulación de progreso
            simulatePlayback();
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    });
    
    function simulatePlayback() {
        let progress = 0;
        const interval = setInterval(() => {
            if (isPlaying && progress < 100) {
                progress += 0.5;
                progressBar.style.width = `${progress}%`;
                
                // Actualizar tiempo actual
                const totalSeconds = 300; // 5 minutos
                const currentSeconds = Math.floor((progress / 100) * totalSeconds);
                const minutes = Math.floor(currentSeconds / 60);
                const seconds = currentSeconds % 60;
                currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                // Actualizar duración total
                if (progress === 0.5) {
                    duration.textContent = '5:00';
                }
            } else if (!isPlaying) {
                clearInterval(interval);
            } else if (progress >= 100) {
                clearInterval(interval);
                isPlaying = false;
                const icon = playBtn.querySelector('i');
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                progressBar.style.width = '0%';
                currentTime.textContent = '0:00';
            }
        }, 100);
    }
    
    // Control de progreso al hacer clic
    const progressContainer = document.querySelector('.progress-container');
    progressContainer.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = (clickX / width) * 100;
        
        progressBar.style.width = `${percentage}%`;
        
        // Actualizar tiempo actual basado en el porcentaje
        const totalSeconds = 300; // 5 minutos
        const currentSeconds = Math.floor((percentage / 100) * totalSeconds);
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = currentSeconds % 60;
        currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });
    
    // Animación de entrada para las tarjetas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.ethics-card, .solution-card, .article-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});