const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// إعدادات اللعبة
canvas.width = 800;
canvas.height = 200;

// الديناصور
const dino = {
    x: 50,
    y: canvas.height - 40,
    width: 30,
    height: 40,
    speed: 2,
    jumping: false,
    jumpHeight: 0
};

// عدد القفزات
let jumpCount = 0;

// تحديث العداد
function updateJumpCount() {
    jumpCountElement.textContent = "عدد القفزات: " + jumpCount;
}

// الحركة للقفز
function jump() {
    if (!dino.jumping) {
        dino.jumping = true;
        jumpCount++; // زيادة العداد عند كل قفزة
        updateJumpCount(); // تحديث العرض على الشاشة
        
        let jumpInterval = setInterval(() => {
            if (dino.jumpHeight < 60) {
                dino.jumpHeight += 4;
            } else {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    if (dino.jumpHeight > 0) {
                        dino.jumpHeight -= 4;
                    } else {
                        clearInterval(fallInterval);
                        dino.jumping = false;
                    }
                }, 20);
            }
        }, 20);
    }
}



// العقبات
const obstacles = [];
let obstacleSpeed = 7;
let gameInterval=7;
let obstacleInterval=7;

// رسم الديناصور
function drawDino() {
    ctx.fillStyle = "green";
    ctx.fillRect(dino.x, dino.y - dino.jumpHeight, dino.width, dino.height);
}

// حركة الديناصور
function jump() {
    if (!dino.jumping) {
        dino.jumping = true;
        let jumpInterval = setInterval(() => {
            if (dino.jumpHeight < 100) {
                dino.jumpHeight += 10;
            } else {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    if (dino.jumpHeight > 0) {
                        dino.jumpHeight -= 7;
                    } else {
                        clearInterval(fallInterval);
                        dino.jumping = false;
                    }
                }, 20);
            }
        }, 20);
    }
}

// العقبات
function createObstacle() {
    const obstacle = {
        x: canvas.width,
        y: canvas.height - 40,
        width: 20 + Math.random() * 40,
        height: 40
    };
    obstacles.push(obstacle);
}

// رسم العقبات
function drawObstacles() {
    obstacles.forEach((obstacle, index) => {
        ctx.fillStyle = "brown";
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // تحديث موقع العقبة
        obstacle.x -= obstacleSpeed;

        // إزالة العقبة إذا اختفت من الشاشة
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
        }
    });
}

// التحقق من الاصطدام
function checkCollisions() {
    obstacles.forEach((obstacle) => {
        if (
            dino.x + dino.width > obstacle.x &&
            dino.x < obstacle.x + obstacle.width &&
            dino.y - dino.jumpHeight + dino.height > obstacle.y
        ) {
            alert("Game Over!");
            clearInterval(gameInterval);
            clearInterval(obstacleInterval);
        }
    });
}

// تحديث اللعبة
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawDino();
    drawObstacles();
    checkCollisions();
}

// بدء اللعبة
function startGame() {
    gameInterval = setInterval(update, 1000 / 60); // تحديث 60 مرة في الثانية
    obstacleInterval = setInterval(createObstacle, 1000); // إنشاء عقبة كل 2 ثانية
}

// الاستماع لمفتاح القفز
document.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "ArrowUp") {
        jump();
    }
});

function onGameOver() {
    alert("لقد خسرت! سيتم إعادة تحميل الصفحة.");
    location.reload(); // يعيد تحميل الصفحة
}

// بدء اللعبة عند تحميل الصفحة
startGame();

