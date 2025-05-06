// Import CSS so Webpack includes it in the bundle
import "./styles.css";

import "./dropdown.js"; // <-- ADD THIS LINE to include your dropdown logic

import "./crousol.js"; // <-- ADD THIS LINE to include your carousel logic

//import images from src folder
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
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

// Add a form to the page
const form = document.createElement("form");
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Type something...";
const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
form.appendChild(input);
form.appendChild(submitButton);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  alert(`You typed: ${input.value}`);
});
document.body.appendChild(form);

// ... rest of your existing index.js code ...

// Add a footer to the page
const footer = document.createElement("footer");
footer.textContent = "Copyright © 2025 Akshya Kumar . All rights reserved .";
document.body.appendChild(footer);
