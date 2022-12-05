import * as fs from "fs";

export const importInput = filename => fs.readFileSync(filename).toString()

export const importInputAsArray = filename => importInput(filename).split("\n").filter(x => x)