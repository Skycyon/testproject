let timeLeft = 15;
const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const answerOptionsElement = document.getElementById("answerOptions");
const submitButton = document.getElementById("submitBtn");

// Define the assets with filenames only
const assets = ["A.png", "B.png", "C.png", "KEY.png", "E.png"]; // KEY.png is the correct answer

// Function to shuffle the assets array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initial countdown timer for question display
const countdown = setInterval(() => {
    if (timeLeft > 0) {
        timerElement.textContent = timeLeft;
        timeLeft--;
    } else {
        clearInterval(countdown);
        showAnswerOptions();
    }
}, 1000);

function showAnswerOptions() {
    // Hide the question image and timer, show answer options and submit button
    questionElement.style.display = "none";
    timerElement.style.display = "none";
    answerOptionsElement.style.display = "flex";
    submitButton.style.display = "block";

    // Shuffle the assets before displaying them
    shuffle(assets);

    // Clear existing options and dynamically generate the options with fixed labels
    answerOptionsElement.innerHTML = ""; // Clear previous options
    const labels = ["A", "B", "C", "D", "E"]; // Fixed labels order
    let correctAnswer = "";

    labels.forEach((label, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option", "image-box");

        // Get the filename and set it as the value (lowercased, without .png)
        const filename = assets[index];
        const value = filename.replace(".png", "").toLowerCase();

        // Set the correct answer if this option is the KEY
        if (value === "key") {
            correctAnswer = value;
        }

        const img = document.createElement("img");
        img.src = `/public/assets/pictures/${filename}`;
        img.alt = `Option ${label}`;

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = value; // Set the dynamic value based on filename
        radio.id = `option${label}`;

        const labelElement = document.createElement("label");
        labelElement.htmlFor = `option${label}`;
        labelElement.textContent = label;

        // Append image, radio button, and label to the option div
        optionDiv.appendChild(img);
        optionDiv.appendChild(radio);
        optionDiv.appendChild(labelElement);

        // Append the option div to the container
        answerOptionsElement.appendChild(optionDiv);
    });

    // Store the correct answer dynamically in the global scope so it can be checked in submitAnswer
    window.correctAnswer = correctAnswer;
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (selectedOption) {
        if (selectedOption.value === window.correctAnswer) { // Check dynamically set correct answer
            alert("Correct! You selected the right answer.");
        } else {
            alert("Incorrect. Try again!");
        }
    } else {
        alert("Please select an answer before submitting.");
    }

    // Reset for next question (loop for testing)
    resetQuestion();
}

function resetQuestion() {
    // Reset UI elements
    questionElement.style.display = "block";
    timerElement.style.display = "block";
    answerOptionsElement.style.display = "none";
    submitButton.style.display = "none";
    
    // Reset countdown timer
    timeLeft = 15;
    
    // Uncheck all radio buttons
    document.querySelectorAll('input[name="answer"]').forEach((input) => (input.checked = false));

    // Restart the initial countdown timer
    const countdown = setInterval(() => {
        if (timeLeft > 0) {
            timerElement.textContent = timeLeft;
            timeLeft--;
        } else {
            clearInterval(countdown);
            showAnswerOptions();
        }
    }, 1000);
}
