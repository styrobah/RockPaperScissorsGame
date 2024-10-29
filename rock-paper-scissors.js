
            //we are using the localstorage because we want to save values permanently
            //I'm using the JSON Parse because the getItem gets a string and I want to get the object score 
            //I use the || because if the object is null you have to initialise the object
            let score = JSON.parse(localStorage.getItem('score')) || {
                wins: 0,
                losses: 0,
                ties: 0
            };

            updateScoreElement();
            
            function playGame(playerMove) {
                const computerMove = pickComputerMove();

                let result = '';
                if (playerMove === 'scissors') {

                    if(computerMove === 'rock'){
                        result = 'You lose.';
                        score.losses++;
                    } else if (computerMove === 'paper'){
                        result = 'You win.';
                        score.wins++;
                    } else {
                        result = 'Tie.';
                        score.ties++;
                    }
                    //we have to we have to pass our object to string because setItem only supports strings
                    localStorage.setItem('score',JSON.stringify(score));
                    updateScoreElement();
                    document.querySelector('.js-result').innerHTML=result;
                    createTextWhenClickingOnButton(playerMove,computerMove);

                } else if(playerMove === 'paper'){

                    if(computerMove === 'rock'){
                        result = 'You win.';
                        score.wins++;
                    } else if (computerMove === 'paper'){
                        result = 'Tie.';
                        score.ties++;
                    } else {
                        result = 'You lose.';
                        score.losses++;
                    }

                    localStorage.setItem('score',JSON.stringify(score));

                    updateScoreElement();
                    document.querySelector('.js-result').innerHTML=result;
                    createTextWhenClickingOnButton(playerMove,computerMove);
                } else {
                    if(computerMove === 'rock'){
                        result = 'Tie.';
                        score.ties++;
                    } else if (computerMove === 'paper'){
                        result = 'You lose';
                        score.losses++;
                    } else {
                        result = 'You win.';
                        score.wins++;
                    }

                    localStorage.setItem('score',JSON.stringify(score));

                    updateScoreElement();
                    document.querySelector('.js-result').innerHTML=result;
                    createTextWhenClickingOnButton(playerMove,computerMove);
                } 
            }

            let isAutoPlaying = false;
            let intervalId;

            function autoPlay() {
                if(!isAutoPlaying){
                    intervalId = setInterval(function name(params) {
                        const playerMove = pickComputerMove();
                        playGame(playerMove);
                    },1000);
                
                    isAutoPlaying=true;
                } else {
                    clearInterval(intervalId);
                    isAutoPlaying = false;
                }
            }

            function updateScoreElement() {
                document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
            }

            function createTextWhenClickingOnButton(playerMove,computerMove) {
                document.querySelector('.js-moves').innerHTML = `you
                <img src="images/${playerMove}-emoji.png" class="move-icon">
                <img src="images/${computerMove}-emoji.png" class="move-icon">
                Computer`;
            }

            function pickComputerMove() {
                const randomNumber = Math.random();
                console.log(randomNumber);
                let computerMove = '';
                if(randomNumber >= 0 && randomNumber < 1/3){
                    computerMove = 'rock';
                } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
                    computerMove = 'paper';
                } else if (randomNumber >= 2/3 && randomNumber < 1) {
                    computerMove = 'scissors';
                }
                return computerMove;
            }
        