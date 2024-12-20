class Level {
    name = ''
    row = 0
    col = 0
    player = [0, 0]
    goal = [0, 0]
    floor = []
    thing = []
    laser = []
    group = {}

    camera = [0, 0]

    constructor(data) {
        this.name = data['Name']
        this.row = data['Size'][0]
        this.col = data['Size'][1]
        this.player[0] = data['Start'][0]
        this.player[1] = data['Start'][1]
        this.goal[0] = data['Goal'][0]
        this.goal[1] = data['Goal'][1]
        this.group = {}

        for (let i = 0; i < data['Groups'].length; i++) {
            this.group[data['Groups'][i]] = []
        }
        
        this.floor = []

        for (let i = 0; i < this.row; i++) {
            let temp = []
            for (let j = 0; j < this.col; j++) {
                temp.push(new FloorEmpty({'Position': [i, j]}))
            }
            this.floor.push(temp)
        }

        for (let i = 0; i < data['Floor'].length; i++) {
            let tempFloor = data['Floor'][i]
            
            if (tempFloor['Type'] === 'Connection') {
                let pos = [tempFloor['Position'][0], tempFloor['Position'][1]]
                this.floor[pos[0]][pos[1]] = new Connection(tempFloor)
            } else if (tempFloor['Type'] === 'PressureButton') {
                let pos = [tempFloor['Position'][0], tempFloor['Position'][1]]
                let floorInstance = new PressureButton(tempFloor)
                this.floor[pos[0]][pos[1]] = floorInstance
                this.group[tempFloor['Group']].push(floorInstance)
            } else if (tempFloor['Type'] === 'Gate') {
                let pos = [tempFloor['Position'][0], tempFloor['Position'][1]]
                let floorInstance = new Gate(tempFloor)
                this.floor[pos[0]][pos[1]] = floorInstance
            } else if (tempFloor['Type'] === 'LevelGate') {
                let pos = [tempFloor['Position'][0], tempFloor['Position'][1]]
                let floorInstance = new LevelGate(tempFloor)
                this.floor[pos[0]][pos[1]] = floorInstance
            }
        }

        this.floor[this.goal[0]][this.goal[1]] = new Goal({'Position': [this.goal[0], this.goal[1]]})

        this.thing = []

        for (let i = 0; i < this.row; i++) {
            let temp = []
            for (let j = 0; j < this.col; j++) {
                temp.push(new ThingEmpty({'Position': [i, j]}))
            }
            this.thing.push(temp)
        }

        for (let i = 0; i < data['Wall'].length; i++) {
            let pos = [data['Wall'][i][0], data['Wall'][i][1]]
            this.thing[pos[0]][pos[1]] = new Wall({'Position': [pos[0], pos[1]]})
        }

        for (let i = 0; i < data['Thing'].length; i++) {
            let tempThing = data['Thing'][i]
            
            if (tempThing['Type'] === 'Box') {
                let pos = [tempThing['Position'][0], tempThing['Position'][1]]
                this.thing[pos[0]][pos[1]] = new Box(tempThing)
            } else if (tempThing['Type'] === 'NumGlass') {
                let pos = [tempThing['Position'][0], tempThing['Position'][1]]
                this.thing[pos[0]][pos[1]] = new NumGlass(tempThing)
            } else if (tempThing['Type'] === 'LaserEmitter') {
                let pos = [tempThing['Position'][0], tempThing['Position'][1]]
                let thingInstance = new LaserEmitter(tempThing)
                this.thing[pos[0]][pos[1]] = thingInstance
                this.group[tempThing['Group']].push(thingInstance)
            } 
        }

        this.thing[this.player[0]][this.player[1]] = new Player({'Position': [this.player[0], this.player[1]]})

        for (let i = 0; i < this.row; i++) {
            let temp = []
            for (let j = 0; j < this.col; j++) {
                temp.push({'H' : false, 'V': false})
            }
            this.laser.push(temp)
        }

        this.applyBoardChange()
    }

    movePlayer(direction) {
        let cell1 = [this.player[0] + directionInfo[direction][0], this.player[1] + directionInfo[direction][1]]
        let cell2 = [this.player[0] + directionInfo[direction][0] * 2, this.player[1] + directionInfo[direction][1] * 2]
        let playerThing = this.thing[this.player[0]][this.player[1]]

        if (this.insideBoard(cell1[0], cell1[1])) {
            let tempFloor1 = this.floor[cell1[0]][cell1[1]] 
            let tempThing1 = this.thing[cell1[0]][cell1[1]]
            if (tempThing1.solid === false && tempFloor1.solid === false) {
                //playerThing.position[0] += directionPosition[direction][0]
                //playerThing.position[1] += directionPosition[direction][1]
                //tempThing1.position[0] -= directionPosition[direction][0]
                //tempThing1.position[1] -= directionPosition[direction][1]
                if (playerThing.moveQueue.length === 0) {
                    playerThing.moveQueue.push([direction, [playerThing.position[0] + directionPosition[direction][0], playerThing.position[1] + directionPosition[direction][1]]])
                } else {
                    let index = playerThing.moveQueue.length - 1
                    let tempPosition = playerThing.moveQueue[index][1]
                    playerThing.moveQueue.push([direction, [tempPosition[0] + directionPosition[direction][0], tempPosition[1] + directionPosition[direction][1]]])
                }

                if (!(tempThing1 instanceof ThingEmpty)) {
                    tempThing1.moveQueue.push([direction, [tempThing1.position[0] - directionPosition[direction][0], tempThing1.position[1] - directionPosition[direction][1]]])
                } else {
                    tempThing1.position[0] -= directionPosition[direction][0]
                    tempThing1.position[1] -= directionPosition[direction][1]
                }

                this.swapThing(this.player[0], this.player[1], cell1[0], cell1[1])
                this.player[0] = cell1[0]
                this.player[1] = cell1[1]
            } else {
                if (this.insideBoard(cell2[0], cell2[1])) {
                    let tempThing2 = this.thing[cell2[0]][cell2[1]]
                    let tempFloor2 = this.thing[cell2[0]][cell2[1]]
                    if (tempThing1.pushable === true && tempThing2.solid === false && tempFloor2.solid === false) {
                        playerThing.position[0] += directionPosition[direction][0]
                        playerThing.position[1] += directionPosition[direction][1]
                        tempThing1.position[0] += directionPosition[direction][0]
                        tempThing1.position[1] += directionPosition[direction][1]
                        tempThing2.position[0] -= directionPosition[direction][0] * 2
                        tempThing2.position[1] -= directionPosition[direction][1] * 2
                        this.swapThing(cell1[0], cell1[1], cell2[0], cell2[1])
                        this.swapThing(this.ppupungeggang2/Laser_Puzzle_1layer[0], this.player[1], cell1[0], cell1[1])
                        this.player[0] = cell1[0]
                        this.player[1] = cell1[1]
                    }
                }
            }
        }

        this.applyBoardChange()
    }

    applyBoardChange() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                this.laser[i][j]['H'] = false
                this.laser[i][j]['V'] = false
            }
        }

        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                let tempFloor = this.floor[i][j]
                let tempThing = this.thing[i][j]

                if (tempThing instanceof LaserEmitter) {
                    tempThing.findPassingCell([i, j], this.thing, this.laser, [this.row, this.col])
                }
            }
        }

        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                let tempFloor = this.floor[i][j]
                let tempThing = this.thing[i][j]

                if (tempFloor instanceof PressureButton) {
                    tempFloor.checkTruth(tempThing)
                }

                if (tempThing instanceof LaserEmitter) {
                    tempThing.checkTruth(this.thing)
                }
            }
        }

        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                let tempFloor = this.floor[i][j]
                let tempThing = this.thing[i][j]

                if (tempFloor instanceof Gate) {
                    tempFloor.checkTruth(this.group)
                }

                if (tempFloor instanceof LevelGate) {
                    tempFloor.checkTruth()
                }
            }
        }
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

    moveThings() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                if (this.thing[i][j] instanceof Player) {
                    this.thing[i][j].handleMove()
                }
            }
        }
    }
}

