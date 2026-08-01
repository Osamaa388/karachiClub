// Karachi Club GYM — Success Stories Page Logic
// 1. Before/After drag sliders (mouse + touch)
// 2. Animated count-up numbers when scrolled into view

(function () {

    /* ---------- Before/After Sliders ---------- */

    function initSlider(root) {
        const stage = root.querySelector('.ba-stage');
        const beforeWrap = root.querySelector('.ba-before-wrap');
        const handle = root.querySelector('.ba-handle');
        if (!stage || !beforeWrap || !handle) return;

        let dragging = false;

        function setPosition(clientX) {
            const rect = stage.getBoundingClientRect();
            let percent = ((clientX - rect.left) / rect.width) * 100;
            percent = Math.max(0, Math.min(100, percent));

            beforeWrap.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
            handle.style.left = percent + '%';
        }

        function start(e) {
            dragging = true;
            move(e);
        }
        function move(e) {
            if (!dragging && e.type !== 'click') return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            setPosition(clientX);
        }
        function end() {
            dragging = false;
        }

        stage.addEventListener('mousedown', start);
        stage.addEventListener('touchstart', start, { passive: true });

        window.addEventListener('mousemove', move);
        stage.addEventListener('touchmove', move, { passive: true });

        window.addEventListener('mouseup', end);
        window.addEventListener('touchend', end);

        // Click anywhere on the stage jumps the slider there too
        stage.addEventListener('click', (e) => setPosition(e.clientX));
    }

    document.querySelectorAll('.ba-slider').forEach(initSlider);


    /* ---------- Animated Counters ---------- */

    const counters = document.querySelectorAll('.ss-counter');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10) || 0;

        if (reduceMotion) {
            el.textContent = target;
            return;
        }

        const duration = 1200;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        }
        requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach((c) => observer.observe(c));
    } else {
        counters.forEach(animateCounter);
    }

})();