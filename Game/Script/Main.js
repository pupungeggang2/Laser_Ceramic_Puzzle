window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    canvas = document.getElementById('Screen')
    context = canvas.getContext('2d')

    window.addEventListener('keydown', keyDown, false)
    window.addEventListener('mousedown', mouseDown, false)
    window.addEventListener('mouseup', mouseUp, false)
    window.addEventListener('touchstart', touchStart, false)
    window.addEventListener('touchend', touchEnd, false)

    imageLoad()
    saveInit()

    gameFrameCurrent = Date.now()
    gameFramePrevious = Date.now() - 16
    gameLoop = requestAnimationFrame(loop)
}

function loop() {
    gameFramePrevious = gameFrameCurrent
    gameFrameCurrent = Date.now()
    delta = gameFrameCurrent - gameFramePrevious

    if (scene === 'Title') {
        loopTitle()
    } else if (scene === 'Puzzle') {
        loopPuzzle()
    } else if (scene === 'Credit') {
        loopCredit()
    }

    gameLoop = requestAnimationFrame(loop)
}

function mouseUp(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = (event.clientX - targetRect.left) / targetRect.width * canvas.width
    let y = (event.clientY - targetRect.top) / targetRect.height * canvas.height
    let button = event.button

    if (scene === 'Title') {
        mouseUpTitle(x, y, button)
    } else if (scene === 'Puzzle') {
        mouseUpPuzzle(x, y, button)
    } else if (scene === 'Credit') {
        mouseUpCredit(x, y, button)
    }
}

function mouseDown(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = (event.clientX - targetRect.left) / targetRect.width * canvas.width
    let y = (event.clientY - targetRect.top) / targetRect.height * canvas.height
    let button = event.button

    if (scene === 'Title') {
        mouseDownTitle(x, y, button)
    } else if (scene === 'Puzzle') {
        mouseDownPuzzle(x, y, button)
    } else if (scene === 'Credit') {
        mouseDownCredit(x, y, button)
    }
}

function touchStart(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = (event.changedTouches[0].pageX - targetRect.left) / targetRect.width * canvas.width
    let y = (event.changedTouches[0].pageY - targetRect.top) / targetRect.height * canvas.height

    if (scene === 'Title') {
        mouseDownTitle(x, y, 0)
    } else if (scene === 'Puzzle') {
        mouseDownPuzzle(x, y, 0)
    } else if (scene === 'Credit') {
        mouseDownCredit(x, y, 0)
    }

}

function touchEnd(event) {
    let targetRect = canvas.getBoundingClientRect()
    let x = (event.changedTouches[0].pageX - targetRect.left) / targetRect.width * canvas.width
    let y = (event.changedTouches[0].pageY - targetRect.top) / targetRect.height * canvas.height

    if (scene === 'Title') {
        mouseUpTitle(x, y, 0)
    } else if (scene === 'Puzzle') {
        mouseUpPuzzle(x, y, 0)
    } else if (scene === 'Credit') {
        mouseUpCredit(x, y, 0)
    }
}

function keyDown(event) {
    let key = event.key

    if (scene === 'Title') {
        keyDownTitle(key)
    } else if (scene === 'Puzzle') {
        keyDownPuzzle(key)
    } else if (scene === 'Credit') {
        keyDownCredit(key)
    }
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(gameLoop)
    }
}

function rightClick() {
    return false
}
