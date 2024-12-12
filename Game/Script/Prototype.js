class Level {
    row = 0
    col = 0
    player = [0, 0]
    goal = [0, 0]
    floor = []
    thing = []
    name = ''

    camera = [0, 0]

    constructor(data) {
        this.row = data['Size'][0]
        this.col = data['Size'][1]
        this.player[0] = data['Start'][0]
        this.player[1] = data['Start'][1]
        this.goal[0] = data['Goal'][0]
        this.goal[1] = data['Goal'][1]
        this.name = data['Name']

        this.floor = []

        for (let i = 0; i < this.row; i++) {
            let temp = []
            for (let j = 0; j < this.col; j++) {
                temp.push(new FloorEmpty([i, j]))
            }
            this.floor.push(temp)
        }

        for (let i = 0; i < data['Floor'].length; i++) {
            let tempFloor = data['Floor'][i]
            
            if (tempFloor['Type'] === 'Connection') {
                let pos = [tempFloor['Position'][0], tempFloor['Position'][1]]
                this.floor[pos[0]][pos[1]] = new Connection([pos[0], pos[1]], tempFloor['Properties'])
            } else if (tempFloor['Type'] === 'PressureButton') {

            } else if (tempFloor['Type'] === 'Gate') {
                
            }
        }

        this.floor[this.goal[0]][this.goal[1]] = new Goal([this.goal[0], this.goal[1]])

        this.thing = []

        for (let i = 0; i < this.row; i++) {
            let temp = []
            for (let j = 0; j < this.col; j++) {
                temp.push(new ThingEmpty([i, j]))
            }
            this.thing.push(temp)
        }

        for (let i = 0; i < data['Wall'].length; i++) {
            let pos = [data['Wall'][i][0], data['Wall'][i][1]]
            this.thing[pos[0]][pos[1]] = new Wall([pos[0], pos[1]])
        }

        for (let i = 0; i < data['Thing'].length; i++) {
            let tempThing = data['Thing'][i]
            
            if (tempThing['Type'] === 'Box') {
                let pos = [tempThing['Position'][0], tempThing['Position'][1]]
                this.thing[pos[0]][pos[1]] = new Box([pos[0], pos[1]])
            }
        }

        this.thing[this.player[0]][this.player[1]] = new Player([this.player[0], this.player[1]])
    }

    movePlayer(direction) {
        let cell1 = [this.player[0] + directionInfo[direction][0], this.player[1] + directionInfo[direction][1]]
        let cell2 = [this.player[0] + directionInfo[direction][0] * 2, this.player[1] + directionInfo[direction][1] * 2]
        let playerThing = this.thing[this.player[0]][this.player[1]]

        if (this.insideBoard(cell1[0], cell1[1])) {
            let tempFloor1 = this.floor[cell1[0]][cell1[1]] 
            let tempThing1 = this.thing[cell1[0]][cell1[1]]
            if (tempThing1.solid === false && tempFloor1.solid === false) {
                playerThing.position[0] += directionPosition[direction][0]
                playerThing.position[1] += directionPosition[direction][1]
                tempThing1.position[0] -= directionPosition[direction][0]
                tempThing1.position[1] -= directionPosition[direction][1]
                this.swapThing(this.player[0], this.player[1], cell1[0], cell1[1])
                this.player[0] = cell1[0]
                this.player[1] = cell1[1]
            } else {
                if (this.insideBoard(cell2[0], cell2[1])) {
                    let tempThing2 = this.thing[cell2[0]][cell2[1]]
                    let tempFloor2 = this.thing[cell2[0]][cell2[1]]
                    if (tempThing.pushable === true && tempThing2.solid === false && tempFloor2.solid === false) {
                        playerThing.position[0] += directionPosition[direction][0]
                        playerThing.position[1] += directionPosition[direction][1]
                        tempThing.position[0] += directionPosition[direction][0]
                        tempThing.position[1] += directionPosition[direction][1]
                        tempThing2.position[0] -= directionPosition[direction][0] * 2
                        tempThing2.position[1] -= directionPosition[direction][1] * 2
                        this.swapThing(cell1[0], cell1[1], cell2[0], cell2[1])
                        this.swapThing(this.player[0], this.player[1], cell1[0], cell1[1])
                        this.player[0] = cell1[0]
                        this.player[1] = cell1[1]
                    }
                }
            }
        }

        this.applyBoardChange()
    }

    applyBoardChange() {

    }

    winCheck() {
        if (this.player[0] === this.goal[0] && this.player[1] === this.goal[1]) {
            return true
        }
        return false
    }

    insideBoard(row, col) {
        if (row >= 0 && row < this.row && col >= 0 && col < this.col) {
            return true
        }

        return false
    }

    swapThing(row1, col1, row2, col2) {
        let tempThing = this.thing[row1][col1]
        this.thing[row1][col1] = this.thing[row2][col2]
        this.thing[row2][col2] = tempThing
    }
}

class Floor {
    position = [0, 0]
    solid = false

    constructor() {

    }
}

class FloorEmpty extends Floor {
    constructor(position) {
        super()
        this.position[0] = position[1] * 64
        this.position[1] = position[0] * 64
    }
}

class PressureButton extends Floor {
    constructor(position) {
        super()
        this.position[0] = position[1] * 64
        this.position[1] = position[0] * 64
    }
}

class Gate extends Floor {
    
}

class Connection extends Floor {
    connectedLevel = ''
    
    constructor(position, connectedLevel) {
        super()
        this.position[0] = position[1] * 64
        this.position[1] = position[0] * 64
        this.connectedLevel = connectedLevel
    }
}

class Goal extends Floor {
    constructor(position) {
        super()
        this.position[0] = position[1] * 64
        this.position[1] = position[0] * 64
    }
}

class Thing {
    position = [0, 0]
    solid = false
    pushable = false
    moving = false
    moveDist = 0
    moveDirection = 'N'

    constructor() {
    
    }
}

class ThingEmpty extends Thing {
    constructor(position) {
        super()
        this.solid = false
        this.pushable = false
        this.position[0] = position[1] * 64
        this.position[1] = position[0] * 64
    }
}

class Wall extends Thing {
    constructor(position) {
        super()
        this.solid = true
        this.pushable = false
        this.position[0] = position[1] * 64
        this.position[1] = position[0] * 64
    }
}

class Box extends Thing {
    constructor(position) {
        super()
        this.solid = true
        this.pushable = true
        this.position[0] = position[1] * 64
        this.position[1] = position[0] * 64
    }
}

class Player extends Thing {
    constructor(position) {
        super()
        this.position[0] = position[1] * 64
        this.position[1] = position[0] * 64
    }
}