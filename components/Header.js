import css from "bundle-text:./Header.css";

class HeaderElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    
    const h1 = document.createElement("h1");
    h1.textContent = "MovieRama";
    shadow.appendChild(h1);

    const search = document.createElement("input");
    search.className = "search";
    search.setAttribute("placeholder", "Search for a movie...");
    search.setAttribute("type", "text");
    search.setAttribute("id", "search");
    shadow.appendChild(search);

    const linkElement = document.createElement("style");
    linkElement.textContent = css;
    shadow.appendChild(linkElement);
  }
}

customElements.define("header-element", HeaderElement);
