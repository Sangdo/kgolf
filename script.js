// 페이지 전환
function showPage(pageName) {
  const pages = [
    { id: 'coursesPage', link: 'courses' }, { id: 'kgtech', link: 'tech' },
    { id: 'passesPage', link: 'passes' },
    { id: 'tripsPage', link: 'trips' },
    { id: 'comingSoonPage', link: 'comingSoon' },
    { id: 'bookingPage', link: 'booking' }
  ];
  const additionalContent = document.querySelector('.courses-additional-content');

  pages.forEach(p => {
    const el = document.getElementById(p.id);
    if (el) {
      el.style.display = 'none';
      el.classList.remove('active');
    }
  });
  if (additionalContent) additionalContent.style.display = 'none';

  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));

  const page = pages.find(p => p.link === pageName);
  if (page) {
    const target = document.getElementById(page.id);
    if (target) {
      target.style.display = 'block';
      target.classList.add('active');
    }
  }
  if (pageName === 'courses' && additionalContent) {
    additionalContent.style.display = 'block';
  }
  if (event && event.target) event.target.classList.add('active');
}

// 탭
function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
}

// 🔥 슬라이더 (courses 전용)
const slides = document.getElementById("slides");
const totalSlides = slides ? slides.children.length : 0;
const perView = 3;
let index = 0;

function showSlide(i) {
  const maxIndex = totalSlides - perView;
  if (i > maxIndex) {
    index = 0;
  } else if (i < 0) {
    index = maxIndex;
  } else {
    index = i;
  }
  slides.style.transform = `translateX(${-index * (100 / perView)}%)`;
}

function nextSlide() {
  showSlide(index + 1);
}

function prevSlide() {
  showSlide(index - 1);
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');

  hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburgerMenu.classList.remove('active');
    });
  });

    // 기본 페이지: 홈 (coursesPage)
    document.getElementById('coursesPage').classList.add('active');
    // Highlight the corresponding nav item
    document.querySelector('.nav-item[onclick="showPage(\'courses\')"]').classList.add('active');

  // 슬라이더 초기 표시
  showSlide(0);
});

// Footer 연도 자동 업데이트
document.getElementById('year').textContent = new Date().getFullYear();
