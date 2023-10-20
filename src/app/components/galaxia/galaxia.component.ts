import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as three from 'three';
import { createRings } from '../galaxia/elipse';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createPlanets } from '../galaxia/planeta';
import { SistemaPlanetario } from 'src/app/models/sistema-planetario.model';
import { SistemaPlanetarioService } from 'src/app/services/sistema-planetario.service';

@Component({
  selector: 'app-universo',
  templateUrl: './galaxia.component.html',
  styleUrls: ['./galaxia.component.css'],
})
export class GalaxiaComponent {
  sistemaPlanetario: SistemaPlanetario = new SistemaPlanetario();

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private sistemaPlanetarioService: SistemaPlanetarioService
  ) {}

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  @Input() public fieldOfView: number = 45;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;
  @Input() public textureStar: string = '/assets/img/estrella.jpg';

  private light = new three.SpotLight(0xffffff, 20);

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

    for (let i = 0; i < createPlanets().length; i++) {
      this.scene.add(createPlanets()[i]);
    }

    for (let i = 0; i < createRings().length; i++) {
      this.scene.add(createRings()[i]);
    }

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

    this.camera.position.z = 2.5;
    this.camera.position.y = 1.2;
    this.camera.lookAt(0, 0, 0);

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
      ' Aprende y enséñale a tu hijo a enfrentarse a diversos riesgos cibernéticos.                     '
    );
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

    let component: GalaxiaComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
    })();
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.activedRoute.paramMap.subscribe((params) => {
      const galaxiaId = params.get('galaxia-id');
      if (galaxiaId) {
        this.sistemaPlanetarioService
          .getByGalaxia(galaxiaId)
          .subscribe(
            (sistemaPlanetario) => (this.sistemaPlanetario = sistemaPlanetario)
          );
      }
    });
  }

  showDiv() {
    this.enabled = !this.enabled;
  }
}
