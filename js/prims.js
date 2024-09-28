
function creerScene() {
	var scn = new BABYLON.Scene(engine);
	scn.gravity = new BABYLON.Vector3(0, -9.8, 0);
	scn.collisionsEnabled = true;
	return scn;
   }
   
   
   function creerCamera(name, options, scn) {
    const camera = new BABYLON.UniversalCamera(name, new BABYLON.Vector3(10, 1.7, 5), scn);
    camera.setTarget(new BABYLON.Vector3(0.0, 0.7, 0.0));
    camera.minZ = 0.05;
    camera.checkCollisions = true;
    camera.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
    camera.applyGravity = true;
    camera.keysUp = [90, 38];
    camera.keysDown = [40, 83];
    camera.keysLeft = [81, 37];
    camera.keysRight = [68, 39];
    camera.inertia = 0.01;
    camera.angularSensibility = 1000;
    return camera;
}

function createLight(){
	ambLight = new BABYLON.HemisphericLight("ambLight", new BABYLON.Vector3(0, 1, 0), scene);
	ambLight.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
	ambLight.specular = new BABYLON.Color3(0, 0, 0);
	ambLight.groundColor = new BABYLON.Color3(0.4, 0.4, 0.4);
	dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(1, -1, 1), scene);
	dirLight.diffuse = new BABYLON.Color3(0.7, 0.7, 0.7);
	dirLight.specular = new BABYLON.Color3(0.3, 0.3, 0.3);
	dirLight.groundColor = new BABYLON.Color3(0, 0, 0);
}


   function creerReticule(nom, opts, scn) {
	const reticule = BABYLON.MeshBuilder.CreateSphere("reticule", { segments: 4, diameter: 0.0025 }, scn);
	const retMat = new BABYLON.StandardMaterial("reticuleMat", scn);
	retMat.emissiveColor = BABYLON.Color3.Red();
	retMat.specularColor = BABYLON.Color3.Black();
	retMat.diffuseColor = BABYLON.Color3.Black();
	reticule.material = retMat;
	reticule.isPickable = false;
	reticule.position.z = 0.3;
	return reticule;
   }
   

   function creerCiel(nom, options, scene) {
	const skyMaterial = new BABYLON.StandardMaterial("mat_skybox", scene);
	skyMaterial.backFaceCulling = false;
	skyMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/skybox/skybox", scene);
	skyMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
   
	const skyBox = BABYLON.Mesh.CreateBox("skybox", 100, scene);
	skyBox.material = skyMaterial;
   
	return skyBox;
   }


   function creerSol(name, options, scn) {
	options = options || {};
	const width = options.largeur || 100.0;
	const height = options.profondeur || width;
   
	const subdivisions = Math.round(width / 10);
	let materiau = options.materiau || null;
   
	const sol = BABYLON.MeshBuilder.CreateGround(name, { width, height, subdivisions }, scn);
	if (materiau) {
	sol.material = materiau;
	} else {
	materiau = new BABYLON.StandardMaterial("materiau-defaut-" + name, scn);
	materiau.diffuseColor = new BABYLON.Color3(1.0, 0.8, 0.6);
	sol.material = materiau;
	};
	sol.checkCollisions = true;
	return sol;
   
   }
   
   function creerPrairie(name, options, scn) {
	let sol = BABYLON.Mesh.CreateGround(name, 220.0, 220.0, 2.0, scn);
	sol.checkCollisions = true;
	sol.material = new BABYLON.StandardMaterial("blanc", scn);
	// sol.material.diffuseColor = new BABYLON.Color3(1.0,0,0) ;
	sol.material.diffuseTexture = new BABYLON.Texture('./assets/textures/grass.png', scn);
	sol.material.specularTexture = new BABYLON.Texture('./assets/textures/grass.png', scn);
	sol.material.emissiveTexture = new BABYLON.Texture('./assets/textures/grass.png', scn);
	sol.material.ambientTexture = new BABYLON.Texture('./assets/textures/grass.png', scn);
	sol.material.diffuseTexture.uScale = 10.0;
	sol.material.diffuseTexture.vScale = 10.0;
	sol.material.specularTexture.uScale = 10.0;
	sol.material.specularTexture.vScale = 10.0;
	sol.material.emissiveTexture.uScale = 10.0;
	sol.material.emissiveTexture.vScale = 10.0;
	sol.material.ambientTexture.uScale = 10.0;
	sol.material.ambientTexture.vScale = 10.0;
	sol.receiveShadows = true;
	sol.metadata = { "type": 'ground' }
	return sol
   }
   
   function creerMateriauStandard(nom, options, scn) {
	let couleur = options.couleur || null;
	let texture = options.texture || null;
	let uScale = options.uScale || 1.0;
	let vScale = options.vScale || 1.0;
   
	let materiau = new BABYLON.StandardMaterial(nom, scn);
	if (couleur != null) materiau.diffuseColor = couleur;
	if (texture != null) {
	materiau.diffuseTexture = new BABYLON.Texture(texture, scn);
	materiau.diffuseTexture.uScale = uScale;
	materiau.diffuseTexture.vScale = vScale;
	}
	return materiau;
   }
   
   
   
   function creerSphere(nom, opts, scn) {
   
	let options = opts || {};
	let diametre = opts.diametre || 1.0;
	let materiau = opts.materiau || null;
   
	if (materiau == null) {
	materiau = new BABYLON.StandardMaterial("blanc", scn);
	materiau.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
	}
   
	let sph = BABYLON.Mesh.CreateSphere(nom, 16, diametre, scn);
	sph.material = materiau
   
	return sph;
   
   }

   function creerBoite(nom, opts, scn) {
	let options = opts || {};
	let width = opts.largeur || 1.0;
	let height = opts.hauteur || 1.0;
	let depth = opts.profondeur || 1.0;
	let materiau = opts.materiau || null;
   
	if (materiau == null) {
	materiau = new BABYLON.StandardMaterial("blanc", scn);
	materiau.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
   
	}
   
	let box = BABYLON.MeshBuilder.CreateBox(nom, { width, height, depth }, scn);
	box.material = materiau
   
	return box;
   }

   
   function createPoster(nom, opts, scn) {
    let options = opts || {};
    let height = options.height || 1.5;
    let width = options.width || 1.5;
    let salonName = options.salonName || "";
    
    // Create a material for the poster plane
    var dynamicTexture = new BABYLON.DynamicTexture("posterTexture_" + nom, { width: width * 100, height: height * 100 }, scn, true);
    var material = new BABYLON.StandardMaterial("posterMaterial_" + nom, scn);
    material.diffuseTexture = dynamicTexture;
    material.emissiveColor = BABYLON.Color3.White();
  
    // Create a plane for the poster
    var posterPlane = BABYLON.MeshBuilder.CreatePlane("posterPlane_" + nom, { height: height, width: width, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scn);
    posterPlane.rotation.y = Math.PI;
    posterPlane.material = material;
  
    // Draw the text on the dynamic texture
    dynamicTexture.drawText(salonName, null, null, "bold 20px Arial", "white", "transparent", true);
  
    // Return the created poster
    return posterPlane;
}


   
   function creerCloison(nom, opts, scn) {
   
	let options = opts || {};
	let hauteur = options.hauteur || 3.0;
	let largeur = options.largeur || 5.0;
	let epaisseur = options.epaisseur || 0.1;
   
	let materiau = options.materiau || new BABYLON.StandardMaterial("materiau-pos" + nom, scn);
   
	let groupe = new BABYLON.TransformNode("groupe-" + nom);
   
	let cloison = BABYLON.MeshBuilder.CreateBox(nom, { width: largeur, height: hauteur, depth: epaisseur }, scn);
	cloison.material = materiau;
	cloison.parent = groupe;
	cloison.position.y = hauteur / 2.0;
   
	cloison.checkCollisions = true;
   
	return groupe;
   }
   
   function creuser(mesh0, mesh1) {
	const csg0 = BABYLON.CSG.FromMesh(mesh0);
	const csg1 = BABYLON.CSG.FromMesh(mesh1);
	csg0.subtractInPlace(csg1);
	const csgMesh = csg0.toMesh();
	mesh0.dispose();
	mesh1.dispose();
	return csgMesh;
   }
   
   
   

   
   function creerBoitemur(nom, opts, scn) {
	let options = opts || {};
	let width = opts.largeur || 3.0;
	let height = opts.hauteur || 5.0;
	let ep = opts.epaisseur || 1.0;
	let materiau = opts.materiau || null;
   
	if (materiau == null) {
	materiau = new BABYLON.StandardMaterial("blanc", scn);
	materiau.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
   
	}
   
	let box = BABYLON.MeshBuilder.CreateBox(nom, { width: width, height: height, depth: ep }, scn);
	box.material = materiau
   

	return box;
   }

   function creerEscalier(name, opts, scn) {
    let options = opts || {};
    let steps = options.steps || 7;
    let stepWidth = options.stepWidth || 3.0;
    let stepHeight = options.stepHeight || 0.75;
    let stepDepth = options.stepDepth || 0.3;
    let materiau = options.materiau;

    let stairs = new BABYLON.TransformNode(name + "-stairs", scn);

    for (let i = 0; i < steps; i++) {
        let step = BABYLON.MeshBuilder.CreateBox(name + "-step-" + i, {
            width: stepWidth,
            height: stepHeight,
            depth: stepDepth
        }, scn);
        step.position.y = stepHeight / 2 + i * stepHeight;
        step.position.z = i * stepDepth;
        step.material = materiau;
        step.checkCollisions = true; // Ensure collisions are enabled
        step.parent = stairs;
    }

    return stairs;
}

function creerChaise(nom, options, scn) {
    let width = options.largeur || 1.0;
    let height = options.hauteur || 1.0;
    let depth = options.profondeur || 1.0;
    let materiau = options.materiau || null;

	
	


    if (materiau == null) {
        materiau = new BABYLON.StandardMaterial("blanc", scn);
        materiau.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    }

    let chaise = BABYLON.MeshBuilder.CreateBox(nom, { width, height, depth }, scn);
    chaise.material = materiau;
    chaise.checkCollisions = true;

    return chaise;
}



function createSlidingDoor(name, options, scn) {
    let width = options.width || 2;
    let height = options.height || 3;
    let depth = options.depth || 0.1;
    let material = options.material || new BABYLON.StandardMaterial("doorMat", scn);
    
    let door = BABYLON.MeshBuilder.CreateBox(name, { width, height, depth }, scn);
    door.material = material;
    door.checkCollisions = true;  
    return door;
}


function animateDoor(door, fromPosition, toPosition, scene, speed = 1) {
    return new Promise((resolve) => {
        var frameRate = 40 * speed;  

        var slideAnimation = new BABYLON.Animation("slideAnimation", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        
        var keys = []; 
        keys.push({ frame: 0, value: fromPosition });
        keys.push({ frame: 100, value: toPosition });
        slideAnimation.setKeys(keys);

        var animation = scene.beginDirectAnimation(door, [slideAnimation], 0, 100, false);

        animation.onAnimationEnd = () => {
            resolve();
        };
    });
}

function creerPoster(nom, opts, scn) {
   
	let options = opts || {};
	let hauteur = options["hauteur"] || 1.0;
	let largeur = options["largeur"] || 1.0;
	let textureName = options["tableau"] || "";
   
	var group = new BABYLON.TransformNode("group-" + nom)
	var tableau1 = BABYLON.MeshBuilder.CreatePlane("tableau-" + nom, { width: largeur, height: hauteur }, scn);
	var verso = BABYLON.MeshBuilder.CreatePlane("verso-" + nom, { width: largeur, height: hauteur }, scn);
	tableau1.parent = group;
	tableau1.position.z = -0.01;
	verso.parent = group;
	verso.rotation.y = Math.PI;
   
	var mat = new BABYLON.StandardMaterial("tex-tableau-" + nom, scn);
	mat.diffuseTexture = new BABYLON.Texture(textureName, scn);
	tableau1.material = mat;
   
	tableau1.checkCollisions = true;
   
	return group;
   
   }
   
   
function CreateRailing(scene) {
    var materiauRampe = creerMateriauStandard("mat-plaque", { texture: "assets/griage.png" }, scene);
    materiauRampe.diffuseTexture.hasAlpha = true;
    materiauRampe.backFaceCulling = true;

    var railing_largeur_platform = 4.7;
    var railing_hauteur = 1.5;
    //var railing_y = 5 - 0.05;
    var epaisseur = 0.06;

    // // Define railings for the platform at the top of the stairs
    var platformRailings = [
        { position: new BABYLON.Vector3(-5.3, 3.1, 12.5), rotation: new BABYLON.Vector3(0, Math.PI, 0), largeur: 4.7, hauteur: 1.5 },
        { position: new BABYLON.Vector3(5.1, 3.1, 12.5), rotation: new BABYLON.Vector3(0, Math.PI, 0), largeur: 4.7, hauteur: 1.5 },
        { position: new BABYLON.Vector3(0, 5, 0), rotation: new BABYLON.Vector3(0, Math.PI, 0), largeur: 4.7, hauteur: 1.5 },
        { position: new BABYLON.Vector3(-0.4 + 4.7 + epaisseur, 5, 0), rotation: new BABYLON.Vector3(0, Math.PI, 0), largeur: 4.7, hauteur: 1.5 },
        { position: new BABYLON.Vector3(-0.7 + 2 * 4.7 + epaisseur, 5, 0), rotation: new BABYLON.Vector3(0, Math.PI, 0), largeur: 4.7, hauteur: 1.5 },
        { position: new BABYLON.Vector3(5 + -2 * 4.7 + epaisseur, 5, 0), rotation: new BABYLON.Vector3(0, Math.PI, 0), largeur: 4.7, hauteur: 1.5 },
        { position: new BABYLON.Vector3(-4.1 - 4.7 + epaisseur, 5, 0), rotation: new BABYLON.Vector3(0, Math.PI, 0), largeur: 5.1, hauteur: 1.5 },
        { position: new BABYLON.Vector3(11.1, 5, 2.1), rotation: new BABYLON.Vector3(0, Math.PI / 2, 0), largeur: 4.7, hauteur: 1.5 },
        { position: new BABYLON.Vector3(11.1, 5, 6.5), rotation: new BABYLON.Vector3(0, Math.PI / 2, 0), largeur: 4.7, hauteur: 1.5 },
        { position: new BABYLON.Vector3(11.1, 5, 10.6), rotation: new BABYLON.Vector3(0, Math.PI / 2, 0), largeur: 4.1, hauteur: 1.5 },
        { position: new BABYLON.Vector3(-11.1, 5, 2.1), rotation: new BABYLON.Vector3(0, Math.PI / 2, 0), largeur: 4.7, hauteur: 1.5 },
        { position: new BABYLON.Vector3(-11.1, 5, 6.5), rotation: new BABYLON.Vector3(0, Math.PI / 2, 0), largeur: 4.7, hauteur: 1.5 },
        { position: new BABYLON.Vector3(-11.1, 5, 10.6), rotation: new BABYLON.Vector3(0, Math.PI / 2, 0), largeur: 4.1, hauteur: 1.5 },
    ];

	platformRailings.forEach((railing, index) => {
        var mur_railing = creerCloison("platform_railing" + index, { hauteur: railing.hauteur, largeur: railing.largeur, epaisseur: epaisseur, materiau: materiauRampe }, scene);
        mur_railing.position = railing.position;
        mur_railing.rotation = railing.rotation;
    });

    // Define railings for the stairs
    var y =  3.1; 
    var stepDepth = 0.5;
    var stairsRailings = [];

    for (var i = 0; i < 10; i++) {
        stairsRailings.push(
            { position: new BABYLON.Vector3(-3, y - (i * 0.3), 12.25- (i * stepDepth)), rotation: 0 },
            { position: new BABYLON.Vector3(3, y - (i * 0.3), 12.25 - (i * stepDepth)), rotation: 0 }
        );
    }
    stairsRailings.forEach((railing, index) => {
        var mur_railing = creerCloison("stairs_railing" + index, { hauteur: railing_hauteur, largeur: 0.5, epaisseur: epaisseur, materiau: materiauRampe }, scene);
        mur_railing.position = railing.position;
        mur_railing.rotation.y =  BABYLON.Tools.ToRadians(90);
    });

		
	// Railings for stairs1
	var y = 3.3; 
	var stepDepth = 0.01; // Depth of each step
	var xStep = 0.6; // Separation distance along the x-axis
	var stairs1Railings = [];

	// Right side railings
	for (var i = 0; i < 6; i++) {
		stairs1Railings.push(
			{ position: new BABYLON.Vector3(7.7 + (i * xStep), y + (i * 0.25), 12.5 - (i * stepDepth)), rotation: new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0) }
		);
	}

	// Left side railings (opposite side)
	for (var i = 0; i < 6; i++) {
		stairs1Railings.push(
			{ position: new BABYLON.Vector3(-7.7 - (i * xStep), y + (i * 0.27), 12.5 - (i * stepDepth)), rotation: new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0) }
		);
	}

	stairs1Railings.forEach((railing, index) => {
		var mur_railing = creerCloison("stairs1_railing" + index, { hauteur: railing_hauteur, largeur: 0.7, epaisseur: epaisseur, materiau: materiauRampe }, scene);
		mur_railing.position = railing.position;
		mur_railing.rotation = railing.rotation;
	});

	


}

   
   


   const PRIMS = {
	"camera": creerCamera,
	"reticule": creerReticule,
	"wall": creerCloison,
	"sphere": creerSphere,
	"box": creerBoite,
	"wallbox": creerBoitemur,
	"poster": creerPoster,
	"standardMaterial": creerMateriauStandard,
	"meadow": creerPrairie,
	"ground": creerSol,
	"sky": creerCiel,
	"creuser": creuser,   
	"escalier": creerEscalier, 
    "createSlidingDoor": createSlidingDoor, 
    "animateDoor": animateDoor,
	"CreateRailing": CreateRailing,
    "createPoster": createPoster,
	"createLight":createLight,
	"chaise": creerChaise,
   };
   
   
   export { PRIMS };
   