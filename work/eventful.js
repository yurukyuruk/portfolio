const ANIMATION_TIME = 600;

const caruseleImagesContainer = document.querySelector('.carusele-images');
const caruseleImages = Array.from(document.querySelectorAll('.carusele-image'));
const prevImgBtn = document.querySelector('.carusele-prev-image');
const nextImgBtn = document.querySelector('.carusele-next-image');

async function getImageWidth(image) {
    return new Promise((resolve) => {
        if (image.complete) resolve(image.width);
        else image.onload = () => resolve(image.width);
    });
}

async function initializeCarousel() {
    const singleImgWidth = await getImageWidth(caruseleImages[0]);
    let currentImgIdx = 0;

    prevImgBtn.addEventListener("click", () => {
        prevImgBtn.disabled = true;
        caruseleImagesContainer.style.transition = 'transform 0.5s ease-out';
        caruseleImagesContainer.style.transform = `translateX(${singleImgWidth}px)`;
    });

    nextImgBtn.addEventListener("click", () => {
        nextImgBtn.disabled = true;
        caruseleImagesContainer.style.transition = 'transform 0.5s ease-out';
        caruseleImagesContainer.style.transform = `translateX(-${singleImgWidth}px)`;
    });

    caruseleImagesContainer.addEventListener("transitionend", () => {
        caruseleImagesContainer.appendChild(caruseleImages[currentImgIdx]);
        caruseleImagesContainer.style.transition = '';
        caruseleImagesContainer.style.transform = '';
        prevImgBtn.disabled = false;
        nextImgBtn.disabled = false;
    });
}

initializeCarousel();

const finalPrototypeImagesContainer = document.querySelector('.final-prototype-photos');
const finalPrototypeImages = Array.from(document.querySelectorAll('.final-prototype-photo'));
const prevImageButton = document.querySelector('.prototype-prev-image');
const nextImageButton = document.querySelector('.prototype-next-image');

async function initializePrototypeSlider() {
    const singleImageWidth = await getImageWidth(finalPrototypeImages[0]);
    let currentImgIndex = 0;

    prevImageButton.addEventListener("click", () => {
        prevImageButton.disabled = true;
        finalPrototypeImagesContainer.style.transition = 'transform 0.5s ease-out';
        finalPrototypeImagesContainer.style.transform = `translateX(${singleImageWidth}px)`;
    });

    nextImageButton.addEventListener("click", () => {
        nextImageButton.disabled = true;
        finalPrototypeImagesContainer.style.transition = 'transform 0.5s ease-out';
        finalPrototypeImagesContainer.style.transform = `translateX(-${singleImageWidth}px)`;
    });

    finalPrototypeImagesContainer.addEventListener("transitionend", () => {
        finalPrototypeImagesContainer.appendChild(finalPrototypeImages[currentImgIndex]);
        finalPrototypeImagesContainer.style.transition = '';
        finalPrototypeImagesContainer.style.transform = '';
        prevImageButton.disabled = false;
        nextImageButton.disabled = false;
    });
}

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
