import { test } from "uvu"
import * as assert from "uvu/assert"
import {fileSystem} from "../daySeven/fileSystem.mjs"

test("It can navigate to root", () => {
    const {cd} = fileSystem()
    assert.equal(cd("/").name, "/")
})

test("It can't navigate above root", () => {
    const {cd} = fileSystem()
    assert.equal(cd("..").name, "/")

})

test("It can navigate to children", () => {
    const {cd, mkdir} = fileSystem()
    mkdir("a")
    assert.equal(cd("a").name, "a")
})

test("It can add a child", () => {
    const {mkdir, ls} = fileSystem()
    mkdir("a")
    assert.is(ls().dirs.find(dir => dir.name == "a") != null, true)
})

test("It can list directories", () => {
    const {mkdir, ls} = fileSystem()
    mkdir("a")
    assert.is(ls().dirs.length > 0, true)
})

test("It can add a file", () => {
    const { dd, ls } = fileSystem()
    dd("testfile", 10000)
    assert.is(ls().files.length > 0, true)
})

test("It can navigate to children and back", () => {
    const { cd, mkdir } = fileSystem()
    mkdir("a")
    assert.equal(cd("a").name, "a")
    assert.equal(cd("..").name, "/")
})

test.only("It can sum its directories", () => {
    const {cd, mkdir, du, dd} = fileSystem()
    dd("test", 1000)
    dd("test2", 1000)
    assert.is(du(), 2000)
    mkdir("a")
    mkdir("b")
    cd("a")
    dd("test3", 1500)
    dd("test4", 1500)
    cd("..")
    cd("b")
    dd("test3", 1500)
    dd("test4", 1500)
    assert.is(du(), 3000)
    cd("/")
    assert.is(du(), 8000)
})