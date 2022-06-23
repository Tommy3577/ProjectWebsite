// all h1
const newgame = document.getElementById("newgame")
//new game
const roll = document.getElementById("roll"); 
//roll the dice
const p1score = document.getElementById("p1score");
const p2score = document.getElementById("p2score");
//scores of players (not tallies)
const dice = document.getElementById("dice");
//dice image
const hold = document.getElementById("hold")
// hold button
const turn = document.getElementById("turn")
// whos turn it is
const endscreen = document.getElementById("endscreen")
//end screen text
const p1tally = document.getElementById("p1tally")
const p2tally = document.getElementById("p2tally")
//tally counters

const refreshpage = document.getElementById("refreshpage")
const refreshpageyes = document.getElementById("refreshpageyes")
const refreshpageno = document.getElementById("refreshpageno")
//end screen asking if you want a new game or not (refresh page or new website)

const h4 = document.querySelector("h4");
//end game text selection (need it to make font big and small)

const body = document.querySelector("body")
//all the document

const boom = document.getElementById("boom")
//endscreen image

// let     dice.src = `./images/${tempscore}dot.png`

let dicesound = new Audio ('sounds/dicesound.mp3')
let bigboom = new Audio ("sounds/bigexplosion.mp3")
let siren = new Audio ("sounds/siren.mp3")
let bombsiren = new Audio ("sounds/bombsiren.mp3")
let rumble = new Audio ("sounds/rumble.mp3")


let timmewait = false
//time counters
let counter = 30;
//30 seconds counter
let endgame = false
// prevent functions operating during end screen



let p1 = 0
let p2 = 0
// player scores

let p1xtally = 0
let p2xtally = 0
// tallie scores

let p1x = true
let p2x = false
// reset turns


// key presses (r, h, n)
document.addEventListener('keydown', function(event) {

  if (event.code == "KeyR" && endgame == false) {
    rolldice()
}
else if (event.code == "KeyH" && endgame == false) {
    changeplayer()
}
else if (event.code == "KeyN" && endgame == false) {
    resetgame()
}
})

//   button presses
    hold.addEventListener("click", () => {
        if (endgame == false){
        changeplayer()
        }
    })
    roll.addEventListener("click", () => {
        if (endgame == false){
        rolldice()
        }
    })
    newgame.addEventListener("click", () => {
        if (endgame == false){
        changeplayer()
        }
    })


function changeplayer(){
    if (p1x == true) {
        turn.textContent = "It's Player 2 turn"
        p1x = false
        p2x = true
    }
    else if (p2x == true) {
        turn.textContent = "It's Player 1 turn"
        p2x = false
        p1x = true
    }
}


function resetgame(){
p1 = 0
p2 = 0
p1score.textContent = "Player 1 score is: 0"
p2score.textContent = "Player 2 score is: 0"
dice.src = ""
p1x = true
p2x = false
turn.textContent = "It's Player 1 turn"
//reset the game on the indivdual game itself, rather then overall
}

