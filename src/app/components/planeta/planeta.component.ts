import { Component } from '@angular/core';
import * as three from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-planeta',
  templateUrl: './planeta.component.html',
  styleUrls: ['./planeta.component.css'],
})
export class PlanetaComponent {}

// Escena
const scene = new three.Scene();

const sceneBackground = new three.TextureLoader().load('assets/img/starsc.jpg');
scene.background = sceneBackground;


//Camara
const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 5);
camera.rotation.set(0, 0, 0);

const renderer = new three.WebGLRenderer();

//renderer.setSize(window.innerWidth, window.innerHeight);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

// Esfera
const geometry = new three.SphereGeometry(2.5, 500, 500);
const texture = new three.TextureLoader().load('assets/img/earthwebc.webp'); 
const material = new three.MeshStandardMaterial({ map: texture /*, displacementMap: displacement, normalMap: normal, roughnessMap: roughness  */});
const sphere = new three.Mesh(geometry, material);
sphere.position.set(0, 0, 0);
sphere.scale.set(1.1, 1, 1.1);

const geometry1 = new three.SphereGeometry(2.5, 1, 1);
const texture1 = new three.TextureLoader().load('assets/img/earthwebc.webp'); 
const material1 = new three.MeshStandardMaterial({ color: 0xffffff, metalness: -15,  /*, displacementMap: displacement, normalMap: normal, roughnessMap: roughness  */});
const sphere1 = new three.Mesh(geometry1, material1);
sphere1.position.set(-2, 0, 3.5);
sphere1.scale.set(0.02, 0.05, 0.02);


scene.add(sphere, sphere1);
/*const displacement = new three.TextureLoader().load('assets/img/displacement.jpg');
const normal = new three.TextureLoader().load('assets/img/normals.jpg');
const roughness = new three.TextureLoader().load('assets/img/roughness.jpg');*/

// Luces
const light = new three.AmbientLight(0xffffff);
const light1 = new three.PointLight(0x1FBB00, 20);
light1.position.set(-3,0,4);

const directionalLight = new three.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(-2, 1, 5);

light.add(directionalLight);
scene.add(light, light1);


//Animacion esfera
function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.0;
  sphere.rotation.y += 0.002;

  renderer.render(scene, camera);
}

// Esfera Responsive
window.addEventListener('resize', function () {
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera.aspect = width/height;
  camera.updateProjectionMatrix();

  renderer.setSize(width,height);
});

animate();

// Texto flotando
const loader = new GLTFLoader();

loader.load(
  'assets/models/texto-rotandom.gltf',
  function (gltf) {
    scene.add(gltf.scene);

    gltf.scene.position.set(0, -0.25, -0.5);
    gltf.scene.rotation.set(0, -1.2, 0);

    function animate() {
      requestAnimationFrame(animate);
      gltf.scene.position.x += 0.0;
      gltf.scene.position.z += 0.0;
      gltf.scene.rotation.y += -0.007;
    }
    animate();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
