import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as three from 'three';
import { createRings } from '../galaxia/elipse';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createPlanets } from '../galaxia/planeta';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

@Component({
  selector: 'app-universo',
  templateUrl: './universo.component.html',
  styleUrls: ['./universo.component.css'],
})
export class UniversoComponent {
  constructor(private router: Router) {}

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  @Input() public fieldOfView: number = 45;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;
  @Input() public textureStar: string = '/assets/img/estrella.jpg';
  @Input() public textureGalaxia: string = '/assets/img/galaxia3-azul.webp';
  @Input() public textureGalaxiaAzul: string = '/assets/img/galaxia3-naranja.webp';
  @Input() public textureGalaxiaVerde: string = '/assets/img/galaxia3-verde.webp';
  @Input() public textureGalaxiaAmarilla: string = '/assets/img/galaxia3.webp';

  private light = new three.AmbientLight(0xffffff, 20);

  private camera!: three.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private loader = new three.TextureLoader();
  private renderer!: three.WebGLRenderer;
  private scene!: three.Scene;

  private starsArray: {
    star: three.Mesh;
    originalScale: three.Vector3;
    velocity: number;
  }[] = [];
  private starVelocities: three.Vector3[] = [];

  public enabled = false;

  private async createScene() {
    this.scene = new three.Scene();
    

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

    console.log(window.scrollY);

   
    this.camera.position.z = 2.5;
    this.camera.position.y = 1.2;
    this.camera.lookAt(0,0,0);

    /* if (this.canvas.clientWidth > 950) {
      this.camera.lookAt(0,0,0);
      this.camera.position.z = 3;
    } else if (
      this.canvas.clientWidth <= 950 &&
      this.canvas.clientWidth > 400
    ) {
      this.camera.position.z = 5;
    } else if (this.canvas.clientWidth <= 400) {
      this.camera.position.z = 6;
    } */
    //this.hacerClick();
   this.maquinaEscribir(
      100,
      ' Adquiere habilidades sociodigitales y protégete de los múltiples riesgos tecnológicos.                     '
    );

    this.CargarGalaxia();
  }

  private getAspectRatio() {
    var aspecto = this.canvas.clientWidth / this.canvas.clientHeight;

    return aspecto;
  }

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

  private createStars() {
    const stars = 100;
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

   /*  private gltfLoader = new GLTFLoader().load(
      'assets/models/Galaxy.gltf',
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
    ); */

    private CargarGalaxia(){

      const geometryGalaxia = new three.RingGeometry(0,1.5,50);
      const materialGalaxia = new three.MeshBasicMaterial({
        transparent: true,
        map: this.loader.load(this.textureGalaxia),
        
      });
      const materialGalaxiaAzul = new three.MeshBasicMaterial({
        transparent: true,
        map: this.loader.load(this.textureGalaxiaAzul),
        
      });
      const materialGalaxiaVerde = new three.MeshBasicMaterial({
        transparent: true,
        map: this.loader.load(this.textureGalaxiaVerde),
        
      });
      const materialGalaxiaAmarilla = new three.MeshBasicMaterial({
        transparent: true,
        map: this.loader.load(this.textureGalaxiaAmarilla),
        
      });

      const galaxia = new three.Mesh(geometryGalaxia, materialGalaxia);
      const galaxiaAzul = new three.Mesh(geometryGalaxia, materialGalaxiaAzul);
      const galaxiaVerde = new three.Mesh(geometryGalaxia, materialGalaxiaVerde);
      const galaxiaAmarilla = new three.Mesh(geometryGalaxia, materialGalaxiaAmarilla);

      galaxia.rotation.x = -1.7;

      galaxia.scale.x = 0.5;
      galaxia.scale.y = 0.5;

      galaxiaAzul.scale.x = 0.5;
      galaxiaAzul.scale.y = 0.5;

      galaxiaVerde.scale.x = 0.5;
      galaxiaVerde.scale.y = 0.5;

      galaxiaAmarilla.scale.x = 0.5;
      galaxiaAmarilla.scale.y = 0.5;

      galaxia.position.x = -1;
      galaxiaAzul.position.x = 1;
      galaxiaAzul.rotation.x = -1.7;

      galaxiaVerde.position.z = -0.7;
      galaxiaVerde.rotation.x = -1.7;

      galaxiaAmarilla.position.z = 0.7;
      galaxiaAmarilla.rotation.x = -1.7;

      this.scene.add(galaxia, galaxiaAzul, galaxiaVerde, galaxiaVerde, galaxiaAmarilla);
      
      function animate() {
        requestAnimationFrame(animate);
        galaxia.rotation.z += 0.0002;
        galaxiaAzul.rotation.z += 0.0002;
        galaxiaVerde.rotation.z += 0.0002;
        galaxiaAmarilla.rotation.z += 0.0002;
      }
      animate();
    }
   
  private startRenderingLoop() {
    this.renderer = new three.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.createStars();

    let component: UniversoComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
    })();
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    
  }

  showDiv() {
    this.enabled = !this.enabled;
  }
  
}
