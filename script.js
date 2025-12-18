document.addEventListener('DOMContentLoaded', () => {
    const animateBtn = document.getElementById('animate-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    let isAnimating = false;
    let timelineAnimation; // To hold the GSAP timeline instance
 
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
        if (gsap.ticker.isTweening(drawRain)) return;
        gsap.to(canvas, { opacity: 0.1, duration: 0.5 });
        gsap.ticker.add(drawRain);
    }

    function stopRainingSkills() {
        gsap.ticker.remove(drawRain);
        // Fade out the canvas and clear it
        gsap.to(canvas, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        });
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Recalculate columns and reset drops on resize
        const newColumns = canvas.width / font_size;
        drops.length = 0; // Clear existing drops
        for (let x = 0; x < newColumns; x++) {
            drops[x] = 1;
        }
    });

    // --- Timeline Animation Logic ---
    function animateTimeline() {
        // Use GSAP for a smoother, staggered animation
        const reversedItems = Array.from(timelineItems).reverse(); // Animate from oldest to newest
        timelineAnimation = gsap.fromTo(reversedItems,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.3, ease: 'power2.out' }
        );
    }

    // --- Main Toggle Logic ---
    animateBtn.addEventListener('click', () => {
        isAnimating = !isAnimating;

        if (isAnimating) {
            animateBtn.textContent = 'Stop Animation';
            startRainingSkills();
            animateTimeline();
        } else {
            animateBtn.textContent = 'Animate';
            stopRainingSkills();
            // Immediately set the items to their initial state and kill the animation
            if (timelineAnimation) {
                timelineAnimation.kill();
                gsap.set(timelineItems, { clearProps: "all" });
            }
        }
    });
});