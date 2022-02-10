const margin = [10000,15000,30000,45000,75000,120000,195000,315000,410000,725000];

let list = [];
let gameResult = [];

let playerScoreList = [];
let bankerScoreList = [];

let playerLoseStreakList = [];
let bankerLoseStreakList = [];

let playerMultiLoseList = [];
let bankerMultiLoseList = [];

let playerpriceList = [];
let bankerpriceList = [];

let winCount = 0;
let loseCount = 0;
let winRateCheck = 0;

let limit = 10;

let playerScore = 0;
let bankerScore = 0;

let playerLoseStreak = false;
let bankerLoseStreak = false;

let playerMultiLose = false;
let bankerMultiLose = false;

let playerprice = 0;
let bankerprice = 0;


const bettingScreen = document.querySelector("#bettingScreen");

const BTN_Player = document.querySelector("#player");
const BTN_Banker = document.querySelector("#banker");
const win = document.querySelector("#win");
const lose = document.querySelector("#lose");
const winRate = document.querySelector("#winRate");

function gameReset(){

    bettingScreen.innerHTML = "게임 결과를 입력해주세요.";
    bettingScreen.style.borderColor = "#c7c7c7";
    bettingScreen.style.boxShadow = "0 0 0 1px #c7c7c7 inset";
    bettingScreen.style.color = "#000";
    playerLoseStreak = false;
    bankerLoseStreak = false;
    playerMultiLose = false;
    bankerMultiLose = false;
    playerScore = 0;
    bankerScore = 0;
    winCount = 0;
    loseCount = 0;
    winRateCheck = 0;
    winRate.innerHTML = 0;
    win.innerHTML = 0;
    lose.innerHTML = 0;
    list = []

}

document.querySelector("#resetBtn").addEventListener("click", function(){
    gameReset();
})

BTN_Player.addEventListener("click", function(){

    // 승률
    if(document.querySelector("#bettingScreen").innerText.includes("플레이어") === true){

        winCount++;
        win.innerHTML = winCount;
        winRate.innerHTML = Math.floor((winCount/(winCount+loseCount))*100);

    } else if (document.querySelector("#bettingScreen").innerText.includes("뱅커") === true){

        loseCount++;
        lose.innerHTML = loseCount;
        winRate.innerHTML = Math.floor((winCount/(winCount+loseCount))*100);

    } 


    if(list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B'){     // 2연패

        playerLoseStreak = true;
        bankerScore++;
        console.log("플레이어 A");

    } else if ( list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A' ){  

        if ( playerMultiLose === true ){

            playerMultiLose === false;
            onsole.log("플레이어 B-1");

        } else {

            playerScore -= 2;
            console.log("플레이어 B-2");

        }

    } else if ( playerMultiLose === true){  // 플레이어 연패

        if ( list.slice(-1)[0] === 'A' ){

            bankerScore++;
            playerLoseStreak = false;
            playerMultiLose = false;
            console.log("플레이어 C-1");

        } else {

            bankerScore++;
            console.log("플레이어 C-2");

        }


    } 
    else if (bankerLoseStreak === true && list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'A'){ // 뱅커 연패

        if(bankerMultiLose === true){
            playerScore -= 2;
            console.log("플레이어 D-1");

        } else {
            bankerScore++;
            playerScore -= 2;
            bankerLoseStreak = false;
            bankerMultiLose = true;
            console.log("플레이어 D-2");
        }


    } else if (bankerMultiLose === true){      //ppbppbp

        playerScore -= 2;
        console.log("플레이어 E");

    } else {                          // 일반 클릭

        playerScore -= 2;
        bankerScore++;
        playerLoseStreak = false;
        console.log("플레이어 F");

    }

    if (playerScore <= 0) {
        playerScore = 0;
    }

    var playerPrice = margin[playerScore];
    var bankerPrice = margin[bankerScore];

    if ( list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B' && bankerLoseStreak === true ){ 
        bankerPrice = 0;
    } 


    list.push("A");
    console.log(list);

    if( list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A' ){
        bankerPrice = 0;
    }

    if( bankerMultiLose === true){      // 4연패 후 첫 승은 계산 안함
        bankerPrice = 0;
    }
    
    if( playerMultiLose === true){      // 4연패 후 첫 승은 계산 안함
        playerPrice = 0;
    }

    console.log("플레이어 연패 " + playerLoseStreak);
    console.log("뱅커 연패 "+bankerLoseStreak);
    console.log("플레이어 4연패 " + playerMultiLose);
    console.log("뱅커 4연패 "+bankerMultiLose);
    console.log("뱅커 "+bankerPrice);
    console.log("플레이어 "+playerPrice);
    
    const culBoth = playerPrice - bankerPrice;

    if(culBoth > 0) {

        bettingScreen.innerHTML = "플레이어 " + Math.abs(culBoth);
        bettingScreen.style.borderColor = "#3498db";
        bettingScreen.style.boxShadow = "0 0 0 1px #3498db inset";
        bettingScreen.style.color = "#3498db";

    }else if (culBoth < 0){

        bettingScreen.innerHTML = "뱅커 " + Math.abs(culBoth);
        bettingScreen.style.borderColor = "#e74c3c";
        bettingScreen.style.boxShadow = "0 0 0 1px #e74c3c inset";
        bettingScreen.style.color = "#e74c3c";

    }else if (culBoth === 0){

        bettingScreen.innerHTML = "휴식";
        bettingScreen.style.borderColor = "#c7c7c7";
        bettingScreen.style.boxShadow = "0 0 0 1px #c7c7c7 inset";
        bettingScreen.style.color = "#c7c7c7";

    }

    if(bankerScore >= limit){

        alert( "마틴에 도달했습니다. 게임을 다시 시작합니다." );
        gameReset();

    }



    document.querySelector("#playerScore").innerHTML = playerScore;
    document.querySelector("#bankerScore").innerHTML = bankerScore;

})

