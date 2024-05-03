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
    if (this.hasAttribute("genre_ids")) {
      genre = this.getAttribute("genre_ids");
    } else {
      genre = ["1", "2", "3"];
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
    } else {
      poster = "https://via.placeholder.com/300";
    }

    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("card");
    wrapper.setAttribute("class", "card");

    const posterElement = document.createElement("img");
    posterElement.setAttribute("class", "poster");
    posterElement.src = poster;
    wrapper.appendChild(posterElement);

    // card in list view details
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

    // card enlarged details
    const activeDetailsElement = document.createElement("div");
    activeDetailsElement.setAttribute("class", "active-details");
    wrapper.appendChild(activeDetailsElement);

    const titleElementDetails = document.createElement("h2");
    titleElementDetails.innerHTML = title;
    activeDetailsElement.appendChild(titleElementDetails);

    const detailsSecondRowElementDetails = document.createElement("div");
    detailsSecondRowElementDetails.setAttribute("class", "details-second-row");
    activeDetailsElement.appendChild(detailsSecondRowElementDetails);

    const yearElementDetails = document.createElement("p");
    yearElementDetails.setAttribute("class", "year");
    yearElementDetails.innerHTML = year;
    detailsSecondRowElementDetails.appendChild(yearElementDetails);

    const ratingElementDetails = document.createElement("p");
    ratingElementDetails.setAttribute("class", "rating");
    ratingElementDetails.innerHTML = rating;
    detailsSecondRowElementDetails.appendChild(ratingElementDetails);
    activeDetailsElement.appendChild(titleElementDetails);
    activeDetailsElement.appendChild(detailsSecondRowElementDetails);

    const genreElement = document.createElement("p");
    genreElement.setAttribute("class", "genres");
    genreElement.innerHTML = "Genres: ";
    genre.split(",").forEach((genreId) => {
      // const genreName = genres.find((genre) => genre.id === genreId).name;
      // genreElement.innerHTML += genreName + " ";
      const genreTagElement = document.createElement("span");
      genreTagElement.setAttribute("class", "genre-tag");
      genreTagElement.innerHTML = genreId;
      genreElement.appendChild(genreTagElement);
    });
    activeDetailsElement.appendChild(genreElement);

    const overviewElement = document.createElement("p");
    overviewElement.setAttribute("class", "overview");
    overviewElement.innerHTML = overview;
    activeDetailsElement.appendChild(overviewElement);

    wrapper.addEventListener("click", () => {
      wrapper.classList.toggle("active");
      posterElement.classList.toggle("active");
      detailsElement.classList.toggle("active");
      activeDetailsElement.classList.toggle("active");
    });

    const linkElement = document.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href", "components/MovieCard.css");

    shadow.appendChild(wrapper);

    shadow.appendChild(linkElement);
  }
}

customElements.define("movie-card", MovieCard);
