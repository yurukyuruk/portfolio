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

  // 🟢 Move the previous image to the beginning **before** applying the transform
  caruseleImagesContainer.insertBefore(caruseleImages[currentImgIdx], caruseleImagesContainer.firstChild);
  
  // 🟢 Disable transition temporarily and apply an initial negative transform
  caruseleImagesContainer.style.transition = "none"; // ✅ Prevent instant jump
  caruseleImagesContainer.style.transform = `translateX(-${singleImgWidth + gapSizeBetweenImagesNum}px)`; // ✅ Offset added

  // 🟢 Allow browser to register the change, then enable smooth transition
  setTimeout(() => {
    caruseleImagesContainer.style.transition = "transform 0.5s ease-in-out"; // ✅ Re-enable transition smoothly
    caruseleImagesContainer.style.transform = "translateX(0)"; // ✅ Animate back to position
  }, 10); // ✅ Small delay added to avoid instant jump

  setTimeout(() => {
    prevImgBtn.disabled = false;
  }, ANIMATION_TIME);
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