BTN_Banker.addEventListener("click", function(){

    // 승률
    if(document.querySelector("#bettingScreen").innerText.includes("뱅커") === true){

        winCount++;
        win.innerHTML = winCount;
        winRate.innerHTML = Math.floor((winCount/(winCount+loseCount))*100);

    } else if (document.querySelector("#bettingScreen").innerText.includes("플레이어") === true) {

        loseCount++;
        lose.innerHTML = loseCount;
        winRate.innerHTML = Math.floor((winCount/(winCount+loseCount))*100);

    }

    if(list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A'){     // 2연패

        bankerLoseStreak = true;
        playerScore++;
        console.log("뱅커 A")

    } else if ( list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B' ){ 

        if ( bankerMultiLose === true ){

            bankerMultiLose === false;
            console.log("뱅커 B-1");

        } else {

            bankerScore -= 2;
            console.log("뱅커 B-2");

        }


    } else if ( bankerMultiLose === true){ // 4연패

        if( list.slice(-1)[0] === 'B' ){

            playerScore++;
            bankerLoseStreak = false;
            bankerMultiLose = false;
            console.log("뱅커 C-1");

        } else {

            playerScore++;
            console.log("뱅커 C-2");

        }


    } else if ( playerLoseStreak === true && list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'B'){

        if(playerMultiLose === true){
            bankerScore -= 2;
            console.log("뱅커 D-1");

        } else {
            playerScore++;
            bankerScore -= 2;
            playerLoseStreak = false;
            playerMultiLose = true;
            console.log("뱅커 D-2");
        }


    } else if (playerMultiLose === true){      //ppbppbp

        bankerScore -= 2;
        console.log("뱅커 E");

    } else {

        bankerScore -= 2;
        playerScore++;
        bankerLoseStreak = false;
        console.log("뱅커 F");

    }

    if (bankerScore <= 0) {
        bankerScore = 0;
    }
    
    let playerPrice = margin[playerScore];
    let bankerPrice = margin[bankerScore];

    if ( list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A' && playerLoseStreak === true){ 
        playerPrice = 0;

    } 

    list.push("B");
    console.log(list);

    if( list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B'){
        playerPrice = 0;
    }

    if( playerMultiLose === true){      // 4연패 후 첫 승은 계산 안함
        playerPrice = 0;

    }
    if( bankerMultiLose === true){      // 4연패 후 첫 승은 계산 안함
        bankerPrice = 0;

    }

    console.log("플레이어 연패 " + playerLoseStreak);
    console.log("뱅커 연패 "+bankerLoseStreak);
    console.log("플레이어 4연패 " + playerMultiLose);
    console.log("뱅커 4연패 "+bankerMultiLose);
    console.log("뱅커 "+bankerPrice);
    console.log("플레이어 "+playerPrice);

    const culBoth = playerPrice - bankerPrice;




    if(culBoth > 0) {

        bettingScreen.innerHTML = "플레이어 " + Math.abs(culBoth);
        bettingScreen.style.borderColor = "#3498db";
        bettingScreen.style.boxShadow = "0 0 0 1px #3498db inset";
        bettingScreen.style.color = "#3498db";

    }else if (culBoth < 0){

        bettingScreen.innerHTML = "뱅커 " + Math.abs(culBoth);
        bettingScreen.style.borderColor = "#e74c3c";
        bettingScreen.style.boxShadow = "0 0 0 1px #e74c3c inset";
        bettingScreen.style.color = "#e74c3c";

    }else if (culBoth === 0){

        bettingScreen.innerHTML = "휴식";
        bettingScreen.style.borderColor = "#c7c7c7";
        bettingScreen.style.boxShadow = "0 0 0 1px #c7c7c7 inset";
        bettingScreen.style.color = "#c7c7c7";

    }

    if ( playerScore >= limit ) {

        alert( "마틴에 도달되었습니다. 게임을 다시 시작합니다." );
        gameReset();

    }

    document.querySelector("#playerScore").innerHTML = playerScore;
    document.querySelector("#bankerScore").innerHTML = bankerScore;

})

function manual (){

    document.querySelector("#manual").addEventListener("click", function(){
        document.querySelector("#gameMenu").style.display = "block";
    })
    document.querySelector("#gameMenuCloseBtn").addEventListener("click", function(){
        document.querySelector("#gameMenu").style.display = "none";
    })

}
manual ();

function nightMode(){

    const nightModeBtn = document.querySelector("#nightMode")

    nightModeBtn.addEventListener("click", function(){
        nightModeBtn.classList.toggle("active");
        document.querySelector("html").classList.toggle("dark");
        document.querySelector("#gameMenu").classList.toggle("dark");
    })
}
nightMode()