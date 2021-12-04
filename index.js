window.onload = () => {

    document.getElementById('start-button').onclick = () => {
        startGame();
    };
};

let dropTheWater = false

//task: should start game or reload page in change
// document.getElementById("start-button").addEventListener("click", function () {
//     ///try to use toggle
//     let startButtonPush = document.getElementById('start-button');
//     startButtonPush.classList.toggle('refresh-page')
//     //event: buttontext: refresh + event: refresh + text changes to: "Start Game"
//     if (document.getElementsByClassName('refresh-page')) {
//         document.getElementById("start-button").innerHTML = "Start Game"
//         location.reload();
//     }
//     //event: buttontext: start game + event: start game + text changes to: "Refresh Game"
//     else {
//         document.getElementById("start-button").innerHTML = "Refresh Game"
//         startGame()
//     }
// }
// )


let refresh = false

document.getElementById("start-button").addEventListener("click", function () {



    ///try to use toggle
    let startButtonPush = document.getElementById('start-button');

    if(refresh){
        location.reload()

    }
    else{
        startButtonPush.innerHTML = "Refresh Game"
        startGame()
        refresh = true
    
    }
}
)




//prevent scrolling with spacebar/arrows
window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


//possible to insert a startImg???
let startImg = new Image()
startImg.src = "./Images/wald.png"
startImg.onload = () => {
    context.clearRect(0, 0, 500, 500) //clear canvas
    context.drawImage(startImg, 0, 0, 500, 500)
}


//create trees
//tree
let tree = new Image()
tree.src = "./Images/tree.png"

//palmtree
let palm = new Image()
palm.src = "./Images/palmtree_type1.png"

//cactus
let cactus = new Image()
cactus.src = "./Images/cactus_type2.png"

//create water icons
//watering can
let can = new Image()
can.src = "./Images/Gießkanne.png"

//water bucket
let bucket = new Image()
bucket.src = "./Images/Water_Bucket.png"

//stones
let stone1 = new Image()
stone1.src = "./Images/stone1.png"

let stone2 = new Image()
stone2.src = "./Images/stone2.png"

let stone3 = new Image()
stone3.src = "./Images/stone3.png"

//car
let carImg = new Image()
carImg.src = "./Images/racing_car.png"

//you won - img
let winnerImg = new Image()
winnerImg.src = "./Images/winnerFarm.png"
//you lost - img
let looserImg = new Image()
looserImg.src = "./Images/youLost.png"

//create farmerIcon 
//optional: insert switch for choosing an icon
let farmerBlanko = new Image()
farmerBlanko.src = "./Images/farmer_f_yellow.png"

let farmer1 = new Image()
farmer1.src = "./Images/farmer_f_yellow.png"

let farmer2 = new Image()
farmer2.src = "./Images/farmer_f_medium.png"

let farmer3 = new Image()
farmer3.src = "./Images/farmer_f_light.png"

let farmer4 = new Image()
farmer4.src = "./Images/farmer_m_dark.png"


//farmer position matching stuff
let intersect = (farmerPos, iconPos) => {
    let farmerPosLeft = farmerPos.x;
    let farmerPosTop = farmerPos.y;
    let farmerPosRight = farmerPos.x + farmerPos.width;
    let farmerPosBottom = farmerPos.y + farmerPos.height;
    let iconPosLeft = iconPos.x;
    let iconPosTop = iconPos.y;
    let iconPosRight = iconPos.x + iconPos.width;
    let iconPosBottom = iconPos.y + iconPos.height;
    return !(
        farmerPosLeft > iconPosRight ||
        farmerPosTop > iconPosBottom ||
        farmerPosRight < iconPosLeft ||
        farmerPosBottom < iconPosTop
    );
}
//framecounter bucket
let framectrWater = 0;

