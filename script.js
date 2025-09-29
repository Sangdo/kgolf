let currentSlide = 0;

// 페이지 전환(클래스+스타일 함께)
function showPage(pageName) {
    const pages = [
        { id: 'coursesPage', link: 'courses' }, { id: 'kgtech', link: 'tech' },
        { id: 'passesPage', link: 'passes' },
        { id: 'tripsPage', link: 'trips' },
        { id: 'comingSoonPage', link: 'comingSoon' },
        { id: 'bookingPage', link: 'booking' }
    ];
    const additionalContent = document.querySelector('.courses-additional-content');

    // Hide all pages and additional content first
    pages.forEach(p => {
        const el = document.getElementById(p.id);
        if (el) {
            el.style.display = 'none';
            el.classList.remove('active');
        }
    });
    if (additionalContent) {
        additionalContent.style.display = 'none';
    }

    // Deactivate all nav items
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));

    // Show the selected page
    const page = pages.find(p => p.link === pageName);
    if (page) {
        const target = document.getElementById(page.id);
        if (target) {
            target.style.display = 'block';
            target.classList.add('active');
        }
    }

    // If it's the courses page, show the additional content
    if (pageName === 'courses') {
        if (additionalContent) {
            additionalContent.style.display = 'block';
        }
    }

    // Activate the clicked nav item
    if (event && event.target) event.target.classList.add('active');
}
// 탭
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    // 실내 탭에서 슬라이더 업데이트
    // if (tabName === 'indoor') setTimeout(updateSlider, 100);
}

// Generic Slider Functionality
function createSlider(sliderId, slidesPerView = 1) {
    let currentSlide = 0;
    const slidesContainer = document.getElementById(sliderId);
    if (!slidesContainer) return;

    const slides = Array.from(slidesContainer.children);
    const totalSlides = slides.length;
    const totalPages = Math.ceil(totalSlides / slidesPerView);

    function updateSlider() {
        slidesContainer.style.transform = `translateX(${-currentSlide * (100 / slidesPerView)}%)`;

        // Update active class for individual slides (optional, if you want to highlight visible slides)
        slides.forEach((slide, i) => {
            if (i >= currentSlide * slidesPerView && i < (currentSlide + 1) * slidesPerView) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    window[`nextSlide_${sliderId}`] = () => {
        currentSlide = (currentSlide + 1) % totalPages;
        updateSlider();
    };

    window[`prevSlide_${sliderId}`] = () => {
        currentSlide = (currentSlide - 1 + totalPages) % totalPages;
        updateSlider();
    };

    updateSlider(); // Initial display
}

// Indoor Slider Specific Functionality
function createIndoorSlider(sliderId, slidesPerView = 3) {
    let currentSlide = 0;
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    const slides = Array.from(slider.children);
    const totalSlides = slides.length;
    const totalPages = Math.ceil(totalSlides / slidesPerView);

    function updateSlider() {
        const slideWidth = slider.children[0].offsetWidth; // Get width of a single slide
        const gap = parseFloat(getComputedStyle(slider).gap); // Get gap between slides
        const totalCardWidth = slideWidth + gap;

        const translateX = -currentSlide * totalCardWidth;
        slider.style.transform = `translateX(${translateX}px)`;

        const indicatorsContainer = document.querySelector('.slider-indicators');
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = ''; // Clear existing indicators
            for (let i = 0; i < totalPages; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (i === currentSlide) {
                    indicator.classList.add('active');
                }
                indicator.onclick = () => {
                    currentSlide = i;
                    updateSlider();
                };
                indicatorsContainer.appendChild(indicator);
            }
        }

        document.getElementById('prevBtn').disabled = currentSlide === 0;
        document.getElementById('nextBtn').disabled = currentSlide >= totalPages - 1;
    }

    document.getElementById('prevBtn').onclick = () => {
        currentSlide = (currentSlide - 1 + totalPages) % totalPages;
        updateSlider();
    };

    document.getElementById('nextBtn').onclick = () => {
        currentSlide = (currentSlide + 1) % totalPages;
        updateSlider();
    };

    updateSlider(); // Initial display
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    // Close menu when a nav item is clicked
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        });
    });

    // 기본 페이지: 홈 (coursesPage)
    document.getElementById('coursesPage').classList.add('active');

    // Initialize sliders
    createSlider('slides', 3); // For the courses page carousel, showing 3 slides
    createIndoorSlider('indoorSlider', 3); // For the indoor golf passes slider
});
// Footer 연도 자동 업데이트
document.getElementById('year').textContent = new Date().getFullYear();