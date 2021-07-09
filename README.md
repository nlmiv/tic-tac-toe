# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #0: The Game

### Overview

Play Easy or Hard its up to you. See if you can get a WIN when the opponent is as good as you specially when the game becomes hard.

### Link To Demo
https://nlmiv.github.io/tictactoe/#home

### What I've Learned

- **Command Line**: Practice interacting with the computer and navigating the filesystem from the command line.
- **Source Control**: Manage and interact with a git repository to store changes to code.
- **Programming Fundamentals**: Work with array, objects, event handlers and callbacks, while learning how to strategically solve problems and resolve errors.
- **Web Fundamentals**:  Learn how communication happens over the internet, and how to structure, style, and animate documents within a browser. Also learn how to respond to actions your users take and the data they input into the browser.
- **Browser Applications**:  Dive into CSS and how to use libraries and frameworks to get lots of style for free.
- **Deployment**: Host a static web site in a managed hosting environment.
- **Products and Teams**: Document your code and your code repository so others understand what you've built.

### Technical Requirements

The app can:

* **Render a game board in the browser**
* **Switch turns** between X and O (or whichever markers you select), Allow player to choose their token
* **Visually display which side won** if a player gets three in a row or show a draw/"cat’s game" if neither wins
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **Javascript and jQuery** for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it
* Use **semantic markup** for HTML and CSS (adhere to best practices)

### Approach Taken

- **Step by Step**: Work on logic and functionality of tic tac toe game itself first. Used objects when possible to hold variables and methods for game. Used array to hold game board.
- **Object Orientated**: Practice with utilising objects to have more control over game functionality and record various data points
- **Refactored**: Keep code DRY and clean, with easy to understand structure and commentary
- **Styling**: Simplistically styled, with theme of page to attract interest.
- **User Interaction**: Simple user prompt and buttons to direct play

### Bonuses
- **Simple AI**: Add AI capability to play against computer. Simple, random choice type AI
- **Complex AI**:Create an AI opponent: teach Javascript to play an unbeatable game against you




### Unsolved problems
* **Get inventive with the styling**, e.g. use hover effects for the buttons and small pulse animations
* Keeps track of **multiple game rounds** with a win counter, win type, game approach of each player etc.
* Allows player to **customize their token** with color choices.
- **Customisation**: Add AI capability to allow players to choose icons, as well as colours. Perhaps saving image icon choice in the object, rather than saving just a chosen class style in the object
* **Use LocalStorage** to persist data locally to allow games to continue after page refresh or loss of internet connectivity
- **Dynamic Board**: Current program has capability to increase board size due to scalable createBoard function, however win scenarios etc, will not work for games larger than 3
