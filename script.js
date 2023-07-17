const container = document.querySelector(".container");
const humanDiv = document.getElementById("human");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  humanDiv.offsetWidth / humanDiv.offsetHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(humanDiv.offsetWidth, humanDiv.offsetHeight);
humanDiv.appendChild(renderer.domElement);

const loader = new THREE.GLTFLoader();
loader.load(
  "64b3c7ae6bc485d4932f4d27.glb",
  function (gltf) {
    const human = gltf.scene;
    scene.add(human);

    // Accessing the specific body parts of the human model
    const head = human.getObjectByName("Head");
    const leftArm = human.getObjectByName("LeftArm");
    const rightArm = human.getObjectByName("RightArm");
    const torso = human.getObjectByName("Torso");

    animate();

//     function animate() {
//       requestAnimationFrame(animate);

//       // Rotation angles for the body parts
//       const time = Date.now() * 0.001;
//       const rotationSpeed = 0.5;

//       // Animation for the head
//       head.rotation.y = Math.sin(time * rotationSpeed * 0.5);
//       head.rotation.x = Math.sin(time * rotationSpeed * 0.75);

//       // Animation for the left arm
//       leftArm.rotation.x = Math.sin(time * rotationSpeed);
//       leftArm.rotation.z = Math.sin(time * rotationSpeed);

//       // Animation for the right arm
//       rightArm.rotation.x = Math.sin(time * rotationSpeed);
//       rightArm.rotation.z = Math.sin(time * rotationSpeed);

//       // Animation for the torso
//       torso.rotation.y = Math.sin(time * rotationSpeed * 0.25);

//       renderer.render(scene, camera);
//     }
//   },
  undefined,
  function (error) {
    console.error(error);
  }
);
