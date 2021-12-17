let camera, scene, renderer;
let geometry, material, mesh;
let light;

let intersects;

init();

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;
    scene = new THREE.Scene();
    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    var materials = [
        new THREE.MeshStandardMaterial(),
        new THREE.MeshStandardMaterial(),
        new THREE.MeshStandardMaterial(),
        new THREE.MeshStandardMaterial(),
        new THREE.MeshStandardMaterial(),
        new THREE.MeshStandardMaterial()
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
    hoverFace(renderer.domElement);
    initDragControls();
}
function initDragControls() {
    var transformControls = new THREE.TransformControls(camera, renderer.domElement);
    scene.add(transformControls);
    var objects = [];
    for (let i = 0; i < scene.children.length; i++) {
        if (scene.children[i].isMesh) {
            objects.push(scene.children[i]);
        }
    }
    var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
    dragControls.addEventListener('hoveron', function (event) {
        transformControls.attach(event.object);
    });
    dragControls.addEventListener('dragstart', function (event) {
        event.object.material.forEach((item) => {
            item.emissive.set(0xaaaaaa);
        })
    });
    dragControls.addEventListener('dragend', function (event) {
        event.object.material.forEach((item) => {
            item.emissive.set(0x000000);
        })
    });
}
function animation(time) {
    // mesh.rotation.x = time / 2000;
    // mesh.rotation.y = time / 1000;
    renderer.render(scene, camera);
}
function hoverFace(dom) {
    dom.addEventListener("mousemove", mouseenterFun);
}
//实现hover几何体变色
function mouseenterFun(event) {
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - (event.clientY / window.innerHeight) * 2;
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);
    //将所有的相交的模型的颜色设置为红色
    for (var i = 0; i < intersects.length; i++) {
        let materialIndex = intersects[i].face.materialIndex;
        intersects[i].object.material[materialIndex].color.set(0xff0000);
        mesh.material.forEach((item, key) => {
            item.color.set(key == materialIndex ? 0xff0000 : 0xffffff);
        })
    }
    if (!intersects || !intersects.length) {
        mesh.material.forEach((item) => {
            item.color.set(0xffffff);
        })
    }
}