// import css from "bundle-text:./styles.css";

const app = document.querySelector("#app");
const shadow = app.attachShadow({ mode: "open" });

const headerElement = document.createElement("header-element");
headerElement.setAttribute("class", "header");
const linkElement = document.createElement("style");
linkElement.textContent = `
.header {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 5;
  width: 100%;
  padding: 5px 20px;
  height: 5%;
  top: 0;
}`;
headerElement.appendChild(linkElement);
shadow.appendChild(headerElement);

const mainApp = document.createElement("div");
mainApp.setAttribute("class", "main-app");
const mainAppCSS = document.createElement("style");
mainAppCSS.textContent = `
.main-app {
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  top: 50px;
  justify-content: center;
  position: relative;
  padding: 20px;
}`;
mainApp.appendChild(mainAppCSS);
shadow.appendChild(mainApp);

const movieListElement = document.createElement("movie-list");
movieListElement.setAttribute("id", "movie-list");
mainApp.appendChild(movieListElement);

// const footerElement = document.createElement("footer-element");
// footerElement.setAttribute("class", "footer");
// shadow.appendChild(footerElement);

customElements.whenDefined("movie-list").then(() => {
  customElements.whenDefined("header-element").then(() => {
    const list = mainApp.querySelector("#movie-list");
    const searchElement = headerElement.shadowRoot.querySelector("#search");
    console.log(headerElement.children);
    searchElement.addEventListener("input", (event) => {
      list.showMovieListForSearch(event.target.value);
    });
  });
});
