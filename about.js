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