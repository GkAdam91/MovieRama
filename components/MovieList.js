class MovieList extends HTMLElement {
  static observedAttributes = ["fetching"];
  shadow;
  spinner;
  movieListElement;
  currentPage = 1;
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.movieListElement = document.createElement("div");
    this.movieListElement.setAttribute("class", "movie-list");
    this.shadow.appendChild(this.movieListElement);
    this.spinner = document.createElement("custom-spinner");
    this.shadow.appendChild(this.spinner);

    const linkElement = document.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href", "components/MovieList.css");
    this.shadow.appendChild(linkElement);
  }

  fetching = true;
  loading = true;
  connectedCallback() {
    console.log("Connected");
    let now_playing = true;
    if (this.hasAttribute("now_playing")) {
      now_playing = this.getAttribute("now_playing");
    }

    if (now_playing) {
      this.loadMovies();
    }

    addEventListener(
      "scroll",
      () => {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;

        if (
          scrollTop + clientHeight >= scrollHeight - 5 &&
          this.loading === false
        ) {
          this.currentPage++;
          console.log("Loading more movies...");
          this.loadMovies(this.currentPage);
        }
      },
      {
        passive: true,
      }
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }

  async fetchNowPlayingMovies(page = 1) {
    const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}&sort_by=vote_average`;

    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async loadMovies(page = 1) {
    // use this boolean to limit one request at a time
    this.loading = true;

    this.showSpinner();
    try {
      const response = await this.fetchNowPlayingMovies(page);
      this.showMovieList(response.results);
    } catch (error) {
      console.error(`Something wen wrong with fetching movies ${error}`);
    } finally {
      this.hideSpinner();
      this.loading = false;
    }
  }

  showMovieList(movieList) {
    movieList.forEach((movie) => {
      // console.log(movie);
      const movieCard = document.createElement("movie-card");
      movieCard.setAttribute("title", movie.title);
      movieCard.setAttribute("year", movie.release_date);
      movieCard.setAttribute("genre_ids", movie.genre_ids);
      movieCard.setAttribute("rating", movie.vote_average);
      movieCard.setAttribute("overview", movie.overview);
      movieCard.setAttribute(
        "poster",
        `https://image.tmdb.org/t/p/original/${movie.poster_path}?api_key=${API_KEY}`
      );
      this.movieListElement.appendChild(movieCard);
    });
  }

  showSpinner() {
    this.spinner.style.display = "block";
  }

  hideSpinner() {
    this.spinner.style.display = "none";
  }
}

customElements.define("movie-list", MovieList);
