function loopPuzzle() {
    displayPuzzle()

    if (menu === false) {
        if (state === '') {
            level.moveThings()
        } else if (state === 'LevelClear') {
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

    if (pressed === true) {
        if (pressedTime > 0.6) {
            pressed = false
            pressedTime = 0
            if (menu === false) {
                if (state === '') {
                    interact()
                }
            }
        } else {
            pressedTime += delta / 1000    
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
    pressed = true
    pressedTime = 0
    if (button === 0) {
        mousePressed = [x, y]
    }
}

function mouseUpPuzzle(x, y, button) {
    pressed = false
    if (button === 0) {
        if (menu === false) {
            if (pointInsideRectArray(x, y, UI.puzzle.buttonMenu)) {
                menu = true
            }
            if (state === '') {
                if (pointInsideRectArray(x, y, UI.puzzle.buttonInteract)) {
                    interact()
                } else if (pointInsideRectArray(x, y, UI.puzzle.buttonRestart)) {
                    restartLevel()
                } else if (pointInsideRectArray(x, y, UI.puzzle.buttonMenu)) {
                    menu = true
                } else {
                    let diff = [x - mousePressed[0], y - mousePressed[1]]
                    if (vectorLength(diff[0], diff[1]) > 64) {
                        if (Math.abs(diff[0]) > Math.abs(diff[1])) {
                            if (diff[0] > 0) {
                                level.movePlayer('Right')
                            } else {
                                level.movePlayer('Left')
                            }
                        } else {
                            if (diff[1] > 0) {
                                level.movePlayer('Down')
                            } else {
                                level.movePlayer('Up')
                            }
                        }
                    }
                }
            } else if (state === 'Tutorial') {
                state = ''
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
            if (key === 'w' || key === 'ArrowUp') {
                level.movePlayer('Up')
            } else if (key === 'a' || key === 'ArrowLeft') {
                level.movePlayer('Left')
            } else if (key === 's' || key === 'ArrowDown') {
                level.movePlayer('Down')
            } else if (key === 'd' || key === 'ArrowRight') {
                level.movePlayer('Right')
            } else if (key === 'e') {
                interact()
            } else if (key === 'r') {
                restartLevel()
            } else if (key === 'q') {

            } else if (key === 'h') {

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
