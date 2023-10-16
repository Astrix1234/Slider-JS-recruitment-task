'use strict';
import axios from 'axios';

const slider = document.querySelector('.container');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.back');

prevBtn.style.display = 'none';

const fetchImages = async () => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '38606414-d1218f221fd8daceb76c83e1a',
        orientation: 'horizontal',
        category: 'nature',
        per_page: 5,
      },
    });
    return response.data.hits;
  } catch {
    err => console.log('error', err);
  }
};

const createMarkup = data => {
  const extendedData = [...data, data[0]];
  const markup = extendedData
    .map(el => `<div class="slide"><img src="${el.webformatURL}"></div>`)
    .join('');
  slider.innerHTML = markup;
};

const createSlider = async () => {
  const images = await fetchImages();
  createMarkup(images);

  let currentSlide = 0;
  let slides = document.querySelectorAll('.slide');
  let allSlides = slides.length;

  const updateSlide = () => {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${index * 100}%)`;
    });
  };
  updateSlide();

  const onNext = () => {
    if (currentSlide === allSlides - 1) {
      slides.forEach(slide => {
        slide.style.transition = 'none';
      });
      currentSlide = 0;
      updateSlide();

      setTimeout(() => {
        slides.forEach(slide => {
          slide.style.transition = 'all 0.5s ease-in-out';
        });

        currentSlide++;
        slides.forEach((slide, index) => {
          slide.style.transform = `translateX(${
            (index - currentSlide) * 100
          }%)`;
        });
      }, 1);
    } else {
      currentSlide++;
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
      });
    }
  };

  nextBtn.addEventListener('click', onNext);
};

createSlider();
