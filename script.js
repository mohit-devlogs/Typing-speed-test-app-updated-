const mainStn = document.getElementById("sentence");
const type = document.getElementById("type");
const wpmValue = document.getElementById("wpm-value");
const accuracyValue = document.getElementById("accuracy-value");
const submit = document.getElementById("submit");
const resetBtn = document.getElementById("resetBtn");
const liveCounter = document.getElementById("liveCounter");

const originalText = mainStn.textContent;
mainStn.innerHTML = "";

// Break sentence into spans for per-character highlighting
originalText.split("").forEach(char => {
  const span = document.createElement("span");
  span.textContent = char;
  mainStn.appendChild(span);
});

let startTime;
let timerStarted = false;

type.addEventListener("input", function () {
  if (!timerStarted) {
    startTime = Date.now();
    timerStarted = true;
  }

  const currentTime = Date.now();
  const timeElapsedInSeconds = Math.max(1, (currentTime - startTime) / 1000);

  const typedValue = type.value;
  const spans = mainStn.querySelectorAll("span");

  let correctChars = 0;

  spans.forEach((span, index) => {
    const typedChar = typedValue[index];

    if (typedChar == null) {
      span.className = "untyped";
    } else if (typedChar === span.textContent) {
      span.className = "correct";
      correctChars++;
    } else {
      span.className = "incorrect";
    }
  });

  const typedWords = typedValue.trim().split(/\s+/).filter(w => w !== "").length;
  const liveWPM = Math.round((typedWords / timeElapsedInSeconds) * 60);
  liveCounter.textContent = liveWPM + " WPM";
});

submit.addEventListener("click", function () {
  type.disabled = true;
  const endTime = Date.now();
  const timeTakenInSeconds = Math.max(1, (endTime - startTime) / 1000);

  const typedWords = type.value.trim().split(/\s+/).filter(w => w !== "").length;
  const finalWPM = Math.round((typedWords / timeTakenInSeconds) * 60);
  wpmValue.textContent = finalWPM + " WPM";

  let correctChars = 0;
  const spans = mainStn.querySelectorAll("span");
  for (let i = 0; i < spans.length; i++) {
    if (type.value[i] === spans[i].textContent) {
      correctChars++;
    }
  }

  const accuracy = Math.round((correctChars / spans.length) * 100);
  accuracyValue.textContent = accuracy + "%";
});

resetBtn.addEventListener("click", function () {
  type.value = "";
  type.disabled = false;
  wpmValue.textContent = "";
  accuracyValue.textContent = "";
  liveCounter.textContent = "";
  timerStarted = false;
  startTime = null;
  type.focus();

  mainStn.innerHTML = "";
  originalText.split("").forEach(char => {
    const span = document.createElement("span");
    span.textContent = char;
    mainStn.appendChild(span);
  });
});
