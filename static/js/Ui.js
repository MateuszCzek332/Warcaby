class Ui {

    constructor() {
        this.login = document.getElementById("login");
        this.loginWindow = document.getElementById("loginWindow");
        // this.logButton = document.getElementById("logButton");
        // this.resetButton = document.getElementById("resetButton");
    }
 
    send() {
        net.send(this.login.value)
    }

    logMe(data) {
        console.log(data)
        // data = JSON.parse(data)
        if (data.loged){
            this.loginWindow.style.display = "none";
            game.startGame(data.id)
        }
        else
            if (data.id == 1)
                alert("Podaj inny nick")
            else
                alert("Za dużo graczy")
    }

}