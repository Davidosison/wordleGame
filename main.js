document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;

    let wordArray = ["חרצית", "תגובה", "חלקיק", "רמקול", "טלפון", "משאית", "תאגיד", "הדמיה", "מסעדה", "סוללה",
        "מונית", "סטייק", "שניצל", "כדורת", "קטשופ", "קיוסק", "דומינו", "עברית", "ערבית",
        "מאפין", "תקווה", "תשוקה", "שלווה", "ענווה", "תינוק", "מצלמה", "מקלדת", "שולחן",
        "מנורה", "מקלחון", "מכונה", "נורית", "פתיחה"];
    let guessedWordCount = 0;

    const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];

    const keys = document.querySelectorAll('.keyboard-row button');

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArray = getCurrentWordArr();

        if (currentWordArray && currentWordArray.length < 5) {
            currentWordArray.push(letter);

            const availableSpaceElement = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;
            availableSpaceElement.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = randomWord.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58,58,60)";
        }

        const letterInThePosition = randomWord.charAt(index);
        const isCorrectPosition = letter === letterInThePosition;

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        }

        return "rgb(181,159,59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5) {
            window.alert("המילה חייבת להיות בת 5 אותיות !");
        }

        if (currentWordArr.length === 5) {
            const currentWord = currentWordArr.join('');

            const firstLetterId = guessedWordCount * 5 + 1;

            const interval = 200;
            currentWordArr.forEach((letter, index) => {
                setTimeout(() => {
                    const tileColor = getTileColor(letter, index);

                    const letterId = firstLetterId + index;
                    const letterEl = document.getElementById(letterId);
                    letterEl.classList.add("animate__jello");
                    letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
                }, interval * index);
            });

            guessedWordCount += 1;

            if (currentWord === randomWord) {
                window.alert("כל הכבוד! זכית בפחית קולה");
                window.location.reload();
            }

            if (guessedWords.length === 7) {
                window.alert(`טעית בכל ששת הניסיונות המילה הייתה:${randomWord}`);
                window.location.reload();
            }

            guessedWords.push([]);
        }
    }

    function handleDeleteLetter() {
        const currentWordArray = getCurrentWordArr();
        const removedLetter = currentWordArray.pop();

        guessedWords[guessedWords.length - 1] = currentWordArray;

        const lastLetterEl = document.getElementById(String(availableSpace - 1))

        lastLetterEl.textContent = ''
        availableSpace = availableSpace - 1;
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) => {
            const letter = target.getAttribute("data-key");
            if (letter === "Enter") {
                handleSubmitWord()
                return;
            }

            if (letter === 'Delete') {
                handleDeleteLetter()
                return;
            }


            updateGuessedWords(letter);
        }
    }

})