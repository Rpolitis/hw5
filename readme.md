# HW5 Write up
Name: Ryan Politis

Email: Ryan_Politis@student.uml.edu

File: readme.md

Date: 12/17/23

# Approach
HTML:

I first approached this assignment this assignment by setting up the HTML structure of my page. 
First, I made the title of my website and included the relevant CSS stylesheets I would be 
using for the site. I included The jquery-ui CSS file and my own stylesheet called style.css. 
I Then made a wrapper div that included the title that appears at the top of the site and the 
div that surrounds the game. I then included the scripts I would be using at the bottom of the 
HTML file. I included the jquery script, the jquery-ui script, and my own javascript file. 
I then separated the game div into 4 sections. One to store the game info (score, remaining 
tiles). Another to store the board. One to store the buttons. Finally, one to store the rack. 
When designing the structure of the website, I was inspired by the design shown in the example 
given to us from Yong Cho at this link, https://yongcho.github.io/GUI-Programming-1/assignment9.html. 
I liked the setup of Yong Cho's Scrabble but mine is a lot more minimalist and has darker colors which 
is more in-line with my overall design theme.

CSS:

I then started work on adjusting the style of the page. I prefer websites that have a dark 
background color and light text color, so I made my website look accordingly. I used the 
https://coolors.co/ website to generate the colors for my website. Once, I had the basic 
layout and style I wanted for my website I moved on to working on the javascipt functionality 
of the website. Once finished with the javascript, I returned back to the CSS to adjust the 
size, padding, and look of the scrabble board, scrabble tiles, and rack.

Javascript:

Finally, I started on making the javascript functionality of the website. I made use of Jesse M. 
Heines' provided associative array to store and keep track of the Scrabble tiles. I then created 
a list of global variables that I thought would be helpful when making the Scrabble 
functionality. These variables kept track of the game information such as score, individual round 
score, whether the tile was the first in a word, how many letters were played, whether a tile 
was on a double word, how much score should be doubled, an array for the played tiles, and the 
remaining tiles after the first hand was generated. I then put the code inside the ready function 
to make sure the site fully loaded before the scripts were loaded. First, I generate the starting 
7 tile hand. I did this in the generate_tiles function which takes the number of tiles to 
generate. It then creates an array of copies of each remaining letter. I then generate random 
numbers based on the length of the weighted letter array to then get the corresponding letter 
tile. Once a letter tile is selected, I remove it from the weighted array and decrement its 
remaining value and place the tile on the rack. Back to the ready function, I make tiles draggable 
and the rack, blank spaces, and double word spaces droppable. Droppable elements accept tiles when 
they intersect and have an if statment that governs the logic when a tile is dropped on to them. 
If the tile dropped is the first in a word it prevents other tiles from being dropped in the wrong order 
or in a disconnected space. The third else condition reuses the logic from the first tile when placing 
subsequent tiles on the Scrabble board. The double word droppable element contains additional logic. 
This sets a flag to true if a tile is placed on the double word spot and adds 2 to the double word 
calculation variable. This makes sure that the double word spaces are calculated correctly by providing 
a 2 times word score if one space is covered, and a 4 times word score if both spaces are covered. Next, 
the user can press the next hand button to submit their word, calculate score, and regenerate any tiles 
used if there are remaining tiles available. The next hand button click function checks the double word flag, 
calculates score accordingly, removes tiles from the board and clears the played_tiles array. 
Then, It regenerates tiles depending on how many were played and if there are enough remaining tiles to fully 
regenerate a played hand. Then the letters_played variable is set to 0 and the tiles are reinitialized to become 
draggable again. When the restart game button is clicked the page reloads. Yes it's lazy but it works.

# Feautures
- Score and remaining tile counts update whenever a word is submitted
- 7 Space Scrabble board containing 2 double word spaces and 5 blank spaces.
- Next hand button which submits word, calculates score and remaining tiles, and regenerates hand
- Scrabble rack which allows users to drag tiles to spots on the Scrabble board

# Problems Encountered

I did encounter a couple issues when implementing the Javascript functionality for this 
website. They can be broken down into 3 major problems:

Draggable and Droppable Objects:

The first major issue I had to solve was learning how to make an image drag and droppable. 
I first consulted the jquery-ui documentation and made sure I understood how to use draggable 
and droppable objects by making a quick test using a single board space and Scrabble tile. 
This issue was solved pretty quickly since I just needed to take them time to understand how 
jquery-ui handled draggable and droppable objects.

Tile Generation:

The second major issue I had to solve was generating tiles. I had first created a simple version 
of the function which would generate tiles randomly without care for how many were remaining. 
That was the relatively easy part. The major issue was generating tiles based on how many copies 
there were. I decided to make another array to solve this issue. I first create the array and use 
a for loop to create copies of every letter in the array based on how many are in the array. 
Admittedly, I could've used the given associative array itself but this was the first option 
that came to mind. I then generated a random number which acted as the index for the weighted 
array that stored copies of every letter. Then I grabbed the letter based off the random number. 
As their are more copies of A in the weighted array, the letter A is more likely to appear.
Then, I remove the generated number from the weighted array abd decrement the number remaining 
from the associative array. I then place the tile on the rack. This issue was confusing but my 
simple fix which mostly comprised of the idea that if you have more of one thing you'll randomly 
get that thing more often seems to work.

Remaining Tile Count:

The third major issue went hand in hand with tile generation. When generating tiles, I initially 
didn't keep track of how many were remaining and how to update the remaining tile count on the 
website. Once I fixed the tile generation logic, I then tackled this issue. At the start, I could 
generate as many tiles as I wanted and have the count go negative. This was obviously an issue, 
so I decided to restrict tile generation when a word was submitted. I made an if statement that 
generated tiles normally if the amount of letters played was lower than the remaining number of 
tiles. I then used an else statement to set the HTML to 0 remaining tiles and generate only what 
was remaining if the amount of letters played was greater than the remaining number. This fixed 
the issue so that when you play a full hand of tiles and there are only 2 remaining, only 2 will 
be sent to your hand.

# Additional Notes
- Used https://coolors.co/ to generate website color scheme
- Took inspiration for website structure from Yong Cho's example scrabble website
    - https://yongcho.github.io/GUI-Programming-1/assignment9.html
- Used Jesse M. Heines' associative array to store and keep track of Scrabble tiles
- Provided advice to Sid Shankar on Scrabble rules and how score calculation works in Scrabble
