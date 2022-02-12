const margin = [10000,15000,30000,45000,75000,120000,195000,315000,410000,725000];

// for(let i = 0; i < )

// console.log(margin*2)
// 입력 값 설정


const bettingScreen = document.querySelector("#bettingScreen");
const BTN_Player = document.querySelector("#player");
const BTN_Banker = document.querySelector("#banker");
const win = document.querySelector("#win");
const lose = document.querySelector("#lose");
const winRate = document.querySelector("#winRate");
const betAmount = document.querySelector("#betAmount");
const startingAmount =document.querySelector("#startingAmount");
const nowPrice = document.querySelector("#nowPrice");
const profit = document.querySelector("#profit");


let limit = 10;
let startAmountValue;

let sumGameResult = 0;

let betAmountValue = sumGameResult;         // 배팅 금액
let nowPriceValue = 0;                      // 현재 금액
let profitValue = 0;                        // 합산 손익

let playerScore = 0;
let bankerScore = 0;

let playerLoseStreak = false;
let bankerLoseStreak = false;

let playerMultiLose = false;
let bankerMultiLose = false;

let playerprice = 0;
let bankerprice = 0;  

let list = [];
let gameResultArr = [];
let gameResultAllArr = [];
let sumGameResultArr = []
let nowPriceValueArr = [startAmountValue];
let profitValueArr = [];



let playerScoreList = [];
let bankerScoreList = [];

let playerLoseStreakList = [];
let bankerLoseStreakList = [];

let playerMultiLoseList = [];
let bankerMultiLoseList = [];

let playerpriceList = [];
let bankerpriceList = [];

// let winCount;
// let loseCount;
let winRateCheck = 0;

let winCountArr = [0];
let loseCountArr = [0];


betAmount.innerHTML = 0;


function nowProfit(){       // 합산 손익

    let nowProfit = nowPriceValueArr.slice(-1)[0] - startAmountValue;
    profit.innerHTML = nowProfit.toLocaleString('ko-KR');

}
nowProfit()


function gameReset(){       // 게임 리셋

    bettingScreen.innerHTML = "게임 결과를 입력해주세요.";
    bettingScreen.style.borderColor = "#c7c7c7";
    bettingScreen.style.boxShadow = "0 0 0 1px #c7c7c7 inset";
    bettingScreen.style.color = "inherit";
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
    betAmount.innerHTML = 0;

    list = [];
    gameResultArr = [];
    gameResultAllArr = [];
    sumGameResultArr = [];
    profitValueArr = [];
    winCountArr = [0];
    loseCountArr = [0];

    nowPriceValueArr = [startAmountValue]
    startingAmount.innerHTML = startAmountValue.toLocaleString('ko-KR');
    nowPrice.innerHTML = startAmountValue.toLocaleString('ko-KR');

    nowProfit()

}

function revert(){      // 게임 뒤로 가기
    
    list.splice(-1,1);
    gameResultArr.splice(-1,1);
    sumGameResultArr.splice(-1,1);
    nowPriceValueArr.splice(-1,1);
    gameResultAllArr.splice(-1,1);
    loseCountArr.splice(-1,1);
    winCountArr.splice(-1,1);


    win.innerHTML = winCountArr.slice(-1)[0];
    lose.innerHTML = loseCountArr.slice(-1)[0];
    winRate.innerHTML = Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100);


    if(isNaN(Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100)) === true){
        return gameReset()
    }

    console.log( winCountArr.slice(-1)[0], loseCountArr.slice(-1)[0])

    nowPrice.innerHTML = nowPriceValueArr.slice(-1)[0].toLocaleString('ko-KR');
    betAmount.innerHTML = sumGameResultArr.slice(-1)[0].toLocaleString('ko-KR');
    bettingScreen.innerHTML = gameResultAllArr.slice(-1)[0].toLocaleString('ko-KR');

    if( gameResultAllArr.slice(-1)[0].includes("플레이어") === true ) {

        bettingScreen.style.borderColor = "#3498db";
        bettingScreen.style.boxShadow = "0 0 0 1px #3498db inset";
        bettingScreen.style.color = "#3498db";

    }else if ( gameResultAllArr.slice(-1)[0].includes("뱅커") === true ){

        bettingScreen.style.borderColor = "#e74c3c";
        bettingScreen.style.boxShadow = "0 0 0 1px #e74c3c inset";
        bettingScreen.style.color = "#e74c3c";

    }else if ( gameResultAllArr.slice(-1)[0].includes("휴식") === true ){

        bettingScreen.style.borderColor = "#c7c7c7";
        bettingScreen.style.boxShadow = "0 0 0 1px #c7c7c7 inset";
        bettingScreen.style.color = "#c7c7c7";

    }

    nowProfit()

}


