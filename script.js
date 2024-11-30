document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.gallery-track');
    const items = document.querySelectorAll('.gallery-item');
    const prevButton = document.querySelector('.gallery-control.prev');
    const nextButton = document.querySelector('.gallery-control.next');

    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth;
    const totalItems = items.length;
    const visibleItems = 3;

    function updateGallery() {
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    function moveNext() {
        currentIndex = (currentIndex + 1) % (totalItems - visibleItems + 1);
        updateGallery();
    }

    function movePrev() {
        currentIndex = (currentIndex - 1 + totalItems) % (totalItems - visibleItems + 1);
        updateGallery();
    }

    nextButton.addEventListener('click', moveNext);
    prevButton.addEventListener('click', movePrev);

    // Auto-scroll
    let autoScrollInterval = setInterval(moveNext, 5000);

    // Pause auto-scroll on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    track.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(moveNext, 5000);
    });

    // Initial update
    updateGallery();

    // Add hover effect to gallery items
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
            item.style.zIndex = '1';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            item.style.zIndex = '0';
        });
    });
});

// Animate comments on scroll
const comments = document.querySelectorAll('.comment');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

comments.forEach((comment, index) => {
    comment.style.opacity = '0';
    comment.style.transform = 'translateY(50px) scale(0.9)';
    comment.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(comment);
});

document.addEventListener("DOMContentLoaded", () => {
    // Función para manejar el hover en los botones de "like"
    document.querySelectorAll('.like').forEach(likeButton => {
        likeButton.addEventListener('mouseover', () => {
            const count = likeButton.querySelector('.like-count');
            if (count) {
                const currentLikes = parseInt(count.textContent);

                // Incrementa temporalmente
                count.textContent = currentLikes + 1;

                // Vuelve al número original al retirar el cursor
                likeButton.addEventListener('mouseout', () => {
                    count.textContent = currentLikes;
                }, { once: true });
            } else {
                console.error('No se encontró .like-count dentro del botón.');
            }
        });
    });
});
