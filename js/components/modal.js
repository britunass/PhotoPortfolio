export function initGallery() {

  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.querySelector('.close-modal');

  const modalFilterBtns = document.querySelectorAll('.modal-filter-btn');   
  const nextBtn = document.querySelector('.modal-nav.next');
  const prevBtn = document.querySelector('.modal-nav.prev');

  let currentPhotos = [];   
  let currentIndex = 0;

  const openGalleryBtn = document.querySelector('#open-gallery-btn');

  function updateCurrentPhotos() {
  const activeFilter = document.querySelector('.modal-filter-btn.active').dataset.filter;
  
  const mainGallery = document.getElementById('gallery');
  if (!mainGallery) return;
  if (activeFilter === 'all') {
    currentPhotos = Array.from(mainGallery.querySelectorAll('.gallery__image'));
  } else {
    currentPhotos = Array.from(mainGallery.querySelectorAll(`.gallery__figure[data-category="${activeFilter}"] .gallery__image`));
  }
}

  if (openGalleryBtn) {
    openGalleryBtn.addEventListener('click', (e) => {
      e.preventDefault(); 

      updateCurrentPhotos(); 

      const savedFilter = localStorage.getItem('filter');

      if (savedFilter) {
        modalFilterBtns.forEach(btn => {
          btn.classList.remove('active');

          if (btn.dataset.filter === savedFilter) {
            btn.classList.add('active');
          }
        });

        updateCurrentPhotos();
      }

      if (currentPhotos.length > 0) {
        currentIndex = 0;
        modal.style.display = 'flex';
        modalImg.src = currentPhotos[0].src;
        modalCaption.textContent = currentPhotos[0].alt;
      }
    });
  }

  modalFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      localStorage.setItem('filter', btn.dataset.filter);

      updateCurrentPhotos();
      
      if (currentPhotos.length > 0) {
        currentIndex = 0;
        modalImg.src = currentPhotos[0].src;
        modalCaption.textContent = currentPhotos[0].alt;
      }
    });
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentPhotos.length;
    modalImg.src = currentPhotos[currentIndex].src;
    modalCaption.textContent = currentPhotos[currentIndex].alt;
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
    modalImg.src = currentPhotos[currentIndex].src;
    modalCaption.textContent = currentPhotos[currentIndex].alt;
  });

  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  });

}