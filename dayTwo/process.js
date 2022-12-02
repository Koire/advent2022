const fs = require('fs');

const pt1Mapping = {
    "X" : "rock",
    "Y" : "paper",
    "Z" : "scissors"
}
const pt2Mapping = {
    "X": {
        "target": "win",
    },
    "Y": {
        "target": "draw",
    },
    "Z": {
        "target": "lose",
    }
}
const scoring = {
    "rock": {
        "points" : 1,
        "lose": ["paper"],
        "draw": ["rock"],
        "win" : ["scissors"]
    },
    "scissors": {
        "points" : 3,
        "lose": ["rock"],
        "draw": ["scissors"],
        "win" : ["paper"]
    },
    "paper": {
        "points" : 2,
        "lose": ["scissors"],
        "draw": ["paper"],
        "win" : ["rock"]
    }

}

const  mapping = {
    A : "rock",
    B : "paper",
    C : "scissors"
}

const LOST_VALUE = 0
const DRAW_VALUE = 3
const WIN_VALUE = 6


const evalTurn = ([opponent, self], strategic=false) => {
    if (!self || !opponent) return 0
    const oppValue = mapping[opponent]
    const selfValue = strategic ? scoring[oppValue][pt2Mapping[self].target][0] : pt1Mapping[self]
    console.log({opponent, self, oppValue, selfValue})
    const pickedValue = scoring[selfValue]
    if (selfValue == oppValue) {
        return (DRAW_VALUE + pickedValue.points)
    }
    return pickedValue.points + (pickedValue.win.includes(oppValue) ? WIN_VALUE : LOST_VALUE)
}

const input = fs.readFileSync('input.txt', 'utf-8')
const points = input.split(/\r?\n/).map((line) => {
    const values = line.split(" ")
    return evalTurn(values)
}).reduce((total, current) => total + current, 0)
console.log(points)

const points2 = input.split(/\r?\n/).map((line) => {
    const values = line.split(" ")
    return evalTurn(values, true)
}).reduce((total, current) => total + current, 0)

console.log(points2)