import css from "bundle-text:./MovieList.css";
import DOMPurify from "dompurify";
import { Genres } from "../models/Genres";
class MovieList extends HTMLElement {
  static observedAttributes = ["fetching"];
  shadow;
  spinner;
  movieListElement;
  currentPage = 1;
  genres;
  searchTerm = "";
  constructor() {
    super();
    console.log("MovieList constructor");
    this.shadow = this.attachShadow({ mode: "open" });
    this.movieListElement = document.createElement("div");
    this.movieListElement.setAttribute("class", "movie-list");
    this.shadow.appendChild(this.movieListElement);
    this.spinner = document.createElement("custom-spinner");
    this.shadow.appendChild(this.spinner);

    const linkElement = document.createElement("style");
    linkElement.textContent = css;
    this.movieListElement.appendChild(linkElement);
  }

  showMovieListForSearch(searchTerm) {
    this.clearMovieList();

    this.loadMovies(1, searchTerm);
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
          this.loadMovies(this.currentPage, this.searchTerm);
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

  async fetchMovies(page = 1, searchTerm = "") {
    let url;
    if (searchTerm !== "") {
      url = `${process.env.BASE_URL}/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&page=${page}`;
    } else {
      url = `${process.env.BASE_URL}/movie/now_playing?api_key=${process.env.API_KEY}&page=${page}&sort_by=vote_average`;
    }
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async loadMovies(page = 1, searchTerm = "") {
    // use this boolean to limit one request at a time
    this.loading = true;
    this.showSpinner();
    try {
      const response = await this.fetchMovies(page, searchTerm);
      console.log(response);

      this.showMovieList(response.results);
    } catch (error) {
      console.error(`Something wen wrong with fetching movies ${error}`);
    } finally {
      this.hideSpinner();
      this.loading = false;
    }
  }

  clearMovieList() {
    this.movieListElement.innerHTML = DOMPurify.sanitize("");
  }

  showMovieList(movieList) {
    movieList.forEach((movie) => {
      const movieCard = document.createElement("movie-card");
      movieCard.setAttribute("id", movie.id);
      movieCard.setAttribute("title", movie.title);
      movieCard.setAttribute("year", movie.release_date.split("-")[0]);
      movieCard.setAttribute("genre_ids", this.getGenreNames(movie.genre_ids));
      movieCard.setAttribute(
        "rating",
        (Math.round(movie.vote_average * 10) / 10) * 10
      );
      movieCard.setAttribute("overview", movie.overview);
      movieCard.setAttribute("loadingTrailer", false);
      movieCard.setAttribute("poster", movie.poster_path);
      movieCard.classList.add("movie-card");
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