class Floor {
    position = [0, 0]
    solid = false

    constructor(properties) {
        this.position[0] = properties['Position'][1] * 64
        this.position[1] = properties['Position'][0] * 64
    }
}

class FloorEmpty extends Floor {
    constructor(properties) {
        super(properties)
    }
}

class PressureButton extends Floor {
    state = false
    group = -1
    constructor(properties) {
        super(properties)
        this.solid = properties['Solid']
        this.group = properties['Group']
    }

    checkTruth(thing) {
        if (thing instanceof ThingEmpty) {
            this.state = false
        } else {
            this.state = true
        }pupungeggang2/Laser_Puzzle_1
    }
}

class Connection extends Floor {
    connectedLevel = ''
    
    constructor(properties) {
        super(properties)
        this.connectedLevel = properties['Connected']
    }
}

class Goal extends Floor {
    constructor(properties) {
        super(properties)
        this.position[0] = properties['Position'][1] * 64
        this.position[1] = properties['Position'][0] * 64
    }
}

class Gate extends Floor {
    condition = []
    opened = false
    constructor(properties) {
        super(properties)
        this.solid = properties['Solid']
        this.condition = properties['Condition']
        this.opened = properties['Opened']
    }

    checkTruth(group) {
        this.opened = true
        this.solid = false
        for (let i = 0; i < group[this.condition].length; i++) {
            if (group[this.condition][i].state === false) {
                this.opened = false
                this.solid = true
                return
            }
        }
    }
}

