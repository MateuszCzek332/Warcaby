class Game {
  
    constructor() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2()
        this.renderer.setClearColor(0xffffff);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.position.set(0, 400, 800)
        this.camera.lookAt(this.scene.position)
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        const axes = new THREE.AxesHelper(1000)
        this.scene.add(axes)
        document.getElementById("root").append(this.renderer.domElement);
        this.init()
        this.render() 
    }

    init() {
        this.szachownica = [

            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],

        ];

        this.pionki = [

            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],

        ];

        this.generateBoard();

        this.selected = null
        this.highlight = []
        document.onmousedown = (event) => {

            this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouseVector, this.camera);

            const intersects = this.raycaster.intersectObjects(this.scene.children);  

            if (intersects.length > 0 && intersects[0].object.name == "pion") {
                this.selectPion(intersects[0].object)
            }
            else if(intersects.length > 0 && intersects[0].object.name == "pole" && this.selected != null)
                this.movePion(intersects[0].object)
        }

    }

    generateBoard = () => {

        for (let i = 0; i < this.szachownica.length; i++)
            for (let j = 0; j < this.szachownica[i].length; j++) {
                if (this.szachownica[i][j] == 0) {
                    let pole = new Pole(false)
                    pole.container.position.set(i * 100 - 350, 0, j * 100 - 350)
                    this.scene.add(pole.getPole())
                }
                else {
                    let pole = new Pole(true)
                    pole.container.position.set(i * 100 - 350, 0, j * 100 - 350)
                    this.scene.add(pole.getPole())
                }
            }

    }

    generatePionki(){
        for(let i=0; i<this.pionki.length; i++){
            for(let j=0; j<this.pionki[i].length; j++)
                if(this.pionki[j][i] == 2){
                    let pion = new Pionek(false)
                    pion.container.position.set(i * 100 - 350, 30, j * 100 - 350)
                    this.scene.add(pion.getPion())
                }
                else if(this.pionki[j][i] == 1){
                    let pion = new Pionek(true)
                    pion.container.position.set(i * 100 - 350, 30, j * 100 - 350)
                    this.scene.add(pion.getPion())
                }
        }
    }

    startGame(){

        if(this.idGracza == 2){
            this.myColor = { r:1, g:1, b:1}
            this.camera.position.z *= -1;
            this.camera.lookAt(this.scene.position)
            net.checkCurrTab(this.pionki)
            this.move = false
            this.enemyTime = 30
        }
        else{
            this.myColor = { r:150, g:150, b:150}
            this.move = true
            this.myTime = 30
            this.timer = setInterval(this.myTimer, 1000)
        }

        this.generatePionki()

    }

    selectPion(pionek){
        if(this.move){
            if(pionek.material.color.r == this.myColor.r && pionek.material.color.g == this.myColor.g && pionek.material.color.b == this.myColor.b){
                if(this.selected != null)
                    this.selected.material.color = this.myColor

                this.highlight.forEach(el => {
                    el.material.color = { r: 1, g:1, b:1 }
                });
                this.highlight.length = 0;


                pionek.material.color = { r: 255, g:255, b:0 }
                this.selected = pionek

                let y = (this.selected.parent.position.x + 350) / 100
                let x = (this.selected.parent.position.z + 350) / 100
                this.checkMove(x, y)
            }
        }
    }

    movePion(pole){
        let y = (this.selected.parent.position.x + 350) / 100
        let x = (this.selected.parent.position.z + 350) / 100
    
        let y2 = (pole.parent.position.x + 350) / 100
        let x2 = (pole.parent.position.z + 350) / 100

        if(pole.material.color.r == 0 && pole.material.color.g == 128 && pole.material.color.b == 0){
            this.pionki[x][y] = 0
            this.pionki[x2][y2] = this.idGracza

            this.selected.parent.position.set(pole.parent.position.x, 30, pole.parent.position.z)
            this.selected.material.color = this.myColor
            this.selected = null

            this.highlight.forEach(el => {
                el.material.color = { r: 1, g:1, b:1 }
            });
            this.highlight.length = 0;

            this.move = false
            clearInterval(this.timer)
            this.enemyTime = 30
            this.waitForEnemy( {val: false} )
            net.updateCurrTab(this.pionki)
        }
        
    }

    checkMove(x,y){

        this.scene.children.forEach(el => {
            if(el.children.length > 0 && el.children[0].name == "pole")
                switch(true){
                    case this.idGracza == 1 && y-1>=0 && this.pionki[x-1][y-1] == 0 && el.position.z == (x-1)*100 -350 && el.position.x == (y-1)*100 -350:
                        el.children[0].material.color = {r:0, g:128, b:0}
                        this.highlight.push(el.children[0])
                    case this.idGracza == 1 && this.pionki[x-1][y+1] == 0 && el.position.z == (x-1)*100 -350 && el.position.x == (y+1)*100 -350:
                        el.children[0].material.color = {r:0, g:128, b:0}
                        this.highlight.push(el.children[0])
                    case this.idGracza == 2 && y-1>=0 && this.pionki[x+1][y-1] == 0 && el.position.z == (x+1)*100 -350 && el.position.x == (y-1)*100 -350:
                        el.children[0].material.color = {r:0, g:128, b:0}
                        this.highlight.push(el.children[0])
                    case this.idGracza == 2 && this.pionki[x+1][y+1] == 0 && el.position.z == (x+1)*100 -350 && el.position.x == (y+1)*100 -350:
                        el.children[0].material.color = {r:0, g:128, b:0}
                        this.highlight.push(el.children[0])        
                }
        });

        // switch(true){
        //     case this.idGracza == 1 && this.szachownica[x-1][y-1] == 0:
        //         this.scene.children.forEach(el => {
        //             if(el.children.length>0 && el.children[0].name == "pole" && el.position.z == (x-1)*100 -350 && el.position.x == (y+1)*100 -350){
        //                 el.children[0].material.color = {r:0, g:128, b:0}
        //                 this.highlight.push(el.children[0])
        //             }
        //         });
        //     case this.idGracza == 1 && this.szachownica[x+1][y+1] == 0:
        //     case this.idGracza == 2:
        //     case this.idGracza == 2:
        // }

        // if(this.szachownica[x2][y2] == 0 && this.pionki[x2][y2] == 0){
        //     if(this.idGracza == 1 && x == x2+1 && ( y==y2-1 || y==y2+1))
        //         return true
        //     else if(this.idGracza == 2 && x == x2-1 && ( y==y2-1 || y==y2+1))
        //         return true
        // }
        // else
        //     return false;
    }

    waitForEnemy(odp){
        if(odp.val){
            this.pionki = odp.newTab;
            this.enemyTime = 30;
            console.log(this.scene.children)

            for(let i=1; i<this.scene.children.length; i++){
                let el = this.scene.children[i]
                if(el.children.length>0 && el.children[0].geometry.type == "CylinderGeometry"){
                    this.scene.remove(el)
                    i--
                }
            }
            this.generatePionki()
            this.move = true
            this.myTime = 30
            this.timer = setInterval(this.myTimer, 1000)

        }
        else
            setTimeout( () => {
                if(this.enemyTime<0)
                    this.end(true)
                else{
                    net.checkCurrTab(this.pionki)
                    this.enemyTime--
                    ui.enemyTur(this.enemyTime)
                }
            },999)

    }

    myTimer = () =>{
        if(this.myTime<0){
            this.move = false
            clearInterval(this.timer)
            this.end(false)
        }
        else{
            this.myTime--
            ui.myTur(this.myTime)
        }
    }

    end(win){
        ui.gg(win)
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        console.log("render leci")
    }
}