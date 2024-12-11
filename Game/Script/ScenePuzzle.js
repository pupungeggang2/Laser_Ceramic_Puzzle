function loopPuzzle() {
    displayPuzzle()
}

function displayPuzzle() {
    drawSceneInit()
    drawLevel(level, cameraValid)
}

function mouseDownPuzzle(x, y, button) {
    
}

function mouseUpPuzzle(x, y, button) {

}

function keyDownPuzzle(key) {
    if (menu === false) {
        if (state === '') {
            if (key === 'w') {
                level.movePlayer('Up')
            } else if (key === 'a') {
                level.movePlayer('Left')
            } else if (key === 's') {
                level.movePlayer('Down')
            } else if (key === 'd') {
                level.movePlayer('Right')
            }
        }
    }
}