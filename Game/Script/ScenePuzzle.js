function loopPuzzle() {
    displayPuzzle()

    if (menu === false) {
        if (state === 'LevelClear') {
            if (transitionTime < 0) {
                hubMode = true
                cameraValid = true
                level = levelHub
                level.applyBoardChange()
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
    drawUI()
    context.drawImage(img.button.menu, UI.puzzle.buttonMenu[0], UI.puzzle.buttonMenu[1])

    if (state === 'Tutorial') {
        drawTutorial()
    }

    if (state === 'LevelClear') {
        drawLevelClear()
    }

    if (state === 'GameClear') {
        drawGameClear()
    }

    if (menu === true) {
        drawMenu()   
    }
}

function mouseDownPuzzle(x, y, button) {
    
}

function mouseUpPuzzle(x, y, button) {
    if (button === 0) {
        if (menu === false) {
            if (pointInsideRectArray(x, y, UI.puzzle.buttonMenu)) {
                menu = true
            }
            if (state === '') {

            }
        } else if (menu === true) {
            if (pointInsideRectArray(x, y, UI.menu.buttonResume)) {
                menu = false
            } else if (pointInsideRectArray(x, y, UI.menu.buttonBack)) {
                if (hubMode === false) {
                    hubMode = true
                    cameraValid = true
                    level = levelHub
                    level.applyBoardChange()
                    state = ''
                }
                menu = false
            } else if (pointInsideRectArray(x, y, UI.menu.buttonExit)) {
                scene = 'Title'
                state = ''
                menu = false
            }
        }
    }
}

function keyDownPuzzle(key) {
    if (menu === false) {
        if (key === 'Escape') {
            menu = true
        }
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
                    saveData()
                    transitionTime = 1
                } else {
                    state = 'LevelClear'
                    varSave.clearedLevel[level.name] = true
                    saveData()
                    transitionTime = 1
                }
            }
        } else if (state === 'Tutorial') {
            state = ''
        }
    } else if (menu === true) {
        if (key === 'e' || key === 'Escape') {
            menu = false
        } else if (key === 'r') {
            if (hubMode === false) {
                hubMode = true
                cameraValid = true
                level = levelHub
                level.applyBoardChange()
                state = ''
            }
            menu = false
        } else if (key === 'q') {
            scene = 'Title'
            state = ''
            menu = false
        }
    }
}