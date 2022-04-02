class Pionek {

    constructor(bialy) {
        this.container = new THREE.Object3D();
        this.init(bialy)
    }

    init(bialy) {
        const geometry = new THREE.CylinderGeometry( 40, 40, 15, 32 )

        let material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, 
            //map: new THREE.TextureLoader().load('mats/pion1.jpg'), 
            transparent: true, 
            opacity: 0.95,
        })

        if(bialy)
            material.map = new THREE.TextureLoader().load('mats/pion2.jpg')
        else 
            material.map = new THREE.TextureLoader().load('mats/pion1.jpg')

        this.cylinder = new THREE.Mesh(geometry, material);

        this.container.add(this.cylinder)
    }

    getPion() {
        return this.container;
    }  

}