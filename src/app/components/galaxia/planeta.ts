import * as three from 'three';

const texture = new three.TextureLoader();

const planeta = new three.SphereGeometry(0.05, 15, 15);

let positions = [
  { x: 0.5, z: -0.95 },
  { x: 0.7, z: 0.65 },
  { x: -1, z: 0 },
  { x: 0, z: -0.4 },
  { x: 0, z: 1 },
  { x: 1, z: 0 },
  { x: 1.4, z: 0 },
  { x: 1, z: -0.45 },
  { x: 1.17, z: -0.2 },
  { x: -1.05, z: -0.4 },
  { x: -1.2, z: 0.51 },
  { x: -1.2, z: 0 },
  { x: 1.2, z: 0.5 },
  { x: 0.2, z: 0.39 },
  { x: -0.4, z: 0.35 },
  { x: -0.4, z: 0.55 },
  //
  { x: -0.6, z: -0.94 },
  { x: 0.4, z: -0.56 },
  { x: -0.4, z: -0.6 },
  { x: 0.55, z: -0.95 },
  //
  { x: -0.4, z: -0.6 },
  { x: 0.4, z: -2.4 },
  { x: -0.4, z: -3 },
  { x: -0.7, z: -1.9 },
  { x: -0.4, z: -1.8 },
  { x: 0.8, z: -1.7 },
  { x: -0.4, z: -1.6 },
  { x: -0.4, z: -1.2 },
  { x: 0.4, z: -0.3 },
  { x: 0.2, z: -1.5 },
  { x: -0.4, z: -1.8 },
  { x: -0.4, z: -1.5 },
  { x: 0.8, z: -1.3 },
  { x: -0.4, z: -1.4 },
  { x: 0.4, z: -1.7 },
  { x: -0.4, z: -2.1 },
  { x: 0.4, z: -2 },
];

export function createPlanets(): three.Mesh[] {
  let planets: three.Mesh[] = [];

  for (let i = 0; i < 17; i++) {
    let material = new three.MeshBasicMaterial({
      map: texture.load(
        'https://raw.githubusercontent.com/aloyolaa/mundo-dictariano-images/master/texturaplaneta' +
          [i + 1] +
          '.webp'
      ),
    });

    let planet: three.Mesh = new three.Mesh(planeta, material);

    planet.position.set(positions[i].x, 0, positions[i].z);
    function animate() {
      requestAnimationFrame(animate);
      if (i > 8) {
        planet.rotation.y += -0.003;
      } else {
        planet.rotation.y += -0.001;
      }
    }
    animate();

    planets.push(planet);
  }

  return planets;
}
