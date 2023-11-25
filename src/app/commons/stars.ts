import * as three from 'three';

const textureStar = '/assets/img/estrella.jpg';

let starsArray: {
  star: three.Mesh;
  originalScale: three.Vector3;
  velocity: number;
}[] = [];

function createStar(): {
  star: three.Mesh;
  originalScale: three.Vector3;
  velocity: number;
} {
  const positionStarX = Math.random() * 10 - 5;
  //const positionStarY = Math.random() * 10 - 3;
  const positionStarY = Math.floor(Math.random() * - 15) + 2.5;
  const positionStarZ = Math.floor(Math.random() * - 5) - 2.5;

  const scaleStarX = Math.floor(Math.random() * 1.2) + 0.9;
  const scaleStarY = Math.floor(Math.random() * 1.2) + 0.9;
  const scaleStarZ = Math.floor(Math.random() * 1.2) + 0.9;

  const velocity: number =
    (Math.random() > 0.003 ? 0.003 : -0.003) * (0.003 + Math.random() * 0.003);

  const geometryStar = new three.SphereGeometry(0.01, 0.01, 0.01);
  const materialstar = new three.MeshBasicMaterial({
    map: new three.TextureLoader().load(textureStar),
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

function animate() {
  /*starsArray.forEach(({ star, originalScale, velocity }) => {
    const scaleFactor = 0.005;
    star.scale.y = originalScale.y + Math.sin(Date.now() * scaleFactor);
    star.position.y += velocity;

    if (star.position.y > 3 || star.position.y < -3) {
      star.position.y = star.position.y > 3 ? -3 : 3;
    }
  });*/

  requestAnimationFrame(animate.bind(animate));
}

export function createStars(scene: three.Scene): void {
  const stars = 100;
  for (let i = 0; i < stars; i++) {
    const { star, originalScale, velocity } = createStar();
    scene.add(star);
    starsArray.push({ star, originalScale, velocity });
  }
  animate();
}