function rolldice(){


if (p1score.textContent == "Player 1 loses!" 
    || p2score.textContent == "Player 2 loses!" 
    || p1score.textContent == "Player 1 wins!" 
    || p2score.textContent == "Player 2 wins!"){
    p1score.textContent = "Player 1 Score"
    p2score.textContent = "Player 2 Score"
    }
    // When starting a new game, p1 and p2 score text become blank. This ensures there will be something there (bug fix)

    // if either player wins more 10 games or more
if (p1xtally >= 10 || p2xtally >= 10 ){
    siren.play()
    looseEndgame()
    return
}
// player 1
    if (p1x == true) {
    roll.textContent = "Roll the dice (shortcut key: R)"
    let tempscore = Math.ceil(Math.random() *6);
    dicesound.play();
    dice.src = `./images/${tempscore}dot.png`
    p1 += tempscore
    // increments and adds player score to temp (dice) score
    p1score.textContent =  `Player 1 score is: ${p1}`
    if(tempscore === 1) {
        dicesound.play();
        px1 = true
        px2 = false
        p1 = 0
        p2 = 0
        p1score.textContent = `Player 1 loses!`
        roll.textContent = `Try again?`
        p2score.textContent = "Player 2 wins!"
        p2xtally ++
        p2tally.textContent = `Player 2 won ${p2xtally} times`
        //if player gets 1, looses game
    } else {
        if (p1 >= 20){
            dicesound.play();
            px1 = true
            px2 = false
            p1 = 0
            p2 = 0
            p1score.textContent = `Player 1 wins!`
            roll.textContent = `Play again?`
            p2score.textContent = "Player 2 loses!"
            p1xtally ++
            p1tally.textContent = `Player 1 won ${p1xtally} times`
            //if player gets over 20 wins
        }
    }
}   

//player 2
else if (p2x == true){
    roll.textContent = "Roll the dice  (shortcut key: R)"
    dicesound.play();
    let tempscore2 = Math.ceil(Math.random() *6);
    dice.src = `./images/${tempscore2}dot.png`
    p2 += tempscore2
    p2score.textContent =  `Player 2 score is: ${p2}`
    if(tempscore2 === 1) {
        dicesound.play();
        px1 = true
        px2 = false
        p1 = 0
        p2 = 0
        p2score.textContent = `Player 2 looses!`
        roll.textContent = `Try again?`
        p1score.textContent = "Player 1 wins!"
        p1xtally ++
        p1tally.textContent = `Player 1 won ${p1xtally} times`
    } else {
        if (p2 >= 20){
            dicesound.play();
            px1 = true
            px2 = false
            p1 = 0
            p2 = 0
            p2score.textContent = `Player 2 wins!`
            roll.textContent = `Play again?`
            p1score.textContent = "Player 1 loses!"
            p2xtally ++
            p2tally.textContent = `Player 2 won ${p2xtally} times`
    }}
}
}



// If a player looses 10 times, they get a nuke strike
function looseEndgame(){
    endgame = true
    //this disables the functions
    h4.style.fontSize = '150px';
    endscreen.textContent = "You lost 10 games to the other player. Nuclear strike launched at you: T-"+counter+ "to impact"
    

    if( timmewait == false ){
        // // Got the wait command from a website https://theprogrammingexpert.com/javascript-wait-5-seconds/ and adapted it for this. The rest of the code is purely small iterations
        timmewait = true;
        setTimeout(function(){
            timmewait = false;
                // counts down nuke
                bombsiren.play()
        }, 15000);
        // wait 15 seconds, play next sound effect

        endscreen.textContent = "You lost to the other player quite a lot. Nuclear strike launched at you: T-"+counter+ " to impact"
        
        let interval = setInterval(function(){
                  counter--;
                //  counter is counting down
                  endscreen.textContent = "You lost to the other player quite a lot. Nuclear strike launched at you: T-"+counter+ " to impact"
                  if(counter == 1){
                    //at one second
                    h4.style.fontSize = '1500px';
                    //this clears the screen for it to go all white
                    body.style.background = "white";
                    //image goes suddenly white
                    endscreen.textContent = " "
                    bombsiren.pause()
                    siren.pause()
                    //stops the sounds
                    rumble.play()
                  }
                  if( counter == 0 ){
                    //at zero seconds, image goes from white to black
                        endscreen.textContent = " "
                        body.style.background = "black";
                        body.style.transition = "background 10s";
                        boom.src = `./images/boom.png`
                        boom.className = "shake"
                        boom.style.color = "white"
                        boom.style.width = "40%"
                        boom.style.height = "40%"

                        refreshpage.style.fontSize = "30px"
                        refreshpageyes.style.fontSize = "30px"
                        refreshpageno.style.fontSize = "30px"
                        
                        refreshpage.textContent = "You and everyone around you died because you lost 10 times in a random game of dice. Do you want to start a new game?"
                        refreshpageyes.textContent = "Yes (click here)"
                        refreshpageyes.addEventListener("click", () => {
                            location.reload();
                            //reloads the page
                            }
                        )
                        refreshpageno.textContent = "No (click here)"
                        refreshpageno.innerHTML = '<a href="http://www.google.com">No (click here)</a>';



                    clearInterval(interval);
                    // I don't know what this does but it's needed
                  }
                }, 1000);
                // 1000 it counts down in seconds, higher number the faster the count

       

    }
    
    return
    
}