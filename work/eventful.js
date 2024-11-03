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






const finalPrototypeImagesContainer = document.querySelector('.final-prototype-photos');
const finalPrototypeImages = Array.from(document.querySelectorAll('.final-prototype-photo'));
const prevImageButton = document.querySelector('.prototype-prev-image');
const nextImageButton = document.querySelector('.prototype-next-image');

// Gap between elements needs to be defined in PX
const gapSizeBetweenImagesPixel = getComputedStyle(finalPrototypeImagesContainer).getPropertyValue('gap');
const gapSizeBetweenImagesNumber = Number(gapSizeBetweenImagesPixel.slice(0, gapSizeBetweenImagesPixel.length - 2));
const imageCount = finalPrototypeImages.length;
const singleImageWidth = finalPrototypeImages[0].width;
let currentImgIndex = 0;
let prevImageIndex = 0;

prevImageButton.addEventListener("click", () => {
  prevImageButton.disabled = true;
  prevImageIndex = currentImgIndex;
  currentImgIndex = (currentImgIndex - 1 + imageCount) % imageCount;
  finalPrototypeImagesContainer.style.transform = `translateX(-${singleImageWidth}px)`;
  finalPrototypeImagesContainer.insertBefore(finalPrototypeImages[currentImgIndex], finalPrototypeImagesContainer.firstChild);

  // Wait for the element to mount in the DOM to avoid flashing images
  setTimeout(() => {
    finalPrototypeImagesContainer.style.transform = "";
    finalPrototypeImagesContainer.classList.add("sliding-transition");
  }, INSERT_PREV_IMAGE_DELAY);

  setTimeout(() => {
    finalPrototypeImagesContainer.classList.remove("sliding-transition");
    prevImageButton.disabled = false;
  }, ANIMATION_TIME - INSERT_PREV_IMAGE_DELAY);
});

nextImageButton.addEventListener("click", () => {
  nextImageButton.disabled = true;
  finalPrototypeImagesContainer.classList.add("sliding-transition");
  prevImageIndex = currentImgIndex;
  currentImgIndex = (currentImgIndex + 1) % imageCount;
  finalPrototypeImagesContainer.style.transform = `translateX(-${singleImageWidth + gapSizeBetweenImagesNumber}px)`;

  setTimeout(() => {
    finalPrototypeImagesContainer.appendChild(finalPrototypeImages[prevImageIndex]);
    finalPrototypeImagesContainer.classList.remove("sliding-transition");
    finalPrototypeImagesContainer.style.transform = "";
    nextImageButton.disabled = false;
  }, ANIMATION_TIME);
});



   
