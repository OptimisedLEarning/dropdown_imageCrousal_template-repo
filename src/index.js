// Import CSS so Webpack includes it in the bundle
import "./styles.css";

import "./dropdown.js"; // <-- ADD THIS LINE to include your dropdown logic

import "./crousol.js"; // <-- ADD THIS LINE to include your carousel logic
// Log to console
console.log("Hello from Webpack!");

// Add something to the page
const heading = document.createElement("h2");
heading.textContent = "Webpack is working!";
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

// You might remove or keep the example code below, it's not part of the dropdown
function createHeading() {
  const element = document.createElement("h2");
  element.textContent = "JavaScript is bundled!";
  return element;
}
document.body.appendChild(createHeading());

// Add a footer to the page
const footer = document.createElement("footer");
footer.textContent = "This is the footer";
document.body.appendChild(footer);
