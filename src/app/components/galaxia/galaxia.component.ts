import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as three from 'three';
import { createRings } from '../galaxia/elipse';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createPlanets } from '../galaxia/planeta';
import { SistemaPlanetario } from 'src/app/models/sistema-planetario.model';
import { SistemaPlanetarioService } from 'src/app/services/sistema-planetario.service';
import { createStars } from 'src/app/commons/stars';
import { SistemaPlanetarioInfo } from 'src/app/models/sistema-planetario-info.model';
import { SistemaPlanetarioInfoService } from 'src/app/services/sistema-planetario-info.service';

@Component({
  selector: 'app-universo',
  templateUrl: './galaxia.component.html',
  styleUrls: ['./galaxia.component.css'],
})
export class GalaxiaComponent {
  sistemaPlanetario: SistemaPlanetario = new SistemaPlanetario();
  sistemaPlanetarioInfo: SistemaPlanetarioInfo = new SistemaPlanetarioInfo();

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private sistemaPlanetarioService: SistemaPlanetarioService,
    private sistemaPlanetarioInfoService: SistemaPlanetarioInfoService
  ) {}

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  @Input() public fieldOfView: number = 45;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;
  //
  @Input() public textureStar: string = '/assets/img/estrella.jpg';

  private light = new three.SpotLight(0xffffff, 20);

  private camera!: three.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private renderer!: three.WebGLRenderer;
  private scene!: three.Scene;

  public divpopup = false;
  public divfijo = false;

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

    if (window.innerWidth <= 950 && window.innerWidth > 300) {
      this.camera.position.z = 6.5;
      this.camera.position.y = 2.5;
    } else if (window.innerWidth <= 300) {
      this.camera.position.z = 4;
    }
    this.maquinaEscribir(
      100,
      ' APRENDE Y ENSEÑALE A TU HIJO A ENFRENTARSE A DIVERSOS RIESGOS CIBERNÉTICOS.                     '
    );
  }

  private getAspectRatio() {
    var aspecto = window.innerWidth / window.innerHeight;

    return aspecto;
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

  private animate() {
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
    this.renderer.setSize(window.innerWidth, window.innerHeight - 4);

    createStars(this.scene);

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
            (sistemaPlanetario) => {
              this.sistemaPlanetario = sistemaPlanetario;
              console.log(sistemaPlanetario.id);
              this.sistemaPlanetarioInfoService
              .getBySistemaPlanetarioAndCategoriaUsuario(sistemaPlanetario.id, '653822e8192629765704cb68')
              .subscribe(
                (sistemaPlanetarioInfo) => this.sistemaPlanetarioInfo = sistemaPlanetarioInfo
              )
            }
          );
      }
    });
  }

  showDiv() {
    if (this.canvas.clientWidth > 950) {
      this.divpopup = !this.divpopup;
    } else {
      this.divfijo = !this.divfijo;
    }
  }
}
