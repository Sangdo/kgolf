        let currentSlide = 0;
        const totalSlides = 3;

        // 페이지 전환(클래스+스타일 함께)
        function showPage(pageName) {
            const pages = [
                { id: 'coursesPage', link: 'courses' },
                { id: 'passesPage', link: 'passes' },
                { id: 'tripsPage', link: 'trips' },
                { id: 'comingSoonPage', link: 'comingSoon' },
                { id: 'bookingPage', link: 'booking' } 
            ];
            // 숨기기
            pages.forEach(p => {
                const el = document.getElementById(p.id);
                if (el) {
                    el.style.display = 'none';
                    el.classList.remove('active');
                }
            });
            // 네비 비활성화
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            // 보이기
            const page = pages.find(p => p.link === pageName);
            if (page) {
                const target = document.getElementById(page.id);
                if (target) {
                    target.style.display = 'block';
                    target.classList.add('active');
                }
            }
            // 클릭된 네비 활성화
            if (event && event.target) event.target.classList.add('active');
        }

        // 탭
        function showTab(tabName) {
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            if (event && event.target) event.target.classList.add('active');

            // 실내 탭에서 슬라이더 업데이트
            if (tabName === 'indoor') setTimeout(updateSlider, 100);
        }

        function moveSlide(direction) {
            currentSlide += direction;
            if (currentSlide < 0) currentSlide = 0;
            else if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
            updateSlider();
        }

        function goToSlide(slideIndex) { currentSlide = slideIndex; updateSlider(); }

        function updateSlider() {
            const slider = document.getElementById('indoorSlider');
            const translateX = -currentSlide * (100 / 3);
            slider.style.transform = `translateX(${translateX}%)`;
            document.querySelectorAll('.indicator').forEach((ind, i) => ind.classList.toggle('active', i === currentSlide));
            document.getElementById('prevBtn').disabled = currentSlide === 0;
            document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
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

            // 기본 페이지: 패스
            document.getElementById('passesPage').classList.add('active');
            updateSlider();
        });
        // Footer 연도 자동 업데이트
        document.getElementById('year').textContent = new Date().getFullYear();
