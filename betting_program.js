

const playerMarginA = [10000,10000,15000,20000,-30000,-40000,-50000,-65000,-85000];
const playerMarginB = playerMarginA.map(item => item * 2);
const bankerMarginA = [-10000,-10000,-15000,-20000,30000,40000,50000,65000,85000];
const bankerMarginB = bankerMarginA.map(item => item * 2);
const playerRest = [-10000, 10000, 10000, 15000]
const bankerRest = [10000, -10000, -10000, -15000]

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
const revertBtn = document.querySelector("#revert");
const priceInput = document.querySelector("#priceInput");
const resultView = document.querySelector("#resultView");
const cover = document.querySelector("#cover");
const setCancle = document.querySelector("#setCancle");

let premium = 0;
let limit = 10;
let startAmountValue;

let sumGameResult = 0;

// let betAmountValue = sumGameResult;         // 배팅 금액             
let profitValue = 0;                        // 합산 손익


let list = [];                      // 버튼
let margin = [];

let nowLevelArr = []
let gameResultArr = [];             // 게임 결과 값
let gameResultAllArr = [];
let sumGameResultArr = [];
let nowPriceValueArr = [];          // 현재 금액
let profitValueArr = [];
let nowStatusArr = []


let winRateCheck = 0;
let winCountArr = [0];
let loseCountArr = [0];


const bugTest = () => {

    // console.log(list)
    // console.log(limit)
    // console.log(gameResultAllArr)
    console.log(nowLevelArr)
}



const nowProfit = () => {       // 합산 손익

    let nowProfit = nowPriceValueArr.slice(-1)[0] - startAmountValue;
    profit.innerHTML = nowProfit.toLocaleString('ko-KR');


}
nowProfit()

const nowPricePlayerWin= () => {       // 현재금액
    // 수수료 0.5% 선택적 적용
    nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0] + (Math.abs(gameResultArr.slice(-1)[0]) - (Math.abs(gameResultArr.slice(-1)[0]) * premium / 100 ) )  );
    nowPrice.innerHTML = nowPriceValueArr.slice(-1)[0].toLocaleString('ko-KR');

    // console.log(Math.abs(gameResultArr.slice(-1)[0]) - (Math.abs(gameResultArr.slice(-1)[0]) * premium / 100 ) )

    priceInput.value = nowPriceValueArr.slice(-1)[0];

    if (nowPriceValueArr.slice(-1)[0] < 0){
        alert("청산됐습니다.")
        gameReset()
    }
}
const nowPriceBankerWin = () => {       // 현재금액
    // 수수료 0.5%
    nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0] + (Math.abs(gameResultArr.slice(-1)[0]) - (Math.abs(gameResultArr.slice(-1)[0]) * 5 / 100 ) )  );
    nowPrice.innerHTML = nowPriceValueArr.slice(-1)[0].toLocaleString('ko-KR');

    priceInput.value = nowPriceValueArr.slice(-1)[0];

    if (nowPriceValueArr.slice(-1)[0] < 0){
        alert("청산됐습니다.")
        gameReset()
    }
}
const nowPriceLose = () => {       // 현재금액

    nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0] - Math.abs(gameResultArr.slice(-1)[0]));
    nowPrice.innerHTML = nowPriceValueArr.slice(-1)[0].toLocaleString('ko-KR');

    priceInput.value = nowPriceValueArr.slice(-1)[0];

    if (nowPriceValueArr.slice(-1)[0] < 0){
        alert("청산됐습니다.")
        gameReset()
    }
}


const starting = () => {   // 시작 금액

    startAmountValue = Number(priceInput.value);
    nowPriceValueArr = [startAmountValue]
    startingAmount.innerHTML = startAmountValue.toLocaleString('ko-KR');
}

