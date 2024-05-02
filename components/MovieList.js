class MovieList extends HTMLElement {
  static observedAttributes = ["fetching"];
  shadow;
  spinner;
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.spinner = document.createElement("custom-spinner");
    this.shadow.appendChild(this.spinner);
  }

  fetching = true;

  fetchNowPlayingMovies() {
    const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`;

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.showMovieList(data.results);
        return data;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      })
      .finally(() => {
        this.fetching = false;
        this.spinner.setAttribute("hidden", true);
      });
  }

  connectedCallback() {
    let now_playing = true;
    if (this.hasAttribute("now_playing")) {
      now_playing = this.getAttribute("now_playing");
    }

    if (now_playing) {
      this.fetchNowPlayingMovies();
    }

    console.log(this);

    if (this.hasAttribute("movies")) console.log(this.getAttribute("movies"));
    else {
      console.error("You need to provide a movies attribute");
    }

    const shadow = this.attachShadow({ mode: "open" });

    console.log(this.fetching);
    if (this.fetching) {
      //   const spinner = document.createElement("custom-spinner");
      //   shadow.appendChild(spinner);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }

  showMovieList = (movieList) => {
    const movieListElement = document.createElement("div");
    movieListElement.setAttribute("class", "movie-list");

    movieList.forEach((movie) => {
      const movieCard = document.createElement("movie-card");
      movieCard.setAttribute("title", movie.title);
      movieCard.setAttribute("year", movie.release_date);
      movieCard.setAttribute("genre", movie.genre);
      movieCard.setAttribute("rating", movie.vote_average);
      movieCard.setAttribute("overview", movie.overview);
      movieCard.setAttribute("poster", `https://image.tmdb.org/t/p/original/${movie.poster_path}?api_key=${API_KEY}`);
      movieListElement.appendChild(movieCard);
    });

    this.shadow.appendChild(movieListElement);
  };
}

customElements.define("movie-list", MovieList);
