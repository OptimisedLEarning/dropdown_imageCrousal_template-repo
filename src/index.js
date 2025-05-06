// Import CSS so Webpack includes it in the bundle
import "./styles.css";

import "./dropdown.js"; // <-- ADD THIS LINE to include your dropdown logic

import "./crousol.js"; // <-- ADD THIS LINE to include your carousel logic

//import images from src folder
import img1 from "./img1.jpg";
import img2 from "./img2.jpeg";
import img3 from "./img3.jpg";

const images = [img1, img2, img3]; // Array of image paths

images.forEach((src, index) => {
  const imgElement = document.querySelector(`.slide${index + 1}`);
  // Select the image element for each slide
  if (imgElement) {
    // Check if the element exists
    imgElement.src = src;
    // Set the src attribute to the image path
  }
});

// Log to console
console.log("Hello from Webpack!");

// Add something to the page
const heading = document.createElement("h2");
heading.textContent = "$ITEACH$";
document.body.appendChild(heading);

// Get the <ul> inside .navbar
const navBar = document.querySelector(".navbar ul");

if (navBar) {
  // Create a <li> to hold the form
  const searchLi = document.createElement("li");
  searchLi.classList.add("search-form-item");

  // Create the form
  const form = document.createElement("form");
  form.classList.add("search-form");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search...";
  input.setAttribute("aria-label", "Search");

  const submitButton = document.createElement("button");
  submitButton.textContent = "Search";

  form.appendChild(input);
  form.appendChild(submitButton);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert(`You want to search this: ${input.value}`);
  });

  // Put form inside the <li> and add to <ul>
  searchLi.appendChild(form);
  navBar.appendChild(searchLi); // Add it after dropdown
}

// ... rest of your existing index.js code ...

// Add a footer to the page
const footer = document.createElement("footer");
footer.textContent = "Copyright © 2025 Akshya Kumar . All rights reserved .";
document.body.appendChild(footer);