const gameReset = () => {       // 게임 리셋

    revertBtn.disabled = false;     // 뒤로가기 버튼 해제
    document.querySelector("#revertLabel").style.color = "inherit"
    bettingScreen.style.borderColor = "#c7c7c7";
    bettingScreen.style.boxShadow = "0 0 0 1px #c7c7c7 inset";
    bettingScreen.style.color = "inherit";
    resultView.innerHTML = "";  // 하단 데이터 초기화
    
    cover.classList.add("active");
    setCancle.classList.remove("active");

    winCount = 0;
    loseCount = 0;
    winRateCheck = 0;
    // betAmount.innerHTML = 0;
    winRate.innerHTML = 0;
    win.innerHTML = 0;
    lose.innerHTML = 0;

    list = [];
    nowLevelArr = []
    gameResultArr = [];
    gameResultAllArr = [];
    sumGameResultArr = [];
    profitValueArr = [];
    winCountArr = [0];
    loseCountArr = [0];

    
    starting()
    nowPrice.innerHTML = startAmountValue.toLocaleString('ko-KR');

    nowProfit()

}

const revert = () => {      // 게임 뒤로 가기
    
    list.splice(-1,1);
    viewClick()
    gameResultArr.splice(-1,1);
    sumGameResultArr.splice(-1,1);
    nowPriceValueArr.splice(-1,1);
    gameResultAllArr.splice(-1,1);
    loseCountArr.splice(-1,1);
    winCountArr.splice(-1,1);
    nowLevelArr.splice(-1,1);

    win.innerHTML = winCountArr.slice(-1)[0];
    lose.innerHTML = loseCountArr.slice(-1)[0];
    winRate.innerHTML = Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100);

    priceInput.value = nowPriceValueArr.slice(-1)[0];

    // if(isNaN(Math.floor((winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0]))*100)) === true){
    //     return gameReset()
    // }

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

    }

    nowProfit()

}



const betResult = () => {       // 게임 스크린

    if(gameResultArr.slice(-1)[0] > 0) {

        gameResultAllArr.push("플레이어 " + Math.abs(gameResultArr.slice(-1)[0]).toLocaleString('ko-KR'))
        bettingScreen.innerHTML = gameResultAllArr.slice(-1)[0]
        bettingScreen.style.borderColor = "#3498db";
        bettingScreen.style.boxShadow = "0 0 0 1px #3498db inset";
        bettingScreen.style.color = "#3498db";

    }else if (gameResultArr.slice(-1)[0] < 0){

        gameResultAllArr.push("뱅커 " + Math.abs(gameResultArr.slice(-1)[0]).toLocaleString('ko-KR'))
        bettingScreen.innerHTML = gameResultAllArr.slice(-1)[0].toLocaleString('ko-KR');
        bettingScreen.style.borderColor = "#e74c3c";
        bettingScreen.style.boxShadow = "0 0 0 1px #e74c3c inset";
        bettingScreen.style.color = "#e74c3c";

    }

}



document.querySelector("#resetBtn").addEventListener("click", () => {
    gameReset();
})

revertBtn.addEventListener("click", () => {

    revert();
    // 뒤로가기 버튼 막음
    revertBtn.disabled = true;
    document.querySelector("#revertLabel").style.color = "#b1b1b1"
    
})

