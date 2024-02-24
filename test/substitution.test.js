// Write your tests here!
const { expect } = require("chai");
const { substitution } = require("../src/substitution");

// Ciphers
const strQwertyCipher = "qwertyuiopasdfghjklzxcvbnm";
const strFullCipher = "yhs&irnwp%mdlo*@k#e?zvtjgf";
const strFullCaseCipher = "yhs&irnWp%mdlo*@k#e?Zvtjgf";

// Decoded strings
const strSimpleString = "substitution";
const strComplexString = "this is a s3cret me$$age!";
const strCaseComplexString = "This IS a S3cret mE$$age!"

// Encoded strings
const strEcSimpleStringSimpleCipher = "lxwlzozxzogf"; // 'substitution'
const strEcSimpleStringFullCipher = "ezhe?p?z?p*o"; // 'substitution'
const strEcComplexStringSimpleCipher = "ziol ol q l3ektz dt$$qut!"; // 'this is a s3cret me$$age!'
const strEcComplexStringFullCipher = "?wpe pe y e3s#i? li$$yni!"; // 'this is a s3cret me$$age!'

describe("substitution()", () => {
    describe("Error handling", () => {
        it("should return false if there is no substitution cipher", () => {
            const actual = substitution(strSimpleString);
            expect(actual).to.be.false;
        });
        it("should return false if the substitution cipher is less than 26 characters in length", () => {
            const actual = substitution(strSimpleString, "qwerty");
            expect(actual).to.be.false;
        });
        it("should return false if the substitution cipher is more than 26 characters in length", () => {
            const actual = substitution(strSimpleString, "qwertyuiopasdfghjklzxcvbnm!");
            expect(actual).to.be.false;
        });
        it("should return false if the substitution cipher contains duplicate characters", () => {
            const actual = substitution(strSimpleString, "fl&skdfbpoigprkdsf;gihsitm");
            expect(actual).to.be.false;
        });
        it("should return false, when encoding, if the input string contains any non-alphabetic/whitespace character that the substitution cipher contains", () => {
            const actual = substitution(strComplexString, "yhs&irnwp%mdlo*@k#e!zvtjgf");
            expect(actual).to.be.false;
        });
    });
    describe("Encoding", () => {
        it("should return a string encoded with an alphabetic cipher", () => {
            const actual = substitution(strSimpleString, strQwertyCipher);
            expect(actual).to.equal(strEcSimpleStringSimpleCipher);
        });
        it("should return a string encoded with a cipher of any character", () => {
            const actual = substitution(strSimpleString, strFullCipher);
            expect(actual).to.equal(strEcSimpleStringFullCipher);
        });
        it("should preserve non-alphabetic characters with an alphabetic cipher", () => {
            const actual = substitution(strComplexString, strQwertyCipher);
            expect(actual).to.equal(strEcComplexStringSimpleCipher);
        });
        it("should preserve non-alphabetic characters with a cipher of any character", () => {
            const actual = substitution(strComplexString, strFullCipher);
            expect(actual).to.equal(strEcComplexStringFullCipher);
        });
        it("should ignore case in the message", () => {
            const actual = substitution(strCaseComplexString, strFullCipher);
            expect(actual).to.equal(strEcComplexStringFullCipher);
        });
        it("should ignore case in the cipher", () => {
            const actual = substitution(strCaseComplexString, strFullCaseCipher);
            expect(actual).to.equal(strEcComplexStringFullCipher);
        });
    });
    describe("Decoding", () => {
        it("should decode a string with the provided alphabetic cipher", () => {
            const actual = substitution(strEcSimpleStringSimpleCipher, strQwertyCipher, false);
            expect(actual).to.equal(strSimpleString);
        });
        it("should decode a string with the provided cipher of any character", () => {
            const actual = substitution(strEcSimpleStringFullCipher, strFullCipher, false);
            expect(actual).to.equal(strSimpleString);
        });
        it("should preserve non-alphabetic characters when decoding with the provided alphabetic cipher", () => {
            const actual = substitution(strEcComplexStringSimpleCipher, strQwertyCipher, false);
            expect(actual).to.equal(strComplexString);
        });
        it("should preserve non-alphabetic characters when decoding with the provide cipher of any character", () => {
            const actual = substitution(strEcComplexStringFullCipher, strFullCipher, false);
            expect(actual).to.equal(strComplexString);
        });
        it("should ignore case in the cipher", () => {
            const actual = substitution(strEcComplexStringFullCipher, strFullCaseCipher, false);
            expect(actual).to.equal(strComplexString);
        });
    });
});