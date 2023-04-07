function Question({
  id, text, answer, correctAnswer, finishedAt
  }) {
  this.id = id;
  this.text = text;
  this.answer = answer;
  this.correctAnswer = correctAnswer;
  this.finishedAt = finishedAt;
  this.numWords = text.trim().split(/\s+/).length;
  this.space = "_".repeat(this.numWords - 1);
  }
  
  export default Question;
