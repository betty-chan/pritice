let camera, scene, renderer;
let geometry, material, mesh;
let light;

init();

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;
    scene = new THREE.Scene();
    // geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    // material = new THREE.MeshStandardMaterial();
    // mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);
    light = new THREE.AmbientLight(0x121212);
    scene.add(light);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);
    document.addEventListener('mousedown', mousedownFun, false);
}
function initModal() {
    const loader = new GLTFLoader();
    loader.load('./loungeSofaLong.glb', function (gltf) {
        scene.add(gltf.scene);
        renderer.render(scene, camera);
    }, undefined, function (error) {
        console.error(error);
    });
}
function animation(time) {
    // mesh.rotation.x = time / 2000;
    // mesh.rotation.y = time / 1000;
    renderer.render(scene, camera);
}
function mousedownFun(event) {
    document.addEventListener("mousemove", mousemoveFun, false);
    document.addEventListener("mouseup", mouseupFun);
}
function mousemoveFun(event) {
}
function mouseupFun() {
    document.removeEventListener('mousemove', mousemoveFun);
    document.removeEventListener('mouseup', mouseupFun);
}