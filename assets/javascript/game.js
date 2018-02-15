// Since the Script link is in the header of the HTML and the page loads from top to bottom
// the JS codes might not start working when the webpage is loaded, to overcome this we use the 
// window.onload. Basically what it does is that it waits till all HTML is loaded and then it will fire all the functions that follows.

window.onload = function() {

  // Declare all variables and an array with a list of scientific words in it.
      
      var footballClubs = [
                        "barcelona", "acmilan", "intermilan", "liverpool", "manunited", 
                        "realmadrid", "juventus", "bayernmunich", "chelsea", "mancity",
                        "roma", "totenham", "arsenal", "lazio"
                        ];
     
      var wins = 0;
      var usedLetters = "";
      var gameStarted = false;
      var rand, currentWord, letterSelection, guesses, unknownWord;
      
  
  /* The game starts by pressing the START BUTTON, once its pressed the following will happen;
                        1- Game area will be set
                        2- Random word from the array will be picked from the list
                        3- the picked word will be removed from the array so that it is not selected again. */

  
  // The codes are based on the user clicking the buttons on the keyboard; Other method would be to click predefined buttons on the screen.
  
      document.getElementById("btnStart").onclick = function () {
          gameStarted = true;
          unknownWord = [];
          usedLetters = "";
          guesses = 12;
          document.getElementById("used-letters").innerHTML = "-";
          document.getElementById("mesage-space").innerHTML = "";
          
          document.getElementById("wins").innerHTML = wins;
          document.getElementById("guesses").innerHTML = guesses;

        if(footballClubs.length > 0) {
            rand = Math.floor(Math.random() * footballClubs.length);
            currentWord = footballClubs[rand].toLowerCase();
            document.getElementById("word").innerHTML = "";
  
            for (var i = 0; i < currentWord.length; i++) {
              unknownWord[i] = " _ ";			
            }
  
            document.getElementById("word").innerHTML = unknownWord.join("");
      
          } else {
            document.getElementById("word").innerHTML = "All words in the database have been used. Refresh the page to replay.";
            gameStarted = false;
          }	
      }
  

      // How does this game work?
      // 1- when a letter is presses by the user it is compared to the letters in the randonmly selected WORD.
      // 2- If this letter is a part of the Word then it is added in the Current Word area.
      // 3- if this letter does not apart of the selected word then it is added to the used letters area.
      // 4- The player is allowed 6 wrong gusses, if the Word is guessed correctly, player is congratulated otherwise he will lose.
  
  
      document.onkeydown = function(event) {
          if(gameStarted) {
          if (event.which <= 90 && event.which >= 65) {
            // 65- 90 is the keyCode values of each browser's keydown event caused by printable keys in standard position
            // 65-90 is for A-Z
              letterSelection = event.key.toLowerCase();
              document.getElementById("mesage-space").innerHTML = "";
              if (unknownWord.join("").includes(letterSelection)) {
                  playSound("wrong.wav");
                  document.getElementById("mesage-space").innerHTML = "This letter selected previously!";
              }

              if (currentWord.includes(letterSelection)) {
                  for (var i = 0; i < currentWord.length; i++) {
                      if (currentWord[i] === letterSelection) {
                          unknownWord[i] = letterSelection;
                          playSound("true.wav");
                          document.getElementById("word").innerHTML = " " + unknownWord.join("") + " ";
                      }
                  }

                  if (unknownWord.join("").includes(currentWord)) {
                      document.getElementById("word").innerHTML = "Well Done!";
                      playSound("congrats.wav");
                      document.getElementById("mesage-space").innerHTML = "You got " + currentWord.toUpperCase() + " right.";
                      footballClubs.splice(rand, 1);
                      
                      document.getElementById("wins").innerHTML = ++wins;
                      gameStarted = false;
                  }
              } else {
                  if (!usedLetters.includes(letterSelection)) {
                      usedLetters = usedLetters + " " + letterSelection;
                      if (guesses > 1) {
                        playSound("fail.wav");
                      }
                      document.getElementById("used-letters").innerHTML = usedLetters;
                      document.getElementById("guesses").innerHTML = --guesses;
                     
                  } else {
                    playSound("wrong.wav");
                    document.getElementById("mesage-space").innerHTML = "This letter selected previously!";
                  }
                  if (guesses == 0) {
                      playSound("lose.wav");
                      document.getElementById("word").innerHTML = "Damn!!! " + currentWord.toUpperCase() + "!";
                      footballClubs.splice(rand, 1);
                      document.getElementById("mesage-space").innerHTML = "Press \"Start\" to try again.";
                      gameStarted = false;	
                  }
              }
          } else {
              event.preventDefault();
              playSound("false.wav");
              document.getElementById("mesage-space").innerHTML = "Wrong Key Dude!";
          }
      } else {
        if (footballClubs.length == 0) {
          document.getElementById("word").innerHTML = "Well, I wans't expecting you to Play this long, get a life!! or Press Start to Play Again.";
        } else {
          event.preventDefault();
          document.getElementById("word").innerHTML = "Press \"Start Button\" first.";
        }	
      }
  } 
  
  
  
      function playSound(soundFile) {
        var name = new Audio("assets/sounds/" + soundFile);
        name.play();
      }
  }
  