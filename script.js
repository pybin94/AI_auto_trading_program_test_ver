const margin = [10000,15000,30000,45000,75000,120000,195000,315000,410000,725000];

let list = []

let limit = 10;

let playerScore = 0;
let bankerScore = 0;

let playerLoseStreak = false;
let bankerLoseStreak = false;

let playerMultiLose = false;
let bankerMultiLose = false;

let playerprice = 0;
let bankerprice = 0;


const bettingScreen = document.querySelector("#bettingScreen")

const BTN_Player = document.querySelector("#player")
const BTN_Banker = document.querySelector("#banker")

BTN_Player.addEventListener("click", function(){



    if(list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B'){     // 2연패

        playerLoseStreak = true;
        bankerScore++;
        console.log("플레이어 A")

    } else if ( list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A' ){  

        if ( playerMultiLose === true ){

            playerMultiLose === false;
            onsole.log("플레이어 B-1")

        } else {

            playerScore -= 2;
            console.log("플레이어 B-2")

        }

    } else if ( playerMultiLose === true){  // 플레이어 연패

        if ( list.slice(-1)[0] === 'A' ){

            bankerScore++;
            playerLoseStreak = false;
            playerMultiLose = false;
            console.log("플레이어 C-1")

        } else {

            bankerScore++;
            console.log("플레이어 C-2")

        }


    } 
    else if (bankerLoseStreak === true && list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'A'){ // 뱅커 연패

        bankerScore++;
        playerScore -= 2;
        bankerLoseStreak = false;
        bankerMultiLose = true;
        console.log("플레이어 D")

    } else if (bankerMultiLose === true){      //ppbppbp

        playerScore -= 2;
        console.log("플레이어 E")

    } else {                          // 일반 클릭

        playerScore -= 2;
        bankerScore++;
        playerLoseStreak = false;
        console.log("플레이어 F")

    }

    if (playerScore <= 0) {
        playerScore = 0
    }

    var playerPrice = margin[playerScore]
    var bankerPrice = margin[bankerScore]

    if ( list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B' && bankerLoseStreak === true ){ 
        bankerPrice = 0;
    } 


    list.push("A")
    console.log(list)

    if( list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A' ){
        bankerPrice = 0;
    }

    if( bankerMultiLose === true){      // 4연패 후 첫 승은 계산 안함
        bankerPrice = 0;
    }
    
    if( playerMultiLose === true){      // 4연패 후 첫 승은 계산 안함
        playerPrice = 0;
    }

    console.log("플레이어 연패 " + playerLoseStreak)
    console.log("뱅커 연패 "+bankerLoseStreak)
    console.log("플레이어 4연패 " + playerMultiLose)
    console.log("뱅커 4연패 "+bankerMultiLose)
    console.log("뱅커 "+bankerPrice)
    console.log("플레이어 "+playerPrice)
    
    const culBoth = playerPrice - bankerPrice;

    if(culBoth > 0) {
        bettingScreen.innerHTML = "플레이어 " + Math.abs(culBoth);
        bettingScreen.style.borderColor = "#3498db"

    }else if (culBoth < 0){
        bettingScreen.innerHTML = "뱅커 " + Math.abs(culBoth);
        bettingScreen.style.borderColor = "#e74c3c"

    }else if (culBoth === 0){
        bettingScreen.innerHTML = "휴식";

    }

    if(bankerScore >= limit){
        bettingScreen.innerHTML = "배팅금지";
    }



    // document.querySelector("#playerScore").innerHTML = playerScore;
    // document.querySelector("#bankerScore").innerHTML = bankerScore;

})

BTN_Banker.addEventListener("click", function(){




    if(list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A'){     // 2연패

        bankerLoseStreak = true;
        playerScore++;
        console.log("뱅커 A")

    } else if ( list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B' ){ 

        if ( bankerMultiLose === true ){

            bankerMultiLose === false;
            console.log("뱅커 B-1")

        } else {

            bankerScore -= 2;
            console.log("뱅커 B-2")

        }


    } else if ( bankerMultiLose === true){ // 4연패

        if( list.slice(-1)[0] === 'B' ){

            playerScore++;
            bankerLoseStreak = false;
            bankerMultiLose = false;
            console.log("뱅커 C-1")

        } else {

            playerScore++;
            console.log("뱅커 C-2")

        }


    } else if ( playerLoseStreak === true && list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'B'){

        playerScore++;
        bankerScore -= 2;
        playerLoseStreak = false;
        playerMultiLose = true;
        console.log("뱅커 D")

    } else if (playerMultiLose === true){      //ppbppbp

        bankerScore -= 2;
        console.log("뱅커 E")

    } else {

        bankerScore -= 2;
        playerScore++;
        bankerLoseStreak = false;
        console.log("뱅커 F")

    }

    if (bankerScore <= 0) {
        bankerScore = 0
    }
    
    let playerPrice = margin[playerScore]
    let bankerPrice = margin[bankerScore]

    if ( list.slice(-2)[0] === 'A' && list.slice(-2)[1] === 'A' && playerLoseStreak === true){ 
        playerPrice = 0;

    } 

    list.push("B")
    console.log(list)

    if( list.slice(-2)[0] === 'B' && list.slice(-2)[1] === 'B'){
        playerPrice = 0;
    }

    if( playerMultiLose === true){      // 4연패 후 첫 승은 계산 안함
        playerPrice = 0;

    }
    if( bankerMultiLose === true){      // 4연패 후 첫 승은 계산 안함
        bankerPrice = 0;

    }

    console.log("플레이어 연패 " + playerLoseStreak)
    console.log("뱅커 연패 "+bankerLoseStreak)
    console.log("플레이어 4연패 " + playerMultiLose)
    console.log("뱅커 4연패 "+bankerMultiLose)
    console.log("뱅커 "+bankerPrice)
    console.log("플레이어 "+playerPrice)

    const culBoth = playerPrice - bankerPrice;

    if(culBoth > 0) {
        bettingScreen.innerHTML = "플레이어 " + Math.abs(culBoth);
        bettingScreen.style.borderColor = "#3498db"

    }else if (culBoth < 0){
        bettingScreen.innerHTML = "뱅커 " + Math.abs(culBoth);
        bettingScreen.style.borderColor = "#e74c3c"

    }else if (culBoth === 0){
        bettingScreen.innerHTML = "휴식";

    }

    if(playerScore >= limit){
        bettingScreen.innerHTML = "배팅금지";
    }

    // document.querySelector("#playerScore").innerHTML = playerScore;
    // document.querySelector("#bankerScore").innerHTML = bankerScore;

})