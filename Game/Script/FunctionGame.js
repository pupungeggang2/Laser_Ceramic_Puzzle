function restartLevel() {
    level = new Level(dataLevel[level.name])
}

function interact() {
    let tempPos = [level.player[0], level.player[1]]
    let tempFloor = level.floor[tempPos[0]][tempPos[1]]

    if (tempFloor instanceof Connection) {
        levelHub = level
        level = new Level(dataLevel[tempFloor.connectedLevel])
        if (hubMode === true) {
            hubMode = false
            cameraValid = false
        }
    }
}
