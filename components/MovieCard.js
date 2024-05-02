class MovieCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let title;
    if (this.hasAttribute("title")) {
      title = this.getAttribute("title");
    } else {
      title = "Default Title";
    }
    let year;
    if (this.hasAttribute("year")) {
      year = this.getAttribute("year");
    } else {
      year = "1921";
    }

    let genre;
    if (this.hasAttribute("genre")) {
      genre = this.getAttribute("genre");
    } else {
      genre = "Default Genre";
    }

    let rating;
    if (this.hasAttribute("rating")) {
      rating = this.getAttribute("rating");
    } else {
      rating = "0";
    }

    let overview;
    if (this.hasAttribute("overview")) {
      overview = this.getAttribute("overview");
    } else {
      overview = "Default Overview";
    }

    let poster;
    if (this.hasAttribute("poster")) {
      poster = this.getAttribute("poster");
    }
    else {
      poster = "https://via.placeholder.com/300";
    }

    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("card");
    wrapper.setAttribute("class", "card");

    const posterElement = document.createElement("img");
    posterElement.setAttribute("class", "poster");
    posterElement.src = poster;
    wrapper.appendChild(posterElement);

    
    const detailsElement = document.createElement("div");
    detailsElement.setAttribute("class", "details");
    wrapper.appendChild(detailsElement);
    
    const titleElement = document.createElement("h2");
    titleElement.innerHTML = title;
    detailsElement.appendChild(titleElement);
    
    const detailsSecondRowElement = document.createElement("div");
    detailsSecondRowElement.setAttribute("class", "details-second-row");
    detailsElement.appendChild(detailsSecondRowElement);
    
    const yearElement = document.createElement("p");
    yearElement.setAttribute("class", "year");
    yearElement.innerHTML = year;
    detailsSecondRowElement.appendChild(yearElement);

    const ratingElement = document.createElement("p");
    ratingElement.setAttribute("class", "rating");
    ratingElement.innerHTML = rating;
    detailsSecondRowElement.appendChild(ratingElement);

    const linkElement = document.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href", "components/MovieCard.css");

    shadow.appendChild(wrapper);

    shadow.appendChild(linkElement);
  }
}

customElements.define("movie-card", MovieCard);
