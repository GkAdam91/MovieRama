class HeaderElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    const header = document.createElement("header");    
    header.setAttribute("class", "header");
    
    const h1 = document.createElement("h1");
    h1.textContent = "MovieRama";
    header.appendChild(h1);
    shadow.appendChild(header);

    const linkElement = document.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href", "components/Header.css");
    shadow.appendChild(linkElement);
  }
}

customElements.define("header-element", HeaderElement);
