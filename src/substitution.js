// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  // Test for duplicate characters in the cipher
  const cipherHasDuplicateCharacters = (strSubCipher) => {
    // Convert the cipher string to an array so we can use some()
    const arySubCipher = strSubCipher.split("");
    // Use some() to check if each character in the cipher matches another character
    // Use index+1 for the starting point so it starts checking at the index after the current index
    // otherwise it will always match
    return arySubCipher.some((char, index) => strSubCipher.includes(char, index+1));
  }

  // Test for any non-alphabetic/whitespace characters in the input string that are also in the substition cipher
  const hasMatchingSpecialCharacters = (strInputLower, strSubCipher) => {
    // Convert strInputLower into an array of each character
    const aryInput = strInputLower.split("");
    // Use some() to see if any non-alphabetic characters in the input string are also in the cipher
    return aryInput.some((char) => {
      const nCode = char.charCodeAt(); // Get the character code of the current character
      if (nCode < 97 || nCode > 122) // Lower case alphabet char code range is 97 - 122
        if (strSubCipher.includes(char)) return true; // Return true if there is a match

      return false; // Return false if there if there are no special character matches
    });
  }

  function substitution(strInput, strSubCipher = "", bEncode = true) {
    // Capital letters in the cipher will not decode properly, so convert it to lower case
    // Do this before checking for duplicate characters because this might create some
    const strSubCipherLower = strSubCipher.toLowerCase();
    // Test that the substitution cipher is exactly 26 characters, if not, return false
    if (strSubCipherLower.length !== 26) return false;
    // Test if the substitution cipher contains repeating characters, if it does, return false
    if (cipherHasDuplicateCharacters(strSubCipherLower)) return false;

    // Convert the input string to lower case so all alphabet characters fall in the code range of 97 to 122
    const strInputLower = strInput.toLowerCase();

    // Not Required?
    // If encoding, test if strInputLower contains non-alphabetic characters that are part of the cipher
    // If this is true, trying to decode the encoded message with that cipher will not work properly
    if (bEncode)
      if (hasMatchingSpecialCharacters(strInputLower, strSubCipherLower)) return false; // Non-alphabetic character in strInputLower matches a cipher character

    // Declare the final string after encoding or decoding
    let strFinalString = "";

    // Iterate through the input message
    for (let i = 0; i < strInputLower.length; i++)
    {
      if (bEncode) // Encoding the input
      {
        // Get the character value of the current index and align it with strSubCipherLower
        const nCharCode = strInputLower.charCodeAt(i) - 97; // ex. 'a' (97) -> 0, the first index of strSubCipherLower
        // If nCharCode falls outside the range of 0-25, leave it alone, add it to the final string as is
        if (nCharCode < 0 || nCharCode > 25)
          strFinalString += strInputLower[i];
        else
        {
          // Because we aligned the value of nCharCode with strSubCipherLower, nCharCode will be the index of strSubCipherLower
          strFinalString += strSubCipherLower[nCharCode];
        }
      }
      else // Decoding the input
      {
        // Use indexOf() to return the first index strSubCipherLower that matches the current character for this iteration of strInput
        // If there is no match, indexOf() returns -1
        const nMatchIndex = strSubCipherLower.indexOf(strInputLower[i]);
        if (nMatchIndex === -1) // No match, add character as is to preserve spaces and special characters
          strFinalString += strInputLower[i];
        else // Match found
        {
          // To decode the cipher, add 97 to the matching index of strSubCipherLower to transform back to the lower case alphabetic char codes
          // Ex. Index of 0 + 97 is the char code of 'a'
          const nCharCode = nMatchIndex + 97;
          strFinalString += String.fromCharCode(nCharCode);
        }
      }
    }

    return strFinalString;
  }

  return {
    substitution,
  };
})();

substitutionModule.substitution("this is a s3cret me$$age!", "fl&skdfbpoigprkdsf;gihsitm")

module.exports = { substitution: substitutionModule.substitution };
