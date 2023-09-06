import * as BABYLON from '@babylonjs/core';

// Função para adicionar objetos à cena
function addObjects(scene, count) {
    const sphereMaterial = new BABYLON.StandardMaterial();
    sphereMaterial.emissiveColor = new BABYLON.Color3(0, 1, 0);

    for (let i = 0; i < count; i++) {
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere' + i, {
            segments: 32,
            diameter: 0.2,
        });
        sphere.material = sphereMaterial;
        sphere.position.x = (Math.random() - 0.5) * 25;
        sphere.position.y = (Math.random() - 0.5) * 25;
        sphere.position.z = (Math.random() - 0.5) * 25;
    }
}

// Função para iniciar o teste de estresse
export function startStressTest(sceneWebGL, sceneWebGPU) {
  let objectCount = 10;
  let intervalId = setInterval(() => {
      
      // Verifique o número total de vértices
      if (sceneWebGL.getTotalVertices() > 10000000 || sceneWebGPU.getTotalVertices() > 10000000) {
        clearInterval(intervalId);  // Pare de adicionar objetos
        return;
      }

      addObjects(sceneWebGL, objectCount);
      addObjects(sceneWebGPU, objectCount);
      objectCount += 10;  // Aumenta o número de objetos a cada intervalo
  }, 1000);  // Adiciona objetos a cada 5 segundos
}
