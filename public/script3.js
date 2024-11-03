document.addEventListener("DOMContentLoaded", () => {
    const optionsContainer = document.getElementById("answerOptions");

    // Define the filenames for the answer options
    const assets = ["A3.png", "B3.png", "C3.png", "D3.png", "KEY3.png"]; // KEY3.png is the correct answer

    // Function to shuffle the assets array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Shuffle the assets
    shuffle(assets);

    // Clear the container and dynamically add shuffled options
    optionsContainer.innerHTML = ""; // Clear any existing options
    const labels = ["A", "B", "C", "D", "E"]; // Fixed labels order
    let correctAnswer = ""; // Correct answer will be dynamically set

    labels.forEach((label, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option", "image-box");

        // Get the filename and set it as the value (lowercased, without .png)
        const filename = assets[index];
        const value = filename.replace(".png", "").toLowerCase();

        // Set the correct answer if this option is the KEY3
        if (value === "key3") {
            correctAnswer = value;
        }

        const img = document.createElement("img");
        img.src = `/assets/pictures/${filename}`;
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
        optionsContainer.appendChild(optionDiv);
    });

    // Store the correct answer dynamically in the global scope so it can be checked in submitAnswer
    window.correctAnswer = correctAnswer;
});

// Function to handle submission
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
    // Uncheck all radio buttons
    document.querySelectorAll('input[name="answer"]').forEach((input) => (input.checked = false));

    // Re-shuffle and regenerate the options
    document.dispatchEvent(new Event("DOMContentLoaded"));
}
