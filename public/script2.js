document.addEventListener("DOMContentLoaded", () => {
    const audioFiles = ["2UE1.mp3", "3X8.mp3", "7i2.mp3", "8RU4.mp3"]; // List of audio files
    const audioElement = document.getElementById("audioElement");
    const playAudioBtn = document.getElementById("playAudioBtn");
    const userInput = document.getElementById("userInput");
    const feedbackMessage = document.getElementById("feedbackMessage");
    const testLabel = document.getElementById("testLabel");

    let audioPlayed = false;
    let correctAnswer = "";

    function initializeTest() {
        // Reset UI elements
        userInput.value = "";
        feedbackMessage.textContent = "";
        playAudioBtn.disabled = false;
        playAudioBtn.textContent = "Play Audio";
        audioPlayed = false;

        // Select a random audio file and test type
        const selectedAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
        const testType = Math.random() > 0.5 ? "Sequence" : "Reverse";

        // Set the audio source and display the test type
        audioElement.src = `/public/assets/audio/${selectedAudio}`;
        testLabel.textContent = `Test Type: ${testType}`;
        
        // Extract the correct answer based on the file name (without extension)
        const baseAnswer = selectedAudio.split(".")[0];
        correctAnswer = testType === "Reverse" ? baseAnswer.split("").reverse().join("") : baseAnswer;
    }

    // Initialize the first test when the page loads
    initializeTest();

    // Function to play audio only once
    function playAudio() {
        if (!audioPlayed) {
            audioElement.play();
            audioPlayed = true;
            playAudioBtn.disabled = true;
            playAudioBtn.textContent = "Audio Played";
        }
    }

    // Function to submit the answer and check if it’s correct
    function submitAnswer() {
        const userAnswer = userInput.value.trim();
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            feedbackMessage.textContent = "Correct! Well done.";
            feedbackMessage.style.color = "green";
        } else {
            feedbackMessage.textContent = `Incorrect. The correct answer was: ${correctAnswer}`;
            feedbackMessage.style.color = "red";
        }

        // Reset after showing feedback
        setTimeout(initializeTest, 2000); // Reset after 2 seconds
    }

    // Attach playAudio and submitAnswer functions to the global scope
    window.playAudio = playAudio;
    window.submitAnswer = submitAnswer;
});
