export class StudySpot {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.comments = [];
  }

  addComment(comment) {
    this.comments.push(comment);
  }
}