import * as THREE from "three";
// import typeface from "three/examples/fonts/"; //three에서 제공하는 폰트는 한글아 안됨
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
// import typeFace from "./assets/fonts/The Jamsil 3 Regular_Regular.json";//폰트를 직접 불러오는 방법
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

window.addEventListener("load", function () {
  init();
});

async function init() {
  const gui = new GUI();
  const renderer = new THREE.WebGLRenderer({
    // alpha: true,
    antialias: true, //도형의 계단현상을 없앨수 있음
  }); //우리가 만든 장면을 웹상에 보여줄수 잇는 렌더러임 ,3d애들이 그려질 캔버스돔 요소가 들어있음

  renderer.setSize(window.innerWidth, window.innerHeight); //컨텐츠를 보여줄 캔버스 사이즈조절

  document.body.append(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75, // 시야각,for (field of view),물체를 바라볼때 얼마만큼의 시야각으로 바라볼지,각도가 넓어지면 카메라에 더 많은 범위가 담김
    window.innerWidth / window.innerHeight, //종횡비
    1, //near, 카메라가 얼마나 가까이 볼수 있는지
    500 //far, 카메라가 얼마나 멀리 볼 수 있는지 ?이건 뭐 pixcel단위겠지? 궁금
  );

  camera.position.z = 5;
  new OrbitControls(camera, renderer.domElement);
  //FontLoader
  const fontLoader = new FontLoader();

  const font = await fontLoader.loadAsync(
    "./assets/fonts/The Jamsil 3 Regular_Regular.json"
  );
  //fontLoad 후 load한 후
  const textGeometry = new TextGeometry("안녕, 친구들.", {
    font,
    size: 0.5,
    height: 0.1, //두께
  });
  const textMaterial = new THREE.MeshPhongMaterial({ color: 0x00c896 });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);

  textGeometry.computeBoundingBox(); //객체를 감싸고 있는 직육면체값이 boundingBox이고 이를 계산하는 명령어실행후에나 해당값을 알수 있다,min은 왼쪽아래,max는 오른쪽 아래
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) * 0.5,
  //   -(textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y) * 0.5,
  //   -(textGeometry.boundingBox.max.z - textGeometry.boundingBox.min.z) * 0.5
  // );
  textGeometry.center(); //위에처럼 연산을 하던가 아니면 이렇게 하면 걍 가운데에 됨,

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5); //라이트를 도형으로 실물화 시켜 도형의 정중앙으로부터 빛이 뻗어나간다고 생각하면됨
  pointLight.position.set(3, 0, 2);
  scene.add(pointLight, pointLightHelper);

  // const font = fontLoader.parse(typeFace); //폰트가 로드됨

  gui.add(pointLight.position, "x").min(-3).max(3).step(0.1);

  render();

  function render() {
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight; //종횡비
    camera.updateProjectionMatrix(); //카메라에 대한 변화를 준경우 이 메소드를 꼭 실행해야 반영이됨
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    controls.update(); //autoupdate같은걸 하면 매 렌더시 마다 업데이트 시켜줘야 적용이 된다
  }
  window.addEventListener("resize", handleResize);
}
