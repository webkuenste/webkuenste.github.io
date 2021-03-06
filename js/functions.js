$(function() {

  var moveCamera;
  var camera;
  var scene;
  var renderer;
  var groundGeometry;
  var groundMaterial;
  var ground;
  var directionalLight;
  var pointLight;
  var building;
  var buildingGeometry; 
  var buildingMaterial;
  var rowZ;
  var rand;

  moveCamera = true;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x474747); 
  scene.fog = new THREE.FogExp2(0xffffff, 0.002);
  
  groundGeometry = new THREE.PlaneBufferGeometry(410,410,4,4);
  groundMaterial = new THREE.MeshPhongMaterial({color:0x474747});
  groundMaterial.shininess = 100;
  ground = new THREE.Mesh(groundGeometry,groundMaterial);
  scene.add(ground);
  ground.position.x = 140; 
  ground.position.y = 0; 
  ground.position.z = -150; 
  ground.rotation.x = -1.55;
  
  camera.position.x = -2;
  camera.position.y = 24; 
  camera.position.z = -4; 
  camera.rotation.y = -0.785398163;
  camera.rotation.z = -0.280;
  camera.rotation.x = -0.400;
  
  directionalLight = new THREE.DirectionalLight(0x474747, 6); 
  directionalLight.position.set( -20, 15, 30 ); 
  scene.add(directionalLight);
  
  pointLight = new THREE.PointLight(0xffffff, 10, 32);
  scene.add(pointLight);
  
  building = [];
  buildingGeometry = new THREE.BoxGeometry(4,4,4); 
  buildingMaterial = new THREE.MeshPhongMaterial({color: 0x474747}); 
  buildingMaterial.shininess = 100;
  rowZ = 0;
  
  for (r=0; r<35; r++) {
    rowZ -= 10;
    
    for (i=0; i<35; i++) {
      building[i] = new THREE.Mesh(buildingGeometry, buildingMaterial); 
      building[i].position.x = i*10; 
      building[i].position.y = 0; 
      building[i].position.z = rowZ; 
    
      rand = Math.ceil(Math.random()*6+3);
      building[i].scale.y = rand;
      scene.add(building[i]); 
    }
  }
  
  render();
  
  function render(){

    requestAnimationFrame(render);
    
    if(moveCamera) {
      camera.position.z -= 0.05;   
      camera.position.x += 0.05;
      pointLight.position.set(camera.position.x,camera.position.y,camera.position.z);
      renderer.render(scene, camera);
    }

  };
  
  $("#WebGLoutput").append(renderer.domElement);

   function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

  }

  window.addEventListener('resize', onWindowResize, false);

  $(window).scroll(function() {

    var wScroll = $(this).scrollTop();

    if(wScroll >= $('#WebGLoutput').height()) {
      moveCamera = false;
    } else {
      moveCamera = true;
    }

  });

});