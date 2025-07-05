const questions = [
  {
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra"
  },
  {
    question: "Who discovered America?",
    options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "James Cook"],
    answer: "Christopher Columbus"
  },
  {
    question: "Fill in the blank: The Taj Mahal is located in ________.",
    type: "fill",
    answer: "Agra"
  },
  {
    question: "Who was the first Prime Minister of India?",
    options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Vallabhbhai Patel"],
    answer: "Jawaharlal Nehru"
  },
  {
    question: "In which year did India become independent?",
    options: ["1945", "1946", "1947", "1950"],
    answer: "1947"
  }
];

let currentIndex = 0;
let score = 0;
let selectedOption = null;

const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options");
const resultBox = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

function showQuestion() {
  resultBox.textContent = "";
  nextBtn.disabled = true;
  selectedOption = null;

  const current = questions[currentIndex];
  questionBox.textContent = current.question;
  optionsBox.innerHTML = "";

  if (current.type === "fill") {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type your answer here";
    input.style.padding = "0.5rem";
    input.style.width = "80%";
    input.oninput = () => {
      nextBtn.disabled = false;
    };
    optionsBox.appendChild(input);
  } else {
    current.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "option";
      button.textContent = `${index + 1}) ${option}`;
      button.onclick = () => {
        document.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedOption = option;
        nextBtn.disabled = false;
      };
      optionsBox.appendChild(button);
    });
  }
}

function nextQuestion() {
  const current = questions[currentIndex];
  if (current.type === "fill") {
    const input = optionsBox.querySelector("input");
    if (input.value.trim().toLowerCase() === current.answer.toLowerCase()) {
      score++;
    }
  } else {
    if (selectedOption === current.answer) {
      score++;
    }
  }

  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionBox.textContent = "Quiz Completed!";
  optionsBox.innerHTML = "";
  nextBtn.style.display = "none";
  resultBox.textContent = `Your Score: ${score} / ${questions.length}`;
}

showQuestion();