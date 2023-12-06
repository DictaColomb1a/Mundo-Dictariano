import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as three from 'three';
import { createStars } from 'src/app/commons/stars';

@Component({
  selector: 'app-universo',
  templateUrl: './universo.component.html',
  styleUrls: ['./universo.component.css'],
})
export class UniversoComponent {
  constructor(
    private router: Router, 
    private activedRoute: ActivatedRoute
  ) {}

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  @Input() public fieldOfView: number = 45;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;
  @Input() public textureGalaxia: string = '/assets/img/Violeta1.webp';
  @Input() public textureGalaxiaAzul: string = '/assets/img/azul4.webp';
  @Input() public textureGalaxiaVerde: string = '/assets/img/verde2.webp';
  @Input() public textureGalaxiaAmarilla: string = '/assets/img/naranja3.webp';

  private light = new three.AmbientLight(0xffffff, 20);
  

  private camera!: three.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  
  private loader = new three.TextureLoader();
  private renderer!: three.WebGLRenderer;
  private scene!: three.Scene;

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

    this.camera.position.z = 2;
    this.camera.position.y = 1.2;
    this.camera.lookAt(0, 0, 0);

    if (window.innerWidth < 1000 && window.innerWidth > 350) {
      this.camera.lookAt(0, 0, 0);
      this.camera.position.z = 3;
    } else if (window.innerWidth <= 350 && window.innerWidth > 150) {
      this.camera.position.z = 5;
    } else if (this.canvas.clientWidth <= 400) {
      this.camera.position.z = 6;
    }
    //this.hacerClick();
    this.maquinaEscribir(
      100,
      ' Adquiere habilidades sociodigitales y protégete de los múltiples riesgos tecnológicos.                     '
    );

    this.CargarGalaxia();

    
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

  private CargarGalaxia() {
    const geometryGalaxia = new three.RingGeometry(0, 1.5, 50);
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
    const galaxiaAmarilla = new three.Mesh(
      geometryGalaxia,
      materialGalaxiaAmarilla
    );

    galaxia.rotation.x = -1.7;
    galaxia.scale.x = 0.5;
    galaxia.scale.y = 0.5;
    galaxia.position.x = -1;

    galaxiaAzul.scale.x = 0.5;
    galaxiaAzul.scale.y = 0.5;
    galaxiaAzul.position.x = 1;
    galaxiaAzul.rotation.x = -1.7;

    galaxiaVerde.scale.x = 0.5;
    galaxiaVerde.scale.y = 0.5;
    galaxiaVerde.position.z = -0.5;
    galaxiaVerde.rotation.x = -1.7;

    galaxiaAmarilla.scale.x = 0.5;
    galaxiaAmarilla.scale.y = 0.5;
    galaxiaAmarilla.position.z = 0.5;
    galaxiaAmarilla.rotation.x = -1.7;

    if (window.innerWidth < 1000 && window.innerWidth > 350) {

      galaxia.position.y = 0.1;
      galaxia.position.x = 0;
      galaxia.position.z = 0;
      galaxia.rotation.x = -1.6;

      galaxia.scale.x = 0.6;
      galaxia.scale.y = 0.6;

      galaxiaAzul.position.x = 0;
      galaxiaAzul.position.y = -1.3;
      galaxiaAzul.position.z = 0;
      galaxiaAzul.rotation.x = -1.9;
      
      galaxiaAzul.scale.x = 0.75;
      galaxiaAzul.scale.y = 0.75;
      
      galaxiaVerde.position.x = 0;
      galaxiaVerde.position.y = -0.5;
      galaxiaVerde.position.z = 0;
      galaxiaVerde.rotation.x = -1.7;

      galaxiaVerde.scale.x = 0.6;
      galaxiaVerde.scale.y = 0.6;

      galaxiaAmarilla.position.x = 0;
      galaxiaAmarilla.position.y = -2.2;
      galaxiaAmarilla.position.z = 0;
      galaxiaAmarilla.rotation.x = -2.05;

      galaxiaAmarilla.scale.x = 0.73;
      galaxiaAmarilla.scale.y = 0.73;

    } else if (window.innerWidth <= 350 && window.innerWidth > 50) {

      galaxia.position.x = 0;

      galaxiaAzul.position.x = 0;
      galaxiaAzul.rotation.x = -1.7;

      galaxiaVerde.position.z = 0;
      galaxiaVerde.rotation.x = -1.7;

      galaxiaAmarilla.position.z = 0;
      galaxiaAmarilla.position.x = 0;
      galaxiaAmarilla.position.y = 0;
      galaxiaAmarilla.rotation.x = -1.7;

    } else if (this.canvas.clientWidth <= 400) {
      this.camera.position.z = 6;
    }

    this.scene.add(
      galaxia,
      galaxiaAzul,
      galaxiaVerde,
      galaxiaAmarilla
    );    

    function animate() {
      requestAnimationFrame(animate);
      galaxia.rotation.z += 0.0002;
      galaxiaAzul.rotation.z += 0.0002;
      galaxiaVerde.rotation.z += 0.0002;
      galaxiaAmarilla.rotation.z += 0.0002;
    }
    
    animate();
  }


  linkGalaxia(galaxia: number) {
    const galaxias = [
      '65319cbe9114dd8ae873cca6',
      '65319cd29114dd8ae873cca8',
      '65319cde9114dd8ae873ccaa',
      '6531b4e19114dd8ae873ccb6'
    ];

    this.activedRoute.paramMap.subscribe((params) => {
      const categoriaUsuarioId = params.get('categoria-usuario-id');
      if (categoriaUsuarioId) {
        this.router.navigate(['/galaxia/' + galaxias[galaxia - 1] + '/' + categoriaUsuarioId]); 
      }
    });
  }

  private startRenderingLoop() {
    this.renderer = new three.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });

    this.animate();
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    createStars(this.scene);

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
