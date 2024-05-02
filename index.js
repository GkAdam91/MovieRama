const API_KEY = 'STRING_TO_REPLACE_THE_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';



const movieList = [];


const app = document.querySelector("#app");
const shadow = app.attachShadow({ mode: "open" });

const span = document.createElement("span");
span.textContent = "Now playing movies";

const movieListElement = document.createElement("movie-list");
movieListElement.setAttribute("movies", JSON.stringify(movieList));

shadow.appendChild(span);
shadow.appendChild(movieListElement);