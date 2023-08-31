import { Component } from '@angular/core';
import * as three from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-planeta',
  templateUrl: './planeta.component.html',
  styleUrls: ['./planeta.component.css'],
})
export class PlanetaComponent {}

const scene = new three.Scene();

const sceneBackground = new three.TextureLoader().load('assets/img/stars.jpg');
scene.background = sceneBackground;

const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new three.SphereGeometry(2, 500, 500);

const texture = new three.TextureLoader().load('assets/img/albedo.jpg');
/* const displacement = new three.TextureLoader().load('assets/img/displacement.jpg');
const normal = new three.TextureLoader().load('assets/img/normals.jpg');
const roughness = new three.TextureLoader().load('assets/img/roughness.jpg'); */

const material = new three.MeshStandardMaterial({ map: texture/* , displacementMap: displacement, normalMap: normal, roughnessMap: roughness  */});

const sphere = new three.Mesh(geometry, material);

sphere.position.set(0, 0, 0);
sphere.scale.set(1.1, 1, 1.1);

scene.add(sphere);

camera.position.set(0, 0, 5);
camera.rotation.set(0, 0, 0);

const light = new three.AmbientLight(0xffffff);

const directionalLight = new three.DirectionalLight(0xffffff, 5);
directionalLight.position.set(-15, 5, 3);

light.add(directionalLight);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.0;
  sphere.rotation.y += 0.002;

  renderer.render(scene, camera);
}

animate();

const loader = new GLTFLoader();

loader.load(
  'assets/models/texto-rotando.gltf',
  function (gltf) {
    scene.add(gltf.scene);

    gltf.scene.position.x = 0;
    gltf.scene.position.y = -0.1;
    gltf.scene.position.z = 0.9;
    gltf.scene.rotation.y = -1.2;

    function animate() {
      requestAnimationFrame(animate);
      gltf.scene.position.x += 0.0;
      gltf.scene.position.z += 0.0;
      gltf.scene.rotation.y += -0.0066;
    }
    animate();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
