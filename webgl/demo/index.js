let camera, scene, renderer;
let geometry, material, mesh;
let light, controls, face, params;
let intersects;

init();

function init() {
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10
    );
    camera.position.z = 1;
    scene = new THREE.Scene();
    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    var materials = [
        new THREE.MeshStandardMaterial(),
        new THREE.MeshStandardMaterial(),
        new THREE.MeshStandardMaterial(),
        new THREE.MeshStandardMaterial(),
        new THREE.MeshStandardMaterial(),
        new THREE.MeshStandardMaterial(),
    ];
    var faceMaterial = new THREE.MeshFaceMaterial(materials);
    mesh = new THREE.Mesh(geometry, faceMaterial);
    scene.add(mesh);
    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);

    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    hoverFace(renderer.domElement);
}
function animation(time) {
    renderer.render(scene, camera);
}
let start = [0, 0],
    length = 1,
    x0 = 1,
    y0 = 1,
    z0 = 1;
function mousedownFun(event) {
    start[0] = event.clientX;
    start[1] = event.clientY;
    document.addEventListener('mousemove', mousemoveFun, false);
    document.addEventListener('mouseup', mouseupFun);
}
function mousemoveFun(event) {
    let w = (event.clientX - start[0]) / window.innerWidth / 50;
    let l = (event.clientY - start[1]) / window.innerHeight / 50;
    length = Math.sqrt(w * w + l * l) + 1;
    params.multiplyScalar(length);
    let { x, y, z } = { ...params };
    x0 += Math.abs(x);
    y0 += Math.abs(y);
    z0 += Math.abs(z);
    mesh.scale.set(x0, y0, z0);
}
function mouseupFun() {
    document.removeEventListener('mousedown', mousedownFun);
    document.removeEventListener('mousemove', mousemoveFun);
    document.removeEventListener('mouseup', mouseupFun);
    start = [0, 0];
}
function hoverFace(dom) {
    dom.addEventListener('mousemove', mouseenterFun);
}
function getFace(ver, face) {
    let point = [face.a, face.b, face.c];
    let vertices = [];
    point.forEach((item) => {
        vertices.push(ver[item]);
    });
    let result1 = vertices[0].clone();
    let result2 = vertices[0].clone();
    result1.sub(vertices[1]);
    result2.sub(vertices[2]);
    result1.cross(result2);
    return result1;
}
//实现hover几何体变色
function mouseenterFun(event) {
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - (event.clientY / window.innerHeight) * 2;
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);
    document.removeEventListener('mousedown', mousedownFun);
    //将所有的相交的模型的颜色设置为红色
    for (var i = 0; i < intersects.length; i++) {
        let materialIndex = intersects[i].face.materialIndex;
        params = getFace(
            intersects[i].object.geometry.vertices,
            intersects[i].face
        );
        intersects[i].object.material[materialIndex].color.set(0xff0000);
        mesh.material.forEach((item, key) => {
            item.color.set(key == materialIndex ? 0xff0000 : 0xffffff);
        });
        controls.enableRotate = false;
        document.addEventListener('mousedown', mousedownFun, false);
    }
    if (!intersects || !intersects.length) {
        mesh.material.forEach((item) => {
            item.color.set(0xffffff);
        });
        controls.enableRotate = true;
    }
}