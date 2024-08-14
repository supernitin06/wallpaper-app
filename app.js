const accesskey = "3mUeoXMH61lxYWQN0-DOxzEG0Zv1n2VKzQtowo_-vic";
const form1 = document.querySelector("form");
const input1 = document.querySelector("#searching");
const searchResults = document.querySelector(".searchs");
const show = document.getElementById('showmore');

let input = "";
let page = 1;

async function searchImages() {
  input = input1.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${accesskey}`;
  const res = await fetch(url);
  const data = await res.json();
  const result = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  result.map((result) => {
    const imagew = document.createElement("div");
    imagew.classList.add("search");

   

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    image.onload = () => {
      image.classList.add("loaded");
      loading.style.display = "none";
    };

    const newly = document.createElement("a");
    newly.setAttribute("href", result.links.html);
    newly.target = "_blank";
    newly.textContent = result.alt_description;

    imagew.appendChild(image);
    imagew.appendChild(newly);
    searchResults.appendChild(imagew);
  });

  page++;
  if (page > 1) {
    show.style.display = "block";
  }
}

form1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

show.addEventListener("click", () => {
  searchImages();
});
