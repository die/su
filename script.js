let carouselData;

document.addEventListener('DOMContentLoaded', () => {
    const carouselElement = document.getElementById('carousel');
    const carousel = new bootstrap.Carousel(carouselElement);
    const indicators = document.querySelectorAll('.carousel-indicators button');
    let currentIndex = 1;

    function loadSlidesFromJSON() {
        return fetch('./media.json')
            .then(response => response.json())
            .then(data => {
                carouselData = data;

                updateCarousel('Trickster');
                updateIndicators(0); 
            });
    }

    function updateIndicators(activeIndex) {
        const totalSlides = carouselElement.querySelectorAll('.carousel-item').length;

        currentPageElement.textContent = activeIndex + 1;
        totalPagesElement.textContent = totalSlides;

        currentPageElement.setAttribute('contenteditable', 'true');
        currentPageElement.addEventListener('blur', () => {
            const newPage = parseInt(currentPageElement.textContent);
            if (newPage >= 1 && newPage <= totalSlides) {
                carousel.to(newPage - 1);
            } else {
                currentPageElement.textContent = activeIndex + 1;
            }
        });

        indicators[0].classList.add('active')

        indicators.forEach(indicator => {
            indicator.style.visibility = 'hidden';
        });
        
        if (activeIndex === 0) {
            indicators[1].style.visibility = 'visible';
            indicators[2].style.visibility = 'visible';
        } else if (activeIndex === totalSlides - 1) {
            indicators[0].style.visibility = 'visible';
            indicators[1].style.visibility = 'visible';
        } else {
            indicators[0].style.visibility = 'visible';
            indicators[1].style.visibility = 'visible';
            indicators[2].style.visibility = 'visible';
        }
    }

    function updateCarousel(section) {
        const carouselInner = document.getElementById('carouselInner');
        
        carouselInner.innerHTML = '';
    
        const items = carouselData[section];
        items.forEach((item, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) carouselItem.classList.add('active');
    
            let mediaElement;
            if (item.type === 'image' || item.type === 'gif') {
                mediaElement = document.createElement('img');
                mediaElement.classList.add('d-block', 'w-100');
                mediaElement.src = item.src;
                mediaElement.alt = item.caption || '';
                mediaElement.loading = 'lazy';
            } else if (item.type === 'video') {
                mediaElement = document.createElement('video');
                mediaElement.classList.add('d-block', 'w-100');
                mediaElement.alt = item.caption;
                mediaElement.src = item.src;
                mediaElement.controls = true;
                mediaElement.poster = `./videos/thumbnails/${item.src.split('/')[1].split('.')[0]}.png`;
                mediaElement.loading = 'lazy';
            }

            carouselItem.appendChild(mediaElement);
    
            const captionDiv = document.createElement('div');
            captionDiv.classList.add('carousel-caption', 'd-block');
            captionDiv.innerHTML = `<h5>${item.caption || ''}</h5><p>${item.footnote ? item.footnote + '<br><br>' : ''}<i>${item.date}</i></p>`;
            carouselItem.appendChild(captionDiv);
    
            carouselInner.appendChild(carouselItem);
        });
        updateIndicators(0); 
    }

    loadSlidesFromJSON();

    carouselElement.addEventListener('slide.bs.carousel', (event) => {
        const activeIndex = event.to;
        currentIndex = activeIndex;
        updateIndicators(activeIndex);
    });

    carouselElement.addEventListener('slid.bs.carousel', (event) => {
        indicators[1].classList?.add('active')
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => { 
            if (index == 0) carousel.prev()
            if (index == 2) carousel.next()
        });
    });

    document.getElementById('discord-history').addEventListener('click', () => updateCarousel('Discord History'));
    document.getElementById('moon-bunny').addEventListener('click', () => updateCarousel('Moon Bunny'));
    document.getElementById('death-poets').addEventListener('click', () => updateCarousel('Death Poets'));
    document.getElementById('trickster').addEventListener('click', () => updateCarousel('Trickster'));
    document.getElementById('account').addEventListener('click', () => updateCarousel('Account'));

    const currentPageElement = document.getElementById('currentPage');
    const totalPagesElement = document.getElementById('totalPages');

    currentPageElement.addEventListener('focus', () => {
        currentPageElement.setAttribute('contenteditable', 'true');
    });

    currentPageElement.addEventListener('blur', () => {
        currentPageElement.removeAttribute('contenteditable');
    });

    currentPageElement.addEventListener('focusout', () => {
        currentPageElement.setAttribute('contenteditable', 'true');
    });

    currentPageElement.addEventListener('keydown', (event) => {
        const totalSlides = carouselElement.querySelectorAll('.carousel-item').length;
        if (event.key === 'Enter') {
            event.preventDefault();
            const newPage = parseInt(currentPageElement.textContent);
            if (newPage >= 1 && newPage <= totalSlides) {
                carousel.to(newPage - 1);
            } else {
                currentPageElement.textContent = currentIndex + 1;
            }
        }
    });
});
