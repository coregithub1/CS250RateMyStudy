export class Comment {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.rating = rating;
  }

  setRating(value) {
    this.rating = value;
  }

  isValid() {
    return (
      Number.isInteger(this.rating) &&
      this.rating >= 1 &&
      this.rating <= 5 &&
      this.text.trim().length > 0
    );
  }
}