let isMusicPlaying = false;
let bgMusic = null;
let musicBtn = null;

document.addEventListener('DOMContentLoaded', () => {
    bgMusic = document.getElementById('bgMusic');
    musicBtn = document.getElementById('musicBtn');
    initCountdown();
    initTimelineAnimation();
});

function toggleMusic() {
    if (!bgMusic || !musicBtn) return;
    
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
    } else {
        bgMusic.play().catch(error => {
            console.log('Music autoplay blocked:', error);
        });
        musicBtn.classList.add('playing');
    }
    isMusicPlaying = !isMusicPlaying;
}

function initCountdown() {
    const now = new Date();
    let targetDate = new Date(now.getFullYear(), 5, 1);
    
    if (now > targetDate) {
        targetDate = new Date(now.getFullYear() + 1, 5, 1);
    }
    
    updateCountdown(targetDate);
    setInterval(() => updateCountdown(targetDate), 1000);
}

function updateCountdown(targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

function showSurprise() {
    const modal = document.getElementById('surpriseModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('surpriseModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        closeModal();
    }
});

document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    document.getElementById('timeline')?.scrollIntoView({
        behavior: 'smooth'
    });
});
