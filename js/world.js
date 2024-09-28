import { PRIMS } from './prims.js';
import { Simu } from './simu.js';

class World extends Simu {

    constructor() {
        super();
        this.doors = [];  // Array to store door objects and their states
        this.posters = []; // Array to store poster objects and their states
        this.posterDisplayTime = {};
        this.currentlyDisplayedPoster = null; // Track the currently displayed poster
        this.teleportationSpheres = [];
    }
    createWorld(data) {""
        const scene = this.scene;

        scene.gravity = new BABYLON.Vector3(0, -0.01, 0);

        const light0 = new BABYLON.HemisphericLight("l0", new BABYLON.Vector3(1, 1, 0), scene);
        const materiau1 = PRIMS.standardMaterial("mat1", { texture: "./assets/ascenseur.jpg" }, scene);
        const materiau2 = PRIMS.standardMaterial("mat_sol", { texture: "./assets/textures/sols_plafonds/plafond.jpg", uScale: 5, vScale: 5 }, scene);
        const materiau3 = PRIMS.standardMaterial("mat_sol", { texture: "./assets/textures/bois/Wood_Cherry.jpg", uScale: 5, vScale: 5 }, scene);
        const materiau4 = PRIMS.standardMaterial("mat_sol", { texture: "./assets/textures/sols_plafonds/floorIn.jpg", uScale: 5, vScale: 5 }, scene);
        const materiau5 = PRIMS.standardMaterial("mat_sol", { texture: "./assets/wall5.jpg", uScale: 5, vScale: 5 }, scene);




        // Trigger Zone
        let collider = BABYLON.MeshBuilder.CreateBox("collider", { width: 0, height: 0, depth: 0 }, scene);
        collider.isPickable = false;
        collider.isVisible = false; 
        collider.actionManager = new BABYLON.ActionManager(scene);
        

        /// les mures 
        const wallbox1 = PRIMS.wallbox("wallbox1", { materiau: materiau1, largeur: 2.5, hauteur: 7, epaisseur: 4 }, scene);
        const wallbox2 = PRIMS.wallbox("wallbox1", { materiau: materiau1, largeur: 10, hauteur: 10, epaisseur: 0.4 }, scene);
        const wallbox3 = PRIMS.wallbox("wallbox1", { materiau: materiau1, largeur: 2.5, hauteur: 7, epaisseur: 4 }, scene);
        const wallbox4 = PRIMS.wallbox("wallbox1", { materiau: materiau1, largeur: 10, hauteur: 10, epaisseur: 0.4 }, scene);
        const wallbox5 = PRIMS.wallbox("wallbox1", { materiau: materiau1, largeur: 2.5, hauteur: 7, epaisseur: 4 }, scene);
        const wallbox6 = PRIMS.wallbox("wallbox1", { materiau: materiau1, largeur: 10, hauteur: 10, epaisseur: 0.4 }, scene);

        const porte1 = PRIMS.creuser(wallbox2, wallbox1);
        porte1.checkCollisions = true;
        porte1.material = materiau1;
        porte1.position.x = -10;

        const porte3 = PRIMS.creuser(wallbox4, wallbox3);
        porte3.checkCollisions = true;
        porte3.material = materiau1;
        porte3.position.x += 0;

        const porte5 = PRIMS.creuser(wallbox6, wallbox5);
        porte5.checkCollisions = true;
        porte5.material = materiau1;
        porte5.position.x += 10;

        // les mures des chambres  :

        // Create the wall
        const wall10 = PRIMS.wall("wall1", { materiau: materiau2, largeur: 15, hauteur: 5, epaisseur: 0.4 }, scene);
        wall10.rotation.y = BABYLON.Tools.ToRadians(90);
        wall10.position.z = -7.5;
        wall10.position.x = -5;

        let light2 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(-1, 9, 5), scene);
        light2.intensity = 0.4;