class LevelGate extends Floor {
    condition = []
    opened = false
    constructor(properties) {
        super(properties)
        this.solid = properties['Solid']
        this.condition = properties['Condition']
        this.opened = properties['Opened']
    }

    checkTruth() {
        this.opened = true
        this.solid = false
        for (let i = 0; i < this.condition.length; i++) {
            if (varSave.clearedLevel[this.condition[i]] === false) {
                this.opened = false
                this.solid = true
                return
            }
        }
    }
}

class Thing {
    position = [0, 0]
    solid = false
    pushable = false
    moving = false
    moveDist = 0
    moveDirection = 'None'
    moveQueue = []

    constructor(properties) {
        this.moveDist = 0
        this.moveDirection = 'None'
        this.moveQueue = []
        this.position[0] = properties['Position'][1] * 64
        this.position[1] = properties['Position'][0] * 64
    }

    handleMove() {
        if (this.moveQueue.length != 0) {
            let first = this.moveQueue[0]
            if (this.moveDist >= 60) {
                this.moveDist = 0
                this.position[0] = first[1][0]
                this.position[1] = first[1][1]
                this.moveQueue.shift()
            } else {
                this.moveDist += moveSpeed * 64 * delta / 1000
                this.position[0] += moveSpeed * directionPosition[first[0]][0] * delta / 1000
                this.position[1] += moveSpeed * directionPosition[first[0]][1] * delta / 1000
            }
        }
    }
}

class ThingEmpty extends Thing {
    constructor(properties) {
        super(properties)
    }
}

class Wall extends Thing {
    constructor(properties) {
        super(properties)
        this.solid = true
        this.pushable = false
    }
}

class Box extends Thing {
    constructor(properties) {
        super(properties)
        this.solid = properties['Solid']
        this.pushable = properties['Pushable']
    }
}

class NumGlass extends Thing {
    number = 0
    constructor(properties) {
        super(properties)
        this.solid = properties['Solid']
        this.pushable = properties['Pushable']
        this.number = properties['Number']
    }
}

class LaserEmitter extends Thing {
    rayDirection = ''
    condition = ['', 0]
    passingCell = []
    currentNum = 0
    state = false
    constructor(properties) {
        super(properties)
        this.solid = properties['Solid']
        this.pushable = properties['Pushable']
        this.rayDirection = properties['RayDirection']
        this.condition = properties['Condition']
    }

    checkTruth(thing) {
        this.currentNum = 0
        for (let i = 0; i < this.passingCell.length; i++) {
            let tempThing = thing[this.passingCell[i][0]][this.passingCell[i][1]]
            if (tempThing instanceof NumGlass) {
                this.currentNum += tempThing.number
            }
        }

        if (this.condition[0] === 'Equal') {
            if (this.currentNum === this.condition[1]) {
                this.state = true
                return
            }
        }

        this.state = false
    }

    findPassingCell(pos, thing, laser, size) {
        this.passingCell = []
        let currentPosition = [pos[0], pos[1]]
        let currentRayDirection = this.rayDirection
        let iter = 0

        while (iter < 100) {
            currentPosition[0] += directionInfo[currentRayDirection][0]
            currentPosition[1] += directionInfo[currentRayDirection][1]

            let tempThing = thing[currentPosition[0]][currentPosition[1]]

            if (!(this.insideBoard(currentPosition[0], currentPosition[1], size[0], size[1]))) {
                break
            }

            if (tempThing instanceof ThingEmpty) {
                this.passingCell.push([currentPosition[0], currentPosition[1]])
                if (currentRayDirection === 'Left' || currentRayDirection === 'Right') {
                    laser[currentPosition[0]][currentPosition[1]]['H'] = true
                } else {
                    laser[currentPosition[0]][currentPosition[1]]['V'] = true
                }
            } else if (tempThing instanceof NumGlass) {
                this.passingCell.push([currentPosition[0], currentPosition[1]])
                if (currentRayDirection === 'Left' || currentRayDirection === 'Right') {
                    laser[currentPosition[0]][currentPosition[1]]['H'] = true
                } else {
                    laser[currentPosition[0]][currentPosition[1]]['V'] = true
                }
            } else {
                break
            }

            iter += 1
        }
    }

    insideBoard(row, col, rsize, csize) {
        if (row >= 0 && row < rsize && col >= 0 && col < csize) {
            return true
        }

        return false
    }
}

class Player extends Thing {
    constructor(properties) {
        super(properties)
    }
}
