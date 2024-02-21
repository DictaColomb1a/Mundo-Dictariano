import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as three from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], 
})
export class HomeComponent {
  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  @Input() public rotatioSpeedY: number = 0.005;
  @Input() public size: number = 200;
  @Input() public texturePlanet: string = '/assets/img/MD1.webp';
  @Input() public textureStar: string = '/assets/img/estrella.jpg';
  @Input() public textureText: string = '/assets/img/estrella.jpg';
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
  private geometrysphere = new three.SphereGeometry(0.9, 100, 100);
  private materialsphere = new three.MeshBasicMaterial({
    map: this.loader.load(this.texturePlanet),
  });
  private sphere: three.Mesh = new three.Mesh(
    this.geometrysphere,
    this.materialsphere
  );

  private renderer!: three.WebGLRenderer;
  private scene!: three.Scene;

  private starsArray: {
    star: three.Mesh;
    originalScale: three.Vector3;
    velocity: number;
  }[] = [];
  private starVelocities: three.Vector3[] = [];

  private async createScene() {
    this.scene = new three.Scene();
    this.scene.add(this.sphere);
    this.scene.add(this.light);
    this.light.position.z = 3;
    this.light.position.y = 1.5;

    let aspectRatio = this.getAspectRatio();
    this.camera = new three.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );

    if (this.canvas.clientWidth > 950) {
      this.camera.position.z = 3;
    } else if (
      this.canvas.clientWidth <950 &&
      this.canvas.clientWidth > 400
    ) {
      this.camera.position.z = 5;
    } else if (this.canvas.clientWidth <= 400) {
      this.camera.position.z = 6;
    }
    this.maquinaEscribir(
      100,
      ' ANTICIPATE Y ENFRENTA LOS DESAFIOS DE LA ERA DIGITAL.                     '
    );
   /*  this.onWindowResize(); */
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }
  /* private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
} */


  private maquinaEscribir = (tiempo: number, text: string) => {
    let maquina = document.querySelector('#maquina1') as HTMLElement;
    const characters = text.split('');
    let i = 0;
    let escribir = setInterval(function () {
      if (characters[i] === '*') {
        maquina.innerHTML += '</br>';
      } else {
        maquina.innerHTML += characters[i];
      }

      if (i === characters.length) {
        maquina.innerHTML = '';
        i = 0;
      }

      i++;
    }, tiempo);
  };

  private animationPlanet() {
    this.sphere.rotation.y += this.rotatioSpeedY;
  }

  private gltfLoader = new GLTFLoader().load(
    'assets/models/texto-rotandom.gltf',
    (gltf) => {
      const texto = gltf.scene;

      gltf.scene.position.x = 0.022;
      gltf.scene.position.y = -0.04;
      gltf.scene.position.z = 0.3;
      gltf.scene.scale.x = 1;
      gltf.scene.scale.y = 1;
      gltf.scene.scale.z = 1;

      this.scene.add(texto);

      function animate() {
        requestAnimationFrame(animate);
        gltf.scene.position.x += 0.0;
        gltf.scene.position.z += 0.0;
        gltf.scene.rotation.y += -0.005;
      }
      animate();
    }
  );

  private createStar(): {
    star: three.Mesh;
    originalScale: three.Vector3;
    velocity: number;
  } {
    const positionStarX = Math.random() * 10 - 5;
    const positionStarY = Math.random() * 6 - 3;
    const positionStarZ = Math.floor(Math.random() * -5) - 2.5;

    const scaleStarX = Math.floor(Math.random() * 1.2) + 0.9;
    const scaleStarY = Math.floor(Math.random() * 1.2) + 0.9;
    const scaleStarZ = Math.floor(Math.random() * 1.2) + 0.9;

    const velocity: number =
      (Math.random() > 0.003 ? 0.003 : -0.003) *
      (0.003 + Math.random() * 0.003);

    const geometryStar = new three.SphereGeometry(0.01, 0.01, 0.01);
    const materialstar = new three.MeshBasicMaterial({
      map: this.loader.load(this.textureStar),
    });
    const star = new three.Mesh(geometryStar, materialstar);

    star.position.set(positionStarX, positionStarY, positionStarZ);
    star.scale.set(scaleStarX, scaleStarY, scaleStarZ);

    return {
      star,
      originalScale: new three.Vector3(scaleStarX, scaleStarY, scaleStarZ),
      velocity,
    };
  }

  private createStars() {
    const stars = 70;
    for (let i = 0; i < stars; i++) {
      const { star, originalScale, velocity } = this.createStar();
      this.scene.add(star);
      this.starsArray.push({ star, originalScale, velocity });
    }
    this.animate();
  }

  private animate() {
    this.starsArray.forEach(({ star, originalScale, velocity }) => {
      const scaleFactor = 0.005;
      star.scale.y = originalScale.y + Math.sin(Date.now() * scaleFactor);
      star.position.y += velocity;

      if (star.position.y > 3 || star.position.y < -3) {
        star.position.y = star.position.y > 3 ? -3 : 3;
      }
    });

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }

  private startRenderingLoop() {
    this.renderer = new three.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.createStars();

    let component: HomeComponent = this;
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
