let camera, scene, renderer;
let geometry, material, mesh;
let light, controls, face, params;
let intersects;
let oldFace = null, loading = false;

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
    mesh = addBoxGeometry();
    scene.add(mesh);
    addLight();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    startHoverFace(renderer.domElement);
}
function addLight() {
    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}
function addBoxGeometry() {
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
    return new THREE.Mesh(geometry, faceMaterial);
}
function animation() {
    renderer.render(scene, camera);
}
function mousedownFun() {
    loading = true;
    document.addEventListener('mousemove', mousemoveFun, false);
    document.addEventListener('mouseup', mouseupFun);
}
function mousemoveFun(event) {
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - (event.clientY / window.innerHeight) * 2;
    let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera).sub(camera.position).normalize();
    let length = vector.length() / 2;
    if (params) {
        params.multiplyScalar(length);
        let { x, y, z } = { ...params };
        let x0 = Math.abs(x) + mesh.scale.x;
        let y0 = Math.abs(y) + mesh.scale.y;
        let z0 = Math.abs(z) + mesh.scale.z;
        mesh.scale.set(x0, y0, z0);
        mesh.position.x += x * 0.2;
        mesh.position.y += y * 0.2;
        mesh.position.z += z * 0.2;
    }
}
function mouseupFun() {
    document.removeEventListener('mousedown', mousedownFun);
    document.removeEventListener('mousemove', mousemoveFun);
    document.removeEventListener('mouseup', mouseupFun);
    loading = false;
    params = null;
}
function getDirection(ver, face) {
    if (oldFace && face !== oldFace && loading == true) {
        return;
    }
    oldFace = face;
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
    params = result1;
}
function startHoverFace(dom) {
    dom.addEventListener('mousemove', hoverFun);
}
//实现hover几何体变色
function hoverFun(event) {
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - (event.clientY / window.innerHeight) * 2;
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);
    if (!intersects || !intersects.length) {
        //清空红色
        if (!loading) {
            mesh.material.forEach((item) => {
                item.color.set(0xffffff);
            });
            controls.enableRotate = true;
            document.removeEventListener('mousedown', mousedownFun);
        }
    } else {
        getDirection(
            intersects[0].object.geometry.vertices,
            intersects[0].face
        );
        //设置选中face为红色
        if (!loading) {
            let materialIndex = intersects[0].face.materialIndex;
            intersects[0].object.material[materialIndex].color.set(0xff0000);
            mesh.material.forEach((item, key) => {
                item.color.set(key == materialIndex ? 0xff0000 : 0xffffff);
            });
            controls.enableRotate = false;
            document.addEventListener('mousedown', mousedownFun, false);
        }
    }
}