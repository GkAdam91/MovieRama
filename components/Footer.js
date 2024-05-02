class FooterElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    const footer = document.createElement("footer");
    footer.setAttribute("class", "footer");

    const p = document.createElement("p");
    p.textContent = "Footer";
    p.setAttribute("class", "footer-text");
    footer.appendChild(p);
    shadow.appendChild(footer);

    const linkElement = document.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href", "components/Footer.css");
    shadow.appendChild(linkElement);
  }
}

customElements.define("footer-element", FooterElement);
