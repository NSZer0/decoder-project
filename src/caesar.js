// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {
  // you can add any code you want within this function scope

  function caesar(strInput = "", nShift = -100, bEncode = true) {
    // If the first parameter is an empty string, return false
    if (strInput === "") return false;
    // If nShift is out of bounds (missing, < -25, or > 25) return false
    if (nShift === 0 || nShift < -25 || nShift > 25) return false;
    
    // Set the string in all lower case because capital letters have a lower char code range
    const strInputLower = strInput.toLowerCase();

    // Because decoding is just the reverse of encoding in this case, we can multiply nShift by -1 when decoding
    // to reverse the encoding
    if(!bEncode)
      nShift *= -1;

    // Declare the final string after encoding or decoding
    let strFinalString = "";

    // Iterate through each character in the string to manipulate the charcode
    for (let i = 0; i < strInputLower.length; i++)
    {
      // Get the char code of the current index
      const nCharCode = strInputLower.charCodeAt(i);
      if (nCharCode < 97 || nCharCode > 122) // Do not manipulate any char codes out of bounds
        strFinalString += String.fromCharCode(nCharCode);
      else
      {
        const nMin = 97; const nMax = 122; // Minimum and maximum char code values
        let nShiftedCharCode = nCharCode + nShift;
        if (nShiftedCharCode > nMax) //Char code shifted beyond 'z', loop back to 'a'
        {
          // Add the remainder of the shift value after the char code is above 122 (minus 1 to account for the loop shift, i.e. 122 -> 97 is 1 shift) to 97
          // Ex. If the current char code is 122 ('z') and the shift is +1, the result should be 97 ('a')
          // 97 + ((122 + 1) - 123) = 97
          nShiftedCharCode = nMin + (nShiftedCharCode - 123);
        }
        else if (nShiftedCharCode < nMin)
        {
          // Subract the remainder of the shift value after the char code is below 97 (minus 1 to account for the loop shift, i.e. 97 -> 122 is 1 shift) from 122
          // Ex. If the current char code is 97 ('a') and the shift is -1, the result should be 122 ('z')
          // 122 - ((97 + -1) - 96)
          nShiftedCharCode = nMax - (96 - nShiftedCharCode);
        }

        // Add the shifted char code value to the final result
        strFinalString += String.fromCharCode(nShiftedCharCode);
      }
    }

    return strFinalString;
  }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };
