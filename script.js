let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

// Select the file input element
const fileInput = document.getElementById('fileUpload');

// Add an event listener to detect changes in the selected file
fileInput.addEventListener('change', function() {
    // Check if a file is selected
    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];

        // Check if the selected file is a text file (.txt)
        if (selectedFile.type === 'text/plain') {
            // Use FileReader to read the file content
            const reader = new FileReader();

            reader.onload = function(event) {
                const fileContent = event.target.result;

                // Display the file content (you can do something with it)
                console.log('File content:', fileContent);
            };

            // Read the file as text
            reader.readAsText(selectedFile);
        } else {
            alert('Please select a valid text file (.txt)');
            fileInput.value = ''; // Reset the file input
        }
    }
});
/*
document.querySelector("#speakButton").addEventListener("click", () => {
    let text = document.querySelector("#textInput").value;
    if (text.trim()) {
        speech.text = text;
        window.speechSynthesis.speak(speech);
        addToHistory(text);
    }
});

document.querySelector("#saveFavorite").addEventListener("click", () => {
    let text = document.querySelector("#textInput").value;
    if (text.trim()) {
        addToFavorites(text, speech.voice.name);
    }
});
*/
document.querySelector("#fileUpload").addEventListener("change", (event) => {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = () => {
            document.querySelector("#textInput").value = reader.result;
        };
        reader.readAsText(file);
    }
});

voiceSelect.addEventListener("change", () =>{
    speech.voice = voices[voiceSelect.value];
});

fileUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    readUploadedFile(file);
});

document.querySelector("button").addEventListener("click", () =>{
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});