export class Comment {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }

  isValid() {
    return this.text.trim().length > 0;
  }
}