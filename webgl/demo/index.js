let camera, scene, renderer;
let geometry, material, mesh;
let light;

init();

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;
    scene = new THREE.Scene();
    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshStandardMaterial();
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);
    document.addEventListener('mousedown', mousedownFun, false);
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
    mesh.rotation.x = (event.clientX / window.innerWidth) * 2 - 1;
    mesh.rotation.y = (event.clientY / window.innerHeight) * 2 + 1;
}
function mouseupFun() {
    document.removeEventListener('mousemove', mousemoveFun);
    document.removeEventListener('mouseup', mouseupFun);
}