let img = {
    button: {
        play: new Image(),
        erase: new Image(),
        clear: new Image(),
        menu: new Image(),

        resume: new Image(),
        back: new Image(),
        home: new Image(),
    },

    wall: new Image(),
    box: new Image(),
    player: new Image(),
    flag: new Image(),
    pressureButton: new Image(),
    gateClosed: new Image(),
    gateOpened: new Image(),
    laserEmitter: new Image(),
    laserH: new Image(),
    laserV: new Image(),
    numGlass: new Image(),
    levelOpened: new Image(),
    levelCleared: new Image(),
}

function imageLoad() {
    img.button.play.src = 'Image/ButtonPlay.png'
    img.button.erase.src = 'Image/ButtonErase.png'
    img.button.clear.src = 'Image/ButtonClear.png'
    img.button.menu.src = 'Image/ButtonMenu.png'

    img.button.resume.src = 'Image/ButtonResume.png'
    img.button.back.src = 'Image/ButtonBack.png'
    img.button.home.src = 'Image/ButtonHome.png'

    img.wall.src = 'Image/Wall.png'
    img.box.src = 'Image/Box.png'
    img.player.src = 'Image/Player.png'
    img.flag.src = 'Image/Flag.png'
    img.pressureButton.src = 'Image/PressureButton.png'
    img.gateClosed.src = 'Image/GateClosed.png'
    img.gateOpened.src = 'Image/GateOpened.png'
    img.laserEmitter.src = 'Image/LaserEmitter.png'
    img.laserH.src = 'Image/LaserH.png'
    img.laserV.src = 'Image/LaserV.png'
    img.numGlass.src = 'Image/Glass.png'
    img.levelOpened.src = 'Image/LevelOpened.png'
    img.levelCleared.src = 'Image/LevelCleared.png'
}