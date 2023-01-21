class ConflictError11000 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 11000;
  }
}

module.exports = ConflictError11000;