//bucket positioning
let recursionCtr = 0
function chooseNewBucketLocation() {
    framectrWater = 0
    recursionCtr++
    if (recursionCtr > 1000) {
        return
    }

    bucketPos.x = Math.floor(Math.random() * 450)
    bucketPos.y = Math.floor(Math.random() * 450)

    if (intersect(bucketPos, farmerPos) === true || intersect(bucketPos, treePos) === true || intersect(bucketPos, palmPos) === true || intersect(bucketPos, cactusPos) === true) {
        chooseNewBucketLocation() // recursion
    }

    for (let i = 0; i < allObstacles.length; i++) {
        let oneObject = allObstacles[i]
        if (intersect(bucketPos, oneObject) === true) {
            chooseNewBucketLocation() // recursion
        }
    }

}



//tree repositioning
//funktioniert nicht//tried: recursion, random positioning mit array of trees...
let recursionCtrTree = 0
function chooseNewTreeLocation(oneTree) {
    recursionCtrTree++

    if (recursionCtrTree > 1000) {
        return
    }

    oneTree.x = Math.floor(Math.random() * 450)
    oneTree.y = Math.floor(Math.random() * 450)

    if (intersect(oneTree, farmerPos) === true || intersect(oneTree, bucketPos) === true || intersect(oneTree, palmPos) === true || intersect(oneTree, cactusPos) === true) {
        chooseNewTreeLocation(oneTree) // recursion
    }

    for (let i = 0; i < allObstacles.length; i++) {
        let oneObject = allObstacles[i]
        if (intersect(oneTree, oneObject) === true) {
            chooseNewTreeLocation(oneTree) // recursion
        }
    }
}



//////////////////////////////////////////////////////////////////////////////////

let farmerPos = {
    x: 210,
    y: 415,
    width: 60,
    height: 60
}

let treePos = {
    x: 350,
    y: 20,
    width: 100,
    height: 110
}

let palmPos = {
    x: 270,
    y: 280,
    width: 100,
    height: 120
}

let cactusPos = {
    x: 50,
    y: 125,
    width: 60,
    height: 100
}

let canPos = {
    x: 290,
    y: 435,
    width: 60,
    height: 60
}

let bucketPos = {
    width: 35,
    height: 50
}

let stone1Pos = {
    x: 340,
    y: 180,
    width: 200,
    height: 60
}

let stone2Pos = {
    x: 115,
    y: 365,
    width: 140,
    height: 45
}

let stone3Pos = {
    x: 95,
    y: 135,
    width: 130,
    height: 30
}

class carCrossing {
    constructor(carX, carY) {
        this.x = carX
        this.y = carY
        this.width = 50
        this.height = 50
        this.crashing = false
        this.spriteCtr = 0
    }

    draw() {
        context.drawImage(carImg, this.x, this.y, this.width, this.height)
        if (this.crashing) {
            
            //to slow down the animation loop:
            let imgPos = Math.floor(this.spriteCtr / 2)
            
            context.drawImage(explosionSprites[imgPos], this.x, this.y, 60, 60);
            this.spriteCtr++
            if (this.spriteCtr >= 20) {
                this.spriteCtr = 0
            }   
        }
    }

    carCrash() {
        if (intersect(this, farmerPos) == true) {
            this.crashing = true;
            setTimeout(function () { gameLost() }, 1000)
        }
    }
}

let car1 = new carCrossing(30, 0)

let arrayOfCars = [car1]
///////////////////////////
//array of explosion sprites
let explosionSprites = []
for (let i = 1; i <= 10; i++) {
    const carCrashSprite = new Image();
    carCrashSprite.src = "./Images/explosion/explosion" + i + ".png"
    explosionSprites.push(carCrashSprite)
}

//array of water drop sprites
let waterDrips = []
for (let i = 1; i <= 3; i++) {
    const waterDrop = new Image();
    waterDrop.src = "./Images/waterdrops/waterdrops" + i + ".png"
    waterDrips.push(waterDrop)
}

///////////////////////////
////funktioniert noch nicht..
let dripCtr = 0

