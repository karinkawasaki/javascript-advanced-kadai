// script.js
const allQuizzes = [
  
  {
    question: 'He scored a hat-_____.',
    choices: ['A. trick', 'B. kick', 'C. block'],
    correct: 0
  },
  {
    question: 'The match ended in a _____.',
    choices: ['A. win', 'B. draw', 'C. goal'],
    correct: 1
  },
  {
    question: 'He was sent off with a red _____.',
    choices: ['A. book', 'B. flag', 'C. card'],
    correct: 2
  },
  {
    question: 'The goalkeeper made a great _____.',
    choices: ['A. save', 'B. pass', 'C. run'],
    correct: 0
  },
  {
    question: 'They celebrated the _____.',
    choices: ['A. defeat', 'B. victory', 'C. penalty'],
    correct: 1
  },
  {
    question: 'He missed the penalty _____.',
    choices: ['A. shoot', 'B. kick', 'C. play'],
    correct: 1
  },
  {
    question: 'The team kept a clean _____.',
    choices: ['A. record', 'B. sheet', 'C. field'],
    correct: 1
  },
  {
    question: 'He is a top goal _____.',
    choices: ['A. kicker', 'B. scorer', 'C. striker'],
    correct: 1
  },
  {
    question: 'They played in extra _____.',
    choices: ['A. match', 'B. round', 'C. time'],
    correct: 2
  },
  {
    question: 'The match was played behind closed _____.',
    choices: ['A. gates', 'B. doors', 'C. walls'],
    correct: 1
  },
  {
    question: 'What does "transfer" mean in football?',
    choices: ['A. 移籍', 'B. 契約', 'C. 得点'],
    correct: 0
  },
  {
    question: 'What is a "clean sheet"?',
    choices: ['A. 無失点', 'B. 白いユニフォーム', 'C. シート交換'],
    correct: 0
  },
  {
    question: 'What does "assist" mean?',
    choices: ['A. 退場', 'B. アシスト', 'C. 観客'],
    correct: 1
  },
  {
    question: 'What is a "derby" match?',
    choices: ['A. 地元対決', 'B. 決勝戦', 'C. 国際試合'],
    correct: 0
  },
  {
    question: 'What does "pitch" mean in football?',
    choices: ['A. ボール', 'B. グラウンド', 'C. 戦術'],
    correct: 1
  },
  {
    question: 'What does "substitute" mean?',
    choices: ['A. 監督', 'B. 交代選手', 'C. スポンサー'],
    correct: 1
  },
  {
    question: 'What is the Premier League trophy awarded for?',
    choices: ['A. 最多得点', 'B. ベストプレイヤー', 'C. 優勝'],
    correct: 2
  },
  {
    question: 'Who wears the armband on the field?',
    choices: ['A. コーチ', 'B. キャプテン', 'C. 審判'],
    correct: 1
  },
  {
    question: 'What is a "brace" in football terms?',
    choices: ['A. 2得点', 'B. 引き分け', 'C. 延長戦'],
    correct: 0
  },
  {
    question: 'What does VAR stand for?',
    choices: ['A. Video Assistant Referee', 'B. Very Accurate Referee', 'C. Virtual Action Replay'],
    correct: 0
  }
];

function getRandomQuizzes(sourceArray, count) {
  const shuffled = [...sourceArray].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const quizzes = getRandomQuizzes(allQuizzes, 5);
let currentQuiz = 0;
let score = 0;

window.onload = () => {
  showQuiz();
};

function showQuiz() {
  const quizBox = document.querySelector('.quiz-box');
  const quiz = quizzes[currentQuiz];

  quizBox.innerHTML = `
    <h2>Question ${currentQuiz + 1} of ${quizzes.length}</h2>
    <p><strong>${quiz.question}</strong></p>
    <ul id="choice-list"></ul>
    <p id="result"></p>
    <button id="nextBtn" class="btn" disabled>Next</button>
  `;

  const ul = document.getElementById('choice-list');
  quiz.choices.forEach((choice, index) => {
    const li = document.createElement('li');
    li.textContent = choice;
    li.onclick = () => checkAnswer(index, li);
    ul.appendChild(li);
  });

  document.getElementById('nextBtn').onclick = nextQuiz;
}

function checkAnswer(selectedIndex, liElement) {
  const quiz = quizzes[currentQuiz];
  const result = document.getElementById('result');

  const lis = document.querySelectorAll('#choice-list li');
  lis.forEach(li => {
    li.onclick = null;
    li.style.opacity = 0.6;
  });

  if (selectedIndex === quiz.correct) {
    result.textContent = '✅ Correct!';
    result.style.color = 'green';
    score++;
  } else {
    result.textContent = '❌ Incorrect!';
    result.style.color = 'red';
  }

  lis[quiz.correct].style.backgroundColor = '#00ff85';
  lis[quiz.correct].style.color = '#000';

  document.getElementById('nextBtn').disabled = false;
}

function nextQuiz() {
  currentQuiz++;
  if (currentQuiz < quizzes.length) {
    showQuiz();
  } else {
    showScore();
  }
}

function showScore() {
  const quizBox = document.querySelector('.quiz-box');

  const scoreMessage = getScoreMessage(score); // ← スコアメッセージ取得

  quizBox.innerHTML = `
    <h2>Finished</h2>
    <p><strong>${quizzes.length}</strong>問中<strong>${score}</strong>問正解</p>
    <p class="score-message">${scoreMessage}</p>
    <a href="quiz.html" class="btn">Try Again</a>
  `;
}

function getScoreMessage(score) {
  switch (score) {
    case 5:
      return "You are the Top Scorer!";
    case 4:
      return "Almost a Clean Sweep!";
    case 3:
      return "Great form today!";
    case 2:
      return "Just warming up!";
    case 1:
      return "You hit the post!";
    case 0:
      return "Relegation form..";
    default:
      return "";
  }
}



