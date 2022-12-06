import { test } from "uvu"
import * as assert from "uvu/assert"
import { calcTune } from "../daySix/tune.mjs"

const tests = [
    {
        test: "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
        expected: 7,
        expected2: 19
    },
    {
        test: "bvwbjplbgvbhsrlpgdmjqwftvncz",
        expected: 5,
        expected2: 23
    },
    {
        test: "nppdvjthqldpwncqszvftbrmjlhg",
        expected: 6,
        expected2: 23
    },
    {
        test: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
        expected: 10,
        expected2: 29
    },
    {
        test: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
        expected: 11,
        expected2: 26
    }
]

test("Verify tests part one", () => {
    tests.map(({test, expected}) => {
        assert.equal(calcTune()(test), expected)
    })
})

test("Verify Tests part two", () => {
    tests.map(({test, expected2}) => {
        assert.equal(calcTune(14)(test), expected2)
    })
})

test.run()