        let light3 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 4, -8), scene);
        light3.intensity = 0.4;

        let light4 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(-8, 4, -8), scene);
        light4.intensity = 0.4;

        let light5 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(10, 4, -8), scene);
        light5.intensity = 0.4;

        let light7 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(9, 3, -8), scene);
        light7.intensity = 0.9;

        // Grande Salle
        let torus = BABYLON.Mesh.CreateTorus("torus", 2, 0.2, 24, scene);
        torus.position = new BABYLON.Vector3(-1, 9.9, 5);

        let sun = BABYLON.Mesh.CreateSphere('sun', 16, 0.3, scene);
        sun.position = new BABYLON.Vector3(0, 9.7, 5);
        let bulb2 = sun.createInstance("bulb");
        bulb2.position = new BABYLON.Vector3(-2, 9.7, 5);
        let bulb3 = sun.createInstance("bulb");
        bulb3.position = new BABYLON.Vector3(-1, 9.7, 6);
        let bulb4 = sun.createInstance("bulb");
        bulb4.position = new BABYLON.Vector3(-1, 9.7, 4);

        //salle1
        let torus2 = BABYLON.Mesh.CreateTorus("torus2", 2, 0.2, 24, scene);
        torus2.position = new BABYLON.Vector3(0, 4.9, -8);

        let sun2 = BABYLON.Mesh.CreateSphere('sun2', 16, 0.3, scene);
        sun2.position = new BABYLON.Vector3(1, 4.7, -8);
        let bulb5 = sun2.createInstance("bulb");
        bulb5.position = new BABYLON.Vector3(-1, 4.7, -8);
        let bulb6 = sun2.createInstance("bulb");
        bulb6.position = new BABYLON.Vector3(0, 4.7, -7);
        let bulb7 = sun2.createInstance("bulb");
        bulb7.position = new BABYLON.Vector3(0, 4.7, -9);

        //salle 2
        let torus3 = BABYLON.Mesh.CreateTorus("torus3", 2, 0.2, 24, scene);
        torus3.position = new BABYLON.Vector3(-10, 4.9, -8);

        let sun3 = BABYLON.Mesh.CreateSphere('sun3', 16, 0.3, scene);
        sun3.position = new BABYLON.Vector3(-9, 4.7, -8);
        let bulb8 = sun2.createInstance("bulb");
        bulb8.position = new BABYLON.Vector3(-11,4.7, -8);
        let bulb9 = sun2.createInstance("bulb");
        bulb9.position = new BABYLON.Vector3(-10, 4.7, -7);
        let bulb10 = sun2.createInstance("bulb");
        bulb10.position = new BABYLON.Vector3(-10, 4.7, -9);

        //salle 3
        let torus4 = BABYLON.Mesh.CreateTorus("torus4", 2, 0.2, 24, scene);
        torus4.position = new BABYLON.Vector3(10, 4.9, -8);

        let sun4 = BABYLON.Mesh.CreateSphere('sun4', 16, 0.3, scene);
        sun4.position = new BABYLON.Vector3(11, 4.7, -8);
        let bulb11 = sun2.createInstance("bulb");
        bulb11.position = new BABYLON.Vector3(9, 4.7, -8);
        let bulb12 = sun2.createInstance("bulb");
        bulb12.position = new BABYLON.Vector3(10, 4.7, -7);
        let bulb13 = sun2.createInstance("bulb");
        bulb13.position = new BABYLON.Vector3(10, 4.7, -9);

        let light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 0, 0), scene);
        light.range = 150;
        light.parent = torus;

        let materialSphere = new BABYLON.StandardMaterial("sphere1", scene);
        materialSphere.emissiveColor = new BABYLON.Color3(1.0, 1.0, 0.7);
        sun.material = materialSphere;
        sun4.material = materialSphere;
        sun2.material = materialSphere;
        sun3.material = materialSphere;

        const wall11 = PRIMS.wall("wall1", { materiau: materiau2, largeur: 15, hauteur: 5, epaisseur: 0.4 }, scene);
        wall11.rotation.y = BABYLON.Tools.ToRadians(90);
        wall11.position.z = -7.5;
        wall11.position.x = 5;

        //mur de plafond
        const wall13 = PRIMS.wall("wall1", { materiau: materiau1, largeur: 30, hauteur: 15, epaisseur: 0.01 }, scene);
        wall13.position.y = 5;
        wall13.position.z = -15;
        wall13.rotation.x = BABYLON.Tools.ToRadians(90);



        // mur de musee 
        const wall1 = PRIMS.wall("wall1", { materiau: materiau2, largeur: 30, hauteur: 10, epaisseur: 0.1 }, scene);
        wall1.position.y = 0;
        wall1.position.z = -15;

        const wall2 = PRIMS.wall("wall1", { materiau: materiau2, largeur: 30, hauteur: 10, epaisseur: 0.1 }, scene);
        wall2.position.y = 0;
        wall2.position.z = 15;

        const wall3 = PRIMS.wall("wall1", { materiau: materiau2, largeur: 30, hauteur: 10, epaisseur: 0.1 }, scene);
        // Translation du mur à la position (15, 0, 0)
        wall3.position = new BABYLON.Vector3(15, 0, 0);
        // Rotation du mur selon l'axe Y de 90 degrés
        wall3.rotation.y = BABYLON.Tools.ToRadians(90);

        const wall4 = PRIMS.wall("wall1", { materiau: materiau2, largeur: 30, hauteur: 10, epaisseur: 0.1 }, scene);
        wall4.position = new BABYLON.Vector3(-15, 0, 0);
        // Rotation du mur selon l'axe Y de 90 degrés
        wall4.rotation.y = BABYLON.Tools.ToRadians(-90);

        const sky = PRIMS.sky("sky", {}, scene);
        const ground = PRIMS.ground("ground", { materiau: materiau4 }, scene);

        // les 1 ere escalier
        // Add stairs leading up to wall13
        const stairs1 = PRIMS.escalier("stairs1", {
            steps: 6,
            stepWidth: 2.5,
            stepHeight: 0.75,
            stepDepth: 0.3,
            materiau: materiau3
        }, scene);
        stairs1.checkCollisions = true; // Enable collision for the stairs
        stairs1.position.y = 3;
        stairs1.position.z = 13.75;
        stairs1.position.x = 6.5;
        stairs1.rotation.x = BABYLON.Tools.ToRadians(-90);
        stairs1.rotation.y = BABYLON.Tools.ToRadians(-90);

        //landing 
        const wall15 = PRIMS.wall("wall1", { materiau: materiau3, largeur: 15, hauteur: 4, epaisseur: 0.4 }, scene);
        wall15.position.y = 4.8;
        wall15.position.z = 7.5;
        wall15.position.x = 11;
        wall15.rotation.x = BABYLON.Tools.ToRadians(-90);
        wall15.rotation.y = BABYLON.Tools.ToRadians(-90);

        PRIMS.CreateRailing(scene);

        const wall16 = PRIMS.wall("wall1", { materiau: materiau3, largeur: 15, hauteur: 4, epaisseur: 0.4 }, scene);
        wall16.position.y = 4.8;
        wall16.position.z = 7.5;
        wall16.position.x = -15;
        wall16.rotation.x = BABYLON.Tools.ToRadians(-90);
        wall16.rotation.y = BABYLON.Tools.ToRadians(-90);

        //  
        const wall17 = PRIMS.wall("wall1", { materiau: materiau3, largeur: 2.5, hauteur: 13, epaisseur: 0.3 }, scene);
        wall17.position.y = 3;
        wall17.position.z = 13.75;
        wall17.position.x = -6.5;
        wall17.rotation.x = BABYLON.Tools.ToRadians(-90);
        wall17.rotation.y = BABYLON.Tools.ToRadians(-90);


        // 
        const wall19 = PRIMS.wall("wall1", { materiau: materiau5, largeur: 30, hauteur: 30, epaisseur: 0.1 }, scene);
        wall19.position.y = 10;
        wall19.position.z = -15;
        wall19.rotation.x = BABYLON.Tools.ToRadians(90);
      
       
      
        const postersData = [
            { poster: "poster1", image: "./assets/brest/1.jpg", title: " Pont de Recouvrance", description: "  un pont levant emblématique situé à Brest, en Bretagne, en France" },
            { poster: "poster2", image: "./assets/brest/2.jpg", title: "le vieux brest", description: "  ancienne photo de Brest" },
            { poster: "poster3", image: "./assets/brest/3.jpg", title: "  le croiseur scharnhorst ", description: " Le croiseur Scharnhorst, un navire de guerre allemand, a été basé \n"+
												" à Brest pendant la Seconde Guerre mondiale." },
            { poster: "poster4", image: "./assets/portrait/1.jpg", title: "Empereur Rudolf II", description: "Portrait Empereur Rudolf II Vertumne Tête végétale Peinture Par Arcimboldo Repro " },
            { poster: "poster5", image: "./assets/portrait/2.jpg", title: "Berthe Morisot", description: "Portrait de Berthe Morisot au bouquet de violettes " },
            { poster: "poster6", image: "./assets/portrait/3.jpg", title: "La Jeune bonne", description: "  La Jeune bonne de Modigliani est une représentation touchante et élégante d'une figure humble." },
            { poster: "poster7", image: "./assets/paysage/1.jpg", title: "Une soirée élégante", description: "Une soirée élégante par Victor Gabriel Gilbert, 1890 "},
												 
            { poster: "poster8", image: "./assets/paysage/6.jpg", title: "Boulevard des Capucines", description: "Boulevard des Capucines - en arrière-plan Boulevard des Italiens avec Pavillon de Hanovre à droite" },
            { poster: "poster9", image: "./assets/paysage/3.jpeg", title: " Le Déjeuner des canotiers ", description: " Le Déjeuner des canotiers est une huile sur toile majeure du peintre impressionniste français \n"+
												"Auguste Renoir réalisée entre 1880 et 1881, exposée lors de la septième  \n"+
                                                "exposition des peintres impressionnistes en 1882" },
            { poster: "poster10", image: "./assets/brest/4.jpg", title: "l'Avant-Port Militaire", description: "   une zone stratégique de la Marine nationale française,utilisée pour le mouillage et\n"+
												" l'entretien des navires militaires" },
            { poster: "poster11", image: "./assets/brest/22-chateau.jpg", title: "Château de Brest ", description: " le Château de Brest, forteresse millénaire et siège de la Préfecture maritime,\n"+
												" abrite également le Musée de la Marine" },
            { poster: "poster12", image: "./assets/brest/6.jpg", title: " Ancien tramway de Brest", description: "un ancien réseau de tramway urbain composé au départ de deux lignes, puis composé de trois lignes" },
            { poster: "poster13", image: "./assets/paysage/4.png", title: "Boulevard Montmartre", description: "un tableau peint par Camille Pissarro en 1897. "},
										 
            { poster: "poster14", image: "./assets/paysage/5.jpg", title: "Le Boulevard de Montmartre, matinée de printemps", description: "Le Boulevard de Montmartre, matinée de printemps est un tableau peint par Camille Pissarro en 1897. " },
            { poster: "poster15", image: "./assets/brest/7.jpg", title: " Saint-Marc", description: " train au-dessus de la grève de Saint-Marc" },
            { poster: "poster16", image: "./assets/brest/8.jpg", title: " le bassin place du chateau ", description: "Jardin Public - BREST" },
            { poster: "poster17", image: "./assets/portrait/4.jpg", title: "Marie de Médicis", description: "  Portrait de Marie de Médicis (1573-1642), reine de France, épouse d'Henri IV. Peinture de Pierre Paul  ." },
            { poster: "poster18", image: "./assets/portrait/5.jpg", title: "La Laitière", description: " une peinture à l'huile sur toile  , réalisée vers 1658 par Johannes Vermeer,   \n"+
												"et exposée depuis 1908 au Rijksmuseum d'Amsterdam" },
            { poster: "poster19", image: "./assets/paysage/mez5.jpg", title: "The Microcosm of London ", description: "Le moulin à farine Albion était l'une des 1ere usines entièrement en fer,achevée en 1769 à la conception \n"+
												" de Robert Mylne.L'incendie a eu lieu le 3 mars 1791." },
            { poster: "poster20", image: "./assets/akov/6.jpg", title: "La Gare Saint-Lazare", description: " La Gare Saint-Lazare de Claude Monet, peinte en 1877, capture l'animation et la vapeur des locomotives "},
            { poster: "poster21", image: "./assets/paysage/7.jpg", title: "Une soirée au Pré Catelan ", description: " Une soirée au Pré Catelan par Henri Alexandre Gervex - 1909"},
												 
            { poster: "poster22", image: "./assets/paysage/8.jpg", title: "  Le Chalet du cycle au bois de Boulogne", description: "Le Chalet du Cycle était situé au bois de Boulogne, près du pont de Suresnes.Tableau exposé au   \n"+
               "  musée de Sceaux de 1937 à 1980." },
            { poster: "poster23", image: "./assets/paysage/2.jpg", title: "CINQ HEURES CHEZ PAQUIN", description: "une peinture à l'huile réalisée par le peintre français Henri Gervex en 1896. Cette œuvre représente  \n"+
                "un groupe de femmes élégamment vêtues dans la boutique de haute couture de Paquin à Paris."},
            { poster: "poster24", image: "./assets/paysage/hall3.jpg", title: "taches du soir", description: "Une toile qui montre la beauté de la campagne américaine et les instants simples de la vie quotidienne  " },
            { poster: "poster25", image: "./assets/paysage/mez3.jpg", title: "Gratte-Ciel Urbains", description: " Peinture À L'Huile Sur Toile,Beau Paysage De Gratte-Ciel Urbains Modernes " },
            { poster: "poster26", image: "./assets/paysage/hall2.jpg", title: "Lake Winnepesauke", description: " Le tableau illustre le désir précoce de Thomas Cole de dépeindre la nature comme sauvage et sublime." },
            { poster: "poster27", image: "./assets/portrait/8.jpg", title: " The Wanderer above the mists", description: "La toile peint par Caspar David Friedrich en 1818 représente un homme vu de dos, \n"+
												"debout au sommet d'un promontoire rocheux" },
            { poster: "poster28", image: "./assets/portrait/7.jpg", title: " la mère de Whistler Carnet", description: "  La mère de Whistler, est une peinture à l'huile sur toile créée par le peintre américain \n"+
												"James McNeill Whistler en 1871" },
            { poster: "poster29", image: "./assets/portrait/6.jpg", title: " La Dame à l'hermine", description: "La Dame à l’hermine est une peinture à l'huile sur panneau de bois   réalisée par Léonard de Vinci à Milan, en 1488   " },
            { poster: "poster30", image: "./assets/akov/3.jpg", title: "La Maison du Docteur Gachet", description: "La Maison du Docteur Gachet à Auvers, par Paul Cézanne" }
        ];

        
        // Function to create and position posters
        function createAndPositionPoster(posterData, position, scene, rotate180 = false, scaleBig = false) {
            const poster = PRIMS.poster(posterData.poster, { tableau: posterData.image }, scene);
            poster.parent = position.parent;
            poster.position = new BABYLON.Vector3(position.x, position.y, position.z);
            poster.rotation.y = rotate180 ? 0 : Math.PI; 
            poster.scaling = scaleBig ? new BABYLON.Vector3(3, 3, 3) : new BABYLON.Vector3(2, 2, 2); 
            return poster;
        }
        
        // Creating posters and positioning them
        const posterPositions = [
            { parent: wall10, x: 3.5, y: 2, z: 0.2 },
            { parent: wall10, x: -5.5, y: 2, z: 0.2 },
            { parent: wall10, x: -1.5, y: 2, z: 0.2 },
            { parent: wall10, x: 4, y: 2, z: -0.3 },
            { parent: wall10, x: -5.5, y: 2, z: -0.3 },
            { parent: wall10, x: -1, y: 2, z: -0.3 },
        
            { parent: wall11, x: 3.5, y: 2, z: 0.2 },
            { parent: wall11, x: -5.5, y: 2, z: 0.2 },
            { parent: wall11, x: -1.5, y: 2, z: 0.2 },
            { parent: wall11, x: 4, y: 2, z: -0.3 },
            { parent: wall11, x: -5.5, y: 2, z: -0.3 },
            { parent: wall11, x: -1, y: 2, z: -0.3 },
        
            { parent: wall1, x: 8, y: 2, z: 0.1 },
            { parent: wall1, x: 12, y: 2, z: 0.1 },
            { parent: wall1, x: 2, y: 2, z: 0.1 },
            { parent: wall1, x: -2, y: 2, z: 0.1 },
            { parent: wall1, x: -8, y: 2, z: 0.1 },
            { parent: wall1, x: -12, y: 2, z: 0.1 },
            { parent: wall1, x: 8, y: 7.5, z: 0.1 },
            { parent: wall1, x: -8, y: 7.5, z: 0.1 },
        
            { parent: wall3, x: 2.5, y: 2, z: -0.1 },
            { parent: wall3, x: 7, y: 2, z: -0.1 },
            { parent: wall3, x: 12, y: 2, z: -0.1 },
            { parent: wall3, x: -7, y: 2.5, z: -0.1 },
            { parent: wall3, x: 7, y: 7.5, z: -0.1 },
        
            { parent: wall4, x: 7, y: 2.5, z: -0.1 }, 
            { parent: wall4, x: -2, y: 2, z: -0.1 }, 
            { parent: wall4, x: -7, y: 2, z: -0.1 },
            { parent: wall4, x: -12, y: 2, z: -0.1 },
            { parent: wall4, x: -7, y: 7.5, z: -0.1 }
        ];
        
        const posters = [];
        
        for (let i = 0; i < posterPositions.length; i++) {
            const position = posterPositions[i];
            const posterData = postersData[i];
        
            if (!posterData) {
                console.error(`posterData is undefined at index ${i}`);
                continue;
            }
        
            const rotate180Posters = [29, 28, 27, 4, 5, 6, 26, 10, 11, 12, 21, 22, 23, 25,24, 30];
            const scaleBigPosters = [24, 26, 30, 20, 19, 25];
            const rotate180 = rotate180Posters.includes(i + 1); 
            const scaleBig = scaleBigPosters.includes(i + 1); 
        
            const poster = createAndPositionPoster(posterData, position, this.scene, rotate180, scaleBig);
            posters.push(poster);
        }
        
        // Add interactions to the posters
        posters.forEach((poster, index) => {
            const posterData = postersData[index];
            this.addPosterInteraction(poster, this.scene, posterData.title, posterData.description);
        });
        

        scene.onBeforeRenderObservable.add(() => {
            this.checkPosterProximity(scene);
        });

        // les 2 eme escalier
        // Add stairs leading up to wall13
        const stairs2 = PRIMS.escalier("stairs2", {
            steps: 6, 
            stepWidth: 2.5, 
            stepHeight: 0.75, 
            stepDepth: 0.3, 
            materiau: materiau3 
        }, scene);
        // Adjust position to align with the wall13
        stairs2.position.y = 3; 
        stairs2.position.z = 13.75; 
        stairs2.position.x = -6.5; 
        stairs2.rotation.x = BABYLON.Tools.ToRadians(-90); 
        stairs2.rotation.y = BABYLON.Tools.ToRadians(90); 

        // les escalier du milieux:
        const stairs3 = PRIMS.escalier("stairs1", {
            steps: 10, 
            stepWidth: 6, 
            stepHeight: 0.5, 
            stepDepth: 0.3,
            materiau: materiau3 
        }, scene);
        // Adjust position to align with the wall13
        stairs3.position.y = 3;
        stairs3.position.z = 12.5; 
        stairs3.position.x = 0;
        stairs3.rotation.x = BABYLON.Tools.ToRadians(90);
        stairs3.rotation.y = BABYLON.Tools.ToRadians(180);

        // les portes : 
        const doorMaterial = PRIMS.standardMaterial("doorMat", { texture: "./assets/wood.jpg" }, scene);

        this.doors.push(this.createDoor("door1", new BABYLON.Vector3(10, 1.5, 0), doorMaterial, scene));
        this.doors.push(this.createDoor("door2", new BABYLON.Vector3(0, 1.5, 0), doorMaterial, scene));
        this.doors.push(this.createDoor("door3", new BABYLON.Vector3(-10, 1.5, 0), doorMaterial, scene));

        // Check proximity and animate doors
        scene.onBeforeRenderObservable.add(async () => {
            let camera = scene.activeCamera;
            let proximityThreshold = 9; 

            for (let doorData of this.doors) {
                let { door, openPosition, closedPosition, doorState, isAnimating } = doorData;
                let distance = BABYLON.Vector3.DistanceSquared(camera.position, door.position);

                if (distance < proximityThreshold && doorState !== "open" && !isAnimating) {
                    doorData.isAnimating = true;
                    doorData.doorState = "open";
                    await PRIMS.animateDoor(door, door.position, openPosition, scene, 2); 
                    doorData.isAnimating = false;
                    console.log(`${door.name} opened`);
                } else if (distance >= proximityThreshold && doorState !== "closed" && !isAnimating) {
                    doorData.isAnimating = true;
                    doorData.doorState = "closed";
                    await PRIMS.animateDoor(door, door.position, closedPosition, scene, 1); 
                    doorData.isAnimating = false;
                    console.log(`${door.name} closed`);
                }
            }
        });

        // Add posters above the doors
        this.addPosterAboveDoor("renoir", { height: 0.5, width: 2, salonName: "ELEGANCE " }, new BABYLON.Vector3(10, 1.1, 0.17), scene);
        this.addPosterAboveDoor("monet", { height: 0.5, width: 2, salonName: "BREST" }, new BABYLON.Vector3(0, 1.1, 0.17), scene);
        this.addPosterAboveDoor("degas", { height: 0.5, width: 2, salonName: "PORTRAIT " }, new BABYLON.Vector3(-10, 1.1, 0.17), scene);


