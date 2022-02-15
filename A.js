const unsetMargin = [10000,15000,30000,45000,75000,120000,195000,315000,410000,725000];

// 입력값 설정

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


let premium = 0;
let limit = 10;
let startAmountValue;

let sumGameResult = 0;

// let betAmountValue = sumGameResult;         // 배팅 금액             
let profitValue = 0;                        // 합산 손익

let playerScore = 0;
let bankerScore = 0;

let playerLoseStreak = false;
let bankerLoseStreak = false;
let playerMultiLose = false;
let bankerMultiLose = false;

let playerprice = 0;
let bankerprice = 0;  

let list = [];                      // 버튼
let margin = [];

let gameResultArr = [];             // 게임 결과 값
let gameResultAllArr = [];          
let sumGameResultArr = []
let nowPriceValueArr = [];          // 현재 금액
let profitValueArr = [];



let playerScoreArr = [0];
let bankerScoreArr = [0];

let playerLoseStreakArr = [];
let bankerLoseStreakArr = [];
let playerMultiLoseArr = [];
let bankerMultiLoseArr = [];


let winRateCheck = 0;

let winCountArr = [0];
let loseCountArr = [0];


function bugTest(){

    // console.log("플레이어 연패 " + playerLoseStreak);
    // console.log("뱅커 연패 "+bankerLoseStreak);
    // console.log("플레이어 4연패 " + playerMultiLose);
    // console.log("뱅커 4연패 "+bankerMultiLose);
    // console.log("뱅커 "+bankerPrice);
    // console.log("플레이어 "+playerPrice);

    console.log(list)
    // console.log(limit)
    // console.log(gameResultAllArr)

    console.log( playerLoseStreakArr)    // 2연패
    console.log( bankerLoseStreakArr)    // 2연패
    
    // console.log( playerMultiLoseArr )    // 4연패
    // console.log( bankerMultiLoseArr )    // 4연패

    // console.log(bankerLoseStreak)
    console.log(playerScoreArr.slice(-1)[0])
    console.log(bankerScoreArr.slice(-1)[0])
    console.log(playerScoreArr)
    console.log(bankerScoreArr)

    document.querySelector("#playerScore").innerHTML = playerScoreArr.slice(-1)[0];
    document.querySelector("#bankerScore").innerHTML = bankerScoreArr.slice(-1)[0];

}



function nowProfit(){       // 합산 손익

    let nowProfit = nowPriceValueArr.slice(-1)[0] - startAmountValue;
    profit.innerHTML = nowProfit.toLocaleString('ko-KR');


}
nowProfit()

function nowPricePlayerWin(){       // 현재금액
    // 수수료 0.5% 선택적 적용
    nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0] + (Math.abs(gameResultArr.slice(-1)[0]) - (Math.abs(gameResultArr.slice(-1)[0]) * premium / 100 ) )  );
    nowPrice.innerHTML = nowPriceValueArr.slice(-1)[0].toLocaleString('ko-KR');

    // console.log(Math.abs(gameResultArr.slice(-1)[0]) - (Math.abs(gameResultArr.slice(-1)[0]) * premium / 100 ) )

    if (nowPriceValueArr.slice(-1)[0] < 0){
        alert("청산됐습니다.")
        gameReset()
    }
}
function nowPriceBankerWin(){       // 현재금액
    // 수수료 0.5%
    nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0] + (Math.abs(gameResultArr.slice(-1)[0]) - (Math.abs(gameResultArr.slice(-1)[0]) * 5 / 100 ) )  );
    nowPrice.innerHTML = nowPriceValueArr.slice(-1)[0].toLocaleString('ko-KR');

    if (nowPriceValueArr.slice(-1)[0] < 0){
        alert("청산됐습니다.")
        gameReset()
    }
}
function nowPriceLose(){       // 현재금액

    nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0] - Math.abs(gameResultArr.slice(-1)[0]));
    nowPrice.innerHTML = nowPriceValueArr.slice(-1)[0].toLocaleString('ko-KR');

    if (nowPriceValueArr.slice(-1)[0] < 0){
        alert("청산됐습니다.")
        gameReset()
    }
}


