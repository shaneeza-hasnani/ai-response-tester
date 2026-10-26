function generateResponse(question: string): string {
  if (question.trim() === "") {
    return "Please enter a question.";
  }

  return `You asked: ${question}`;
}

console.log(generateResponse("What is RAG?"));
console.log(generateResponse(""));