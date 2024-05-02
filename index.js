const API_KEY = 'STRING_TO_REPLACE_THE_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';



const movieList = [];


const app = document.querySelector("#app");
const shadow = app.attachShadow({ mode: "open" });


const headerElement = document.createElement("header-element");
headerElement.setAttribute("class", "header");
shadow.appendChild(headerElement);

const mainApp = document.createElement("div");
mainApp.setAttribute("class", "main-app");
shadow.appendChild(mainApp);

const movieListElement = document.createElement("movie-list");
movieListElement.setAttribute("movies", JSON.stringify(movieList));
mainApp.appendChild(movieListElement);

const footerElement = document.createElement("footer-element");
footerElement.setAttribute("class", "footer");
shadow.appendChild(footerElement);

const linkElement = document.createElement("link");
linkElement.setAttribute("rel", "stylesheet");
linkElement.setAttribute("href", "styles.css");
shadow.appendChild(linkElement);

