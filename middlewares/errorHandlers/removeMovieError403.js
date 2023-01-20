class RemoveMovieError403 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = RemoveMovieError403;
