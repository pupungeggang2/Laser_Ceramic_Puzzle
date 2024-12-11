let img = {
    button: {
        play: new Image(),
        erase: new Image(),
    },

    wall: new Image(),
    box: new Image(),
    player: new Image(),
}

function imageLoad() {
    img.button.play.src = 'Image/ButtonPlay.png'
    img.button.erase.src = 'Image/ButtonErase.png'

    img.wall.src = 'Image/Wall.png'
    img.box.src = 'Image/Box.png'
    img.player.src = 'Image/Player.png'
}