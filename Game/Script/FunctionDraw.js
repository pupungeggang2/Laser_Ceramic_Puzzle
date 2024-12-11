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
            if (level.insideBoard(row, col)) {
                let tempThing = level.thing[row][col]

                if (tempThing instanceof Wall) {
                    context.drawImage(img.wall, left + tempThing.position[0] - colStart * UI.puzzle.cellSize[0], top + tempThing.position[1] - rowStart * UI.puzzle.cellSize[1])
                } else if (tempThing instanceof Box) {
                    context.drawImage(img.box, left + tempThing.position[0] - colStart * UI.puzzle.cellSize[0], top + tempThing.position[1] - rowStart * UI.puzzle.cellSize[1])
                } else if (tempThing instanceof Player) {
                    context.drawImage(img.player, left + tempThing.position[0] - colStart * UI.puzzle.cellSize[0], top + tempThing.position[1] - rowStart * UI.puzzle.cellSize[1])
                }
            }
        }
    }
}