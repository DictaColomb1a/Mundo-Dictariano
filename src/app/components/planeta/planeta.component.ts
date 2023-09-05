import {
  Component,
  AfterViewInit,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import * as three from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Mesh } from "three";
import { Loader } from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { map } from 'rxjs';

@Component({
  selector: 'app-planeta',
  templateUrl: './planeta.component.html',
  styleUrls: ['./planeta.component.css'],
})

export class PlanetaComponent {
  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  @Input() public rotatioSpeedY: number = 0.01;
  @Input() public size: number = 200;
  @Input() public texturePlanet: string = '/assets/img/3.jpg';
  @Input() public textureStar: string = '/assets/img/estrella.jpg';
  @Input() public objeto: string = 'assets/models/texto-rotandom.gltf';
  @Input() public cameraZ: number = 3;
  @Input() public fieldOfView: number = 45;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  private light = new three.SpotLight(0xffffff, 20);

  

  private camera!: three.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  
  private loader = new three.TextureLoader();
  private geometrysphere = new three.SphereGeometry(0.9, 200, 200);
  private materialsphere = new three.MeshBasicMaterial({
    map: this.loader.load(this.texturePlanet),
  });
  private sphere: three.Mesh = new three.Mesh(
    this.geometrysphere,
    this.materialsphere
  );

  private renderer!: three.WebGLRenderer;
  private scene!: three.Scene;

  private async createScene() {
    this.scene = new three.Scene();
    this.scene.add(this.sphere);

    /* const sceneBackground = new three.TextureLoader().load('assets/img/starsc.jpg');
    this.scene.background = sceneBackground; */

    this.scene.add(this.light);
    this.light.position.z=3;
    this.light.position.y=1.5;
    let aspectRatio = this.getAspectRatio();
    this.camera = new three.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private animationPlanet() {
    this.sphere.rotation.y += this.rotatioSpeedY;
  }


  private gltfLoader = new GLTFLoader().load('assets/models/texto-rotandom.gltf',  (gltf) =>{
    
      const texto = gltf.scene;

      gltf.scene.position.x = -0.1;
      gltf.scene.position.y = -0.04;
      gltf.scene.position.z = 0.3;
      gltf.scene.scale.x = 1;
      gltf.scene.scale.y = 1;
      gltf.scene.scale.z = 1;
      gltf.scene.rotation.y += 4.5;

      this.scene.add(texto);

      function animate() {
        requestAnimationFrame(animate);
        gltf.scene.position.x += 0.0;
        gltf.scene.position.z += 0.0;
        gltf.scene.rotation.y += -0.007;
      }
      animate();
    
      } 
    )
  
   


  private createStar(): three.Mesh {
    const positionstarX = Math.random() * 5 - 2.5;
    const positionstarY = Math.random() * 5 - 2.5;
    const positionstarZ = Math.floor(Math.random() * 0) - 0;

    const scalestarX = Math.floor(Math.random() * 1) + 1;
    const scalestarY = Math.floor(Math.random() * 1.5) + 0.25;
    const scalestarZ = Math.floor(Math.random() * 1) + 1;

    const geometryStar = new three.SphereGeometry(0.01, 0.01, 0.01);
    const materialstar = new three.MeshBasicMaterial({
      map: this.loader.load(this.textureStar),
    });
    const star = new three.Mesh(geometryStar, materialstar);

    star.position.set(positionstarX, positionstarY, positionstarZ);
    star.scale.set(scalestarX, scalestarY, scalestarZ);

    return star;
  }

  private createStars() {
    const stars = 150;
    for (let i = 0; i < stars; i++) {
      const randomStar = this.createStar();
      this.scene.add(randomStar);
      
    }
  }

  private startRenderingLoop() {
    this.renderer = new three.WebGLRenderer({ canvas: this.canvas, alpha: true});
    this.renderer.setClearColor(0x000000,0)
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.createStars();

    let component: PlanetaComponent = this;
    (function render() {
      requestAnimationFrame(render);
  
      component.animationPlanet();
      component.renderer.render(component.scene, component.camera);
    })();
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

 
  
  
}


//Renderer
/* const scene = new three.Scene();

const  canvas  = document.getElementById("canvas")! as HTMLCanvasElement;

const renderer = new three.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 0.15;
const sceneBackground = new three.TextureLoader().load('assets/img/starsc.jpg');
scene.background = sceneBackground;


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

// Esfera principal
const geometry = new three.SphereGeometry(0.05, 200, 200);
const texture = new three.TextureLoader().load('assets/img/3.jpg'); 
const material = new three.MeshStandardMaterial({ map: texture, transparent: false});
const sphere = new three.Mesh(geometry, material);
sphere.position.set(0, 0, 0);
sphere.scale.set(1, 1, 1);

scene.add(sphere);

//Crear Estrella
function createStar(): three.Mesh{
  const positionstarZ = Math.floor(Math.random() * -4) - 1;

  const positionstarX = (Math.random() * 4) - 2;
  const positionstarY = (Math.random() * 4) - 2;
  //const positionZ = (Math.random() * 3) - 6;

  const scalestarX = Math.floor(Math.random() * 0.1) + 0.01;
  const scalestarY = Math.floor(Math.random() * 0.1) + 0.01;
  const scalestarZ = Math.floor(Math.random() * 0.1) + 0.01;

  const geometryStar = new three.SphereGeometry(1, 1, 1);
  // const textureStar = new three.TextureLoader().load('assets/img/estrella.jpg'); 
  const materialStar = new three.MeshStandardMaterial({ color: 0xffffff, metalness: -15,});
  const star = new three.Mesh(geometryStar, materialStar);

  // const {positionstarX, positionstarY, positionstarZ, scalestarX, scalestarY, scalestarZ} = Valoresstar();
  
  star.position.set(positionstarX, positionstarY, positionstarZ);
  star.scale.set(scalestarX, scalestarY, scalestarZ);

  return star;
}


const stars = 100;
for (let i = 0; i < stars; i++) {
  const randomStar = createStar();
  scene.add(randomStar);

 
}



// Luces
const light = new three.AmbientLight(0xffffff);

const directionalLight = new three.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(-2, 1, 5);

light.add(directionalLight);
scene.add(light);


//Animacion esfera
function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.0;
  sphere.rotation.y += 0.005;

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

    gltf.scene.position.set(0, -0.008, 0.009);
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
); */