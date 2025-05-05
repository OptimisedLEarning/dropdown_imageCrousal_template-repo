// crousal.js

// --- State Management ---
let slideIndex = 1; // Tracks the current slide (1-based for humans)
const autoPlayInterval = 5000; // 5 seconds
let slideTimer; // Variable to hold the timer for auto-play

// --- Core Display Logic ---
function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides"); // Find all slides
  let dots = document.getElementsByClassName("dot"); // Find all dots

  // Handle wrapping around (last slide -> first, first -> last)
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides and deactivate all dots
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Show the correct slide and activate the correct dot
  // IMPORTANT: Use slideIndex - 1 because JS arrays are 0-based (0, 1, 2...)
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// --- Auto-play Functionality ---
function startAutoPlay() {
  clearInterval(slideTimer); // Clear any existing timer
  slideTimer = setInterval(() => {
    plusSlides(1); // Move to the next slide
  }, autoPlayInterval);
}

function stopAutoPlay() {
  // Call this if you want to pause auto-play (e.g., on hover)
  clearInterval(slideTimer);
}

// --- Navigation Functions ---
function plusSlides(n) {
  showSlides((slideIndex += n));
  startAutoPlay(); // Restart timer on user interaction (Optional but good UX)
}

function currentSlide(n) {
  showSlides((slideIndex = n));
  startAutoPlay(); // Restart timer on user interaction (Optional but good UX)
}

// --- INITIAL SETUP (Runs shortly after the script loads, before DOM is fully ready) ---
// This initial call is needed so the *first* slide is visible immediately.
// It doesn't need DOMContentLoaded because it's called *before* trying to add listeners.
// It just sets the state and calls showSlides once.
showSlides(slideIndex); // Show the first slide initially
startAutoPlay(); // Start the auto-play timer

// --- EVENT LISTENERS SETUP (Waits for HTML to be ready) ---
// This code MUST wait for the HTML elements (buttons, dots) to exist on the page.
document.addEventListener("DOMContentLoaded", () => {
  // --- Code to find Carousel elements and add listeners (Standard, Clean Way) ---
  // We find the elements using querySelector/querySelectorAll
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const dotContainer = document.querySelector(".dot-container"); // Assuming you add a container div around dots

  // We add click listeners using addEventListener (Better practice than onclick in HTML)
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      plusSlides(-1); // Call your navigation function
    });
  }
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      plusSlides(1); // Call your navigation function
    });
  }

  // Use event delegation for dots (more efficient)
  if (dotContainer) {
    dotContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("dot")) {
        // Find the index of the clicked dot relative to its siblings
        const dotIndex = Array.from(dotContainer.children).indexOf(
          event.target
        );
        currentSlide(dotIndex + 1); // Call your navigation function (use dotIndex + 1 for 1-based slideIndex)
      }
    });
  }
}); // End of DOMContentLoaded listener