function waterDripping() {
    

    if (dropTheWater) {
        context.drawImage(waterDrips[dripCtr], farmerPos.x -30, farmerPos.y + 15, 70, 70)
        dripCtr++
        if (dripCtr === 2) {
            dripCtr = 0
        }
    }
}

///////////////////////////////////////////////////////////////////////////////

// create array with static objects (stones)
let allObstacles = [stone1Pos, stone2Pos, stone3Pos]
let allObstaclesImgs = [stone1, stone2, stone3]

//create object with non static trees
let allTreesPos = [treePos, palmPos, cactusPos]
let allTreesImg = [tree, palm, cactus]

chooseNewBucketLocation()

///////////////////////////////////////////////////////////////////////////////

//waterCounter
let waterCounter = document.getElementById("waterCounter")
let waterStore = 0;

function fillWaterScore() {
    waterStore = waterStore + 20
    waterCounter.innerHTML = waterStore;
}

function emptyWaterScoreTree() {
    waterStore = waterStore - 20
    waterCounter.innerHTML = waterStore;
}


//pointCounter
let pointCounter = document.getElementById("pointCounter")
let pointScore = 0;
function countPointsTree() {
    pointScore += 10;
    pointCounter.innerHTML = pointScore;
}
function countPointsPalm() {
    pointScore += 5;
    pointCounter.innerHTML = pointScore;
}
function countPointsCactus() {
    pointScore -= 10;
    pointCounter.innerHTML = pointScore;
}

//time Counter part1
let timeCounter = document.getElementById("timeCounter")
let timeLeft = 59;


//////////////////////////////////////////////////////////////////////////
//edit Counter if seconds < 10 to two digits number 
function twoDigitsNumber(number) {
    if (number < 10)
        return "0" + number
    else {
        return number.toString()
    }
}

let intervalID = null;

//timeCounter
let timerId = setInterval(countdown, 1000);
function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
        gameOver();
    } else {
        timeCounter.innerHTML = '00:' + twoDigitsNumber(timeLeft);
        timeLeft--;
    }
}

//game over
const gameOver = () => {
    if (timeLeft == 0 && pointScore < 30) {
        gameLost()
    }
    if (timeLeft == 0 && pointScore >= 30) {
        gameWon()
    }
}

const gameLost = () => {
    clearInterval(intervalID)
    context.drawImage(looserImg, 0, 0, 500, 500)
}

const gameWon = () => {
    clearInterval(intervalID)
    context.drawImage(winnerImg, 0, 0, 500, 500)
}

///////////////////////////////////////////////////////////////////////////////////

let gameRunning = false
const startGame = () => {
    if (gameRunning) return
    gameRunning = true

    //start timer
    countdown()

    //game loop
    //implememting trees + player on the board:
    intervalID = setInterval(() => {

        //waterBucket repositioning after 10 sec
        framectrWater++;
        if (framectrWater % 600 === 0) {
            chooseNewBucketLocation()
        }

        context.clearRect(0, 0, 500, 500) //clear canvas

        for (let i = 0; i < allObstacles.length; i++) {
            const oneObject = allObstacles[i];
            const oneImage = allObstaclesImgs[i]
            context.drawImage(oneImage, oneObject.x, oneObject.y, oneObject.width, oneObject.height)
        }

        for (let i = 0; i < allTreesPos.length; i++) {
            const oneObject2 = allTreesPos[i];
            const oneImage2 = allTreesImg[i]
            context.drawImage(oneImage2, oneObject2.x, oneObject2.y, oneObject2.width, oneObject2.height)
        }

        context.drawImage(bucket, bucketPos.x, bucketPos.y, bucketPos.width, bucketPos.height);
        context.drawImage(farmerBlanko, farmerPos.x, farmerPos.y, farmerPos.width, farmerPos.height)

        waterDripping()

        //crossing cars
        for (let i = 0; i < arrayOfCars.length; i++) {
            let car = arrayOfCars[i];
            car.draw()
            car.y += 1
            car.carCrash()
        }

        //if 20 Sec passed -> new car crossing
        if (framectrWater % 1200 === 0) {
            let newCar = new carCrossing(300, 0)
            //let newCar = { x: 300, y: 0 }
            arrayOfCars.push(newCar)
        }


        //case: Farmer position catches bucket => water counter + 20l && new bucket position
        if (intersect(farmerPos, bucketPos) == true) {
            chooseNewBucketLocation();
            fillWaterScore()
        }

        gameOver()
        // if (intersect(farmerPos, treePos) == true) {
        //     emptyWaterScoreTree();
        // }

    }, 1000 / 60)


}
///////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////

