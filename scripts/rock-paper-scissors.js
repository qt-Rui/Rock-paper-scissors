/* Score from local storage will show when opened
        back up, otherwise, new game */
        const score = JSON.parse(localStorage.getItem('score')) || {
            wins: 0,
            losses: 0,
            ties: 0
        };

        // When reset button is pressed and confirmed, this is called
        function scoreReset() {
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            removeFromStorage();
        }

        function removeFromStorage() {
            localStorage.removeItem('score');
        }       

        let pcMove = '';
        let playerMove = ''
        let result = ''
        
        
        /* PC move is randomly determined each round */
        function pickPCMove() {
            const randomNum = Math.random();

            if (randomNum < 1 / 3 && randomNum >= 0){
                pcMove = 'ROCK';
            } else if (randomNum >= 1 / 3 && randomNum < 2 / 3){
                pcMove = 'PAPER';
            }else if (randomNum >= 2 / 3 && randomNum <= 1){
                pcMove = 'SCISSORS';
            }
            return pcMove;
        }

        

        /* Applying rock, paper, scissors rules */
        function winOrLose(playerMove) {
            pcMove = pickPCMove();
            if (playerMove === pcMove) {
                result = 'TIE';
            } else if (playerMove === 'ROCK') {
                if (pcMove === 'SCISSORS') {
                    result = 'WIN';
                } else {
                    result = 'LOSS';
                }
            } else if (playerMove === 'SCISSORS') {
                if (pcMove === 'ROCK') {
                    result = 'LOSS';
                } else {
                    result = 'WIN';
                }
            } else if (playerMove === 'PAPER') {
                if (pcMove === 'SCISSORS') {
                    result = 'LOSS'
                } else {
                    result = 'WIN';
                }
            }

            /* Update scoreboard */
            if (result === 'WIN') {
                score.wins += 1;
            } else if (result === 'LOSS') {
                score.losses += 1;
            } else if (result === 'TIE') {
                score.ties += 1;
            }

            /* Store score, show live score, and show who wins each round */
            localStorage.setItem('score', JSON.stringify(score));
            updateScore();
            theResult();
            resultMessage();
        }


        /* Image of player hand VS image of PC hand */
        function resultMessage() {
            document.querySelector('.js-showMoves')
            .innerHTML = `You <img src="hand-imgs/${playerMove}-emoji.png"> VS <img src="hand-imgs/${pcMove}-emoji.png"> PC`
        }


        /* Display result for the round */
        function theResult() {
            document.querySelector('.js-result')
            .innerHTML = `ITS A ${result}!`;
        }


        /* Live update of score */
        function updateScore() {
            document.querySelector('.js-score')
        .innerHTML = `WINS: ${score.wins}
    LOSSES: ${score.losses}
    TIES: ${score.ties}`;
        }


        // Autoplay the game when button is pressed, and stop when pressed again
        let autoOn = false;
        let interval;

        function autoplay() {
            if (!autoOn) {
                interval = setInterval(() => {
                    playerMove = pickPCMove(); // randomly generate the hand for player
                    winOrLose(playerMove);
                }, 1500);
                document.querySelector('.js-auto-button').innerHTML = 'Stop playing';
                autoOn = true;
            } else {
                clearInterval(interval);
                autoOn = false;
                document.querySelector('.js-auto-button').innerHTML = 'Auto play';
            }
        }

        const auto = document.querySelector('.js-auto-button');
        auto.addEventListener('click', autoplay);


        // Reset the score when reset button is pressed. Confirm with 'yes' button when prompted
        function resetScore() {
            document.querySelector('.js-result').innerHTML = '';
            document.querySelector('.js-showMoves').innerHTML = '';
            document.querySelector('.js-are-you-sure').innerHTML = 'Are you sure? <button class="js-yes-button">Yes</button><button class="js-no-button">No</button>';
            const resetIt = document.querySelector('.js-yes-button');
            resetIt.addEventListener('click', () => {
                scoreReset();
                updateScore();
                document.querySelector('.js-are-you-sure').innerHTML = '';
            })
            const noReset = document.querySelector('.js-no-button');
            noReset.addEventListener('click', () => {
                document.querySelector('.js-are-you-sure').innerHTML = '';
            })
        }

        const resetButton = document.querySelector('.reset-button');
        resetButton.addEventListener('click', resetScore);



        // Player picks move, move is thrown into function and winner is decided
        function pickedScissors() {
            playerMove = 'SCISSORS';
            winOrLose(playerMove);
        }

        function pickedRock() {
            playerMove = 'ROCK';
            winOrLose(playerMove);
        }

        function pickedPaper() {
            playerMove = 'PAPER';
            winOrLose(playerMove);
        }

        // Run the round when a button is clicked
        const paper = document.querySelector('.js-paper-button');
        paper.addEventListener('click', pickedPaper);

        const rock = document.querySelector('.js-rock-button');
        rock.addEventListener('click', pickedRock);

        const scissors = document.querySelector('.js-scissors-button');
        scissors.addEventListener('click', pickedScissors);

        // play the game through keys
        document.body.addEventListener('keydown', (event) => {
            if (event.key === 'r') {
                pickedRock();
            } else if (event.key === 'p') {
                pickedPaper();
            } else if (event.key === 's') {
                pickedScissors();
            } else if (event.key === 'a') {
                autoplay();
            } else if (event.key === 'Backspace') {
                resetScore();
            }
        })

        updateScore();
