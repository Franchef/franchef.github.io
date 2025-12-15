document.addEventListener('DOMContentLoaded', () => {
    const animateBtn = document.getElementById('animate-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    let isAnimating = false;
    let rainInterval = null;

    // --- Raining Skills Animation Logic ---
    const canvas = document.getElementById('skills-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const skills = ['Go', 'Kubernetes', 'Java', 'Python', 'AWS', 'GCP', 'Kafka', 'Docker', 'SQL', 'Microservices', 'C++', 'Distributed Systems', 'gRPC'];
    const font_size = 16;
    const columns = canvas.width / font_size;

    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawRain() {
        ctx.fillStyle = 'rgba(240, 242, 245, 0.1)'; // Fading effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0077b5'; // Skill color
        ctx.font = font_size + 'px arial';

        for (let i = 0; i < drops.length; i++) {
            const text = skills[Math.floor(Math.random() * skills.length)];
            ctx.fillText(text, i * font_size, drops[i] * font_size);

            if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    function startRainingSkills() {
        if (rainInterval) return;
        canvas.style.opacity = '0.1';
        rainInterval = setInterval(drawRain, 50);
    }

    function stopRainingSkills() {
        clearInterval(rainInterval);
        rainInterval = null;
        // Fade out the canvas
        ctx.fillStyle = 'rgba(240, 242, 245, 1)';
        let fadeOut = setInterval(() => {
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            if (!rainInterval) {
                clearInterval(fadeOut);
                canvas.style.opacity = '0';
            }
        }, 30);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // --- Timeline Animation Logic ---
    function animateTimeline() {
        // Animate from oldest to newest
        const reversedItems = Array.from(timelineItems).reverse();
        reversedItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('is-visible');
            }, index * 400); // Stagger the animation
        });
    }

    function resetTimeline() {
        timelineItems.forEach(item => {
            item.classList.remove('is-visible');
        });
    }

    // --- Main Toggle Logic ---
    animateBtn.addEventListener('click', () => {
        isAnimating = !isAnimating;

        if (isAnimating) {
            animateBtn.textContent = 'Stop Animation';
            resetTimeline(); // Clear previous state before starting
            startRainingSkills();
            animateTimeline();
        } else {
            animateBtn.textContent = 'Animate';
            stopRainingSkills();
            resetTimeline();
        }
    });

    // Initially hide timeline items for animation
    resetTimeline();
});