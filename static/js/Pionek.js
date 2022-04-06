class Pionek {

    constructor(bialy) {
        this.container = new THREE.Object3D();
        this.init(bialy)
    }

    init(bialy) {
        const geometry = new THREE.CylinderGeometry( 40, 40, 15, 32 )

        let material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, 
            transparent: true, 
            opacity: 0.95,
        })

        if(bialy){
            material.map = new THREE.TextureLoader().load('mats/pion2.jpg')
            material.color = { r:150, g:150, b:150}
        }
        else{ 
            material.map = new THREE.TextureLoader().load('mats/pion1.jpg')
            material.color = { r:1, g:1, b:1}
        }

        this.cylinder = new THREE.Mesh(geometry, material);
        this.cylinder.name = "pion"

        this.container.add(this.cylinder)
    }

    getPion() {
        return this.container;
    }  

}