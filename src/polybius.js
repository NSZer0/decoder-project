// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  // Create a cipher map for use when decoding
  const aryCipherMap = [
    ["a", "b", "c", "d", "e"],
    ["f", "g", "h", "(i/j)", "k"],
    ["l", "m", "n", "o", "p"],
    ["q", "r", "s", "t", "u"],
    ["v", "w", "x", "y", "z"]
  ]

  function polybius(strInput, bEncode = true) {
    // Minimum ('a') and maximum ('z') char code values
    const nMin = 97; const nMax = 122;

    // Remove spaces and special characters from the input because they will throw off the number count
    // Convert the input string into an array using split()
    const aryInput = strInput.split("");
    // Create a filtered array of only number characters. ('0' through '9' use char codes 48 - 57)
    const aryfilteredInput = aryInput.filter((char) => char.charCodeAt() >= 48 && char.charCodeAt() <= 57)
    if (bEncode)
    {
      // If encoding, return false if the input contains a number
      // A number in the input string cannot be decoded properly after being encoded
      if (aryfilteredInput.length > 0) return false; 
    }
    else
    {
      // If decoding, make sure that the input has an even number of characters
      // % Opertor gets the remainder after division
      // If the remainder is not 0 after dividing by 2, we can assume the length is not an even number
      if (aryfilteredInput.length % 2 !== 0) return false;
    }

    // Declare the final string after encoding or decoding
    let strFinalString = "";

    // Iterate through each character in the string to create the cipher value for each character
    for (let i = 0; i < strInput.length; i++)
    {
      if (bEncode) // Encoding string to string of numbers
      {
        // Set the string to all lower case because capital letters use char codes outside the tested range
        const strInputLower = strInput.toLowerCase();
        // Set the char code of the character at the current index
        const nCharCode = strInputLower.charCodeAt(i);
        if (nCharCode > 122 || nCharCode < 97) // Don't manipulate non-alphabetic characters
          strFinalString += strInputLower[i];
        else if (nCharCode === 106) // 106 is ASCII char code for 'j'
        {
          // 'i' and 'j' should share the same cipher value of 42
          strFinalString += "42";
        }
        else
        {
          // Get the alphabetic code value of the char code by subtracting it's value from the minimum char code (97)
          let nAlphaCode = nCharCode - nMin;
          // We exclude 'j' because we force it to '42', so alphabetic codes after 'i' should be shifted down 1 because the max value should be 25
          if (nAlphaCode > 8) // 8 = 'i'
            nAlphaCode--;

          // Now we get the row and the column of the character
          // To get the row, divide nAlphaCode by the number of columns (5) and round down then add 1 so the result will be 1 to 5.
          const nRowNumber = Math.floor(nAlphaCode / 5) + 1;
          // To get the column, get the remainder from dividing nAlphaCode by the number of columns (5) and add 1 because the columns start at 1 and not 0.
          const nColumnNumer = (nAlphaCode % 5) + 1;
          // Add the row and column to the final string
          strFinalString += `${nColumnNumer}${nRowNumber}`;
        }
      }
      else // Decoding a string of number pairs
      {
        if (strInput.charCodeAt(i) > 57 || strInput.charCodeAt(i) < 48) // Char codes for 0 - 9 are 48 - 57
          strFinalString += strInput[i];
        else
        {
          // Set the next pair of cipher values using substr()
          const strCipherPair = strInput.substr(i, 2);
          // Store the cipher pair by column and row value, subracting 1 to align with a 0 index
          const nCol = strCipherPair[0] - 1; const nRow = strCipherPair[1] - 1;
          // Test that the cipher pair does not contain invalid values, if it does, return false
          if (nCol < 0 || nCol > 4 || nRow < 0 || nRow > 4) return false;
          // Decode the cipher pair using the cipher map.
          strFinalString += aryCipherMap[nRow][nCol];

          // Add one more to the loop iteration because we processed two values here and we don't want to repeat any
          i++;
        }
      }
    }

    return strFinalString;
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };
