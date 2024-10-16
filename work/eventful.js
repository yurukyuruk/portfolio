const ANIMATION_TIME = 600;
const INSERT_PREV_IMAGE_DELAY = 5;

const caruseleImagesContainer = document.querySelector('.carusele-images');
const caruseleImages = Array.from(document.querySelectorAll('.carusele-image'))
const prevImgBtn = document.querySelector('.carusele-prev-image');
const nextImgBtn = document.querySelector('.carusele-next-image');

// Gap between elemnts need to be defined in PX
const gapSizeBetweenImagesPX = getComputedStyle(caruseleImagesContainer).getPropertyValue('gap');
const gapSizeBetweenImagesNum = Number(gapSizeBetweenImagesPX.slice(0, gapSizeBetweenImagesPX.length - 2));
const imagesCount = caruseleImages.length;
const singleImgWidth = caruseleImages[0].width;
let currentImgIdx = 0;
let prevImgIdx = 0;

prevImgBtn.addEventListener("click", () => {
  prevImgBtn.disabled = true;
  prevImgIdx = currentImgIdx;
  currentImgIdx = (currentImgIdx - 1 + imagesCount) % imagesCount;
  caruseleImagesContainer.style.transform = `translateX(-${singleImgWidth}px)`;
  caruseleImagesContainer.insertBefore(caruseleImages[currentImgIdx], caruseleImagesContainer.firstChild);

  // This setTimeout is required as we need to wait once elemnt will be mounted in DOM
  // To do not experience flashing images
  setTimeout(() => {
    caruseleImagesContainer.style.transform = "";
    caruseleImagesContainer.classList.add("sliding-transition");
  }, INSERT_PREV_IMAGE_DELAY);

  setTimeout(() => {
    caruseleImagesContainer.classList.remove("sliding-transition");
    prevImgBtn.disabled = false;
  }, ANIMATION_TIME - INSERT_PREV_IMAGE_DELAY);
});

nextImgBtn.addEventListener("click", () => {
  nextImgBtn.disabled = true;
  caruseleImagesContainer.classList.add("sliding-transition");
  prevImgIdx = currentImgIdx;
  currentImgIdx = (currentImgIdx + 1) % imagesCount;
  caruseleImagesContainer.style.transform = `translateX(-${singleImgWidth + gapSizeBetweenImagesNum}px)`;

  setTimeout(() => {
    caruseleImagesContainer.appendChild(caruseleImages[prevImgIdx]);
    caruseleImagesContainer.classList.remove("sliding-transition");
    caruseleImagesContainer.style.transform = "";
    nextImgBtn.disabled = false;
  }, ANIMATION_TIME);
});