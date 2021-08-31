let canvas;
let boidArray = [];

// Boid config
const spawnDistanceFromWalls = 50;
const spawnSpeedMax = 5;
const spawnBoidScale = 4;
const spawnBoidColour = 0;
const spawnBoidShape = "ellipse";
let boidMaxSpeed;
let boidMinSpeed;

// boid boundary config
let boundaryForce;
let boundaryDistanceFromWall;

// coherence config
let coherenceForce;
let coherenceInfluenceDistance;

// separation config
let separationForce;
let separationInfluenceDistance;


// alignment config
let alignmentForce;
let alignmentInfluenceDistance;


function setup() {
    createAndSetupCanvas();
    boidArray = initializeBoidArray(100);
    setupUI();
}

function draw() {
    clear();
    background(220);
    [boidMaxSpeed, boidMinSpeed, boundaryForce, boundaryDistanceFromWall, coherenceForce, coherenceInfluenceDistance, separationForce, separationInfluenceDistance, alignmentForce, alignmentInfluenceDistance] = updateValues();
    boidArray.forEach((boid, index) => boidStepAndRender(boid, index, boidArray));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function createAndSetupCanvas() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    background(220);
}

function initializeBoidArray(populationCount) {
    const newBoidArray = [];
    for (let i = 0; i < populationCount; i++)
    {
        newBoidArray.push(initializeNewBoid());
    }
    return newBoidArray;
}

function initializeNewBoid() {
    const spawnX = random(spawnDistanceFromWalls, width - spawnDistanceFromWalls);
    const spawnY = random(spawnDistanceFromWalls, height - spawnDistanceFromWalls);
    const spawnDeltaX = random(-spawnSpeedMax, spawnSpeedMax);
    const spawnDeltaY = random(-spawnSpeedMax, spawnSpeedMax);

    return new Boid(spawnX, spawnY, spawnDeltaX, spawnDeltaY, spawnBoidScale, spawnBoidColour, spawnBoidShape);
}

function boidStepAndRender(boid, index, boidArray) {
    applyBoundaryForce(boid);
    coherenceFunction(boid);
    separationFunction(boid);
    alignmentFunction(boid);
    if (calcVectorMagnitude(boid.deltaX, boid.deltaY) < boidMinSpeed) {
        [boid.deltaX, boid.deltaY] = scaleVectorToSpecificLength(boid.deltaX, boid.deltaY, boidMinSpeed)
    }
    if (calcVectorMagnitude(boid.deltaX, boid.deltaY) > boidMaxSpeed) {
        [boid.deltaX, boid.deltaY] = scaleVectorToSpecificLength(boid.deltaX, boid.deltaY, boidMaxSpeed)
    }
    boid.posX += boid.deltaX;
    boid.posY += boid.deltaY;
    boid.render();
}

function calcVectorMagnitude(a, b) {
    return (Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
}

function scaleVectorToSpecificLength(x, y, newLength) {
    let oldLength = calcVectorMagnitude(x, y);
    x = (x / oldLength) * newLength;
    y = (y / oldLength) * newLength;
    return [x, y];
}

function applyBoundaryForce(boid) {
    // sides
   if (boid.posX < boundaryDistanceFromWall) {
       boid.deltaX += boundaryForce;
   } else if (boid.posX > width - boundaryDistanceFromWall) {
       boid.deltaX -= boundaryForce;
   }

   // top and bottom
    if (boid.posY < boundaryDistanceFromWall) {
        boid.deltaY += boundaryForce;
    } else if (boid.posY > height - boundaryDistanceFromWall) {
        boid.deltaY -= boundaryForce;
    }
}

function boidDistance(boid1, boid2) {
    return calcVectorMagnitude((boid1.posX - boid2.posX), (boid1.posY - boid2.posY));
}

function coherenceFunction(currentBoid) {
    let totalX = 0;
    let totalY = 0;
    let neighborCount = 0;
    let centerX = 0;
    let centerY = 0;

    for (let otherBoid of boidArray) {
        if (boidDistance(otherBoid, currentBoid) < coherenceInfluenceDistance) {
            totalX += otherBoid.posX;
            totalY += otherBoid.posY;
            neighborCount += 1;
        }
    }

    if (neighborCount > 0) {
        centerX = totalX / neighborCount;
        centerY = totalY / neighborCount;

        currentBoid.deltaX += (centerX - currentBoid.posX) * coherenceForce;
        currentBoid.deltaY += (centerY - currentBoid.posY) * coherenceForce;
    }
}

function separationFunction(currentBoid) {
    let separatedX = 0;
    let separatedY = 0;
    for (let otherBoid of boidArray) {
        if (otherBoid !== currentBoid) {
            if (boidDistance(otherBoid, currentBoid) < separationInfluenceDistance) {
                separatedX += currentBoid.posX - otherBoid.posX;
                separatedY += currentBoid.posY - otherBoid.posY;
            }
        }
    }

    currentBoid.deltaX += separatedX * separationForce;
    currentBoid.deltaY += separatedY * separationForce;
}

function alignmentFunction(currentBoid) {
    let totalDeltaX = 0;
    let totalDeltaY = 0;
    let neighborCount = 0;
    let alignmentDeltaX = 0;
    let alignmentDeltaY = 0;

    for (let otherBoid of boidArray) {
        if (boidDistance(otherBoid, currentBoid) < alignmentInfluenceDistance) {
            totalDeltaX += otherBoid.deltaX;
            totalDeltaY += otherBoid.deltaY;
            neighborCount += 1;
        }
    }

    if (neighborCount > 0) {
        alignmentDeltaX = totalDeltaX / neighborCount;
        alignmentDeltaY = totalDeltaY / neighborCount;

        currentBoid.deltaX += (alignmentDeltaX - currentBoid.deltaX) * alignmentForce;
        currentBoid.deltaY += (alignmentDeltaY - currentBoid.deltaY) * alignmentForce;
    }
}

