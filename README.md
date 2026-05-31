# Interactive WebGL Room Renderer

An interactive 3D room renderer developed in WebGL and GLSL as part of a Computer Graphics project. The project demonstrates multiple real-time rendering techniques including lighting models, toon shading, environment mapping, material systems, texture mapping, and first-person navigation.

## Features

### Scene Modeling

* Fully modeled indoor room environment
* Custom-built furniture including a table, chair, shelf, decorative plant, lamp fixture, and storage crate
* Interactive first-person exploration

### Camera System

* Mouse-look camera controls
* WASD movement
* Pointer lock support
* Custom lookAt() view matrix implementation
* Perspective projection with adjustable field of view

### Texture Mapping

* Multiple texture support
* Independent textures for:

  * Walls
  * Carpet
  * Table surfaces
  * Table legs
* Texture coordinate mapping and texture unit management

### Lighting System

#### Point Light Source

* Toggleable ceiling light
* Distance-based attenuation
* Interactive light enable/disable

#### Diffuse Lighting

* Lambertian diffuse illumination
* Surface brightness varies according to light direction

#### Specular Lighting

* View-dependent highlights
* Shininess control through material parameters

### Toon (Cel) Shading

* Quantized lighting bands
* Distinct brightness levels
* Cartoon-style rendering mode
* Runtime toggle between realistic and toon rendering

### Environment Mapping

* Cubemap-based environment mapping
* Reflection vector computation in GLSL
* Static room reflections
* Reflective object rendering

### Material System

Custom material definitions supporting:

* Diffuse coefficient
* Specular coefficient
* Shininess factor

Implemented materials include:

* Wood
* Steel
* Carpet

### Advanced Graphics Techniques

* Phong illumination model
* Material-based rendering
* Environment reflections
* Cubemap texturing
* Distance attenuation
* Toon shading

## Controls

| Key | Function            |
| --- | ------------------- |
| W   | Move Forward        |
| S   | Move Backward       |
| A   | Move Left           |
| D   | Move Right          |
| Q   | Toggle Mouse Look   |
| L   | Toggle Light        |
| T   | Toggle Toon Shading |

## Technologies Used

* WebGL
* JavaScript
* GLSL
* HTML5
* Cubemap Environment Mapping

## Rendering Pipeline Highlights

The project uses custom vertex and fragment shaders written in GLSL to implement:

1. Diffuse lighting calculations
2. Specular reflections
3. Light attenuation
4. Toon shading
5. Environment mapping
6. Material-based shading

All rendering functionality was implemented manually without using external 3D engines such as Three.js.

## Future Improvements

* Toon-shading outlines
* Dynamic environment mapping
* Shadow mapping
* Reflection probes
* Additional scene assets

## Author

Sahil Kumar
