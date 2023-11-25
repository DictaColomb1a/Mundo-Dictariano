import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanetaInfo } from 'src/app/models/planeta-info.model';
import { Planeta } from 'src/app/models/planeta.model';
import { PlanetaInfoService } from 'src/app/services/planeta-info.service';
import { PlanetaService } from 'src/app/services/planeta.service';
import * as three from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


@Component({
  selector: 'app-home',
  templateUrl: './planeta.component.html',
  styleUrls: ['./planeta.component.css'], 
})
export class PlanetaComponent {
  planetas: Planeta[] = [];
  planetaInfo: PlanetaInfo = new PlanetaInfo();
  index = 0;

  constructor(
    private activedRoute: ActivatedRoute,
    private planetaService: PlanetaService,
    private planetaInfoService: PlanetaInfoService
  ) {}

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  @Input() public rotatioSpeedY: number = 0.005;
  @Input() public size: number = 200;
  @Input() public texturePlanet: string = '/assets/img/MD2.webp';
  @Input() public textureStar: string = '/assets/img/estrella.jpg';
  @Input() public textureText: string = '/assets/img/estrella.jpg';
  @Input() public objeto: string = 'assets/models/texto-rotandom.gltf';
  @Input() public cameraZ: number = 3;
  @Input() public fieldOfView: number = 45;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  private light = new three.SpotLight(0xffffff, 20);

  private camera!: three.PerspectiveCamera;
  public divpopup = false;
  public divfijo = false;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new three.TextureLoader();
  private geometrysphere = new three.SphereGeometry(0.5, 100, 100);
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

    this.sphere.position.x = 0.84; 
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


  private animationPlanet() {
    this.sphere.rotation.y += this.rotatioSpeedY;
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
    this.activedRoute.paramMap.subscribe((params) => {
      const sistemaPlanetarioId = params.get('sistema-planetario-id');
      if (sistemaPlanetarioId) {
        this.planetaService
          .getBySistemaPlanetario(sistemaPlanetarioId)
          .subscribe(
            (planetas) => {
              this.planetas = planetas;
              console.log('planetas');
              console.log(this.planetas);
              this.planetaInfoService
              .getByPlanetaAndCategoriaUsuario(this.planetas[this.index].id, '653822d9192629765704cb66')
              .subscribe(
                (planetaInfo) => {
                  this.planetaInfo = planetaInfo;
                  console.log(this.planetaInfo.atributos);
                }
              )
            }
          );
      }
    });
  }

 /*  n = 0;
  var colores = ['red', 'green', 'blue', 'white', 'orange', 'yellow']; 
  
  function cambiaColor() {
      n++;
      var root = document.documentElement;
      root.style.setProperty('--color', colores[n % colores.length]);
  } */
  showDiv() {
    if (this.canvas.clientWidth > 950) {
      this.divpopup = !this.divpopup;
    } else {
      this.divfijo = !this.divfijo;
    }
  }
}

