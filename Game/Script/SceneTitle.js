function loopTitle() {
    displayTitle()
}

function displayTitle() {
    drawSceneInit()
    context.fillText(`123`, 4, 4)
}

function mouseDownTitle(x, y, button) {

}

function mouseUpTitle(x, y, button) {

}

function keyDownTitle(key) {
    if (menu === false) {
        if (state === '') {
            if (key === 'd') {
                scene = 'Puzzle'
                state = ''
            }
        }
    }
}