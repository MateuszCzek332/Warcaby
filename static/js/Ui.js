class Ui {
 
    constructor() {
        this.login = document.getElementById("login");
        this.loginWindow = document.getElementById("loginWindow");
        this.wait= document.getElementById("waitingRoom");
        this.myTurWindow = document.getElementById("myTur")
        this.myTime = document.getElementById("mTime")
        this.enemyTurWindow = document.getElementById("enemyTur")
        this.enemyTime = document.getElementById("eTime")
        this.endGame = document.getElementById("endGame")
        this.logButton = document.getElementById("logButton").onclick = () => {
            net.send(this.login.value)
        }
        // this.resetButton = document.getElementById("resetButton");
    }
 

    logMe(data) {

        if (data.loged){
            this.loginWindow.style.display = "none";
            this.wait.style.display = "block"
            game.idGracza = data.id
            net.checkStatus()
        }
        else
            if (data.id == 1)
                alert("Podaj inny nick")
            else
                alert("Za dużo graczy")
    }

    status(players){
        console.log(players)

        if(players.users == 2){
            this.wait.style.display = "none"
            game.startGame()
        }
        else
            setTimeout(net.checkStatus, 1000)
    }

    enemyTur(time){
        this.myTurWindow.style.display = "none"
        this.enemyTurWindow.style.display = "block"
        this.enemyTime.innerText = time
    }

    myTur(time){
        this.enemyTurWindow.style.display = "none"
        this.myTurWindow.style.display = "block"
        this.myTime.innerText = time
    }

    gg(win){
        this.myTurWindow.style.display = "none"
        this.enemyTurWindow.style.display = "none"

        if(win)
            this.endGame.innerText = "WIN"
        else
            this.endGame.innerText = "LOSE"
    }

}