//accessing keycodes & canvas border detection
document.addEventListener('keydown', (event) => {
    //left
    if (event.keyCode === 37) {
        farmerPos.x -= 10
        if (farmerPos.x <= 0) {
            farmerPos.x += 10
        }
    }
    //right
    if (event.keyCode === 39) {
        farmerPos.x += 10
        if (farmerPos.x + farmerPos.width >= 500) {
            farmerPos.x -= 10
        }
    }
    //up
    if (event.keyCode === 38) {
        farmerPos.y -= 10
        if (farmerPos.y <= 0) {
            farmerPos.y += 10
        }
    }

    //down
    if (event.keyCode === 40) {
        farmerPos.y += 10
        if (farmerPos.y + farmerPos.height >= 500) {
            farmerPos.y -= 10
        }
    }

    for (let i = 0; i < allObstacles.length; i++) {
        let oneObject = allObstacles[i]
        if (intersect(farmerPos, oneObject) === true) {
            //left
            if (event.keyCode === 37) farmerPos.x += 10
            //right
            if (event.keyCode === 39) farmerPos.x -= 10
            //up
            if (event.keyCode === 38) farmerPos.y += 10
            //down
            if (event.keyCode === 40) farmerPos.y -= 10
        }
    }

    //empty can when farmerPos = treePos + spaceBar
    if (event.keyCode === 32 && intersect(farmerPos, treePos) && waterStore >= 20) {
        emptyWaterScoreTree()
        countPointsTree()
        chooseNewTreeLocation(treePos)

        dropTheWater =true

        setTimeout(() => {
        dropTheWater =false
            
        }, 500);
        // + 10 points
    }

    //watering with water not possible..
    if (event.keyCode === 32 && intersect(farmerPos, treePos) && waterStore < 20) {
        alert("Please refill your water storage first...!")
    }

    //empty can when farmerPos = palmPos + spaceBar
    if (event.keyCode === 32 && intersect(farmerPos, palmPos) && waterStore >= 20) {
        emptyWaterScoreTree()
        countPointsPalm()
        chooseNewTreeLocation(palmPos)
        dropTheWater =true

        setTimeout(() => {
        dropTheWater =false
        }, 500);
        // + 5 points
    }

    //watering without water not possible..
    if (event.keyCode === 32 && intersect(farmerPos, palmPos) && waterStore < 20) {
        alert("Please refill your water storage first...!")
    }

    //empty can when farmerPos = cactusPos + spaceBar
    if (event.keyCode === 32 && intersect(farmerPos, cactusPos) && waterStore >= 20) {
        emptyWaterScoreTree()
        countPointsCactus()
        chooseNewTreeLocation(cactusPos)
        dropTheWater = true
        setTimeout(() => {
        dropTheWater = false
        }, 500);
        // - 10 points
    }
    //watering without water not possible..
    if (event.keyCode === 32 && intersect(farmerPos, palmPos) && waterStore < 20) {
        alert("Please refill your water storage first...!")
    }

}

)

//choosing farmer icon
document.getElementById("farmer1").addEventListener("click", function () {
    farmerBlanko = farmer1
}
)
document.getElementById("farmer2").addEventListener("click", function () {
    farmerBlanko = farmer2
}
)
document.getElementById("farmer3").addEventListener("click", function () {
    farmerBlanko = farmer3
}
)
document.getElementById("farmer4").addEventListener("click", function () {
    farmerBlanko = farmer4
}
)






