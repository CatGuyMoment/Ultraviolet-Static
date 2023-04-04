"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});

function loadSplash() {
  fetch('splashes.json')
    .then(response => response.json())
    .then(data => {
      const splashes = data.splashes;
      const randomIndex = Math.floor(Math.random() * splashes.length);
      const splash = splashes[randomIndex];
      const desc = document.querySelector('.desc p');
      desc.textContent = splash;
    })
    .catch(error => {
      console.error('Failed to load splashes:', error);
    });
}

window.addEventListener('load', function() {
  loadSplash();
});
