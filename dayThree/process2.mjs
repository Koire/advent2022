import { pipe } from "../lib/pipe.mjs"
import * as fs from "fs"

//import the data
const importData = (filename) => fs.readFileSync(filename).toString()

const splitArray = array => array.split("\n")

const groupArray = (array) => array.reduce((acc, current, idx) => {
    if(idx % 3 == 0 && idx < array.length - 2) {
        return [
            ...acc,
            [current.split(""), array[idx+1].split(""), array[idx+2].split("")]
        ]
    }
    return acc
}, [])

const getPoints = (char) => ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char) + 1)

const sumPoints = badges => badges.reduce((sum, current) => sum + getPoints(current), 0)

const getABadge = groups => {
    // console.log(one, two, three)
    return groups.map(([one,two,three]) => {
        return [...new Set(three.filter(char => {
            return one.includes(char) && two.includes(char)
        }))][0]
    });
}

pipe(
    importData,
    splitArray,
    groupArray,
    getABadge,
    sumPoints,
    console.log)("./input.txt")