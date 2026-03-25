export function initProject() {

    
    const slides = document.querySelectorAll('.projects__item');
    const nextBtn2 = document.querySelector('.slider-btn.next');
    const prevBtn2 = document.querySelector('.slider-btn.prev');
    let currentIndex2 = 0;


    function showProject(index) {

        slides.forEach(slide => slide.classList.remove('active'));

        slides[index].classList.add('active');
    }

  
    if (nextBtn2) {
        nextBtn2.addEventListener('click', () => {
            currentIndex2 = (currentIndex2 + 1) % slides.length;
            showProject(currentIndex2);
        });
    }


    if (prevBtn2) {
        prevBtn2.addEventListener('click', () => {
            currentIndex2 = (currentIndex2 - 1 + slides.length) % slides.length;
            showProject(currentIndex2);
        });
    }

}