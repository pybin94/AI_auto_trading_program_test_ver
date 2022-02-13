const margin = [10000,15000,30000,45000,75000,120000,195000,315000,410000,725000];

let list = []

let limit = 10;
let playerScore = 0;
let bankerScore = 0;

let playerDubble = false;
let bankerDubble = false;

let playerLose4Time = false;
let bankerLose4Time = false;

let bankerprice = 0

let playerDubbleCount = 0;
let bankerDubbleCount = 0;

let playerMultiScoreBreak = 0;
let bankerMultiScoreBreak = 0;

const bettingScreen = document.querySelector("#bettingScreen")

const BTN_Player = document.querySelector("#player")
const BTN_Banker = document.querySelector("#banker")

BTN_Player.addEventListener("click", function(){

    playerDubble++;
    bankerMultiScoreBreak = 0;

    if(playerDubble === 2){
        playerDubble = true;
    }


    if (playerDubble === true) {   // 2회 중첩 클릭

        playerMultiScoreBreak++;
        playerScore -= 2;

        if(playerLose4Time === true){   // 4연패시 2회휴식
            playerDubble = true;
        }

        if(playerMultiScoreBreak >= 2){
            bankerScore;

        }else {
            bankerScore++;
        }
        console.log("플래이어 A")


    } else if(bankerDubble !== true){  // 평범한 클릭

        playerScore -= 2;
        bankerScore++;
        playerMultiScoreBreak = 0;


        console.log("플래이어 B")

    }else if (bankerDubble === true){

        bankerLose4Time = true;
        bankerScore++;
        playerMultiScoreBreak = 0;
        console.log("플래이어 C")

    }else{

        bankerScore++;
        playerMultiScoreBreak = 0;
        console.log("플래이어 D")
    }

    if (playerScore <= 0) {
        playerScore = 0
    }

    var playerPrice = margin[playerScore]
    var bankerPrice = margin[bankerScore]


    if(playerDubble === true){
        bankerPrice = 0;
    }

    bankerDubble = false;
    bankerDubbleCount = 0;

    // console.log("뱅커 "+bankerPrice)
    // console.log("플레이어 "+playerPrice)
    
    const culBoth = playerPrice - bankerPrice

    if(culBoth > 0) {
        bettingScreen.innerHTML = "플레이어 " + Math.abs(culBoth);

    }else if (culBoth < 0){
        bettingScreen.innerHTML = "뱅커 " + Math.abs(culBoth);

    }else if (culBoth === 0){
        bettingScreen.innerHTML = "휴식";

    }

    if(bankerScore >= limit){
        bettingScreen.innerHTML="배팅금지";
    }

    document.querySelector("#playerScore").innerHTML = playerScore;
    document.querySelector("#bankerScore").innerHTML = bankerScore;

})

BTN_Banker.addEventListener("click", function(){

    bankerDubble++;
    playerMultiScoreBreak = 0;

    if(bankerDubble === 2){
        bankerDubble = true;
    }

    if (bankerDubble === true) {

        bankerMultiScoreBreak++;
        bankerScore -= 2;

        if(bankerMultiScoreBreak >= 2){
            // pass
        }else {
            playerScore++;
        }
        console.log("뱅커 A")
            
    } else if(playerDubble !== true){

        bankerScore -= 2;
        playerScore++;
        bankerMultiScoreBreak = 0;
        console.log("뱅커 B")

    }else if (playerDubble === true){

        playerLose4Time = true;
        playerScore++;
        bankerMultiScoreBreak = 0;
        console.log("뱅커 C")

    }else{
        playerScore++;
        bankerMultiScoreBreak = 0;
        console.log("뱅커 D")
    }


    if (bankerScore <= 0) {
        bankerScore = 0
    }
    

    let playerPrice = margin[playerScore]
    let bankerPrice = margin[bankerScore]


    if( bankerDubble === true ){
        playerPrice = 0;
    }

    playerDubble = false;
    playerDubbleCount = 0;

    // console.log("뱅커 "+bankerPrice)
    // console.log("플레이어 "+playerPrice)

    const culBoth = playerPrice - bankerPrice

    if(culBoth > 0) {
        bettingScreen.innerHTML = "플레이어 " + Math.abs(culBoth);
    }else if (culBoth < 0){
        bettingScreen.innerHTML = "뱅커 " + Math.abs(culBoth);

    }else if (culBoth === 0){
        bettingScreen.innerHTML = "휴식";

    }

    if(playerScore >= limit){
        bettingScreen.innerHTML="배팅금지";
    }

    document.querySelector("#playerScore").innerHTML = playerScore;
    document.querySelector("#bankerScore").innerHTML = bankerScore;

})
