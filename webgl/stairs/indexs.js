import * as THREE from 'three';
export class stairs {
    constructor({
        platform_width = 1340,
        stair_width = 2500,
        step_width = 260,
        step_height = 200,
        step_number = 18,
        rail_width = 60,
        well_width = 100,
        direction = true,
    }) {
        flight_width = (stair_width - well_width - 2 * rail_width) / 2;
        flight_height = step_number * step_height;
        this.printStairs();
    }
    printStairs(x = 0, y = 0, z = 0) {
        let group = new THREE.Group();
        let material = new THREE.MeshLambertMaterial();
        material.color.set(0xff0000);
        let options = {
            extrudePath: new THREE.LineCurve3(
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(this.flight_width / 100, 0, 0)
            ),
        };
        let geometry1 = new THREE.ExtrudeGeometry(
            this.printShape([
                [0, 0],
                [this.step_width / 100, 0],
                [this.step_width / 100, this.step_height / 100],
                [0, this.step_height / 100],
            ]),
            options
        );
        let geometry2 = new THREE.ExtrudeGeometry(
            this.printShape([
                [0, 0],
                [this.form.step_width / 100, -this.form.step_height / 100],
                [this.form.step_width / 100, this.form.step_height / 100],
                [0, this.form.step_height / 100],
            ]),
            options
        );
        let stairs = [];
        for (let i = 0; i <= this.form.step_number; i++) {
            if (i == 0) {
                stairs[i] = new THREE.Mesh(geometry1, material);
            } else {
                stairs[i] = new THREE.Mesh(geometry2, material);
            }
            stairs[i].position.x = x;
            stairs[i].position.z = z;
            stairs[i].position.y = y;
            z = z + this.form.step_width / 100;
            y = y + this.form.step_height / 100;
            group.add(stairs[i]);
        }
        group.add(this.printPlatform(x, y, z, direction));
        if (direction) {
            var axis = new THREE.Vector3(0, 1, 0);
            group.rotateOnAxis(axis, Math.PI);
            group.translateX(this.form.well_width / 100);
        }
        return group;
    }
    printPlatform(x, y, z) {
        let material = new THREE.MeshLambertMaterial();
        material.color.set(0x00ff00);
        let geometry = new THREE.BoxGeometry(
            this.form.stair_width / 100,
            this.form.step_height / 100,
            this.form.platform_width / 100
        );
        let platform = new THREE.Mesh(geometry, material);
        platform.position.z = z + this.form.step_width / 100;
        platform.position.y = y;
        platform.position.x = x;
        return platform;
    }
    printShape(array) {
        let shape = new THREE.Shape();
        shape.moveTo(...array[0]);
        array.forEach((item, index) => {
            if (index != 0) {
                shape.lineTo(...item);
            }
        });
        shape.lineTo(...array[0]);
        return shape;
    }
}