/*
Name: Ryan Politis
Email: Ryan_Politis@student.uml.edu
File: script.js
Date: 11/12/23
GUI Assignment: Implement Scrabble using javascript and jquery-ui draggable/droppable elements
What the file does: Generates scrabble tiles and makes them draggable. Makes scrabble board and rack droppable. 
Calculates scrabble score and remaining letters when next hand is clicked.
*/

// Provided associative array to keep track of scrabble pieces, their value, original number, and number remaining
// Also renamed image for a blank space to match underscore name in the associative array
/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely 
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 */
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

//Global variables
var score = 0;                      // Keeps track of global score
var round_score = 0;                // Keeps track of score accumulated in a single round
var next_tile = -1;                 // Keeps track of whether the first tile has been played in a word
var letters_played = 0;             // Keeps track of amount of letters played in a single round
var double_word_flag = false;       // Keeps track of whether a tile was placed on a double word piece
var double_word_calc = 0;           // Keeps track of whether one or two double word spaces are covered by a tile
var played_tiles = new Array();     // Array to keep track of tiles that were played
var remaining = 93;                 // Keeps track of total remaining tiles

// Waits for page to be loaded before loading script
$().ready(function(){
    generate_tiles(7);              // Generates first hand

    // Makes tiles draggable
    $(".tile").draggable({      
        revert: "invalid"           // Revert to rack if invalid
    });
    
    // Makes rack droppable
    $("#rack").droppable({
        tolerance: "intersect",         // Tiles need to intersect rack
        accept: ".tile",                // Makes rack accept tiles
        drop: function(event, ui) {}
    });

    // Makes blank spaces droppable
    $(".blank").droppable({
        tolerance: "intersect",                                     // Tiles need to intersect blank spaces to be played
        accept: ".tile",                                            // Makes blank spaces accept tiles
        drop: function(event, ui) {
            if(next_tile == -1){                                    // If the tile played is the first tile
                next_tile = parseInt($(this).attr("id")) + 1;       // Get next tile
                var letter = $(ui.draggable).attr("id");            // Get the letter
                round_score += ScrabbleTiles[letter].value;         // Calculate its value
                played_tiles.push(letter);                          // Push letter on to played letters array
                letters_played++;                                   // Increment letters played
            } 
            else if(next_tile != parseInt($(this).attr("id"))){     // Else the tile is not subsequent in a word
                ui.draggable.draggable('option','revert',true);     // Bring tile back to rack
            }
            else{                                                   // Else the tile is a subsequent tile in a word
                ui.draggable.draggable('option','revert',false);    // Tile can be played and not revert to rack
                next_tile++;                                        // Increment next tile
                var letter = $(ui.draggable).attr("id");            // Get the letter
                round_score += ScrabbleTiles[letter].value;         // Calculate its value
                played_tiles.push(letter);                          // Push letter on to played letters array
                letters_played++;                                   // Increment letters played
            }
        }
    });

    // Makes double word spaces droppable
    $(".double_word").droppable({
        drop: function(event, ui) {
            if(next_tile == -1){
                next_tile = parseInt($(this).attr("id")) + 1;
                var letter = $(ui.draggable).attr("id");
                round_score += ScrabbleTiles[letter].value;
                played_tiles.push(letter);
                letters_played++;
                double_word_flag = true;                             // Sets the double word flag to true to indicate a tile is placed there
                double_word_calc += 2;                               // Increments calculation by 2 to correctly calculat score later
            } 
            else if(next_tile != parseInt($(this).attr("id"))){
                ui.draggable.draggable('option','revert',true); 
            }
            else{
                ui.draggable.draggable('option','revert',false); 
                next_tile++;
                var letter = $(ui.draggable).attr("id");
                round_score += ScrabbleTiles[letter].value;
                played_tiles.push(letter);
                letters_played++;
                double_word_flag = true;
                double_word_calc += 2;
            }
        }
    });
    
    // When next hand is clicked, calculate score, clear board, calculate remaining tiles and generate new tiles
    $("#next_hand").click(function(){
        if(double_word_flag) {                  // If the double word flag has been set to true AKA tile is on double word
            round_score *= double_word_calc;    // Multipy round score based on how many double word spaces are occupied
            double_word_calc = 0;               // Reset double word calculations to 0
        }
        score += round_score;                   // Add round score onto total score
        round_score = 0;                        // Reset round score to 0
        double_word_flag = false;               // Reset double word flag to false
        document.getElementById("score_count").innerText = score;   // Update HTML score total count

        // Go through the array the stores already placed tiles and remove them
        for(i = 0; i < played_tiles.length; i++){
            var letter = played_tiles[i];
            $("#" + letter).remove();
        }
        played_tiles = [];                      // Reset already played tiles array
        
        if (letters_played < remaining) {       // If the amount of letters played is less than the remaining tiles
            remaining -= letters_played;        // Subtract the letters played from the remaining tile count
            document.getElementById("remain_count").innerText = remaining;  // Update HTML remaining tile count
            generate_tiles(letters_played);     // Generate new tiles based on the amount that were played
        } else {                                // Else hand cannot be fully replaced based on remaining tile amount
            document.getElementById("remain_count").innerText = 0;  // Set HTML remaining tiles to 0
            generate_tiles(remaining);          // Generate what's left in the remaining tile pool
            remaining = 0;                      // Set remaining to 0 as there are no more tiles left
        }
        letters_played = 0;                     // Reset letters played to 0

        // Make new tiles draggable again
        $(".tile").draggable({
            revert: "invalid"
        });
        next_tile = -1;                         // Set first tile indicator back to -1
    });

    // Lazily reload page to restart game
    $("#restart").click(function(){
        location.reload();
    });
});

function generate_tiles(tile_num) {
    var weighted_letters = [];                   // Array to store copies of each letter

    // Loop to create an array with letters repeated based on their remaining tiles
    for (var letter in ScrabbleTiles) {
        for (var i = 0; i < ScrabbleTiles[letter]["number-remaining"]; i++) {
            weighted_letters.push(letter);
        }
    }

    // For the amount of tiles that need to be generated, generate tiles
    for (var i = 0; i < tile_num; i++) {
        var rand_num = Math.floor(Math.random() * weighted_letters.length);     // Generate a random number based on the weighted array length
        var letter = weighted_letters[rand_num];                                // Grab a letter from weighted array based on random number

        weighted_letters.splice(rand_num, 1);                                   // Remove generated letter so it can't be regenerated on another pass
        ScrabbleTiles[letter]["number-remaining"]--;                            // Decrement the remaining number from letter
        // Add the tile to the HTML storing it in the tile div on the rack
        document.getElementById("tiles").innerHTML += "<img class=\"tile\" id=\"" + letter + "\" src=\"images/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg\"></img>";
    }
}
