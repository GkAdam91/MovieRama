class MovieList extends HTMLElement {
  static observedAttributes = ["fetching"];
  shadow;
  spinner;
  movieListElement;
  currentPage = 1;
  genres;
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
  async connectedCallback() {
    const genreClass = new Genres();
    await genreClass.loadGenres();
    this.genres = genreClass.getGenres();
    console.log(this.genres);

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
      const movieCard = document.createElement("movie-card");
      movieCard.setAttribute("id", movie.id);
      movieCard.setAttribute("title", movie.title);
      movieCard.setAttribute("year", movie.release_date);
      movieCard.setAttribute("genre_ids", this.getGenreNames(movie.genre_ids));
      movieCard.setAttribute(
        "rating",
        (Math.round(movie.vote_average * 10) / 10) * 10
      );
      movieCard.setAttribute("overview", movie.overview);
      movieCard.setAttribute("loadingTrailer", false);
      movieCard.setAttribute(
        "poster",
        `https://image.tmdb.org/t/p/original/${movie.poster_path}?api_key=${API_KEY}`
      );
      this.movieListElement.appendChild(movieCard);
    });
    const movieCards = this.movieListElement.querySelectorAll("movie-card");
    movieCards.forEach((movieCard) => {
      movieCard.setAttribute("title", "true");
    });
  }

  showSpinner() {
    this.spinner.style.display = "block";
  }

  hideSpinner() {
    this.spinner.style.display = "none";
  }

  getGenreNames(genre_ids) {
    let genreNames = [];
    genre_ids.forEach((genre_id) => {
      const genre = this.genres.find((genre) => genre.id === genre_id);
      genreNames.push(genre.name);
    });
    return genreNames;
  }
}

customElements.define("movie-list", MovieList);
