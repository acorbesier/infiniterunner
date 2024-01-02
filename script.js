window.onload = function() {
    let character = document.getElementById('character');
    let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
    let ground = document.getElementById('ground');
    let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue('height'));
    let isJumping = false;
    let upTime, downTime;
    let displayScore = document.getElementById('score');
    let score = 0;

    function jump() {
        if (isJumping) return;
        isJumping = true;
        upTime = setInterval(() => {
            if (characterBottom >= groundHeight + 250) {
                clearInterval(upTime);
                downTime = setInterval(() => {
                    if (characterBottom <= groundHeight + 10) {
                        clearInterval(downTime);
                        isJumping = false;
                    }
                    characterBottom -= 10;
                    character.style.bottom = characterBottom + 'px';
                }, 20);
            }
            characterBottom += 10;
            character.style.bottom = characterBottom + 'px';
        }, 20);
    }

    function showScore(){
        score ++;
        displayScore.innerText = score;
    }

    setInterval(showScore, 100);

    function generateObstacle() {
        let obstacles = document.getElementById('obstacles');
        let obstacle = document.createElement('div');
        obstacle.setAttribute('class', 'obstacle');
        obstacles.appendChild(obstacle);

        let randomTimeout = Math.floor(Math.random() * 1000) + 1000;
        let obstacleRight = -30;
        let obstacleHeight = Math.floor(Math.random() * 50) + 50;


        function moveObstacle() {
            obstacleRight += 5;
            obstacle.style.right = obstacleRight + 'px';
            obstacle.style.height = obstacleHeight + 'px';
        
            let characterRect = character.getBoundingClientRect();
            let obstacleRect = obstacle.getBoundingClientRect();
        
            if (
                characterRect.right > obstacleRect.left &&
                characterRect.left < obstacleRect.right &&
                characterRect.bottom > obstacleRect.top &&
                characterRect.top < obstacleRect.bottom
            ) {
                alert("Game Over! Your score is: " + score);
                clearInterval(obstacleInterval);
                location.reload();
            }
        }        
        
        let obstacleInterval = setInterval(moveObstacle, 20);
        setTimeout(generateObstacle, randomTimeout);
    }

    generateObstacle();

    function control(e) {
        if (e.key === 'ArrowUp' || e.key === ' ') {
            jump();
        }
    }

    document.addEventListener('keydown', control);
};
