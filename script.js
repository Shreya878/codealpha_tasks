const vocabulary = [
  { word: "Hello", translation: "Hola" },
  { word: "Thank you", translation: "Gracias" },
  { word: "Goodbye", translation: "Adiós" },
];

const grammar = [
  { word: "I am", translation: "Yo soy" },
  { word: "You are", translation: "Tú eres" },
  { word: "He is", translation: "Él es" },
];

let currentCategory = "vocabulary";
let currentIndex = -1;

const wordEl = document.getElementById("word");
const translationEl = document.getElementById("translation");
const nextBtn = document.getElementById("next-btn");
const speakBtn = document.getElementById("speak-btn");
const categorySelect = document.getElementById("category-select");

const quizBtn = document.getElementById("quiz-btn");
const quizSection = document.getElementById("quiz-section");
const quizQuestion = document.getElementById("quiz-question");
const quizAnswer = document.getElementById("quiz-answer");
const submitAnswer = document.getElementById("submit-answer");
const quizFeedback = document.getElementById("quiz-feedback");

function getData() {
  return currentCategory === "vocabulary" ? vocabulary : grammar;
}

function nextCard() {
  const data = getData();
  currentIndex = (currentIndex + 1) % data.length;
  const current = data[currentIndex];
  wordEl.textContent = current.word;
  translationEl.textContent = current.translation;
  quizSection.classList.add("hidden");
}

nextBtn.onclick = nextCard;

categorySelect.onchange = () => {
  currentCategory = categorySelect.value;
  currentIndex = -1;
  nextCard();
};

speakBtn.onclick = () => {
  const utter = new SpeechSynthesisUtterance(wordEl.textContent);
  utter.lang = "en-US"; // Change based on language
  speechSynthesis.speak(utter);
};

quizBtn.onclick = () => {
  const data = getData();
  const random = data[Math.floor(Math.random() * data.length)];
  quizQuestion.textContent = `Translate: ${random.word}`;
  quizQuestion.dataset.correct = random.translation.toLowerCase();
  quizAnswer.value = "";
  quizFeedback.textContent = "";
  quizSection.classList.remove("hidden");
};

submitAnswer.onclick = () => {
  const userAnswer = quizAnswer.value.trim().toLowerCase();
  const correctAnswer = quizQuestion.dataset.correct;
  if (userAnswer === correctAnswer) {
    quizFeedback.textContent = "✅ Correct!";
    quizFeedback.style.color = "green";
  } else {
    quizFeedback.textContent = `❌ Incorrect. Correct answer: ${correctAnswer}`;
    quizFeedback.style.color = "red";
  }
};

// Load first card on start
nextCard();
