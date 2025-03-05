const ANIMATION_TIME = 600;
const INSERT_PREV_IMAGE_DELAY = 5;

const caruseleImagesContainer = document.querySelector('.carusele-images');
const caruseleImages = Array.from(document.querySelectorAll('.carusele-image'));
const prevImgBtn = document.querySelector('.carusele-prev-image');
const nextImgBtn = document.querySelector('.carusele-next-image');

const finalPrototypeImagesContainer = document.querySelector('.final-prototype-photos');
const prevPrototypeBtn = document.querySelector('.prototype-prev-image');
const nextPrototypeBtn = document.querySelector('.prototype-next-image');

// Function to get the width of an image dynamically after it has loaded
function getImageWidth(image) {
  return new Promise((resolve) => {
    if (image.complete) {
      resolve(image.width);
    } else {
      image.onload = () => resolve(image.width);
    }
  });
}

async function initializeCarousel() {
  const singleImgWidth = await getImageWidth(caruseleImages[0]);
  const gapSizeBetweenImagesNum = Number(getComputedStyle(caruseleImagesContainer).getPropertyValue('gap').replace('px', ''));
  let currentImgIdx = 0;
  let prevImgIdx = 0;

  prevImgBtn.addEventListener("click", () => {
    prevImgBtn.disabled = true;
    prevImgIdx = currentImgIdx;
    currentImgIdx = (currentImgIdx - 1 + caruseleImages.length) % caruseleImages.length;
    caruseleImagesContainer.style.transform = `translateX(-${singleImgWidth}px)`;
    caruseleImagesContainer.insertBefore(caruseleImages[currentImgIdx], caruseleImagesContainer.firstChild);
    
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
    currentImgIdx = (currentImgIdx + 1) % caruseleImages.length;
    caruseleImagesContainer.style.transform = `translateX(-${singleImgWidth + gapSizeBetweenImagesNum}px)`;

    setTimeout(() => {
      caruseleImagesContainer.appendChild(caruseleImages[prevImgIdx]);
      caruseleImagesContainer.classList.remove("sliding-transition");
      caruseleImagesContainer.style.transform = "";
      nextImgBtn.disabled = false;
    }, ANIMATION_TIME);
  });
}

async function initializePrototypeSlider() {
  const singlePrototypeImgWidth = await getImageWidth(finalPrototypeImagesContainer.children[0]);
  const gapSizeBetweenPrototypeImagesNum = Number(getComputedStyle(finalPrototypeImagesContainer).getPropertyValue('gap').replace('px', ''));
  let currentPrototypeIdx = 0;
  let prevPrototypeIdx = 0;

  prevPrototypeBtn.addEventListener("click", () => {
    console.log("Prev button clicked");
    prevPrototypeBtn.disabled = true;
    prevPrototypeIdx = currentPrototypeIdx;
    currentPrototypeIdx = (currentPrototypeIdx - 1 + finalPrototypeImagesContainer.children.length) % finalPrototypeImagesContainer.children.length;
    finalPrototypeImagesContainer.style.transform = `translateX(-${singlePrototypeImgWidth}px)`;
    finalPrototypeImagesContainer.insertBefore(finalPrototypeImagesContainer.children[currentPrototypeIdx], finalPrototypeImagesContainer.firstChild);
    
    setTimeout(() => {
      finalPrototypeImagesContainer.style.transform = "";
      finalPrototypeImagesContainer.classList.add("sliding-transition");
    }, INSERT_PREV_IMAGE_DELAY);

    setTimeout(() => {
      finalPrototypeImagesContainer.classList.remove("sliding-transition");
      prevPrototypeBtn.disabled = false;
    }, ANIMATION_TIME - INSERT_PREV_IMAGE_DELAY);
  });

  nextPrototypeBtn.addEventListener("click", () => {
    console.log("Next button clicked");
    nextPrototypeBtn.disabled = true;
    finalPrototypeImagesContainer.classList.add("sliding-transition");
    prevPrototypeIdx = currentPrototypeIdx;
    currentPrototypeIdx = (currentPrototypeIdx + 1) % finalPrototypeImagesContainer.children.length;
    finalPrototypeImagesContainer.style.transform = `translateX(-${singlePrototypeImgWidth + gapSizeBetweenPrototypeImagesNum}px)`;

    setTimeout(() => {
      finalPrototypeImagesContainer.appendChild(finalPrototypeImagesContainer.children[prevPrototypeIdx]);
      finalPrototypeImagesContainer.classList.remove("sliding-transition");
      finalPrototypeImagesContainer.style.transform = "";
      nextPrototypeBtn.disabled = false;
    }, ANIMATION_TIME);
  });
}

initializeCarousel();
initializePrototypeSlider();

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
