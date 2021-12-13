let camera, scene, renderer;
let geometry, material, mesh;
let light;
var data = {
    platform_width:1340,
    stair_width:2500,
    step_width:260,
    step_height:200,
    step_number:18,
    rail_width:60,
    well_width:100
}
let startPoint = 0;

init();

function init() {
    camera = new THREE.PerspectiveCamera(90, 800 / 600, 0.01, 1000);
    camera.position.x = 120;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene = new THREE.Scene();
    print();
    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 600);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);
    new THREE.OrbitControls( camera, renderer.domElement );
}
function animation(time) {
    renderer.render(scene, camera);
}
function print(){
    data.flight_width = (data.stair_width - data.well_width - 2*data.rail_width)/2;
    data.flight_height = data.step_number * data.step_height;
    printStairs();
    printStairs(-(data.flight_width+data.well_width)/100,0,0,false)
}
function printStairs(x=0,y=0,z=0,direction=true){
    let material = new THREE.MeshLambertMaterial();
    material.color.set(0xff0000);
    let geometry = new THREE.BoxGeometry(data.flight_width/100, data.step_height/100, data.step_width/100);
    let stairs = [];
    for(let i=0;i<=data.step_number;i++){
        stairs[i] = new THREE.Mesh(geometry, material);
        stairs[i].position.x = x;
        stairs[i].position.z = z;
        stairs[i].position.y = y;
        stairs[i].castShadow = true;
        z = z + (direction?data.step_width/100: -data.step_width/100);
        y = y + data.step_height/100;
        scene.add(stairs[i]);
    }
    printPlatform(x,y,z);
}
function printPlatform(x,y,z){
    let material = new THREE.MeshLambertMaterial();
    material.color.set(0x00ff00);
    let geometry = new THREE.BoxGeometry(data.stair_width/100, data.step_height/100, data.platform_width/100);
    let platform = new THREE.Mesh(geometry, material);
    platform.position.z = z+data.step_width/100;
    platform.position.y = y;
    platform.position.x=x;
    scene.add(platform);
}