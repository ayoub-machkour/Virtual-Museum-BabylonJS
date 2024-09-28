# Virtual Museum - BabylonJS
## Overview : 
This project is a 3D Virtual Museum dedicated to the Belle Époque era, created using BabylonJS, a powerful JavaScript library for rendering 3D graphics in the browser. The museum offers an immersive experience, allowing users to explore a detailed environment, interact with artworks, and navigate through different rooms. The museum was developed as part of my Virtual Reality module at ENIB.

The virtual museum spans a 30m x 30m area, featuring a main hall, three themed rooms, and a mezzanine connected by stairs. The museum is populated with statues and pictures.

## Features :

- Interactive 3D environment: Explore the museum, view artworks, and navigate through rooms.
- Detailed textures, models, and pictures: The museum uses 3D models, statues, and pictures
- Immersive experience: Users can explore different areas of the museum with smooth controls and interactions.

### How to View the Project : 
To view and navigate the virtual museum, follow the instructions below:

### Prerequisites :
You need a modern web browser such as Google Chrome or Mozilla Firefox. Some browser configurations are required due to security policies when loading local files.

### Setup Instructions : 
#### Google Chrome :
+ Right-click the Google Chrome icon on your desktop and select Properties.
+ In the Target field, add the following parameters after the program path: `--disable-web-security --user-data-dir=~\chromeTemp`
This step disables the default security policies, which might restrict certain features of the virtual museum.

#### Mozilla Firefox :
+ Open Firefox and type `about:config` in the address bar.
+ Search for `security.fileuri.strict_origin_policy` and set it to `false`.
This change allows local scripts to be loaded and executed, which is necessary for the museum to work correctly without a web server.

### Running the Museum :
- After configuring your browser, open the file `index.html` located in the project's directory.
- The museum will load in your browser. Use the arrow keys or WASD for movement and the mouse to look around.
- As you navigate through the museum, approach statues and artworks to view more details. You can explore the main hall, themed rooms, and mezzanine for a complete experience.

## Technologies Used :
- BabylonJS: Main framework for rendering the 3D environment.
- HTML5, CSS3, JavaScript: Web technologies used to structure and style the project.
- GLTF Models: For loading 3D statues and assets.
- WebGL: For real-time 3D rendering in the browser.

## Project Structure :
- `index.html`: Main HTML file to load the museum.
- `src/`: Contains JavaScript code and assets for the museum environment.
- `assets/`: Folder containing 3D models, textures, and artwork used in the museum.
- `styles/`: CSS files for styling the interface.


## Screenshots :

![Museum Screenshot](assets/Screenshots/1.png)
![Museum Screenshot](assets/Screenshots/2.png)