function gameReset(){       // 게임 리셋

    bettingScreen.innerHTML = "게임 결과를 입력해주세요.";
    bettingScreen.style.borderColor = "#c7c7c7";
    bettingScreen.style.boxShadow = "0 0 0 1px #c7c7c7 inset";
    bettingScreen.style.color = "inherit";
    playerLoseStreakArr = [];
    bankerLoseStreakArr = [];
    playerMultiLoseArr = [];
    bankerMultiLoseArr = [];
    playerScore = 0;
    bankerScore = 0;
    winCount = 0;
    loseCount = 0;
    winRateCheck = 0;
    // betAmount.innerHTML = 0;
    winRate.innerHTML = 0;
    win.innerHTML = 0;
    lose.innerHTML = 0;

    list = [];
    gameResultArr = [];
    gameResultAllArr = [];
    sumGameResultArr = [];
    profitValueArr = [];
    winCountArr = [0];
    loseCountArr = [0];

    playerScoreArr = [0]
    bankerScoreArr = [0]

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
    
    playerMultiLoseArr.splice(-1,1);
    bankerMultiLoseArr.splice(-1,1);
    playerLoseStreakArr.splice(-1,1);
    bankerLoseStreakArr.splice(-1,1);

    playerScoreArr.splice(-1,1);
    bankerScoreArr.splice(-1,1);

    win.innerHTML = winCountArr.slice(-1)[0];
    lose.innerHTML = loseCountArr.slice(-1)[0];
    winRate.innerHTML = Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100);


    if(isNaN(Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100)) === true){
        return gameReset()
    }

    nowPrice.innerHTML = nowPriceValueArr.slice(-1)[0].toLocaleString('ko-KR');
    // betAmount.innerHTML = sumGameResultArr.slice(-1)[0].toLocaleString('ko-KR');
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


function LoseRecode(){          // 연패 기록

    if ( playerLoseStreak === false ) {
        playerLoseStreakArr.push(false);

    } else if (playerLoseStreak === true ){
        playerLoseStreakArr.push(true);

    }

    if ( bankerLoseStreak === false ) {
        bankerLoseStreakArr.push(false);

    } else if (bankerLoseStreak === true ){
        bankerLoseStreakArr.push(true);

    }

    if ( playerMultiLose === false ) {
        playerMultiLoseArr .push(false);

    } else if (playerMultiLose === true ){
        playerMultiLoseArr .push(true);

    }

    if ( bankerMultiLose === false ) {
        bankerMultiLoseArr.push(false);

    } else if (bankerMultiLose === true ){
        bankerMultiLoseArr.push(true);

    }

}