BTN_Player.addEventListener("click", () => {

    revertBtn.disabled = false;
    document.querySelector("#revertLabel").style.color = "inherit"

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

    
    if (nowLevelArr.slice(-1)[0] === "playerMarginA[0]" ) {
        gameResultArr.push(playerMarginB[0])
        nowLevelArr.push("playerMarginB[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[0]" ) {
        gameResultArr.push(playerMarginA[0])
        nowLevelArr.push("playerMarginA[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[1]" ) {
        gameResultArr.push(playerMarginB[1])
        nowLevelArr.push("playerMarginB[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[1]" ) {
        gameResultArr.push(playerMarginA[0])
        nowLevelArr.push("playerMarginA[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[2]" ) {
        gameResultArr.push(playerMarginB[2])
        nowLevelArr.push("playerMarginB[2]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[2]" ) {
        gameResultArr.push(playerMarginA[0])
        nowLevelArr.push("playerMarginA[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[3]" ) {
        gameResultArr.push(playerMarginB[3])
        nowLevelArr.push("playerMarginB[3]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[3]" ) {
        gameResultArr.push(playerMarginA[1])
        nowLevelArr.push("playerMarginA[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[4]" ) {
        gameResultArr.push(playerMarginA[5])
        nowLevelArr.push("playerMarginA[5]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[4]" ) {
        gameResultArr.push(playerMarginA[5])
        nowLevelArr.push("playerMarginA[5]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[5]" ) {
        gameResultArr.push(playerRest[1])
        nowLevelArr.push("playerRest[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[5]" ) {
        gameResultArr.push(playerRest[1])
        nowLevelArr.push("playerRest[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[6]" ) {
        gameResultArr.push(playerMarginA[7])
        nowLevelArr.push("playerMarginA[7]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[6]" ) {
        gameResultArr.push(playerMarginA[7])
        nowLevelArr.push("playerMarginA[7]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[7]" ) {
        gameResultArr.push(playerRest[2])
        nowLevelArr.push("playerRest[2]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[7]" ) {
        gameResultArr.push(playerRest[2])
        nowLevelArr.push("playerRest[2]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[8]" ) {
        alert("마지막 단계를 넘어 게임이 초기화 됩니다.");
        return gameReset()
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[8]" ) {
        alert("마지막 단계를 넘어 게임이 초기화 됩니다.");
        return gameReset()
    } else if (nowLevelArr.slice(-1)[0] === "bankerMarginA[0]" ) {
        gameResultArr.push(bankerMarginA[1])
        nowLevelArr.push("bankerMarginA[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[0]" ) {
        gameResultArr.push(bankerMarginA[1])
        nowLevelArr.push("bankerMarginA[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[1]" ) {
        gameResultArr.push(bankerRest[0])
        nowLevelArr.push("bankerRest[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[1]" ) {
        gameResultArr.push(bankerRest[0])
        nowLevelArr.push("bankerRest[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[2]" ) {
        gameResultArr.push(bankerMarginA[3])
        nowLevelArr.push("bankerMarginA[3]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[2]" ) {
        gameResultArr.push(bankerMarginA[3])
        nowLevelArr.push("bankerMarginA[3]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[3]" ) {
        gameResultArr.push(bankerMarginA[4])
        nowLevelArr.push("bankerMarginA[4]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[3]" ) {
        gameResultArr.push(bankerMarginA[4])
        nowLevelArr.push("bankerMarginA[4]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[4]" ) {
        gameResultArr.push(bankerMarginB[4])
        nowLevelArr.push("bankerMarginB[4]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[4]" ) {
        gameResultArr.push(playerMarginA[2])
        nowLevelArr.push("playerMarginA[2]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[5]" ) {
        gameResultArr.push(bankerMarginB[5])
        nowLevelArr.push("bankerMarginB[5]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[5]" ) {
        gameResultArr.push(playerMarginA[3])
        nowLevelArr.push("playerMarginA[3]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[6]" ) {
        gameResultArr.push(bankerMarginB[6])
        nowLevelArr.push("bankerMarginB[6]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[6]" ) {
        gameResultArr.push(bankerMarginA[4])
        nowLevelArr.push("bankerMarginA[4]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[7]" ) {
        gameResultArr.push(bankerMarginB[7])
        nowLevelArr.push("bankerMarginB[7]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[7]" ) {
        gameResultArr.push(bankerMarginA[5])
        nowLevelArr.push("bankerMarginA[5]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[8]" ) {
        gameResultArr.push(bankerMarginB[8])
        nowLevelArr.push("bankerMarginB[8]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[8]" ) {
        gameResultArr.push(bankerMarginA[6])
        nowLevelArr.push("bankerMarginA[6]")
    } else if( nowLevelArr.slice(-1)[0] === "playerRest[0]" ){
        gameResultArr.push(playerMarginA[2])
        nowLevelArr.push("playerMarginA[2]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerRest[1]" ){
        gameResultArr.push(playerRest[1])
        nowLevelArr.push("playerRest[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerRest[2]" ){
        gameResultArr.push(playerRest[2])
        nowLevelArr.push("playerRest[2]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerRest[3]" ){
        gameResultArr.push(playerRest[2])
        nowLevelArr.push("playerRest[2]")
    } else if( nowLevelArr.slice(-1)[0] === "bankerRest[0]" ){
        gameResultArr.push(bankerRest[0])
        nowLevelArr.push("bankerRest[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerRest[1]" ){
        gameResultArr.push(bankerMarginA[6])
        nowLevelArr.push("bankerMarginA[6]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerRest[2]" ){
        gameResultArr.push(bankerRest[3])
        nowLevelArr.push("bankerRest[3]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerRest[3]" ){
        gameResultArr.push(bankerMarginA[8])
        nowLevelArr.push("bankerMarginA[8]")
    } 



    list.push("A");
    viewClick()


    betResult()


    // if( bankerScoreArr.slice(-1)[0] >= limit ){

    //     alert( "자동 리셋에 도달했습니다. 게임을 다시 시작합니다." );
    //     return gameReset();

    // }



    bugTest()


})


// 하단 기록 출력
const viewClick = () => {

    const viewLimit = 24;

    resultView.innerHTML = "";
    list = list.length > viewLimit ? list.slice(list.length - viewLimit) : list;
    list.map((item, index) => {
        resultView.innerHTML += `<div class="${item}click mr-5"></div>`
    })

}


BTN_Banker.addEventListener("click", () => {

    revertBtn.disabled = false;
    document.querySelector("#revertLabel").style.color = "inherit"

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

    if (nowLevelArr.slice(-1)[0] === "bankerMarginA[0]" ) {
        gameResultArr.push(bankerMarginB[0])
        nowLevelArr.push("bankerMarginB[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[0]" ) {
        gameResultArr.push(bankerMarginA[0])
        nowLevelArr.push("bankerMarginA[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[1]" ) {
        gameResultArr.push(bankerMarginB[1])
        nowLevelArr.push("bankerMarginB[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[1]" ) {
        gameResultArr.push(bankerMarginA[0])
        nowLevelArr.push("bankerMarginA[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[2]" ) {
        gameResultArr.push(bankerMarginB[2])
        nowLevelArr.push("bankerMarginB[2]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[2]" ) {
        gameResultArr.push(bankerMarginA[0])
        nowLevelArr.push("bankerMarginA[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[3]" ) {
        gameResultArr.push(bankerMarginB[3])
        nowLevelArr.push("bankerMarginB[3]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[3]" ) {
        gameResultArr.push(bankerMarginA[1])
        nowLevelArr.push("bankerMarginA[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[4]" ) {
        gameResultArr.push(bankerMarginA[5])
        nowLevelArr.push("bankerMarginA[5]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[4]" ) {
        gameResultArr.push(bankerMarginA[5])
        nowLevelArr.push("bankerMarginA[5]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[5]" ) {
        gameResultArr.push(bankerRest[1])
        nowLevelArr.push("bankerRest[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[5]" ) {
        gameResultArr.push(bankerRest[1])
        nowLevelArr.push("bankerRest[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[6]" ) {
        gameResultArr.push(bankerMarginA[7])
        nowLevelArr.push("bankerMarginA[7]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[6]" ) {
        gameResultArr.push(bankerMarginA[7])
        nowLevelArr.push("bankerMarginA[7]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[7]" ) {
        gameResultArr.push(bankerRest[2])
        nowLevelArr.push("bankerRest[2]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[7]" ) {
        gameResultArr.push(bankerRest[2])
        nowLevelArr.push("bankerRest[2]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginA[8]" ) {
        alert("마지막 단계를 넘어 게임이 초기화 됩니다.");
        return gameReset()
    } else if ( nowLevelArr.slice(-1)[0] === "bankerMarginB[8]" ) {
        alert("마지막 단계를 넘어 게임이 초기화 됩니다.");
        return gameReset()
    } else if (nowLevelArr.slice(-1)[0] === "playerMarginA[0]" ) {
        gameResultArr.push(playerMarginA[1])
        nowLevelArr.push("playerMarginA[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[0]" ) {
        gameResultArr.push(playerMarginA[1])
        nowLevelArr.push("playerMarginA[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[1]" ) {
        gameResultArr.push(playerRest[0])
        nowLevelArr.push("playerRest[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[1]" ) {
        gameResultArr.push(playerRest[0])
        nowLevelArr.push("playerRest[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[2]" ) {
        gameResultArr.push(playerMarginA[3])
        nowLevelArr.push("playerMarginA[3]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[2]" ) {
        gameResultArr.push(playerMarginA[3])
        nowLevelArr.push("playerMarginA[3]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[3]" ) {
        gameResultArr.push(playerMarginA[4])
        nowLevelArr.push("playerMarginA[4]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[3]" ) {
        gameResultArr.push(playerMarginA[4])
        nowLevelArr.push("playerMarginA[4]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[4]" ) {
        gameResultArr.push(playerMarginB[4])
        nowLevelArr.push("playerMarginB[4]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[4]" ) {
        gameResultArr.push(bankerMarginA[2])
        nowLevelArr.push("bankerMarginA[2]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[5]" ) {
        gameResultArr.push(playerMarginB[5])
        nowLevelArr.push("playerMarginB[5]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[5]" ) {
        gameResultArr.push(bankerMarginA[3])
        nowLevelArr.push("bankerMarginA[3]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[6]" ) {
        gameResultArr.push(playerMarginB[6])
        nowLevelArr.push("playerMarginB[6]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[6]" ) {
        gameResultArr.push(playerMarginA[4])
        nowLevelArr.push("playerMarginA[4]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[7]" ) {
        gameResultArr.push(playerMarginB[7])
        nowLevelArr.push("playerMarginB[7]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[7]" ) {
        gameResultArr.push(playerMarginA[5])
        nowLevelArr.push("playerMarginA[5]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginA[8]" ) {
        gameResultArr.push(playerMarginB[8])
        nowLevelArr.push("playerMarginB[8]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerMarginB[8]" ) {
        gameResultArr.push(playerMarginA[6])
        nowLevelArr.push("playerMarginA[6]")
    } else if( nowLevelArr.slice(-1)[0] === "bankerRest[0]" ){
        gameResultArr.push(bankerMarginA[2])
        nowLevelArr.push("bankerMarginA[2]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerRest[1]" ){
        gameResultArr.push(bankerRest[1])
        nowLevelArr.push("bankerRest[1]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerRest[2]" ){
        gameResultArr.push(bankerRest[2])
        nowLevelArr.push("bankerRest[2]")
    } else if ( nowLevelArr.slice(-1)[0] === "bankerRest[3]" ){
        gameResultArr.push(bankerRest[2])
        nowLevelArr.push("bankerRest[2]")
    } else if( nowLevelArr.slice(-1)[0] === "playerRest[0]" ){
        gameResultArr.push(playerRest[0])
        nowLevelArr.push("playerRest[0]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerRest[1]" ){
        gameResultArr.push(playerMarginA[6])
        nowLevelArr.push("playerMarginA[6]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerRest[2]" ){
        gameResultArr.push(playerRest[3])
        nowLevelArr.push("playerRest[3]")
    } else if ( nowLevelArr.slice(-1)[0] === "playerRest[3]" ){
        gameResultArr.push(playerMarginA[8])
        nowLevelArr.push("playerMarginA[8]")
    } 

    list.push("B");
    viewClick()

    betResult()

    // if ( playerScoreArr.slice(-1)[0] >= limit ) {

    //     alert( "리셋 단계에 도달되었습니다. 게임을 다시 시작합니다." );
    //     return gameReset();

    // }



    bugTest()


    

})

const manual = () => {

    document.querySelector("#manual").addEventListener("click", () => {
        document.querySelector("#gameMenu").style.display = "block";
    })
    document.querySelector("#gameMenuCloseBtn").addEventListener("click", () => {
        document.querySelector("#gameMenu").style.display = "none";
    })

}


const nightMode = () => {

    const nightModeBtn = document.querySelector("#nightMode")

    nightModeBtn.addEventListener("click", () => {
        nightModeBtn.classList.toggle("active");
        document.querySelector("html").classList.toggle("dark");
        document.querySelector("#gameSet").classList.toggle("dark");
        document.querySelector("#gameMenu").classList.toggle("dark");
        document.querySelector("#cover").classList.toggle("dark");
    })

}


const setting = () => {

    const gameSet = document.querySelector("#gameSet");
    const setMargin = document.querySelector("#martinSet");
    const levelLimit = document.querySelector("#levelLimit");
    const gameType = document.querySelector("#gameType");
    

    let setMarginValue = 1;

    setMargin.addEventListener("change", () => {    // 마틴배율
            
            setMarginValue = setMargin.value

    })

    gameType.addEventListener("change", () => {    // 게임종류
            
        premium = gameType.value

    })

    levelLimit.addEventListener("change", () => {   // 자동리셋
            
            limit = levelLimit.value

    })



    document.querySelector("#settingBtn").addEventListener("click", () => {
        cover.classList.add("active");
    });

    setPlayer.addEventListener("click", () => {

        let optionTxt = document.querySelector("#martinSet option:checked").text;

        gameResultArr.push(playerMarginA[0])
        nowLevelArr.push("playerMarginA[0]")
        revertBtn.disabled = true;
        document.querySelector("#revertLabel").style.color = "#b1b1b1"

        starting()
        betResult()

        if( priceInput.value == '' || priceInput.value < 10000){

            priceInput.style.borderColor = "#FF0000"

        } else {

            margin = []

            for (let j = 0; j < playerMarginA.length; j++){
                margin.push(playerMarginA[j] * setMarginValue);
            }
            betAmount.innerHTML = optionTxt;

            gameSet.classList.remove("active");
            cover.classList.remove("active");
            setCancle.classList.add("active");
            priceInput.style.borderColor = "#000";

            // return gameReset()

        }
    });

    setBanker.addEventListener("click", () => {

        let optionTxt = document.querySelector("#martinSet option:checked").text;

        gameResultArr.push(bankerMarginA[0])
        nowLevelArr.push("bankerMarginA[0]")
        revertBtn.disabled = true;
        document.querySelector("#revertLabel").style.color = "#b1b1b1"

        starting()
        betResult()

        if( priceInput.value == '' || priceInput.value < 10000){

            priceInput.style.borderColor = "#FF0000"

        } else {

            margin = []

            for (let j = 0; j < bankerMarginA.length; j++){
                margin.push(bankerMarginA[j] * setMarginValue);
            }
            betAmount.innerHTML = optionTxt;

            cover.classList.remove("active");
            setCancle.classList.add("active");
            priceInput.style.borderColor = "#000";

            // return gameReset()

        }

    });

    setCancle.addEventListener("click", () => {

        gameSet.classList.remove("active");
        cover.classList.remove("active");

    });

}


// var socket = io();


// user time api 

const init = () => {

    manual ();
    nightMode()
    // remainTime()
    setting()

}

const getUserData = async () => {
    try {

        const response = await fetch("http://autobettings.com/user/remainTime")
        if(response.ok) {
            const userData = await response.json()
            return userData;
        } else {
            throw new Error("관리자에게 문의주세요")
        }
    } catch (error){
        alert(error.message)
    }
}

const remainTime = async () => {
    const userID = document.querySelector("#userID")
    const user = await getUserData()

    user.map((item, index)=>{
        if (user[index].mb_id === userID.innerHTML){
            const remTime = document.querySelector("#remainTime");
            const now = new Date()
            const setTime = new Date(user[index].end_dt)
    
            const gap = setTime.getTime() - now.getTime();
            const date = Math.floor(gap / (60 * 60 * 24 * 1000));
            const hours = Math.floor((gap % (60 * 60 * 24 * 1000)) / (60 * 60 * 1000));
            const minutes = Math.floor((gap % (60 * 60 * 1000)) / (60 * 1000));
    
            remTime.innerText = `${hours}시 ${minutes}분`;
            if(hours == 0 && minutes == 0){
                window.location.href = "http://autobettings.com/"
            }

        }
    })
}

init()
// setInterval(() => {
//     init()
// }, 30000);
