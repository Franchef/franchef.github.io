document.addEventListener('DOMContentLoaded', () => {
    // --- Raining Skills Animation ---
    const canvas = document.getElementById('skills-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const skills = ['Go', 'Kubernetes', 'Java', 'Python', 'AWS', 'GCP', 'Kafka', 'Docker', 'SQL', 'React', 'C++'];
    const font_size = 16;
    const columns = canvas.width / font_size;

    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
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

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // --- Timeline Scroll Animation ---
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the item is visible
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
});