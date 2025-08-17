document.addEventListener("DOMContentLoaded", function () {
    // Меню навигации
    const menuBtn = document.querySelector(".menu-btm");
    const navList = document.querySelector(".nav-list");

    if (menuBtn && navList) {
        menuBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            navList.classList.toggle("active");
        });

        // Закрытие меню при клике вне его
        document.addEventListener("click", function (event) {
            if (!navList.contains(event.target) && !menuBtn.contains(event.target)) {
                navList.classList.remove("active");
            }
        });
    }

    // Модальное окно для изображений
    const imageModal = document.getElementById('image-modal');
    if (imageModal) {
        const modalImg = document.getElementById("modal-image");
        const imageCloseBtn = imageModal.querySelector(".close");

        // Добавляем обработчики на все изображения
        document.querySelectorAll('.image-container img').forEach(img => {
            img.addEventListener('click', function () {
                imageModal.classList.add("show");
                modalImg.src = this.src;
                modalImg.alt = this.alt;
            });
        });

        // Закрытие модального окна
        if (imageCloseBtn) {
            imageCloseBtn.addEventListener('click', function () {
                imageModal.classList.remove("show");
            });
        }

        // Закрытие при клике вне изображения
        imageModal.addEventListener('click', function (event) {
            if (event.target === imageModal) {
                imageModal.classList.remove("show");
            }
        });
    }

    // Модальное окно для видео
    const videoModal = document.getElementById('video-modal');
    if (videoModal) {
        const videoPlayer = videoModal.querySelector("video");
        const videoCloseBtn = videoModal.querySelector(".close");
        const videoTrigger = document.querySelector('.video-trigger');

        // Открываем модальное окно при клике на видео-триггер
        if (videoTrigger) {
            videoTrigger.addEventListener('click', function () {
                videoModal.classList.add("show");
                document.body.style.overflow = 'hidden';

                if (videoPlayer) {
                    videoPlayer.currentTime = 0;
                    videoPlayer.play().catch(error => {
                        console.error("Ошибка воспроизведения видео:", error);
                    });
                }
            });
        }

        // Закрываем модальное окно видео
        if (videoCloseBtn) {
            videoCloseBtn.addEventListener('click', function () {
                videoModal.classList.remove("show");
                document.body.style.overflow = 'auto';
                if (videoPlayer) {
                    videoPlayer.pause();
                }
            });
        }

        // Закрываем при клике вне окна
        videoModal.addEventListener('click', function (e) {
            if (e.target === videoModal) {
                videoModal.classList.remove("show");
                document.body.style.overflow = 'auto';
                if (videoPlayer) {
                    videoPlayer.pause();
                }
            }
        });
    }

    // Инициализация слайдеров
    const allSliders = document.querySelectorAll('.slider-container');
    
    allSliders.forEach(container => {
        const slider = container.querySelector('.slider');
        const slides = container.querySelectorAll('.slide');
        const dotsContainer = container.querySelector('.slider-dots');
        let currentIndex = 0;
        let slideInterval;
        
        // Создаем точки навигации
        if (dotsContainer && slides.length > 1) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });
        }
        
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];
        
        // Функция переключения слайда
        function goToSlide(index) {
            currentIndex = index;
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Обновляем активную точку
            if (dots.length) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        }
        
        // Автоматическое перелистывание
        function startSlider() {
            if (slides.length > 1) {
                slideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % slides.length;
                    goToSlide(currentIndex);
                }, 5000);
            }
        }
        
        // Инициализация слайдера
        function initSlider() {
            if (slides.length > 1) {
                startSlider();
                
                // Пауза при наведении
                container.addEventListener('mouseenter', () => {
                    clearInterval(slideInterval);
                });
                
                // Возобновление при уходе курсора
                container.addEventListener('mouseleave', () => {
                    startSlider();
                });
            }
        }
        
        initSlider();
    });
});