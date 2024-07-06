var player1 = document.getElementById("p1");
var player2 = document.getElementById("p2");
let displayP1 = document.getElementById("player1_name");
let displayP2 = document.getElementById("player2_name");
const playButton = document.getElementById("play_btn");
const loginSection = document.getElementById("players_login");
const playingSection = document.getElementById("play_section");

// play button
playButton.addEventListener("click",()=>{
    if(player1.value.length>0 && player2.value.length>0) {
        loginSection.style.display = "none";
        playingSection.style.display = "block";
        displayP1.innerText = player1.value+" (X)";
        displayP2.innerText = player2.value+" (O)";
        player1.value = "";
        player2.value = "";
        assignEvent();
    } else {
        document.querySelector(".invalid_details").style.display="block";
        setTimeout(()=>{
            document.querySelector(".invalid_details").style.display="none";
        },900)
    }

})
// go back to login page event
const goToLogin = ()=>{
    playingSection.style.display = "none";
    loginSection.style.display = "block";
    resetAll();
}
// reset button
let resetButton = false; 
// back button
const backButton = document.getElementById("back_btn");
if(!resetButton) { 
    backButton.innerText = "Back";
    backButton.addEventListener("click",goToLogin)
}
// for the game initialisation
const assignEvent =()=>{
    for(let i=0;i<9;i++) {
       let box = document.getElementById(`${i}`);
       box.addEventListener("click",()=>{
        playGame(box,i);
       });
    }
}
// x o icons
const cardX = `
<img src="images/icons8-x-50 (2).png" alt="">
`
const cardO = `
<img src="images/icons8-o-50 (2).png" alt="">
`
// game working on clicks
let player1_turn = true;
let player2_turn = false;
let check = Array(9).fill(0);
const playGame = (box,i)=> {
    setTimeout(()=>{
        isWon();
    },150)
    if(check[i]>0 || isWon()) {
        return;
    }
    resetButton = true;
    if(resetButton) {
        backButton.innerText = "Reset";
        backButton.removeEventListener("click", goToLogin);
        backButton.addEventListener("click",reset)
    }
    if(player1_turn) {
        box.innerHTML = cardX;
        player1_turn = false;
        check[i] = 1;
    } else {
        box.innerHTML = cardO;
        player1_turn=true;
        check[i] = 2;
    }
    setTimeout(()=>{
        if(isDraw()) {
            reset();
        }
        assignEvent();
    },300);
    if(!isDraw()) {
        if(player1_turn) {
            displayP2.style.opacity = .6;
            displayP2.style.transform = "scale(1)"
            displayP1.style.opacity = 1;
            displayP1.style.transform = "scale(1.5)"
        } else {
            displayP1.style.opacity = .6;
            displayP1.style.transform = "scale(1)"
            displayP2.style.opacity = 1;
            displayP2.style.transform = "scale(1.5)"
        }
    }

    
}
// reset function
const reset =()=>{
    for(let i=0;i<check.length;i++) {   
        check[i]=0;
        const box = document.getElementById(`${i}`);
        if(box.firstElementChild) {
            box.removeChild(box.firstElementChild);
        }
    }
    player1_turn = true;
    displayP2.style.opacity = .6;
    displayP2.style.transform = "scale(1)"
    displayP1.style.opacity = 1;
    displayP1.style.transform = "scale(1.5)"
    resetButton = false;
    setTimeout(()=>{
        backButton.innerText = "Back";
    },200)
    resetButton = false;  
    setTimeout(()=>{
        backButton.innerText = "Back";
        backButton.removeEventListener("click",reset);
        backButton.addEventListener("click",goToLogin);
    },90)
}
// wining method
const isWon = ()=> {
    const arr = [   [0,1,2],[3,4,5],[6,7,8],
                    [0,3,6],[1,4,7],[2,5,8],
                    [0,4,8],[2,4,6]
                ];
    for(let i=0;i<arr.length;i++) {
        if(check[arr[i][0]]>0) {
            if(check[arr[i][0]]===check[arr[i][1]] && check[arr[i][1]]===check[arr[i][2]]) {
                if(check[arr[i][0]]==1) {
                    p1WonCount++;
                    p1WonCountDisplay.innerText = `Win:${p1WonCount}`;
                } else {
                    p2WonCount++;
                    p2WonCountDisplay.innerText = `Win:${p2WonCount}`;
                }
                reset();
                onWonAnimation();
                return true;
            }
        }
    }
    return false;
}
// draw method
const isDraw = ()=> {
    for(let i=0;i<check.length;i++) {
        if(check[i]==0) {
            return false;
        }
    }
    return true;
}
//on won animation thing
const onWonAnimation = ()=>{
    playingSection.style.display = "none";
    setTimeout(()=>{
        playingSection.style.display = "block";
        
    },400);  
}
const onDrawAnimation = ()=>{
    playingSection.style.display = "none";

    setTimeout(()=>{
        playingSection.style.display = "block";
        
    },400);
}
// won counts
let p1WonCount =0;
let p2WonCount =0;
const p1WonCountDisplay = document.getElementById("p1WonCount");
const p2WonCountDisplay = document.getElementById("p2WonCount");
//resetAll
const resetAll = ()=>{
    reset();
    p1WonCount = 0;
    p2WonCount = 0;
    p1WonCountDisplay.innerText= "";
    p2WonCountDisplay.innerText= "";
}