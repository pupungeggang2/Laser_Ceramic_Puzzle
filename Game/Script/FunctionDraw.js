function drawSceneInit() {
    context.font = '32px neodgm'
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.strokeStyle = 'Black'
    context.lineWidth = 2
    context.fillStyle = 'White'
    context.strokeRect(0, 0, 1280, 720)
    context.fillRect(0, 0, 1280, 720)
    context.fillStyle = 'Black'
}

function drawLevel(level, cameraValid) {
    let left = 0
    let top = 0
    let numRow = level.row
    let numCol = level.col
    let rowStart = 0
    let colStart = 0

    context.font = '32px neodgm'

    if (cameraValid === true) {
        numRow = 10
        numCol = 12
        left = UI.puzzle.boardStart[0]
        top = UI.puzzle.boardStart[1]
        rowStart = level.player[0] - 5
        colStart = level.player[1] - 6

        if (rowStart < 0) {
            rowStart = 0
        } else if (rowStart > level.row - numRow) {
            rowStart = level.row - numRow
        }

        if (colStart < 0) {
            colStart = 0
        } else if (colStart > level.col - numCol) {
            colStart = level.col - numCol
        }
    } else {
        left = 640 - 32 * numCol
        top = 360 - 32 * numRow
    }

    for (let i = 0; i < numRow; i++) {
        for (let j = 0; j < numCol; j++) {
            let row = rowStart + i
            let col = colStart + j
            if (level.insideBoard(row, col)) {
                context.strokeRect(left + UI.puzzle.cellSize[0] * j, top + UI.puzzle.cellSize[1] * i, UI.puzzle.cellSize[0], UI.puzzle.cellSize[1])
            }
        }
    }

    for (let i = 0; i < numRow; i++) {
        for (let j = 0; j < numCol; j++) {
            let row = rowStart + i
            let col = colStart + j

            if (level.laser[row][col]['H'] === true) {
                context.drawImage(img.laserH, left + col * 64 - colStart * UI.puzzle.cellSize[0], top + row * 64 - rowStart * UI.puzzle.cellSize[1])
            }

            if (level.laser[row][col]['V'] === true) {
                context.drawImage(img.laserV, left + col * 64 - colStart * UI.puzzle.cellSize[0], top + row * 64 - rowStart * UI.puzzle.cellSize[1])
            }

            if (level.insideBoard(row, col)) {
                let tempFloor = level.floor[row][col]
                let tempThing = level.thing[row][col]

                if (tempFloor instanceof Goal) {
                    context.drawImage(img.flag, left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1])
                } else if (tempFloor instanceof Connection) {
                    let targetLevel = tempFloor.connectedLevel
                    if (varSave.clearedLevel[targetLevel] === false) {
                        context.drawImage(img.levelOpened, left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1])
                    } else {
                        context.drawImage(img.levelCleared, left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1])
                    }
                } else if (tempFloor instanceof PressureButton) {
                    context.drawImage(img.pressureButton, left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1])
                     context.fillStyle = 'White'
                    context.fillRect(left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0] + UI.cornerRect[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1] + UI.cornerRect[1], UI.cornerRect[2], UI.cornerRect[3])
                    context.strokeRect(left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0] + UI.cornerRect[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1] + UI.cornerRect[1], UI.cornerRect[2], UI.cornerRect[3])
                     context.fillStyle = 'Black'
                    context.fillText(`${tempFloor.group}`, left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0] + 4, top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1] + 4)
                } else if (tempFloor instanceof Gate) {
                    if (tempFloor.opened === true) {
                        context.drawImage(img.gateOpened, left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1])
                    } else {
                        context.drawImage(img.gateClosed, left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1])
                    }
                    context.fillStyle = 'White'
                    context.fillRect(left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0] + UI.cornerRect[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1] + UI.cornerRect[1], UI.cornerRect[2], UI.cornerRect[3])
                    context.strokeRect(left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0] + UI.cornerRect[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1] + UI.cornerRect[1], UI.cornerRect[2], UI.cornerRect[3])
                    context.fillStyle = 'Black'
                    context.fillText(`${tempFloor.condition}`, left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0] + UI.cornerText[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1] + UI.cornerText[1])
                } else if (tempFloor instanceof LevelGate) {
                    if (tempFloor.opened === true) {
                        context.drawImage(img.gateOpened, left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1])
                    } else {
                        context.drawImage(img.gateClosed, left + tempFloor.position[0] - colStart * UI.puzzle.cellSize[0], top + tempFloor.position[1] - rowStart * UI.puzzle.cellSize[1])
                    }
                }

                if (tempThing instanceof Wall) {
                    context.drawImage(img.wall, left + tempThing.position[0] - colStart * UI.puzzle.cellSize[0], top + tempThing.position[1] - rowStart * UI.puzzle.cellSize[1])
                } else if (tempThing instanceof Box) {
                    context.drawImage(img.box, left + tempThing.position[0] - colStart * UI.puzzle.cellSize[0], top + tempThing.position[1] - rowStart * UI.puzzle.cellSize[1])
                } else if (tempThing instanceof Player) {
                    context.drawImage(img.player, left + tempThing.position[0] - colStart * UI.puzzle.cellSize[0], top + tempThing.position[1] - rowStart * UI.puzzle.cellSize[1])
                } else if (tempThing instanceof NumGlass) {
                    context.drawImage(img.numGlass, left + tempThing.position[0] - colStart * UI.puzzle.cellSize[0], top + tempThing.position[1] - rowStart * UI.puzzle.cellSize[1])
                    context.fillText(`${tempThing.number}`, left + tempThing.position[0] - colStart * UI.puzzle.cellSize[0] + UI.centerText[0], top + tempThing.position[1] - rowStart * UI.puzzle.cellSize[1] + UI.centerText[1])
                } else if (tempThing instanceof LaserEmitter) {
                    context.drawImage(img.laserEmitter, left + tempThing.position[0] - colStart * UI.puzzle.cellSize[0], top + tempThing.position[1] - rowStart * UI.puzzle.cellSize[1])
                    if (tempThing.condition[0] === 'Equal') {
                        context.fillText(`${tempThing.currentNum}=${tempThing.condition[1]}`, left + tempThing.position[0] - colStart * UI.puzzle.cellSize[0] + UI.centerText[0], top + tempThing.position[1] - rowStart * UI.puzzle.cellSize[1] + UI.centerText[1])
                    }
                }
            }
        }
    }

    if (level.floor[level.player[0]][level.player[1]] instanceof Connection) {
        context.fillText(`${level.floor[level.player[0]][level.player[1]].connectedLevel}`, UI.puzzle.textLevel[0], UI.puzzle.textLevel[1])
    }
}

