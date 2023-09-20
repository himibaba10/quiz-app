const defaultQuizzes = [
  {
    title: "Which is the largest animal in the world?",
    options: [
      { value: "Shark", answer: true },
      { value: "Blue Whale" },
      { value: "Jiraffe" },
      { value: "Elefant" },
    ],
  },
  {
    title: "Which is most popular programming language?",
    options: [
      { value: "Python" },
      { value: "PHP" },
      { value: "JavaScript", answer: true },
      { value: "C++" },
    ],
  },
  {
    title: "Who is the founder of JavaScript?",
    options: [
      { value: "Bill Gates" },
      { value: "Steve Jobs" },
      { value: "Mark Zuckerberg" },
      { value: "Sir Brendan Eich", answer: true },
    ],
  },
];

const quizzes = defaultQuizzes.map((quizzes) => {
  let quizzesWithFalseOption = quizzes.options.map((option) => {
    option.answer == undefined && (option.answer = false);
    return option;
  });
  return { title: quizzes.title, options: quizzesWithFalseOption };
});

let quizTitle = document.getElementById("quiz-title");
let quizOptionsContainer = document.querySelector(".quiz-options");
let submitButton = document.getElementById("submit-btn");
let playButton = document.getElementById("play-btn");
let quizResult = 0;

let quizIndex = 0;
function showQuiz(quizNumber) {
  const { title, options } = quizzes[quizNumber];
  //   Setting quiz title
  quizTitle.innerHTML = title;

  //   Setting quiz options
  let currentQuizOptions = "";
  options.forEach((option, index) => {
    currentQuizOptions += `
    <label for=${index}>
        <input type="radio" name=${title} id=${index} value=${option.value} onClick="selectQuiz(this, ${option.answer})"/>
        <span>${option.value}</span>
    </label>
    `;
    quizOptionsContainer.innerHTML = currentQuizOptions;
  });
}
showQuiz(quizIndex);

function selectQuiz(selectedQuiz, istrue) {
  const siblings = document.querySelectorAll(".quiz-options > label");

  // Getting the index of the true answer
  const trueValueIndex = quizzes[quizIndex].options
    .map((option, index) => option.answer && index)
    .filter((value) => value !== false)
    .join();

  const selectedQuizLabel = selectedQuiz.parentNode;

  // If the selected quiz is true, its background will be green
  if (istrue) {
    selectedQuizLabel.classList.add(istrue);
    quizResult++;
  }
  // If the selected quiz is false, its background will be red and the actual true value will be green
  else {
    siblings[trueValueIndex].classList.add("true");
    selectedQuizLabel.classList.add("false");
  }

  quizOptionsContainer.style.pointerEvents = "none";
}

// Click Next button to go to the next quiz
submitButton.onclick = () => {
  quizOptionsContainer.style.pointerEvents = "auto";
  quizIndex++;
  quizIndex < quizzes.length && showQuiz(quizIndex);

  // change button name to Submit when the last question appears
  quizIndex === quizzes.length - 1 && (submitButton.innerText = "Submit");

  // Show the quiz result after answering all the question
  if (quizIndex === quizzes.length) {
    document.getElementById("quiz-result").innerHTML = `
      <div>You got ${quizResult} out of ${quizzes.length}</div>
    `;

    // Only show the result and Play Again button, and hides the other info
    quizOptionsContainer.innerHTML = "";
    quizTitle.innerHTML = "";
    playButton.style.display = "block";
    submitButton.style.display = "none";
  }
};

// Click the play button to start again
playButton.onclick = () => {
  (quizIndex = 0),
    (quizResult = 0),
    (document.getElementById("quiz-result").innerHTML = "");
  showQuiz(0);
  playButton.style.display = "none";
  submitButton.style.display = "block";
  submitButton.innerText = "Next";
};
