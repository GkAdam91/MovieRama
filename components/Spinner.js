class Spinner extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"});
        const spinner = document.createElement("div");
        spinner.setAttribute("class", "spinner");

        spinner.innerHTML = `Spinning... <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="spinner" />`;
        
        shadow.appendChild(spinner);
    }
}

customElements.define("custom-spinner", Spinner);
