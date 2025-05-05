let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Add this code below the function definitions in crousal.js

// --- Auto-play functionality ---
const autoPlayInterval = 5000; // 5000 milliseconds = 5 seconds
let slideTimer; // Variable to hold the timer

// Function to start the auto-play timer
function startAutoPlay() {
  // Clear any existing timer first
  clearInterval(slideTimer);
  // Set a new interval timer
  slideTimer = setInterval(() => {
    plusSlides(1); // Move to the next slide every interval
  }, autoPlayInterval);
}

// Function to stop the auto-play timer (e.g., when user interacts)
function stopAutoPlay() {
  clearInterval(slideTimer);
}

// Restart the timer if user clicks controls (optional but good UX)
// You'd modify your plusSlides and currentSlide functions to call startAutoPlay() at the end
// Or add click listeners to the arrows/dots in JS instead of onclick

// --- Update the initial setup ---

showSlides(slideIndex); // Show the first slide initially
startAutoPlay(); // <-- Start the auto-play when the script loads

// --- If using addEventListener, add code here to find arrows/dots and add listeners, AND call startAutoPlay ---
/*
document.addEventListener('DOMContentLoaded', () => {
    // Code to find arrows and dots using querySelectorAll

    // Add click listeners using .addEventListener that call plusSlides or currentSlide
    // And maybe call startAutoPlay() at the end of those listeners
});
*/

document.addEventListener("DOMContentLoaded", () => {
  // Your existing listener

  // ... your existing toggleDropdown function and setup for dropdowns ...

  // --- Code to find Carousel elements and add listeners (REPLACE ONCLICK in HTML) ---
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const dotContainer = document.querySelector(".dot-container"); // Assuming you wrap dots in a container with this class

  // Add click listeners using addEventListener
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      plusSlides(-1);
      startAutoPlay(); // Restart timer on user interaction (optional UX)
    });
  }
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      plusSlides(1);
      startAutoPlay(); // Restart timer on user interaction (optional UX)
    });
  }

  // Use event delegation for dots (more efficient if you have many)
  if (dotContainer) {
    dotContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("dot")) {
        // Find the index of the clicked dot
        const dotIndex = Array.from(dotContainer.children).indexOf(
          event.target
        );
        currentSlide(dotIndex + 1); // Call currentSlide with 1-based index
        startAutoPlay(); // Restart timer on user interaction (optional UX)
      }
    });
  }

  // --- Call initial setup and start auto-play here AFTER finding elements ---
  let slideIndex = 1;
  showSlides(slideIndex);
  startAutoPlay(); // Start the timer
}); // End of DOMContentLoaded listener
