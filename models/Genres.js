export class Genres {
  genres = [];
  constructor() {
    this.genres = [];
  }

  async loadGenres(genres) {
    const url = `${process.env.BASE_URL}/genre/movie/list?api_key=${process.env.API_KEY}`;
    console.log("🚀 ~ Genres ~ loadGenres ~ process.env.BASE_URL:", process.env.BASE_URL)
    console.log("🚀 ~ Genres ~ loadGenres ~ process.env.API_KEY:", process.env.API_KEY)
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    await response.json().then((data) => {
      console.log(data);
      this.genres = data.genres;
    });
  }

  addGenre(genre) {
    this.genres.push(genre);
  }
  getGenres() {
    return this.genres;
  }
}
