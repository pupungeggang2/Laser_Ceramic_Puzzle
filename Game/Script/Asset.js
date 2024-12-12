let img = {
    button: {
        play: new Image(),
        erase: new Image(),
        back: new Image(),
        clear: new Image(),
        menu: new Image(),
    },

    wall: new Image(),
    box: new Image(),
    player: new Image(),
    flag: new Image(),
    levelOpened: new Image(),
    levelCleared: new Image(),
}

function imageLoad() {
    img.button.play.src = 'Image/ButtonPlay.png'
    img.button.erase.src = 'Image/ButtonErase.png'
    img.button.back.src = 'Image/ButtonBack.png'
    img.button.clear.src = 'Image/ButtonClear.png'

    img.wall.src = 'Image/Wall.png'
    img.box.src = 'Image/Box.png'
    img.player.src = 'Image/Player.png'
    img.flag.src = 'Image/Flag.png'
    img.levelOpened.src = 'Image/LevelOpened.png'
    img.levelCleared.src = 'Image/LevelCleared.png'
}