function betResult(){

    if(culBoth > 0) {

        gameResultAllArr.push("플레이어 " + Math.abs(culBoth).toLocaleString('ko-KR'))
        bettingScreen.innerHTML = gameResultAllArr.slice(-1)[0].toLocaleString('ko-KR');
        bettingScreen.style.borderColor = "#3498db";
        bettingScreen.style.boxShadow = "0 0 0 1px #3498db inset";
        bettingScreen.style.color = "#3498db";

    }else if (culBoth < 0){

        gameResultAllArr.push("뱅커 " + Math.abs(culBoth).toLocaleString('ko-KR'))
        bettingScreen.innerHTML = gameResultAllArr.slice(-1)[0].toLocaleString('ko-KR');
        bettingScreen.style.borderColor = "#e74c3c";
        bettingScreen.style.boxShadow = "0 0 0 1px #e74c3c inset";
        bettingScreen.style.color = "#e74c3c";

    }else if (culBoth === 0){

        gameResultAllArr.push()
        bettingScreen.innerHTML = "휴식";
        bettingScreen.style.borderColor = "#c7c7c7";
        bettingScreen.style.boxShadow = "0 0 0 1px #c7c7c7 inset";
        bettingScreen.style.color = "#c7c7c7";

    }

}


document.querySelector("#resetBtn").addEventListener("click", function(){
    gameReset();
})
document.querySelector("#revert").addEventListener("click", function(){
    revert();
})

BTN_Player.addEventListener("click", function(){


    // 승률
    if(gameResultArr.slice(-1)[0] > 0){

        winCountArr.push( winCountArr.slice(-1)[0] +1 );
        loseCountArr.push( loseCountArr.slice(-1)[0] );

        win.innerHTML = winCountArr.slice(-1)[0];
        winRate.innerHTML = Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100);

        // 현재금액
        nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0] + Math.abs(gameResultArr.slice(-1)[0]));
        nowPrice.innerHTML = nowPriceValueArr.slice(-1)[0].toLocaleString('ko-KR');

    } else if (gameResultArr.slice(-1)[0] < 0){

        winCountArr.push( winCountArr.slice(-1)[0] );
        loseCountArr.push( loseCountArr.slice(-1)[0] + 1 );

        lose.innerHTML = loseCountArr.slice(-1)[0];
        winRate.innerHTML = Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100);

        // 현재금액
        nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0] - Math.abs(gameResultArr.slice(-1)[0]));
        nowPrice.innerHTML = nowPriceValueArr.slice(-1)[0].toLocaleString('ko-KR');

    } 

    // 합산손익
    nowProfit()

    // 배팅금액
    for(let i = 0; i < gameResultArr.length; i++){
        sumGameResult += Math.abs(gameResultArr[i]);
    }

    sumGameResultArr.push(sumGameResult)
    sumGameResult = 0;

    betAmount.innerHTML = sumGameResultArr.slice(-1)[0].toLocaleString('ko-KR');


    // 계산
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
    // console.log(list);

    if( list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A' ){
        bankerPrice = 0;
    }

    if( bankerMultiLose === true){      // 4연패 후 첫 승은 계산 안함
        bankerPrice = 0;
    }
    
    if( playerMultiLose === true){      // 4연패 후 첫 승은 계산 안함
        playerPrice = 0;
    }

    // console.log("플레이어 연패 " + playerLoseStreak);
    // console.log("뱅커 연패 "+bankerLoseStreak);
    // console.log("플레이어 4연패 " + playerMultiLose);
    // console.log("뱅커 4연패 "+bankerMultiLose);
    // console.log("뱅커 "+bankerPrice);
    // console.log("플레이어 "+playerPrice);
    
    culBoth = playerPrice - bankerPrice;

    betResult()

    if( bankerScore >= limit ){

        alert( "마틴에 도달했습니다. 게임을 다시 시작합니다." );
        return gameReset();

    }

    gameResultArr.push(culBoth)
    // console.log(gameResultArr)

    // document.querySelector("#playerScore").innerHTML = playerScore;
    // document.querySelector("#bankerScore").innerHTML = bankerScore;

})

