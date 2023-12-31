// Array of special characters to be included in password
var specialCharacters = [
    '@',
    '%',
    '+',
    '\\',
    '/',
    "'",
    '!',
    '#',
    '$',
    '^',
    '?',
    ':',
    ',',
    ')',
    '(',
    '}',
    '{',
    ']',
    '[',
    '~',
    '-',
    '_',
    '.'
  ];
  
  // Array of numeric characters to be included in password
  var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  // Array of lowercase characters to be included in password
  var lowerCasedCharacters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];
  
  // Array of uppercase characters to be included in password
  var upperCasedCharacters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];
  
  // Disable the 'Copy Password' button prior to generating password
  document.getElementById('copy').disabled = true;
  
  // Function to prompt user for password options
  function getPasswordOptions() {
    // Prompt for password length
    var passwordLength = prompt("Please enter the length of the password (between 8 and 128 characters):")

    // Validate password length
    while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
        alert('Invalid input. Please enter a number between 8 and 128');
        passwordLength = prompt("Please try again");
    }

    // Confirm password criteria
    var includeLowercase = confirm("Include uppercase characters? \nClick OK if yes, click Cancel if no.");
    var includeUppercase = confirm("Include lowercase characters? \nClick OK if yes, click Cancel if no.");
    var includeNumbers = confirm("Include numbers? \nClick OK if yes, click Cancel if no.");
    var includeSymbols = confirm("Include symbols? \nClick OK if yes, click Cancel if no.");

    // Validate that at least one character type is selected
    while (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
        alert("Select at least one character type.")
        includeLowercase = confirm("Include lowercase characters? \nClick OK if yes, click Cancel if no.");
        includeUppercase = confirm("Include uppercase characters? \nClick OK if yes, click Cancel if no.");
        includeNumbers = confirm("Include numbers? \nClick OK if yes, click Cancel if no.");
        includeSymbols = confirm("Include symbols? \nClick OK if yes, click Cancel if no.");
    }

    // Return user prompt selections
    return {
        length: passwordLength,
        hasLowerCase: includeLowercase,
        hasUpperCase: includeUppercase,
        hasNumbers: includeNumbers,
        hasSymbols: includeSymbols
    };
  }
  
  // Function for getting a random element from an array
  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  // Function to generate password with user input
  function generatePassword() {
    var options = getPasswordOptions();
    var result = []; 
    var possibleCharacters = [];

    // Create list of all possible characters based on user selection
    if (options.hasLowerCase){possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);}
    if (options.hasUpperCase){possibleCharacters = possibleCharacters.concat(upperCasedCharacters);}
    if (options.hasNumbers){possibleCharacters = possibleCharacters.concat(numericCharacters);}
    if (options.hasSymbols){possibleCharacters = possibleCharacters.concat(specialCharacters);}

    // Generate password
    for (var i=0;i<options.length;i++){
        result.push(getRandom(possibleCharacters));
    }

    // Join the elements of the array into a single string
    return result.join('');
  }
  
  // Get references to the #generate element
  var generateBtn = document.querySelector('#generate');
  
  // Write password to the #password input
  function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector('#password');
  
    passwordText.value = password;

    // Enable the copy button
    document.getElementById('copy').removeAttribute('disabled');
  }

  // Function to copy password to clipboard
  function copyToClipBoard(){
    var passwordText = document.getElementById('password');
    passwordText.select();
    passwordText.setSelectionRange(0, 99999); /* For mobile devices */

    // Copy text to clipboard
    document.execCommand("Copy");
    alert("Your password has been copied!");

    // Disable the copy button after copying - currently not in use for practicality
    // document.getElementById('copy').setAttribute('disabled', true);
  }
  
  // Add event listener to generate button
  generateBtn.addEventListener('click', writePassword);
  document.getElementById('copy').addEventListener('click', copyToClipBoard);