//     Statues
function importStatue(scene, filePath, fileName, position, scaling, initialRotation, texturePath, rotationAxis = null, rotationSpeed = 0) {
    BABYLON.SceneLoader.ImportMesh(
        "",
        filePath, 
        fileName, 
        scene,
        function (meshes) {
            console.log(`Loaded ${fileName} from ${filePath}`);
            if (meshes.length > 0) {
                const statue = new BABYLON.TransformNode("statueRoot", scene);
                
                // Create the material with the texture
                const statueMaterial = new BABYLON.StandardMaterial("statueMaterial", scene);
                statueMaterial.diffuseTexture = new BABYLON.Texture(texturePath, scene);
                
                // Parent all meshes to the root node and apply the material
                meshes.forEach(mesh => {
                    mesh.parent = statue;
                    mesh.material = statueMaterial;
                });

                // Apply transformations to the root node
                statue.position = position;
                statue.scaling = scaling;
                if (initialRotation) {
                    statue.rotation = initialRotation;
                }

                // If a rotation axis and speed are provided, add continuous rotation
                if (rotationAxis && rotationSpeed !== 0) {
                    scene.registerBeforeRender(function () {
                        statue.rotate(rotationAxis, rotationSpeed, BABYLON.Space.LOCAL);
                    });
                }
            } else {
                console.error(`No meshes found in ${fileName} from ${filePath}`);
            }
        },
        null,
        function (scene, message, exception) {
            console.error(`Error loading ${fileName} from ${filePath}`, message, exception);
        }
    );
}