function drawUI() {
    context.drawImage(img.button.restart, UI.puzzle.buttonRestart[0], UI.puzzle.buttonRestart[1])
    context.fillText(`R`, UI.puzzle.textRestart[0], UI.puzzle.textRestart[1])
    context.drawImage(img.button.undo, UI.puzzle.buttonUndo[0], UI.puzzle.buttonUndo[1])
    context.fillText(`Q`, UI.puzzle.textUndo[0], UI.puzzle.textUndo[1])
    context.drawImage(img.button.interact, UI.puzzle.buttonInteract[0], UI.puzzle.buttonInteract[1])
    context.fillText(`E`, UI.puzzle.textInteract[0], UI.puzzle.textInteract[1])
    context.drawImage(img.button.help, UI.puzzle.buttonHelp[0], UI.puzzle.buttonHelp[1])
    context.fillText(`H`, UI.puzzle.textHelp[0], UI.puzzle.textHelp[1])
}

function drawTutorial() {

}

function drawLevelClear() {
    context.fillStyle = 'White'
    context.fillRect(UI.puzzle.clearedWindow.rect[0], UI.puzzle.clearedWindow.rect[1], UI.puzzle.clearedWindow.rect[2], UI.puzzle.clearedWindow.rect[3])
    context.strokeRect(UI.puzzle.clearedWindow.rect[0], UI.puzzle.clearedWindow.rect[1], UI.puzzle.clearedWindow.rect[2], UI.puzzle.clearedWindow.rect[3])
    context.fillStyle = 'Black'

    context.drawImage(img.button.clear, UI.puzzle.clearedWindow.imageCleared[0], UI.puzzle.clearedWindow.imageCleared[1])
}

function drawGameClear() {
    context.fillStyle = 'White'
    context.fillRect(UI.puzzle.clearedWindow.rect[0], UI.puzzle.clearedWindow.rect[1], UI.puzzle.clearedWindow.rect[2], UI.puzzle.clearedWindow.rect[3])
    context.strokeRect(UI.puzzle.clearedWindow.rect[0], UI.puzzle.clearedWindow.rect[1], UI.puzzle.clearedWindow.rect[2], UI.puzzle.clearedWindow.rect[3])
    context.fillStyle = 'Black'

    context.drawImage(img.button.clear, UI.puzzle.clearedWindow.imageCleared[0], UI.puzzle.clearedWindow.imageCleared[1])
}

function drawMenu() {
    context.fillStyle = 'White'
    context.fillRect(UI.menu.rect[0], UI.menu.rect[1], UI.menu.rect[2], UI.menu.rect[3])
    context.strokeRect(UI.menu.rect[0], UI.menu.rect[1], UI.menu.rect[2], UI.menu.rect[3])
    context.fillStyle = 'Black'

    context.drawImage(img.button.resume, UI.menu.buttonResume[0], UI.menu.buttonResume[1])
    context.drawImage(img.button.back, UI.menu.buttonBack[0], UI.menu.buttonBack[1])
    context.drawImage(img.button.home, UI.menu.buttonExit[0], UI.menu.buttonExit[1])
}
