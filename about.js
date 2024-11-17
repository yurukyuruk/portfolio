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

function toggleId() {
    const element = document.querySelector("body");
    if (element.hasAttribute("id")) {
      element.removeAttribute("id");
    } else {
      element.setAttribute("id", "body-hidden");
    }
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