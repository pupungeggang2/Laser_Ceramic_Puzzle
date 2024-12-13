function loopCredit() {
    displayCredit()
}

function displayCredit() {
    drawSceneInit()
    context.fillText(`Congratulations!`, 8, 8)
}

function mouseDownCredit(x, y, button) {
    scene = 'Title'
    state = ''
}

function mouseUpCredit(x, y, button) {
    scene = 'Title'
    state = ''
}

function keyDownCredit(key) {
    scene = 'Title'
    state = ''
}