function betResult(){       // 게임 스크린

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

        gameResultAllArr.push("휴식")
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
        nowPricePlayerWin()

    } else if (gameResultArr.slice(-1)[0] < 0){

        winCountArr.push( winCountArr.slice(-1)[0] );
        loseCountArr.push( loseCountArr.slice(-1)[0] + 1 );

        lose.innerHTML = loseCountArr.slice(-1)[0];
        winRate.innerHTML = Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100);

        nowPriceLose()
    } else {    // 휴식

        winCountArr.push( winCountArr.slice(-1)[0] );
        loseCountArr.push( loseCountArr.slice(-1)[0] );

    }

    // 합산손익
    nowProfit()

    // 배팅금액
    for(let i = 0; i < gameResultArr.length; i++){
        sumGameResult += Math.abs(gameResultArr[i]);
    }

    sumGameResultArr.push(sumGameResult)
    sumGameResult = 0;

    // betAmount.innerHTML = sumGameResultArr.slice(-1)[0].toLocaleString('ko-KR');


    // 계산
    if(list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B'){     // 2연패

        playerLoseStreak = true;
        playerScoreArr.push( playerScoreArr.slice(-1)[0] )
        bankerScoreArr.push(bankerScoreArr.slice(-1)[0] + 1);
        console.log("플레이어 A");

    } else if ( list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A' ){  

        if ( playerMultiLoseArr.slice(-1)[0] === true ){    // 뱅커 4연패

            playerScoreArr.push( playerScoreArr.slice(-1)[0] )
            bankerScoreArr.push( bankerScoreArr.slice(-1)[0] )
            playerMultiLose = false;
            onsole.log("플레이어 B-1");

        } else {

            playerScoreArr.push( playerScoreArr.slice(-1)[0] - 2 );
            bankerScoreArr.push( bankerScoreArr.slice(-1)[0] )
            console.log("플레이어 B-2");

        }

    } else if ( playerMultiLoseArr.slice(-1)[0] === true){  // 플레이어 4연패

        if ( list.slice(-1)[0] === 'A' ){

            playerScoreArr.push( playerScoreArr.slice(-1)[0] )
            bankerScoreArr.push( bankerScoreArr.slice(-1)[0] + 1 );
            playerLoseStreak = false;
            playerMultiLose = false;
            console.log("플레이어 C-1");

        } else {

            playerScoreArr.push( playerScoreArr.slice(-1)[0] )
            bankerScoreArr.push( bankerScoreArr.slice(-1)[0] + 1 );
            console.log("플레이어 C-2");

        }


    } 
    else if ( bankerLoseStreakArr.slice(-1)[0] === true && list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'A' ){ // 뱅커 연패

        if( bankerMultiLose === true ){
            playerScoreArr.push( playerScoreArr.slice(-1)[0] - 2 );
            bankerScoreArr.push( bankerScoreArr.slice(-1)[0] )
            console.log("플레이어 D-1");

        } else {
            bankerScore++;
            playerScoreArr.push( playerScoreArr.slice(-1)[0] - 2 );
            bankerScoreArr.push( bankerScoreArr.slice(-1)[0] )
            bankerLoseStreak = false;
            bankerMultiLose = true;
            console.log("플레이어 D-2");
        }


    } else if ( bankerMultiLoseArr.slice(-1)[0] === true ){      //ppbppbp

        playerScoreArr.push( playerScoreArr.slice(-1)[0] - 2 );
        bankerScoreArr.push( bankerScoreArr.slice(-1)[0] )
        console.log("플레이어 E");

    } else {                          // 일반 클릭

        playerScoreArr.push( playerScoreArr.slice(-1)[0] - 2 );
        bankerScoreArr.push( bankerScoreArr.slice(-1)[0] + 1 );
        playerLoseStreak = false;
        console.log("플레이어 F");

    }


    if (playerScoreArr.slice(-1)[0] <= 0) {

        playerScoreArr.splice(-1, 1)
        playerScoreArr.push(0)

    }
    


    var playerPrice = margin[playerScoreArr.slice(-1)[0]];
    var bankerPrice = margin[bankerScoreArr.slice(-1)[0]];

    if ( list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B' && bankerLoseStreakArr.slice(-1)[0] === true ){ 
        bankerPrice = 0;
    } 


    list.push("A");

    if( list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A' ){
        bankerPrice = 0;
    }

    if( bankerMultiLoseArr.slice(-1)[0] === true){      // 4연패 후 첫 승은 계산 안함
        bankerPrice = 0;
    }
    
    if( playerMultiLoseArr.slice(-1)[0] === true){      // 4연패 후 첫 승은 계산 안함
        playerPrice = 0;
    }

    // 연패 기록
    LoseRecode()



    
    culBoth = playerPrice - bankerPrice;

    // 게임 결과 다음회차에 배팅할 금액을 화면에 출력
    betResult()

    if( bankerScore >= limit ){

        alert( "자동 리셋에 도달했습니다. 게임을 다시 시작합니다." );
        return gameReset();

    }

    gameResultArr.push(culBoth)


    // bugTest()





})

