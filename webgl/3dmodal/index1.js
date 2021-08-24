let camera, scene, renderer;
let geometry, material;
let light;
let zeroPoint = new THREE.Vector3(0, 0, 0);
let cameraRound = 4

init();

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.set(0, 0, cameraRound);
    camera.lookAt(zeroPoint);
    scene = new THREE.Scene();
    light = new THREE.AmbientLight(0x404040);
    scene.add(light);
    initModal();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    // var controls = new OrbitControls( camera, renderer.domElement );
    document.body.appendChild(renderer.domElement);
    document.addEventListener('mousedown', mousedownFun, false);
}
function initModal() {
    let mesh;
    // geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    // material = new THREE.MeshStandardMaterial();
    // mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);
    const loader = new THREE.GLTFLoader();
    loader.load('./loungeSofaLong.glb', function (gltf) {
        mesh = gltf.scene;
        mesh.position.set(0, 0, 0);
        scene.add(mesh);
        renderer.render(scene, camera);
    }, undefined, function (error) {
        console.error(error);
    });
}
function animation(time) {
    renderer.render(scene, camera);
}

var mouseDownX, mouseDownY;
var mouseMoveX, mouseMoveY;
var oldAngleX = 0, angleX = 0;
function mousedownFun(event) {
    mouseDownX = event.pageX;
    mouseDownY = event.pageY;
    document.addEventListener("mousemove", mousemoveFun, false);
    document.addEventListener("mouseup", mouseupFun);
}
function mousemoveFun(event) {
    mouseMoveX = event.pageX;
    mouseMoveY = event.pageY;
    angleX = (mouseMoveX - mouseDownX) / (cameraRound * 2 * 3.14) + oldAngleX;
    camera.position.x = cameraRound * (Math.sin(angleX));
    camera.position.z = cameraRound * (Math.cos(angleX));
    camera.lookAt(zeroPoint);
}
function mouseupFun() {
    oldAngleX = angleX;
    document.removeEventListener('mousemove', mousemoveFun);
    document.removeEventListener('mouseup', mouseupFun);
}