class Ui {
 
    constructor() {
        this.login = document.getElementById("login");
        this.loginWindow = document.getElementById("loginWindow");
        this.wait= document.getElementById("waitingRoom");
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

}