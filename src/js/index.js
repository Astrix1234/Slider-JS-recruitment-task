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
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 5,
        category: 'animals',
      },
    });
    return response.data.hits;
  } catch (error) {
    console.log(error);
  }
};
console.log(fetchImages());

const createMarkup = data => {
  const markup = data
    .map(
      el => `<div class="slide"><img src="${el.webformatURL}" alt="" /></div>`
    )
    .join('');
  slider.insertAdjacentHTML('beforeend', markup);
};

const createSlider = async () => {
  const images = await fetchImages();
  createMarkup(images);

  let currentSlide = 0;
  let slides = document.querySelectorAll('.slide');
  let maxSlide = slides.length;

  const updateSlide = () => {
    slides.forEach((slide, index) => {
      slide.style.opacity = index === currentSlide ? 1 : 0;
      slide.style.visibility = index === currentSlide ? 'visible' : 'hidden';
    });
  };

  const nextPhoto = () => {
    currentSlide = (currentSlide + 1) % maxSlide;
    updateSlide();
  };

  const prevPhoto = () => {
    currentSlide = currentSlide === 0 ? maxSlide - 1 : currentSlide - 1;
    updateSlide();
  };

  nextBtn.addEventListener('click', nextPhoto);
  prevBtn.addEventListener('click', prevPhoto);

  updateSlide();
};

createSlider();
