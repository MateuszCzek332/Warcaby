class Game {
  
    constructor() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
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

    startGame(){

        if(this.idGracza == 2){
            this.camera.position.z *= -1;
            this.camera.lookAt(this.scene.position)
        }

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

    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        console.log("render leci")
    }
}