BTN_Banker.addEventListener("click", function(){

    // 배팅금액
    for(let i = 0; i < gameResultArr.length; i++){
        sumGameResult += Math.abs(gameResultArr[i]);
    }

    sumGameResultArr.push(sumGameResult)
    sumGameResult = 0;

    // betAmount.innerHTML = sumGameResultArr.slice(-1)[0].toLocaleString('ko-KR');


    // 승률
    if(gameResultArr.slice(-1)[0] < 0){     // 승


        winCountArr.push( winCountArr.slice(-1)[0] + 1 );
        loseCountArr.push( loseCountArr.slice(-1)[0] );

        win.innerHTML = winCountArr.slice(-1)[0];
        winRate.innerHTML = Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100);

        // 현재금액
        nowPriceBankerWin()

    } else if (gameResultArr.slice(-1)[0] > 0) {   // 패

        winCountArr.push( winCountArr.slice(-1)[0] );
        loseCountArr.push( loseCountArr.slice(-1)[0] + 1 );

        lose.innerHTML = loseCountArr.slice(-1)[0];
        winRate.innerHTML = Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100);

        // 현재금액
        nowPriceLose()

    } else {    // 휴식

        winCountArr.push( winCountArr.slice(-1)[0] );
        loseCountArr.push( loseCountArr.slice(-1)[0] );

    }

    // 합산손익
    nowProfit()





    // 계산
    if(list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A'){     // 2연패

        bankerLoseStreak = true;
        playerScoreArr.push( playerScoreArr.slice(-1)[0] + 1 );
        bankerScoreArr.push( bankerScoreArr.slice(-1)[0] );
        console.log("뱅커 A")

    } else if ( list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B' ){ 

        if ( bankerMultiLoseArr.slice(-1)[0] === true ){

            playerScoreArr.push( playerScoreArr.slice(-1)[0] );
            bankerScoreArr.push( bankerScoreArr.slice(-1)[0] );
            bankerMultiLose = false;
            console.log("뱅커 B-1");

        } else {

            playerScoreArr.push( playerScoreArr.slice(-1)[0] );
            bankerScoreArr.push( bankerScoreArr.slice(-1)[0] - 2 );
            console.log("뱅커 B-2");

        }


    } else if ( bankerMultiLoseArr.slice(-1)[0] === true){ // 4연패

        if( list.slice(-1)[0] === 'B' ){

            playerScoreArr.push( playerScoreArr.slice(-1)[0] + 1 );
            bankerScoreArr.push( bankerScoreArr.slice(-1)[0] );
            bankerLoseStreak = false;
            bankerMultiLose = false;
            console.log("뱅커 C-1");

        } else {

            playerScoreArr.push( playerScoreArr.slice(-1)[0] + 1 );
            bankerScoreArr.push( bankerScoreArr.slice(-1)[0] );
            console.log("뱅커 C-2");

        }


    } else if ( playerLoseStreakArr.slice(-1)[0] === true && list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'B'){

        if(playerMultiLoseArr.slice(-1)[0] === true){

            playerScoreArr.push( playerScoreArr.slice(-1)[0] );
            bankerScoreArr.push( bankerScoreArr.slice(-1)[0] - 2 );
            console.log("뱅커 D-1");

        } else {

            playerScoreArr.push(playerScoreArr.slice(-1)[0] + 1);
            bankerScoreArr.push(bankerScoreArr.slice(-1)[0] - 2);
            playerLoseStreak = false;
            playerMultiLose = true;
            console.log("뱅커 D-2");

        }


    } else if ( playerMultiLoseArr.slice(-1)[0] === true ){      //ppbppbp

        playerScoreArr.push( playerScoreArr.slice(-1)[0] );
        bankerScoreArr.push( bankerScoreArr.slice(-1)[0] - 2 );
        console.log("뱅커 E");

    } else {

        bankerScoreArr.push(bankerScoreArr.slice(-1)[0] - 2);
        playerScoreArr.push(playerScoreArr.slice(-1)[0] + 1);
        bankerLoseStreak = false;
        console.log("뱅커 F");

    }

    if ( bankerScoreArr.slice(-1)[0] <= 0 ) {

        bankerScoreArr.splice(-1, 1)
        bankerScoreArr.push(0)
    }
    
    let playerPrice = margin[playerScoreArr.slice(-1)[0]];
    let bankerPrice = margin[bankerScoreArr.slice(-1)[0]];

    if ( list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A' && playerLoseStreakArr.slice(-1)[0] === true){ 
        playerPrice = 0;

    } 

    list.push("B");
    // console.log(list);

    if( list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B'){
        playerPrice = 0;
    }

    if( playerMultiLoseArr.slice(-1)[0] === true){      // 4연패 후 첫 승은 계산 안함
        playerPrice = 0;

    }

    if( bankerMultiLoseArr.slice(-1)[0] === true){      // 4연패 후 첫 승은 계산 안함
        bankerPrice = 0;

    }


    // 연패 기록
    LoseRecode()


    culBoth = playerPrice - bankerPrice;

    betResult()


    if ( playerScore >= limit ) {

        alert( "리셋 단계에 도달되었습니다. 게임을 다시 시작합니다." );
        return gameReset();

    }

    gameResultArr.push(culBoth)

    // bugTest()


    

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
    const setMargin = document.querySelector("#martinSet");
    const levelLimit = document.querySelector("#levelLimit");
    const gameType = document.querySelector("#gameType");
    

    let setMarginValue = 1;

    setMargin.addEventListener("change", function(){    // 마틴배율
            
            setMarginValue = setMargin.value

    })

    gameType.addEventListener("change", function(){    // 게임종류
            
        premium = gameType.value

    })

    levelLimit.addEventListener("change", function(){   // 자동리셋
            
            limit = levelLimit.value

    })



    document.querySelector("#settingBtn").addEventListener("click", function(){
        gameSet.classList.add("active");
        cover.classList.add("active");
    });

    setOK.addEventListener("click", function(){

        let optionTxt = document.querySelector("#martinSet option:checked").text    

        if( priceInput.value == '' || priceInput.value < 10000){

            priceInput.style.borderColor = "#FF0000"

        } else {

            margin = []

            for (let j = 0; j < unsetMargin.length; j++){
                margin.push(unsetMargin[j] * setMarginValue);
            }
            betAmount.innerHTML = optionTxt;

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