BTN_Banker.addEventListener("click", function(){

    // 배팅금액
    for(let i = 0; i < gameResultArr.length; i++){
        sumGameResult += Math.abs(gameResultArr[i]);
    }

    sumGameResultArr.push(sumGameResult)
    sumGameResult = 0;

    betAmount.innerHTML = sumGameResultArr.slice(-1)[0].toLocaleString('ko-KR');



    // 승률
    if(gameResultArr.slice(-1)[0] < 0){     // 승


        winCountArr.push( winCountArr.slice(-1)[0] + 1 );
        loseCountArr.push( loseCountArr.slice(-1)[0] );

        win.innerHTML = winCountArr.slice(-1)[0];
        winRate.innerHTML = Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100);

        // 현재금액
        nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0] + Math.abs(gameResultArr.slice(-1)[0]))
        nowPrice.innerHTML = nowPriceValueArr.slice(-1)[0].toLocaleString('ko-KR');

    } else if (gameResultArr.slice(-1)[0] > 0) {   // 패

        winCountArr.push( winCountArr.slice(-1)[0] );
        loseCountArr.push( loseCountArr.slice(-1)[0] + 1 );

        lose.innerHTML = loseCountArr.slice(-1)[0];
        winRate.innerHTML = Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100);

        // 현재금액
        nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0] - Math.abs(gameResultArr.slice(-1)[0]))
        nowPrice.innerHTML = nowPriceValueArr.slice(-1)[0].toLocaleString('ko-KR');

    }
    // console.log(nowPriceValue)
    // console.log(nowPriceValueArr)


    // 합산손익
    nowProfit()



    // 계산
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
    // console.log(list);

    if( list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B'){
        playerPrice = 0;
    }

    if( playerMultiLose === true){      // 4연패 후 첫 승은 계산 안함
        playerPrice = 0;

    }
    if( bankerMultiLose === true){      // 4연패 후 첫 승은 계산 안함
        bankerPrice = 0;

    }

    // console.log("플레이어 연패 " + playerLoseStreak);
    // console.log("뱅커 연패 "+bankerLoseStreak);
    // console.log("플레이어 4연패 " + playerMultiLose);
    // console.log("뱅커 4연패 "+bankerMultiLose);
    // console.log("뱅커 "+bankerPrice);
    // console.log("플레이어 "+playerPrice);

    culBoth = playerPrice - bankerPrice;

    betResult()


    if ( playerScore >= limit ) {

        alert( "마틴에 도달되었습니다. 게임을 다시 시작합니다." );
        return gameReset();

    }

    gameResultArr.push(culBoth)
    // console.log(gameResultArr)

    
    // document.querySelector("#playerScore").innerHTML = playerScore;
    // document.querySelector("#bankerScore").innerHTML = bankerScore;

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
        document.querySelector("#gameSet").classList.toggle("dark");
        document.querySelector("#gameMenu").classList.toggle("dark");
        document.querySelector("#cover").classList.toggle("dark");
    })

}
nightMode()

function setting(){

    const gameSet = document.querySelector("#gameSet");
    const cover = document.querySelector("#cover");
    const setOK = document.querySelector("#setOK");
    const setCancle = document.querySelector("#setCancle");
    const priceInput = document.querySelector("#priceInput");

    document.querySelector("#settingBtn").addEventListener("click", function(){
        gameSet.classList.add("active");
        cover.classList.add("active");
    });

    setOK.addEventListener("click", function(){

        if( priceInput.value == '' || priceInput.value < 10000){

            priceInput.style.borderColor = "#FF0000"

        } else {

            startAmountValue = Number(priceInput.value);
            gameSet.classList.remove("active");
            cover.classList.remove("active");
            setOK.classList.add("active");
            setCancle.classList.add("active");
            priceInput.style.borderColor = "#000";

            return gameReset()

        }

    });

    setCancle.addEventListener("click", function(){

        gameSet.classList.remove("active");
        cover.classList.remove("active");

    });

}
setting()