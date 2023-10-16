'use strict';
import axios from 'axios';

const slider = document.querySelector('.container');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.back');

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
  const markup = data
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
    currentSlide = (currentSlide + 1) % allSlides;
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
    });
  };

  const onBack = () => {
    currentSlide = currentSlide === 0 ? allSlides - 1 : currentSlide - 1;
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
    });
  };

  nextBtn.addEventListener('click', onNext);
  prevBtn.addEventListener('click', onBack);
};

createSlider();
