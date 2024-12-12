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

}

function keyDownTitle(key) {
    if (menu === false) {
        if (state === '') {
            if (key === 'e') {
                scene = 'Puzzle'
                state = ''
                level = new Level(dataLevel['Hub'])
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