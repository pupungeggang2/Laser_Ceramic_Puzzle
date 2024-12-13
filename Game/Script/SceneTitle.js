function loopTitle() {
    displayTitle()
}

function displayTitle() {
    drawSceneInit()

    context.drawImage(img.button.play, UI.title.buttonStart[0], UI.title.buttonStart[1])
    context.drawImage(img.button.erase, UI.title.buttonErase[0], UI.title.buttonErase[1])
}

function mouseDownTitle(x, y, button) {

}

function mouseUpTitle(x, y, button) {
    if (button === 0) {
        if (menu === false) {
            if (state === '') {
                if (pointInsideRectArray(x, y, UI.title.buttonStart)) {
                    scene = 'Puzzle'
                    state = ''
                    level = new Level(dataLevel['Hub'])
                    cameraValid = true
                    hubMode = true
                    level.applyBoardChange()

                    if (varSave.new === true) {
                        varSave.new = false
                        state = 'Tutorial'
                    }
                } else if (pointInsideRectArray(x, y, UI.title.buttonErase)) {
                    eraseData()
                }
            }
        }
    }
}

function keyDownTitle(key) {
    if (menu === false) {
        if (state === '') {
            if (key === 'e') {
                scene = 'Puzzle'
                state = ''
                level = new Level(dataLevel['Hub'])
                cameraValid = true
                hubMode = true
                level.applyBoardChange()

                if (varSave.new === true) {
                    varSave.new = false
                    state = 'Tutorial'
                }
            } else if (key === 'd') {
                eraseData()
            }
        }
    }
}