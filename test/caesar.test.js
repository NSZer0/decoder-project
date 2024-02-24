// Write your tests here!
const { expect } = require("chai");
const { caesar } = require("../src/caesar");

// Decoded string
const strDcSimpleString = "thinkful";
const strDcComplexString = "this is a secret message!";
const strDcCaseComplexString = "THIS is a seCret meSsaGe!"

// Encoded strings
const strEcSimpleStringPosShift = "wklqnixo"; // 'thinkful' shifted +3
const strEcSimpleStringNegShift = "qefkhcri"; // 'thinkful' shifted -3
const strEcSimpleStringWrapPosShift = "lzafcxmd"; // 'thinkful' shifted +18
const strEcSimpleStringWrapNegShift = "bpqvsnct"; // 'thinkful' shifted -18
const strEcComplexString = "bpqa qa i amkzmb umaaiom!"; // 'this is a secret message!' shifted +8
const strEcCaseComplexString = "bpQA qa i amkZmb umaaiom!" // Previous string but with case changes

describe("caesar()", () => {
    describe("Error handling", () => {
        it("should return false is nShift is 0", () => {
            const actual = caesar(strDcSimpleString, 0);
            expect(actual).to.be.false;
        });
        it("should return false is nShift is greater than 25", () => {
            const actual = caesar(strDcSimpleString, 26);
            expect(actual).to.be.false;
        });
        it("should return false is nShift is less than than -25", () => {
            const actual = caesar(strDcSimpleString, -26);
            expect(actual).to.be.false;
        });
        it("should return false is nShift is not present", () => {
            const actual = caesar(strDcSimpleString);
            expect(actual).to.be.false;
        });
    });
    describe("Encoding", () => {
        it("should properly encode a simple string with a positive nShift", () => {
            const actual = caesar(strDcSimpleString, 3);
            expect(actual).to.equal(strEcSimpleStringPosShift);
        });
        it("should properly encode a simple string with a negative nShift", () => {
            const actual = caesar(strDcSimpleString, -3);
            expect(actual).to.equal(strEcSimpleStringNegShift);
        });
        it("should preserve spaces and non-alphabetic characters", () => {
            const actual = caesar(strDcComplexString, 8);
            expect(actual).to.equal(strEcComplexString);
        });
        it("should ignore case", () => {
            const actual = caesar(strDcCaseComplexString, 8);
            expect(actual).to.equal(strEcComplexString);
        });
        it("should wrap to the beginning of the cipher if the nShift goes above 'z'", () => {
            const actual = caesar(strDcSimpleString, 18);
            expect(actual).to.equal(strEcSimpleStringWrapPosShift);
        });
        it("should wrap to the end of the cipher if the nShift goes below 'a'", () => {
            const actual = caesar(strDcSimpleString, -18);
            expect(actual).to.equal(strEcSimpleStringWrapNegShift);
        });
    });
    describe("Decoding", () => {
        it("should properly decode a simple string with a positive nShift", () => {
            const actual = caesar(strEcSimpleStringPosShift, 3, false);
            expect(actual).to.equal(strDcSimpleString);
        });
        it("should properly decode a simple string with a negative nShift", () => {
            const actual = caesar(strEcSimpleStringNegShift, -3, false);
            expect(actual).to.equal(strDcSimpleString);
        });
        it("should preserve spaces and non-alphabetic characters when decoding", () => {
            const actual = caesar(strEcComplexString, 8, false);
            expect(actual).to.equal(strDcComplexString);
        });
        it("should ignore case when decoding", () => {
            const actual = caesar(strEcCaseComplexString, 8, false);
            expect(actual).to.equal(strDcComplexString);
        });
        it("should wrap to the beginning of the cipher if the nShift goes above 'z' when decoding", () => {
            const actual = caesar(strEcSimpleStringWrapPosShift, 18, false);
            expect(actual).to.equal(strDcSimpleString);
        });
        it("should wrap to the end of the cipher if the nShift goes below 'a' when decoding", () => {
            const actual = caesar(strEcSimpleStringWrapNegShift, -18, false);
            expect(actual).to.equal(strDcSimpleString);
        });
    });
});