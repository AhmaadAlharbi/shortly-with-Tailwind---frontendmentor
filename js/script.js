const url_input = document.querySelector("body > div > input");
const submitButton = document.getElementById("submit");
// const api_base = "https://api.shrtco.de/v2/shorten?url=kooora.com";
const api_base = "https://api.shrtco.de/v2/shorten?url=";
const linksDiv = document.getElementById("links");
const innerLinksDiv = document.getElementById("inner-links");
const error = document.getElementById("error");
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobile-nav");

//toggle mobile nav
burger.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});
//validation
const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

//eventlistner
submitButton.addEventListener("click", (e) => {
  console.log(isValidUrl(url_input.value));
  if (isValidUrl(url_input.value) === false) {
    error.classList.remove("hidden");
    url_input.classList.add("border-4", "border-red", "placeholder-red");
  } else {
    getUrl(api_base + url_input.value);
    error.classList.add("hidden");
    url_input.classList.remove("border-4", "border-red", "placeholder-red");
  }
});
const generateDiv = (url, short) => {
  const html = `<div
    class="link flex flex-col md:flex-row justify-between items-center bg-white py-4 px-6 rounded-sm"
  >
    <h4 class="">${url}</h4>
    <div class="flex flex-col md:flex-row items-center space-x-4">
      <p class="text-cyan">${short} </p>
      <button
      onclick="copyUrl('${short}')"
        class="bg-cyan btn2 text-white  py-2 px-6 rounded-md hover:opacity-80"
      >
        Copy
      </button>
    </div>
  </div>`;
  linksDiv.innerHTML += html;
};
// generateDiv("www.google.com", "go");
// generateDiv("www.google.com", "go");
const links = [];
const allEntries = [];
const getUrl = async (url) => {
  fetch(url);
  // .then((response) => response.json())
  // .then((data) => console.log(data.result.original_link));
  const response = await fetch(url);
  const data = await response.json();

  const newlinks = [
    {
      originalLink: data.result.original_link,
      shortLink: data.result.short_link,
    },
  ];

  links.push(newlinks);
  var savedLinks = JSON.parse(localStorage.getItem("links") || "[]");
  savedLinks.push(newlinks);
  localStorage.setItem("links", JSON.stringify(savedLinks));
  generateDiv(data.result.original_link, data.result.short_link);
  console.log(savedLinks);
  // console.log(links);
};

//check if localstorage not empty
const printStorage = () => {
  if (localStorage.length > 0) {
    const stored = JSON.parse(localStorage.getItem("links"));

    for (let i = 0; i < stored.length; i++) {
      generateDiv(stored[i][0].originalLink, stored[i][0].shortLink);
    }
  }
};
printStorage();
//copy
const copyUrl = (shortUrl) => {
  linksDiv.onclick = (e) => {
    if (e.target.classList.contains("btn2")) {
      e.target.innerHTML = "copied!";
      e.target.classList.add("bg-darkViolet");
      navigator.clipboard.writeText(shortUrl);
    }

    // console.log(e.target.tagName); // to get the element tag name alone
  };
};
