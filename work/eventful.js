const ANIMATION_TIME = 600;
const INSERT_PREV_IMAGE_DELAY = 5;

function getGapSize(element) {
  const computedStyle = window.getComputedStyle(element);
  const gapValue = computedStyle.getPropertyValue('gap'); // Get gap value (e.g., "20px", "2em")
  
  const match = gapValue.match(/^([\d.]+)([a-z%]*)$/i); // Extract number and unit

  if (match) {
      return {
          numericValue: parseFloat(match[1]), // Convert to number
          unit: match[2] || '' // Get unit (default to empty string if none)
      };
  }

  return null; // Return null if not found
}

const caruseleImagesContainer = document.querySelector('.carusele-images');
const caruseleImages = Array.from(document.querySelectorAll('.carusele-image'))
const prevImgBtn = document.querySelector('.carusele-prev-image');
const nextImgBtn = document.querySelector('.carusele-next-image');

const imagesCount = caruseleImages.length;
//const singleImgWidth = caruseleImages[0].width;
let currentImgIdx = 0;
let prevImgIdx = 0;

prevImgBtn.addEventListener("click", () => {
  const gapSize = getGapSize(finalPrototypeImagesContainer);
  const singleImgWidth = caruseleImages[0].width;
  prevImgBtn.disabled = true;
  prevImgIdx = currentImgIdx;
  currentImgIdx = (currentImgIdx - 1 + imagesCount) % imagesCount;
  caruseleImagesContainer.style.transform = `translateX(-${singleImgWidth + gapSize.numericValue}px)`;
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
  const gapSize = getGapSize(finalPrototypeImagesContainer);
  const singleImgWidth = caruseleImages[0].width;
  nextImgBtn.disabled = true;
  caruseleImagesContainer.classList.add("sliding-transition");
  prevImgIdx = currentImgIdx;
  currentImgIdx = (currentImgIdx + 1) % imagesCount;
  caruseleImagesContainer.style.transform = `translateX(-${singleImgWidth + gapSize.numericValue}px)`;

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

const imageCount = finalPrototypeImages.length;
let currentImgIndex = 0;
let prevImageIndex = 0;

prevImageButton.addEventListener("click", () => {
  const singleImageWidth = finalPrototypeImages[0].width;
  const gapSize = getGapSize(finalPrototypeImagesContainer);
  prevImageButton.disabled = true;
  prevImageIndex = currentImgIndex;
  currentImgIndex = (currentImgIndex - 1 + imageCount) % imageCount;
  finalPrototypeImagesContainer.style.transform = `translateX(-${singleImageWidth + gapSize.numericValue}px)`;
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
  const gapSize = getGapSize(finalPrototypeImagesContainer);
  const singleImageWidth = finalPrototypeImages[0].width;
  nextImageButton.disabled = true;
  finalPrototypeImagesContainer.classList.add("sliding-transition");
  prevImageIndex = currentImgIndex;
  currentImgIndex = (currentImgIndex + 1) % imageCount;
  finalPrototypeImagesContainer.style.transform = `translateX(-${singleImageWidth + gapSize.numericValue}px)`;

  setTimeout(() => {
    finalPrototypeImagesContainer.appendChild(finalPrototypeImages[prevImageIndex]);
    finalPrototypeImagesContainer.classList.remove("sliding-transition");
    finalPrototypeImagesContainer.style.transform = "";
    nextImageButton.disabled = false;
  }, ANIMATION_TIME);
});

function toggleId() {
  const element = document.querySelector("body");
  if (element.hasAttribute("id")) {
    element.removeAttribute("id");
  } else {
    element.setAttribute("id", "body-hidden");
  }
}
const hamburgerButton = document.querySelector(".hamburger-checkbox");
const navigation = document.querySelector(".mobile-header nav");
const body = document.querySelector("body");

if (hamburgerButton) {
    hamburgerButton.addEventListener("change", () => {
        if (navigation) {
            navigation.classList.toggle("hidden", hamburgerButton.checked);
            toggleId();
        }
    });
}

let lastScrollTop = 0;
let header = document.querySelector("header");
    window.addEventListener("scroll", function() {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            // Scroll down
            header.classList.add("header-hidden");
        } else {
            // Scroll up
            header.classList.remove("header-hidden");
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  }, false);
