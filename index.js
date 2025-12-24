// index.js

// Utility: create element with optional attrs + text
function createElement(tag, attrs = {}, text = "") {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  if (text) el.textContent = text;
  return el;
}

function showError(message) {
  const errorDiv = document.getElementById("error-message");
  if (!errorDiv) return;
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

function clearError() {
  const errorDiv = document.getElementById("error-message");
  if (!errorDiv) return;
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}

//  REQUIRED BY TEST: addElementToDOM('dynamic-content', 'Hello, World!')
function addElementToDOM(containerId, text) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Put text into a new element so tests can see it in container.textContent
  const p = createElement("p", {}, text);
  container.appendChild(p);
}

//  REQUIRED BY TEST: removeElementFromDOM('test-element')
function removeElementFromDOM(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.remove();
}

// REQUIRED BY TEST: simulateClick('dynamic-content', 'Button Clicked!')
function simulateClick(containerId, text) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // update container content directly or append - either works
  container.textContent = text;
}

//  REQUIRED BY TEST: handleFormSubmit('user-form', 'dynamic-content')
function handleFormSubmit(formId, containerId) {
  const form = document.getElementById(formId);
  const container = document.getElementById(containerId);
  const input = document.getElementById("user-input");

  if (!form || !container || !input) return;

  const value = (input.value || "").trim();

  if (!value) {
    showError("Input cannot be empty"); // MUST match test exactly
    return;
  }

  clearError();

  // Put submitted input into DOM
  const p = createElement("p", {}, value);
  container.appendChild(p);

  // Optional: clear input
  input.value = "";
}

// Wire up actual UI behavior (good practice, won’t break tests)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("simulate-click");
  const form = document.getElementById("user-form");

  if (btn) {
    btn.addEventListener("click", () => simulateClick("dynamic-content", "Button Clicked!"));
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFormSubmit("user-form", "dynamic-content");
    });
  }
});

//  Export for Jest tests
module.exports = {
  createElement,
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
};
