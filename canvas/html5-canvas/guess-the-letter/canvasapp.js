function canvasApp() {
    var theCanvas = document.getElementById("canvasOne");

    if (!theCanvas || !theCanvas.getContext) {
        return;
    }

    var context = theCanvas.getContext("2d");

    var guesses = 0;
    var message = "Guess The Letter From a (lower) to z (higher)";
    var letters = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
        "p", "q", "r", "s", "t", "u", "u", "v", "w", "x", "y", "z"
    ];
    var today = new Date();
    var letterToGuess = "";
    var higherOrLower = "";
    var lttersGuessed;
    var gameOver = false;

    initGame();

    function initGame() {
        var letterIndex = Math.floor(Math.random() * letters.length);
        letterGuess = letters[letterIndex];
        guesses = 0;
        letterGuessed = [];
        gameOver = false;
        window.addEventListener("keyup", eventKeyPressed, true);

        var formElement = document.getElementById("createImageData");
        formElement.addEventListener('click', createImageDatePressed)
        drawScreen();
    }

    function createImageDatePressed(e) {
        window.open(theCanvas.toDataURL(), "canvasImage", "left=0, top=0, width="
        + theCanvas.width + ", height=" + theCanvas + ", toolbar=0, resizable=0");
    }

    function eventKeyPressed(e) {
        if (!gameOver) {
            var letterPressed = String.fromCharCode(e.keyCode);
            letterPressed = letterPressed.toLowerCase();
            guesses++;
            letterGuessed.push(letterPressed);

            if (letterPressed == letterToGuess) {
                gameOver = true;
            } else {
                letterIndex = letters.indexOf(letterToGuess);
                guessIndex = letters.indexOf(letterPressed);
                console.log(guessIndex);

                if (guessIndex < 0) {
                    higherOrLower = "That is not a letter";
                } else if (guessIndex > letterIndex) {
                    higherOrLower = "Lower";
                } else {
                    higherOrLower = "Higher";
                }
            }
            drawScreen();
        }
    }

    function drawScreen() {
        // 배경 화면
        context.fillStyle = "#ffffaa";
        context.fillRect(0, 0, 500, 300);

        // 사각형
        context.strokeStyle = "#000000";
        context.strokeRect(5, 5, 490, 290);
        context.textBaseline = "top";

        // 날짜
        context.fillStyle = "#000000";
        context.font = "10px _sans";
        context.fillText(today, 150, 10);

        // 메시지
        context.fillStyle = "#FF0000";
        context.font = "14px _sans";
        context.fillText(message, 125, 30);

        // 추측
        context.fillStyle = "#109910";
        context.font = "16px _sans";
        context.fillText('Guesses: ' + guesses, 215, 50);

        // 더 높은지 낮은지
        context.fillStyle = "#000000";
        context.font = "15px _sans";
        context.fillText('Higher or Lower: ' + higherOrLower, 150, 125);

        // 추측한 문자
        context.fillStyle = "#FF0000";
        context.font = "16px _sans";
        context.fillText("Letters Guessed: " + letterGuessed.toString(), 10, 260);

        if (gameOver) {
            context.fillStyle = "#FF0000";
            context.font = "40px _sans";
            context.fillText("You Got It!", 150, 180)
        }
    }
}