// Import multiple statues
function importStatues(scene) {
    importStatue(
        scene,
        "./assets/obj/objects/", 
        "eiffel.babylon", 
        new BABYLON.Vector3(-7.5, -0.01, 9),
        new BABYLON.Vector3(0.04, 0.04, 0.04),
        new BABYLON.Vector3(-Math.PI / 2, 0, Math.PI / 2),
        "./assets/textures/a.png", 
        BABYLON.Axis.Z, 
        0.001 
    );

    importStatue(
        scene,
        "./assets/obj/objects/", 
        "bust.obj", 
        new BABYLON.Vector3(7.5, -0.01, 9),
        new BABYLON.Vector3(4, 4, 4),
        new BABYLON.Vector3(0,0, 0),
        "./assets/textures/a.png", 
        BABYLON.Axis.Y, 
        0.009 
    );

    importStatue(
        scene,
        "./assets/obj/objects/", 
        "horse.obj",
        new BABYLON.Vector3(-2, 5, -8), 
        new BABYLON.Vector3(16, 16, 16), 
        new BABYLON.Vector3(0, Math.PI, 0),
        "./assets/textures/horseTexture.png", 
        BABYLON.Axis.Y, 
        0.04 
    );

    importStatue(
        scene,
        "./assets/obj/objects/", 
        "liberta.obj", 
        new BABYLON.Vector3(4 , 5, -8), 
        new BABYLON.Vector3(0.4, 0.4, 0.4),
        new BABYLON.Vector3(-Math.PI/2,0, 0),
        "./assets/textures/sanama.png"  
    );

    importStatue(
        scene,
        "./assets/obj/objects/", 
        "buda.obj", 
        new BABYLON.Vector3(-2, -0.01, 0.85), 
        new BABYLON.Vector3(0.02, 0.02, 0.02),
        new BABYLON.Vector3(-Math.PI/2,0, 0),
        "./assets/textures/buda.png"  
    );
    importStatue(
        scene,
        "./assets/obj/objects/", 
        "buda.obj", 
        new BABYLON.Vector3(2, -0.01, 0.85), 
        new BABYLON.Vector3(0.02, 0.02, 0.02),
        new BABYLON.Vector3(-Math.PI/2,0, 0),
        "./assets/textures/buda.png" 
    );
    importStatue(
        scene,
        "./assets/obj/objects/", 
        "korsi.babylon",
        new BABYLON.Vector3(-10, 5, -10), 
        new BABYLON.Vector3(0.015, 0.015, 0.015), 
        new BABYLON.Vector3(0,0, 0),
        "./assets/textures/chair.png" 
    );
    importStatue(
        scene,
        "./assets/obj/objects/", 
        "korsi.babylon", 
        new BABYLON.Vector3(-7, 5, -10),
        new BABYLON.Vector3(0.015, 0.015, 0.015),
        new BABYLON.Vector3(0,0, 0),
        "./assets/textures/chair.png" 
    );
    importStatue(
        scene,
        "./assets/obj/objects/",
        "korsi.babylon", 
        new BABYLON.Vector3(12.5, -0.02, 12), 
        new BABYLON.Vector3(0.015, 0.015, 0.015), 
        new BABYLON.Vector3(0,Math.PI, 0),
        "./assets/textures/chair.png"  
    );
    }
    importStatues(scene);

    

    // Create teleportation spheres
    const teleportSpheres = [
        this.createTeleportationSphere(new BABYLON.Vector3(-8, 0.5, 5), scene),
        this.createTeleportationSphere(new BABYLON.Vector3(8, 0.5, 5), scene),
        this.createTeleportationSphere(new BABYLON.Vector3(13, 6, 13.75), scene),
        this.createTeleportationSphere(new BABYLON.Vector3(-13, 6, 13.75), scene),
        this.createTeleportationSphere(new BABYLON.Vector3(-13, 6, -1), scene),
        this.createTeleportationSphere(new BABYLON.Vector3(13, 6, -1), scene),
    ];

    this.teleportationSpheres.push(...teleportSpheres);


    scene.onBeforeRenderObservable.add(() => {
        this.checkPosterProximity(scene);
        this.updateTeleportationSpheres(scene);
    });

    window.addEventListener("pointerdown", (evt) => {
        if (evt.button === 0) { 
            this.teleport(scene);
        }
    });


    
}
 
    createTeleportationSphere(position, scene) {
        const sphere = BABYLON.MeshBuilder.CreateSphere("teleportSphere", { diameter: 1 }, scene);
        sphere.position = position;
        sphere.material = new BABYLON.StandardMaterial("teleportMaterial", scene);
        sphere.material.diffuseColor = new BABYLON.Color3(0, 0, 0); 
        sphere.material.alpha = 0.5;
        return sphere;
    }

    updateTeleportationSpheres(scene) {
        const camera = scene.activeCamera;
        let closestSphere = null;
        let closestDistance = Infinity;
    
        this.teleportationSpheres.forEach(sphere => {
            sphere.material.diffuseColor = new BABYLON.Color3(0, 0, 0); 
            sphere.material.alpha = 0.5; 
            const distance = BABYLON.Vector3.Distance(camera.position, sphere.position);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSphere = sphere;
            }
        });
    
        if (closestSphere && closestDistance < 20) { 
            closestSphere.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
            closestSphere.material.alpha = 0.8;
        }
    }
    

    teleport(scene) {
        const camera = scene.activeCamera;
        this.teleportationSpheres.forEach(sphere => {
            if (sphere.material.diffuseColor.equals(new BABYLON.Color3(1, 0, 0)) && this.isSphereInView(sphere, camera)) {
                camera.position.copyFrom(sphere.position);
                camera.position.y += 2; 
            }
        });
    }


    createDoor(name, position, material, scene) {
        let door = PRIMS.createSlidingDoor(name, { width: 3, height: 5, material }, scene);
        door.position = position;

        let closedPosition = door.position.clone();
        let openPosition = door.position.clone();
        openPosition.x += 3; 

        return {
            door,
            closedPosition,
            openPosition,
            doorState: "closed",
            isAnimating: false
        };
    }

    addPosterAboveDoor(name, options, doorPosition, scene) {
        let poster = PRIMS.createPoster(name, options, scene);
        poster.position = new BABYLON.Vector3(doorPosition.x, doorPosition.y + 2.75, doorPosition.z + 0.05);
        poster.rotation.y = BABYLON.Tools.ToRadians(0); 
    }

    addPosterInteraction(poster, scene, title, description) {
        let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let titleMesh = new BABYLON.GUI.TextBlock();
        titleMesh.text = title;
        titleMesh.color = "black";
        titleMesh.fontSize = 35;
        titleMesh.isVisible = false;
        titleMesh.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        titleMesh.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        titleMesh.top = "20px";

        let descriptionContainer = new BABYLON.GUI.Rectangle();
        descriptionContainer.width = "1000px";
        descriptionContainer.height = "auto";
        descriptionContainer.cornerRadius = 20;
        descriptionContainer.color = "black";
        descriptionContainer.thickness = 2;
        descriptionContainer.background = "black";
        descriptionContainer.isVisible = false;
        descriptionContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        descriptionContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        descriptionContainer.top = "-50px";
        // Dynamically adjust the height of descriptionContainer based on text length
descriptionContainer.height = (description.split(' ').length > 3) ? "100px" : "auto";

        let descriptionMesh = new BABYLON.GUI.TextBlock();
        descriptionMesh.text = description;
        descriptionMesh.color = "white";
        descriptionMesh.fontSize = 18;
        descriptionMesh.textWrapping = true;
        descriptionMesh.resizeToFit = true;
        descriptionMesh.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        descriptionMesh.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
     
      
        descriptionContainer.addControl(descriptionMesh);
        advancedTexture.addControl(titleMesh);
        advancedTexture.addControl(descriptionContainer);
       

        // Add double-click event listener
        poster.actionManager = new BABYLON.ActionManager(scene);
        poster.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnDoublePickTrigger,
            () => {
                descriptionContainer.isVisible = !descriptionContainer.isVisible;
                console.log(`Double clicked on ${poster.name}`);
            }
        ));

        this.posters.push({
            poster,
            titleMesh,
            descriptionContainer,
            descriptionMesh,
            titleDisplayed: false,
            descriptionDisplayed: false,
            showTime: 1000 
        });
    }
 

    isPosterInView(poster, camera) {
        const posterPosition = poster.getAbsolutePosition();
        const cameraPosition = camera.position;
        const cameraForward = camera.getForwardRay().direction;

        const toPoster = posterPosition.subtract(cameraPosition).normalize();

        const dotProduct = BABYLON.Vector3.Dot(cameraForward, toPoster);
        const angle = Math.acos(dotProduct);

        // Define a threshold for the angle within which the poster is considered in view
        const angleThreshold = BABYLON.Tools.ToRadians(30); 

        return angle < angleThreshold;
    }
     // Method to check if a teleportation sphere is in the camera's field of view
     isSphereInView(sphere, camera) {
        const spherePosition = sphere.getAbsolutePosition();
        const cameraPosition = camera.position;
        const cameraForward = camera.getForwardRay().direction;

        const toSphere = spherePosition.subtract(cameraPosition).normalize();

        const dotProduct = BABYLON.Vector3.Dot(cameraForward, toSphere);
        const angle = Math.acos(dotProduct);

        // Define a threshold for the angle within which the sphere is considered in view
        const angleThreshold = BABYLON.Tools.ToRadians(30); 

        return angle < angleThreshold;
    }

    
    // Updated method to check poster proximity and visibility
    checkPosterProximity(scene) {
        let camera = scene.activeCamera;
        let proximityThreshold = 4; 
        let closestPoster = null;
        let closestDistance = proximityThreshold;

        for (let posterData of this.posters) {
            let { poster, titleMesh, descriptionContainer } = posterData;
            let distance = BABYLON.Vector3.Distance(camera.position, poster.getAbsolutePosition());

            // Check if the poster is within the camera's field of view
            if (distance < closestDistance && this.isPosterInView(poster, camera)) {
                closestDistance = distance;
                closestPoster = posterData;
            }
        }

        if (closestPoster !== this.currentlyDisplayedPoster) {
            if (this.currentlyDisplayedPoster) {
                this.currentlyDisplayedPoster.titleMesh.isVisible = false;
                this.currentlyDisplayedPoster.descriptionContainer.isVisible = false;
                this.currentlyDisplayedPoster.titleDisplayed = false;
                this.currentlyDisplayedPoster.descriptionDisplayed = false;
            }

            if (closestPoster) {
                closestPoster.titleMesh.isVisible = true;
                closestPoster.titleDisplayed = true;
                this.posterDisplayTime[closestPoster.poster.name] = Date.now();

                let elapsed = Date.now() - this.posterDisplayTime[closestPoster.poster.name];
                if (elapsed > closestPoster.showTime) {
                    closestPoster.descriptionContainer.isVisible = true;
                    closestPoster.descriptionDisplayed = true;
                }
            }

            this.currentlyDisplayedPoster = closestPoster;
        }

        if (this.currentlyDisplayedPoster) {
            let elapsed = Date.now() - this.posterDisplayTime[this.currentlyDisplayedPoster.poster.name];
            if (elapsed > this.currentlyDisplayedPoster.showTime) {
                this.currentlyDisplayedPoster.descriptionContainer.isVisible = true;
                this.currentlyDisplayedPoster.descriptionDisplayed = true;
            }

            // If the poster is no longer in view, hide the title and description
            if (!this.isPosterInView(this.currentlyDisplayedPoster.poster, camera)) {
                this.currentlyDisplayedPoster.titleMesh.isVisible = false;
                this.currentlyDisplayedPoster.descriptionContainer.isVisible = false;
                this.currentlyDisplayedPoster.titleDisplayed = false;
                this.currentlyDisplayedPoster.descriptionDisplayed = false;
                this.currentlyDisplayedPoster = null;
            }
        }
    }
}

export { World }




