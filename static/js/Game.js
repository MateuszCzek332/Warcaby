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
        this.render() // wywołanie metody render

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
        const geometry = new THREE.BoxGeometry(100, 30, 100);

        const material = new THREE.MeshBasicMaterial({
            //color: 0xffffff,
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('mats/pole2.jpg'), // plik tekstury
            transparent: true, // przezroczysty / nie
            opacity: 0.95, // stopień przezroczystości
        })

        const material2 = new THREE.MeshBasicMaterial({
            //color: 0x000000,
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('mats/pole1.jpg'), // plik tekstury
            transparent: true, // przezroczysty / nie
            opacity: 0.95, // stopień przezroczystości
        })

        // const cube = new THREE.Mesh(geometry, material);
        // this.scene.add(cube);

        for (let i = 0; i < this.szachownica.length; i++)
            for (let j = 0; j < this.szachownica[i].length; j++) {
                if (this.szachownica[i][j] == 0) {
                    const cube = new THREE.Mesh(geometry, material);
                    cube.position.set(i * 100 - 350, 0, j * 100 - 350)
                    this.scene.add(cube);
                }
                else {
                    const cube = new THREE.Mesh(geometry, material2);
                    cube.position.set(i * 100 - 350, 0, j * 100 - 350)
                    this.scene.add(cube);
                }
            }
    }

    startGame(id_gracza){
        //tymczasowo
        const geometry = new THREE.CylinderGeometry( 40, 40, 15, 32 )

        const material = new THREE.MeshBasicMaterial({
            //color: 0xffffff,
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('mats/pion1.jpg'), // plik tekstury
            transparent: true, // przezroczysty / nie
            opacity: 0.95, // stopień przezroczystości
        })

        const material2 = new THREE.MeshBasicMaterial({
            //color: 0x000000,
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('mats/pion2.jpg'), // plik tekstury
            transparent: true, // przezroczysty / nie
            opacity: 0.95, // stopień przezroczystości
        })

        
        if(id_gracza == 2){
            this.camera.position.set(0, 400, -800)
            this.camera.lookAt(this.scene.position)
        }

        for(let i=0; i<this.pionki.length; i++){
            for(let j=0; j<this.pionki[i].length; j++)
                if(this.pionki[j][i] == 2){
                    const cube = new THREE.Mesh(geometry, material);
                    cube.position.set(i * 100 - 350, 30, j * 100 - 350)
                    this.scene.add(cube);
                }
                else if(this.pionki[j][i] == 1){
                    const cube = new THREE.Mesh(geometry, material2);
                    cube.position.set(i * 100 - 350, 30, j * 100 - 350)
                    this.scene.add(cube);
                }
        }

    }

    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        console.log("render leci")
    }
}