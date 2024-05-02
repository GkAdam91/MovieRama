class Spinner extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"});
        const spinner = document.createElement("div");
        spinner.setAttribute("class", "spinner");

        spinner.innerHTML = `Spinning...`;

        shadow.appendChild(spinner);
    }
}

customElements.define("custom-spinner", Spinner);
