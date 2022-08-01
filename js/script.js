const url_input = document.querySelector("body > div > input");
const submitButton = document.getElementById("submit");
// const api_base = "https://api.shrtco.de/v2/shorten?url=kooora.com";
const api_base = "https://api.shrtco.de/v2/shorten?url=";
const linksDiv = document.getElementById("links");
const innerLinksDiv = document.getElementById("inner-links");
//eventlistner
submitButton.addEventListener("click", (e) => {
  getUrl(api_base + url_input.value);
});

const generateDiv = (url, short) => {
  const html = `<div
    class="link flex justify-between items-center bg-white py-4 px-6 rounded-sm"
  >
    <h4>${url}</h4>
    <div class="flex items-center space-x-4">
      <a href="${url}" class="text-cyan text-2xl">${short} </a>
      <button
        class="bg-cyan text-white py-2 px-6 rounded-md hover:opacity-80"
      >
        Copy
      </button>
    </div>
  </div>`;
  linksDiv.innerHTML += html;
};
// generateDiv("www.google.com", "go");
// generateDiv("www.google.com", "go");
const getUrl = async (url) => {
  fetch(url);
  // .then((response) => response.json())
  // .then((data) => console.log(data.result.original_link));
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.result.original_link);
  generateDiv(data.result.original_link, data.result.short_link);
};
// getUrl("https://api.shrtco.de/v2/shorten?url=kooora.com");
