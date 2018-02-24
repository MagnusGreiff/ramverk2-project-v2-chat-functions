"use strict";

const assert = require("assert");
const chatFunctions = require("../chatFunctions");
//
/* eslint-disable max-len */

/* global describe */
/* global it */

describe("Check 2+2", function() {
    it("it should be 4", function() {
        let res = 2 + 2;

        assert.equal(res, 4);
    });
});

describe("Check if checkProtocol returns correct text", function() {
    describe("Check if protocol json returns correct text", function() {
        it('should return "hello world"', async function() {
            let data = {
                data: '{"data":"{\\"type\\":\\"message\\",\\"text\\":\\"hello world\\",\\"id\\":\\"Munge\\",\\"date\\":1513332964182,\\"connect\\":false,\\"disconnect\\":false}"}'
            };
            let expectedResult = "(11:16:04) <b>Munge said</b>: hello world<br>";
            let res = await chatFunctions.checkProtocol(data, "json");

            assert.equal(expectedResult, res);
        });
    });

    describe("Check if protocol text returns correct text", function() {
        it('should return "hello world"', async function() {
            let data = {
                data: '{"type":"message","text":"hello world","id":"Munge","date":1513332964182,"connect":false,"disconnect":false}'
            };
            let expectedResult = "(11:16:04) <b>Munge said</b>: hello world<br>";
            let res = await chatFunctions.checkProtocol(data, "text");

            assert.equal(expectedResult, res);
        });
    });
});

describe("Check if correct text displays when connecting or disconnecting", function() {
    describe("Connecting text", function() {
        it("should display 'name' connected", async function() {
            let data = {
                data: '{"data":"{\\"type\\":\\"message\\",\\"text\\":\\" connected\\",\\"id\\":\\"Munge\\",\\"date\\":1513332964182,\\"connect\\":true,\\"disconnect\\":false}"}'
            };
            let expectedResult = "(11:16:04) Munge connected";
            let res = await chatFunctions.checkProtocol(data, "json");

            assert.equal(expectedResult, res);
        });
    });

    describe("Disconnecting text", function() {
        it("should display 'name' disconnected", async function() {
            let data = {
                data: '{"data":"{\\"type\\":\\"message\\",\\"text\\":\\" disconnected\\",\\"id\\":\\"Munge\\",\\"date\\":1513332964182,\\"connect\\":false,\\"disconnect\\":true}"}'
            };
            let expectedResult = "(11:16:04) <b>Munge disconnected</b>";
            let res = await chatFunctions.checkProtocol(data, "json");

            assert.equal(expectedResult, res);
        });
    });
});

// describe("Check if regex works", function() {
//     it("should return string with <a> and correct text and link", async function() {
//         let data = {
//             data: '{"data":"{\\"type\\":\\"message\\",\\"text\\":\\"[post]8747474[/post]\\",\\"id\\":\\"Munge\\",\\"date\\":1513332964182,\\"connect\\":false,\\"disconnect\\":false}"}'
//         };
//         let expectedResult = "(11:16:04) <b>Munge said</b>: <a href='https://stackoverflow.com/a/8747474' target='_blank'>Intent Share Not Populating Facebook</a><br>";
//         let res = await chatFunctions.checkProtocol(data, "json");
//
//         assert.equal(expectedResult, res);
//     });
// });

describe("Check is setSubProtocol actually sets protocol", function() {
    it("should set protocol to json", function() {
        let protocol = chatFunctions.setSubProtocol("json");

        assert.equal(protocol, "json");
    });
});
