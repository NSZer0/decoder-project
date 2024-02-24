// Write your tests here!
const { expect } = require("chai");
const { polybius } = require("../src/polybius");

// Base strings
const strSimpleString = "test";
const strSimpleStringIJ = "jimmy";
const strComplexString = "this is a secret message!";
const strCaseComplexString = "THIS is a seCret meSsaGe!"

// Encoded strings
const strEcSimpleString = "44513444"; // 'test'
const strEcSimpleStringIJ = "4242232345"; // 'jimmy'
const strEcComplexString = "44324234 4234 11 345131245144 23513434112251!"; // 'this is a secret message!'

// Decoded strings
const strDcSimpleStringIJ = "(i/j)(i/j)mmy";
const strDcComplexString = "th(i/j)s (i/j)s a secret message!";

describe("polybius()", () => {
    describe("Error handling", () => {
        it("should return false when encoding, if the input contains a number", () => {
            const actual = polybius("test 4");
            expect(actual).to.be.false;
        });
        it("should return false when decoding, if the total number count is even", () => {
            const actual = polybius("442431 231", false);
            expect(actual).to.be.false;
        });
        it("should return false when decoding, if a number value is not valid i.e. not 1-5", () => {
            const actual = polybius("4424362314", false);
            expect(actual).to.be.false;
        });
    });
    describe("Encoding", () => {
        it("should return a string", () => {
            const actual = polybius(strSimpleStringIJ);
            expect(actual).to.be.a('string');
        });
        it("should transform the string into a string of number pairs", () => {
            const actual = polybius(strSimpleString);
            expect(actual).to.equal(strEcSimpleString);
        });
        it("should transform 'i' and 'j' into '42'", () => {
            const actual = polybius(strSimpleStringIJ);
            expect(actual).to.equal(strEcSimpleStringIJ);
        });
        it("should preserve spaces and non-alphabetic characters", () => {
            const actual = polybius(strComplexString);
            expect(actual).to.equal(strEcComplexString);
        });
        it("should ignore case", () => {
            const actual = polybius(strCaseComplexString);
            expect(actual).to.equal(strEcComplexString);
        });
    });
    describe("Decoding", () => {
        it("should convert the string of number pairs into a string of letters", () => {
            const actual = polybius(strEcSimpleString, false);
            expect(actual).to.equal(strSimpleString);
        });
        it("should translate '42' into '(i/j)'", () => {
            const actual = polybius(strEcSimpleStringIJ, false);
            expect(actual).to.equal(strDcSimpleStringIJ);
        });
        it("should preserve spaces and non-alphabetic characters", () => {
            const actual = polybius(strEcComplexString, false);
            expect(actual).to.equal(strDcComplexString);
        });
    });
});