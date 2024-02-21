import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanetaInfo } from 'src/app/models/planeta-info.model';
import { Planeta } from 'src/app/models/planeta.model';
import { PlanetaInfoService } from 'src/app/services/planeta-info.service';
import { PlanetaService } from 'src/app/services/planeta.service';
import * as three from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

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
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new three.TextureLoader();
  private geometrysphere = new three.SphereGeometry(1.5, 100, 100);
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
    this.sphere.position.x = 0;
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
      this.camera.position.z = 4;
      this.camera.position.x = 0;
    } else if (this.canvas.clientWidth < 950 && this.canvas.clientWidth > 400) {
      this.camera.position.z = 5;
    } else if (this.canvas.clientWidth <= 400) {
      this.camera.position.z = 6;
    }

    this.animate();
  }

  private getAspectRatio() {
    return 2;
  }

  private animationPlanet() {
    this.sphere.rotation.y += this.rotatioSpeedY;
  }

  private animate() {

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

    let component: LandingComponent = this;
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
