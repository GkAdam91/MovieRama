class MovieCard extends HTMLElement {
  constructor() {
    super();
  }

  hasBeenExpandedBefore = false;

  connectedCallback() {
    let id;
    if (this.hasAttribute("id")) {
      id = this.getAttribute("id");
    } else {
      throw new Error("Movie ID is required");
    }

    let isClickable;
    if (this.hasAttribute("clickable")) {
      isClickable = this.getAttribute("clickable");
    } else {
      isClickable = "true";
    }

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
      genre = "1, 2, 3";
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

    const posterPreloaderElement = document.createElement("div");
    posterPreloaderElement.setAttribute("class", "poster-preloader");
    wrapper.appendChild(posterPreloaderElement);

    const posterElement = document.createElement("img");
    posterElement.setAttribute("class", "poster");
    posterElement.src = `https://image.tmdb.org/t/p/original/${poster}?api_key=${API_KEY}`;
    posterPreloaderElement.appendChild(posterElement);

    const titleElement = document.createElement("h2");
    titleElement.setAttribute("class", "title");
    titleElement.innerHTML = title;
    wrapper.appendChild(titleElement);

    // card in list view details
    const detailsElement = document.createElement("div");
    detailsElement.setAttribute("class", "details");
    wrapper.appendChild(detailsElement);

    const detailsSecondRowElement = document.createElement("div");
    detailsSecondRowElement.setAttribute("class", "details-second-row");
    detailsElement.appendChild(detailsSecondRowElement);

    const yearElement = document.createElement("p");
    yearElement.setAttribute("class", "year");
    yearElement.innerHTML = year;
    detailsSecondRowElement.appendChild(yearElement);

    const ratingElement = document.createElement("p");
    ratingElement.setAttribute("class", "rating");
    ratingElement.innerHTML = `${rating}%`;
    detailsSecondRowElement.appendChild(ratingElement);

    // card enlarged details
    if (isClickable === "true") {
      const activeDetailsElement = document.createElement("div");
      activeDetailsElement.setAttribute("class", "active-details");
      wrapper.appendChild(activeDetailsElement);

      const titleElementDetails = document.createElement("h2");
      titleElementDetails.innerHTML = title;
      activeDetailsElement.appendChild(titleElementDetails);

      const detailsSecondRowElementDetails = document.createElement("div");
      detailsSecondRowElementDetails.setAttribute(
        "class",
        "details-second-row"
      );
      activeDetailsElement.appendChild(detailsSecondRowElementDetails);

      const yearElementDetails = document.createElement("p");
      yearElementDetails.setAttribute("class", "year");
      yearElementDetails.innerHTML = year;
      detailsSecondRowElementDetails.appendChild(yearElementDetails);

      const ratingElementDetails = document.createElement("p");
      ratingElementDetails.setAttribute("class", "rating");
      ratingElementDetails.innerHTML = `${rating}%`;
      detailsSecondRowElementDetails.appendChild(ratingElementDetails);
      activeDetailsElement.appendChild(titleElementDetails);
      activeDetailsElement.appendChild(detailsSecondRowElementDetails);

      const genreElement = document.createElement("p");
      genreElement.setAttribute("class", "genres");
      genreElement.innerHTML = "Genres: ";
      genre.split(",").forEach((genreId) => {
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
        posterPreloaderElement.classList.toggle("active");
        detailsElement.classList.toggle("active");
        activeDetailsElement.classList.toggle("active");
        titleElement.classList.toggle("active");
        if (!this.hasBeenExpandedBefore) {
          this.createVideoElement(id, activeDetailsElement);
          this.createReviewsElement(id, activeDetailsElement);
          this.createSimilarMoviesElement(id, activeDetailsElement);
        }
      });
    }
    const linkElement = document.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href", "components/MovieCard.css");

    shadow.appendChild(wrapper);

    shadow.appendChild(linkElement);
  }

  async createVideoElement(movieId, activeDetailsElement) {
    let link = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;
    let response = await fetch(link);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    await response.json().then((data) => {
      if (data.results.length > 0) {
        let videoKey = this.getFirstTrailerKey(data.results);
        let videoLink = `https://www.youtube.com/embed/${videoKey}`;
        let videoElement = document.createElement("iframe");
        videoElement.setAttribute("class", "video");
        videoElement.src = videoLink;
        activeDetailsElement.appendChild(videoElement);
        this.hasBeenExpandedBefore = true;
      }
    });
  }

  getFirstTrailerKey(results) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].type === "Trailer" && results[i].site === "YouTube") {
        return results[i].key;
      }
    }
  }

  async createReviewsElement(movieId, activeDetailsElement) {
    let link = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`;
    let response = await fetch(link);

    let reviewsElement = document.createElement("div");
    reviewsElement.setAttribute("class", "reviews");
    activeDetailsElement.appendChild(reviewsElement);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    await response.json().then((data) => {
      console.log(data.results);

      if (data.results.length >= 2) {
        for (let i = 0; i < 2; i++) {
          const reviewElement = this.createReviewElement(data.results[i]);
          reviewsElement.appendChild(reviewElement);
        }
      } else if (data.results.length === 1) {
        reviewsElement.appendChild(this.createReviewElement(data.results[0]));
      } else {
        activeDetailsElement.removeChild(reviewsElement);
      }
    });
  }

  createReviewElement(review) {
    const reviewElement = document.createElement("div");
    reviewElement.setAttribute("class", "review");

    const authorElement = document.createElement("p");
    authorElement.setAttribute("class", "author");
    authorElement.innerHTML = review.author;
    reviewElement.appendChild(authorElement);

    const contentElement = document.createElement("p");
    contentElement.setAttribute("class", "content");
    contentElement.innerHTML = review.content;
    reviewElement.appendChild(contentElement);
    return reviewElement;
  }

  async createSimilarMoviesElement(movieId, activeDetailsElement) {
    let link = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`;
    let response = await fetch(link);

    let similarMoviesElement = document.createElement("div");
    similarMoviesElement.setAttribute("class", "similar-movies");
    activeDetailsElement.appendChild(similarMoviesElement);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    await response.json().then((data) => {
      console.log(data.results);
      data.results.forEach((movie) => {
        const movieCard = document.createElement("movie-card");
        movieCard.setAttribute("id", movie.id);
        movieCard.setAttribute("title", movie.title);
        movieCard.setAttribute("clickable", "false");
        movieCard.setAttribute("year", movie.release_date.split("-")[0]);
        movieCard.setAttribute(
          "rating",
          (Math.round(movie.vote_average * 10) / 10) * 10
        );
        movieCard.setAttribute("poster", movie.poster_path);
        movieCard.classList.add("movie-card");

        similarMoviesElement.appendChild(movieCard);
      });
    });
  }
}

customElements.define("movie-card", MovieCard);
