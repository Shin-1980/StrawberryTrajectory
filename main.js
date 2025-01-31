import * as THREE from 'three'

import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

let targetParticles;
var base, offset;
var particleInfoLists = [];

class Vector6 {
    constructor(x,y,z,rx,ry,rz){
        this.x = x;
        this.y = y;
        this.z = z;
        this.rx = rx;
        this.ry = ry;
        this.rz = rz;
    }
    get(){
        return [x,y,z,rx,ry,rz]
    }
}

class particlesInfo {
    constructor(index, url, particle){
        this.index = index;
        this.url = url;
        this.particle = particle;
    }
}

var json_substrate_hy1 = `[
    { "url": "./garden/segment/2024_02_16.ply"},
    { "url": "./garden/segment/2024_02_17.ply"},
    { "url": "./garden/segment/2024_02_18.ply"},
    { "url": "./garden/segment/2024_02_19.ply"},
    { "url": "./garden/segment/2024_02_20.ply"},
    { "url": "./garden/segment/2024_02_24.ply"},
    { "url": "./garden/segment/2024_03_04.ply"},
    { "url": "./garden/segment/2024_03_05.ply"},
    { "url": "./garden/segment/2024_03_06.ply"},
    { "url": "./garden/segment/2024_03_07.ply"},
    { "url": "./garden/segment/2024_03_08.ply"},
    { "url": "./garden/segment/2024_03_09.ply"},
    { "url": "./garden/segment/2024_03_10.ply"},
    { "url": "./garden/segment/2024_03_11.ply"}
]`;

const fileLists = JSON.parse(json_substrate_hy1);

base = new Vector6(0.0,0.0,0.5 - 0.051,0.0,0.0,0.0) 
offset = new Vector6(0.0,0.0,0.0,0.0,0.0,0.0) 

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight(0xffffff, 1000)
light.position.set(1.5, 2.5, 2)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.x = 0.0
camera.position.y = 0.0
camera.position.z = 0.5

const renderer = new THREE.WebGLRenderer()
//renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.6)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const plyLoader = new PLYLoader();

const material = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.004,
});

const materialGray = new THREE.PointsMaterial({
    vertexColors: false,
    size: 0.001,
});

for (let i = 0; i < fileLists.length; i++){

    plyLoader.load(fileLists[i].url, (geometry) => { 
        
        particleInfoLists.push(new particlesInfo(i,fileLists[i].url,new THREE.Points(geometry, material)))

        if (i == 0) {
            for (let j = 0; j < fileLists.length; j++) {
                if (0 == particleInfoLists[j].index) {
                    targetParticles = particleInfoLists[j].particle
                    scene.add(targetParticles)    
                    break;
                }
            }
        } 
    });
}


const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {

    requestAnimationFrame(animate)

    //alert("ok")

    if (targetParticles) {

        const tranX = base.x + offset.x
        const tranY = base.y + offset.y
        const tranZ = base.z + offset.z
        const rotX = base.rx + offset.rx
        const rotY = base.ry + offset.ry
        const rotZ = base.rz + offset.rz

        targetParticles.position.x = tranX
        targetParticles.position.y = tranY
        targetParticles.position.z = tranZ
        targetParticles.rotation.x = rotX
        targetParticles.rotation.y = rotY
        targetParticles.rotation.z = rotZ
    }

    controls.update()

    if (isWaitingToBeReplaced == true ) {
        changeMode()
    }

    changeView()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

function changeMode() {

    isWaitingToBeReplaced = false   

    scene.remove(targetParticles)

    for (let i = 0; i < fileLists.length; i++)
    {
        if (globalState == particleInfoLists[i].index)
        {
            targetParticles = particleInfoLists[i].particle
            break;
        }

    }
    
    scene.add(targetParticles) 

}

function changeView() {

    if ( isWaitingToChangeViewX ) {

        camera.position.x = 0.5
        camera.position.y = 0.0
        camera.position.z = 0.0
    
        isWaitingToChangeViewX = false
    }
    else if ( isWaitingToChangeViewY ) {

        camera.position.x = 0.0
        camera.position.y = -0.5
        camera.position.z = 0.0

        isWaitingToChangeViewY = false
    }
    else if ( isWaitingToChangeViewZ ) {    

        camera.position.x = 0.0
        camera.position.y = 0.0
        camera.position.z = 0.5

        isWaitingToChangeViewZ = false
    }
}


animate()
