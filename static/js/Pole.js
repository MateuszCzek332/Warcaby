class Pole {

    constructor(czarne) {
        this.container = new THREE.Object3D();
        this.container.name = "pole"
        this.init(czarne)
    }

    init(czarne) {

        const geometry = new THREE.BoxGeometry(100, 30, 100);

        let material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, 
            //map: new THREE.TextureLoader().load('mats/pion1.jpg'), 
            transparent: true, 
            opacity: 0.95,
        })

        if(czarne)
            material.map = new THREE.TextureLoader().load('mats/pole1.jpg')
        else 
            material.map = new THREE.TextureLoader().load('mats/pole2.jpg')

        this.cube = new THREE.Mesh(geometry, material);
        this.cube.name = "pole"

        this.container.add(this.cube)
    }

    getPole() {
        return this.container;
    }  

}