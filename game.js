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
    } else {
        document.querySelector(".invalid_details").style.display="block";
        setTimeout(()=>{
            document.querySelector(".invalid_details").style.display="none";
        },900)
    }

})
// back button
const backButton = document.getElementById("back_btn");
backButton.addEventListener("click",()=>{
    playingSection.style.display = "none";
    loginSection.style.display = "block";
})

let player1_turn = true;
let player2_turn = false;
if(!player1_turn) {
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
