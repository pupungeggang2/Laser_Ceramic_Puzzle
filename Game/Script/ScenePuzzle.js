function loopPuzzle() {
    displayPuzzle()

    if (menu === false) {
        if (state === 'LevelClear') {
            if (transitionTime < 0) {
                hubMode = true
                cameraValid = true
                level = levelHub
                state = ''
            } else {
                transitionTime -= delta / 1000
            }   
        } else if (state === 'GameClear') {
            if (transitionTime < 0) {
                scene = 'Credit'
                state = ''
            } else {
                transitionTime -= delta / 1000
            }   
        }
    }
}

function displayPuzzle() {
    drawSceneInit()
    drawLevel(level, cameraValid)

    if (state === 'Tutorial') {
        drawTutorial()
    }

    if (state === 'LevelClear') {
        drawLevelClear()
    }

    if (state === 'GameClear') {
        drawGameClear()
    }
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
            } else if (key === 'e') {
                let tempPos = [level.player[0], level.player[1]]
                let tempFloor = level.floor[tempPos[0]][tempPos[1]]

                if (tempFloor instanceof Connection) {
                    levelHub = level
                    level = new Level(dataLevel[tempFloor.connectedLevel])
                    if (hubMode === true) {
                        hubMode = false
                        cameraValid = false
                    }
                }
            }
            if (level.winCheck() === true) {
                if (hubMode === true) {
                    state = 'GameClear'
                    transitionTime = 1
                } else {
                    varSave.clearedLevel[level.name] = true
                    state = 'LevelClear'
                    transitionTime = 1
                }
            }
        } else if (state === 'Tutorial') {
            state = ''
        }
    }
}