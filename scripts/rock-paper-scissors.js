/* Score from local storage will show when opened
        back up, otherwise, new game */
        const score = JSON.parse(localStorage.getItem('score')) || {
            wins: 0,
            losses: 0,
            ties: 0
        };       

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
        function winOrLose(playerMove, pcMove) {
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

        updateScore();