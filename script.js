
        const playerCar = document.getElementById('playerCar');
        const gameContainer = document.getElementById('gameContainer');
        const scoreElement = document.getElementById('score');

        let playerX = 180;
        let playerY = 520;
        let score = 0;
        let gameActive = true;
        let enemies = [];
        const speed = 5;
        const moveAmount = 10;

        // Keyboard controls
        const keys = {
            ArrowLeft: false,
            ArrowRight: false
        };

        document.addEventListener('keydown', (e) => {
            if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
                keys[e.key] = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
                keys[e.key] = false;
            }
        });

        function movePlayer() {
            if (keys.ArrowLeft && playerX > 0) {
                playerX -= moveAmount;
            }
            if (keys.ArrowRight && playerX < 360) {
                playerX += moveAmount;
            }
            playerCar.style.left = playerX + 'px';
        }

        function createEnemy() {
            const enemy = document.createElement('div');
            enemy.className = 'enemyCar';
            enemy.style.left = Math.random() * 360 + 'px';
            enemy.style.top = '-60px';
            gameContainer.appendChild(enemy);
            enemies.push({
                element: enemy,
                x: parseInt(enemy.style.left),
                y: -60
            });
        }

        function moveEnemies() {
            for (let i = enemies.length - 1; i >= 0; i--) {
                enemies[i].y += speed;
                enemies[i].element.style.top = enemies[i].y + 'px';

                // Check collision
                if (Math.abs(playerX - enemies[i].x) < 40 && 
                    Math.abs(playerY - enemies[i].y) < 60) {
                    gameOver();
                }

                // Remove off-screen enemies
                if (enemies[i].y > 600) {
                    gameContainer.removeChild(enemies[i].element);
                    enemies.splice(i, 1);
                    score++;
                    scoreElement.textContent = `Score: ${score}`;
                }
            }
        }

        function gameOver() {
            gameActive = false;
            alert(`Game Over! Score: ${score}`);
            window.location.reload();
        }

        function gameLoop() {
            if (gameActive) {
                movePlayer();
                moveEnemies();
                requestAnimationFrame(gameLoop);
            }
        }

        // Start game
        setInterval(createEnemy, 2000);
        gameLoop();
    