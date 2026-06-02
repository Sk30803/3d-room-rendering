const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL not supported");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

gl.viewport(
    0,
    0,
    canvas.width,
    canvas.height
);

gl.enable(gl.DEPTH_TEST);

gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);

// =====================
// Shader creation
// =====================

function createShader(type, source)
{
    const shader=gl.createShader(type);

    gl.shaderSource(shader,source);

    gl.compileShader(shader);

    return shader;
}

const vertexShader=createShader(
    gl.VERTEX_SHADER,
    vertexShaderSource
);

const fragmentShader=createShader(
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
);

const program=gl.createProgram();

gl.attachShader(program,vertexShader);

gl.attachShader(program,fragmentShader);

gl.linkProgram(program);

gl.useProgram(program);


const texture=gl.createTexture();

const legTexture=gl.createTexture();

const wallTexture=gl.createTexture();

const carpetTexture=gl.createTexture();

const cubeMapTexture=gl.createTexture();

const image=new Image();

const legImage=new Image();

const wallImage=new Image();

const carpetImage=new Image();

image.src='wood.jpg';

legImage.src='tableLeg.jpg';

wallImage.src='wallpaper5.jpg';

carpetImage.src='carpet.jpg';

image.onload=function()
{

    console.log("Texture loaded");

    gl.activeTexture(
        gl.TEXTURE0
    );

    gl.bindTexture(
        gl.TEXTURE_2D,
        texture
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        gl.CLAMP_TO_EDGE
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        gl.CLAMP_TO_EDGE
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        gl.LINEAR
    );

    gl.pixelStorei(
        gl.UNPACK_FLIP_Y_WEBGL,
        true
    );

    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
    );

};

legImage.onload=function()
{

    console.log("Leg texture loaded");

    gl.activeTexture(
        gl.TEXTURE1
    );

    gl.bindTexture(
        gl.TEXTURE_2D,
        legTexture
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        gl.CLAMP_TO_EDGE
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        gl.CLAMP_TO_EDGE
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        gl.LINEAR
    );

    gl.pixelStorei(
        gl.UNPACK_FLIP_Y_WEBGL,
        true
    );

    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        legImage
    );

};

wallImage.onload=function()
{

    console.log("Wall texture loaded");

    gl.activeTexture(
        gl.TEXTURE2
    );

    gl.bindTexture(
        gl.TEXTURE_2D,
        wallTexture
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        gl.REPEAT
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        gl.REPEAT
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        gl.LINEAR
    );

    gl.pixelStorei(
        gl.UNPACK_FLIP_Y_WEBGL,
        true
    );

    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        wallImage
    );

};

carpetImage.onload=function()
{

    console.log("Carpet texture loaded");

    gl.activeTexture(
        gl.TEXTURE3
    );

    gl.bindTexture(
        gl.TEXTURE_2D,
        carpetTexture
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        gl.REPEAT
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        gl.REPEAT
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR
    );

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        gl.LINEAR
    );

    gl.pixelStorei(
        gl.UNPACK_FLIP_Y_WEBGL,
        true
    );

    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        carpetImage
    );

};

function loadCubeMap()
{
    gl.bindTexture(
        gl.TEXTURE_CUBE_MAP,
        cubeMapTexture
    );

    const faces=[
{
 target:gl.TEXTURE_CUBE_MAP_POSITIVE_X,
 url:'cubemap/rightface.JPG'
},
{
 target:gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
url:'cubemap/leftface.JPG'
},
{
 target:gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
 url:'cubemap/topface.JPG'
},
{
 target:gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
 url:'cubemap/bottomface.JPG'
},
{
 target:gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
 url:'cubemap/frontface.JPG'
},
{
 target:gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,

 url:'cubemap/backface.JPG'
}
    ];

    faces.forEach((face)=>
    {
        const img=new Image();

        img.onload=function()
        {
            gl.bindTexture(
                gl.TEXTURE_CUBE_MAP,
                cubeMapTexture
            );

            gl.texImage2D(
                face.target,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                img
            );
        };

        img.src=face.url;
    });

    gl.texParameteri(
        gl.TEXTURE_CUBE_MAP,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR
    );

    gl.texParameteri(
        gl.TEXTURE_CUBE_MAP,
        gl.TEXTURE_MAG_FILTER,
        gl.LINEAR
    );

    gl.texParameteri(
        gl.TEXTURE_CUBE_MAP,
        gl.TEXTURE_WRAP_S,
        gl.CLAMP_TO_EDGE
    );

    gl.texParameteri(
        gl.TEXTURE_CUBE_MAP,
        gl.TEXTURE_WRAP_T,
        gl.CLAMP_TO_EDGE
    );
}

loadCubeMap();

const useTextureLocation=
gl.getUniformLocation(
program,
"useTexture"
);

const textureLocation=
gl.getUniformLocation(
program,
"uTexture"
);

gl.uniform1i(
textureLocation,
0
);

const legTextureLocation=
gl.getUniformLocation(
program,
"uTexture"
);


// =====================
// Cube vertices
// =====================
const cubeVertices=[

// FRONT
-1,-1,1, 0,0, 0,0,1,
1,-1,1, 1,0, 0,0,1,
1,1,1, 1,1, 0,0,1,

-1,-1,1, 0,0, 0,0,1,
1,1,1, 1,1, 0,0,1,
-1,1,1, 0,1, 0,0,1,


// BACK
-1,-1,-1, 0,0, 0,0,-1,
-1,1,-1, 0,1, 0,0,-1,
1,1,-1, 1,1, 0,0,-1,

-1,-1,-1, 0,0, 0,0,-1,
1,1,-1, 1,1, 0,0,-1,
1,-1,-1, 1,0, 0,0,-1,


// TOP
-1,1,-1, 0,0, 0,1,0,
-1,1,1, 0,1, 0,1,0,
1,1,1, 1,1, 0,1,0,

-1,1,-1, 0,0, 0,1,0,
1,1,1, 1,1, 0,1,0,
1,1,-1, 1,0, 0,1,0,


// BOTTOM
-1,-1,-1, 0,0, 0,-1,0,
1,-1,-1, 1,0, 0,-1,0,
1,-1,1, 1,1, 0,-1,0,

-1,-1,-1, 0,0, 0,-1,0,
1,-1,1, 1,1, 0,-1,0,
-1,-1,1, 0,1, 0,-1,0,


// RIGHT
1,-1,-1, 0,0, 1,0,0,
1,1,-1, 0,1, 1,0,0,
1,1,1, 1,1, 1,0,0,

1,-1,-1, 0,0, 1,0,0,
1,1,1, 1,1, 1,0,0,
1,-1,1, 1,0, 1,0,0,


// LEFT
-1,-1,-1, 0,0, -1,0,0,
-1,-1,1, 1,0, -1,0,0,
-1,1,1, 1,1, -1,0,0,

-1,-1,-1, 0,0, -1,0,0,
-1,1,1, 1,1, -1,0,0,
-1,1,-1, 0,1, -1,0,0,

];

const vertices=new Float32Array(
cubeVertices
);


// =====================
// VBO
// =====================

const VBO=gl.createBuffer();

gl.bindBuffer(
gl.ARRAY_BUFFER,
VBO
);

gl.bufferData(
gl.ARRAY_BUFFER,
vertices,
gl.STATIC_DRAW
);


const positionLocation=
gl.getAttribLocation(
program,
"aPosition"
);


gl.vertexAttribPointer(
positionLocation,
3,
gl.FLOAT,
false,
32,
0
);

gl.enableVertexAttribArray(
positionLocation
);

const texCoordLocation=
gl.getAttribLocation(
program,
"aTexCoord"
);

gl.vertexAttribPointer(
texCoordLocation,
2,
gl.FLOAT,
false,
32,
12
);


const normalLocation=gl.getAttribLocation(
program,
'aNormal'
);

gl.vertexAttribPointer(
normalLocation,
3,
gl.FLOAT,
false,
32,
20
);

gl.enableVertexAttribArray(
normalLocation
);


gl.enableVertexAttribArray(
texCoordLocation
);


// =====================
// Matrix helpers
// =====================

function identity()
{
return [

1,0,0,0,
0,1,0,0,
0,0,1,0,
0,0,0,1

];
}

function modelMatrix(tx,ty,tz,sx,sy,sz)
{
return [

sx,0,0,0,
0,sy,0,0,
0,0,sz,0,
tx,ty,tz,1

];
}


// =====================
// Uniforms
// =====================
const materials =
{
    default:
    {
        diffuse:1.0,
        specular:1.0,
        shininess:32.0
    },

    wood:
    {
        diffuse:0.1,
        specular:0.1,
        shininess:12.0
    },

    steel:
    {
        diffuse:1.0,
        specular:1.0,
        shininess:64.0
    },

    carpet:
    {
        diffuse:0.4,
        specular:0.05,
        shininess:4.0
    }
};

const materialDiffuseLocation=
gl.getUniformLocation(
program,
"materialDiffuse"
);

const materialSpecularLocation=
gl.getUniformLocation(
program,
"materialSpecular"
);

const materialShininessLocation=
gl.getUniformLocation(
program,
"materialShininess"
);

const reflectiveObjectLocation=
gl.getUniformLocation(
program,
"reflectiveObject"
);

const cubeMapLocation=
gl.getUniformLocation(
program,
"uCubeMap"
);

const toonModeLocation=
gl.getUniformLocation(
program,
"toonMode"
);

const viewPosLocation=
gl.getUniformLocation(
program,
"viewPos"
);

const isLightSourceLocation=
gl.getUniformLocation(
program,
"isLightSource"
);

const lightOnLocation=
gl.getUniformLocation(
program,
"lightOn"
);

const lightPosLocation=
gl.getUniformLocation(
program,
"lightPos"
);

const modelLocation=
gl.getUniformLocation(
program,
"uModel"
);

const viewLocation=
gl.getUniformLocation(
program,
"uView"
);

const projectionLocation=
gl.getUniformLocation(
program,
"uProjection"
);

const colorLocation=
gl.getUniformLocation(
program,
"uColor"
);

const brightnessLocation=
gl.getUniformLocation(
program,
"brightness"
);

let lightOn=true;
let toonMode=false;

// Camera

let yaw=-90;
let pitch=0;

let lastX=window.innerWidth/2;
let lastY=window.innerHeight/2;

let firstMouse=true;

let cameraX=0;
let cameraY=0;
let cameraZ=6;

let cameraFront=[0,0,-1];

// Perspective matrix

function perspective(fov,aspect,near,far)
{

let f=1/Math.tan(fov/2);

return [

f/aspect,0,0,0,
0,f,0,0,
0,0,(far+near)/(near-far),-1,
0,0,(2*far*near)/(near-far),0

];

}

const projection=perspective(

degToRad(60),

canvas.width/canvas.height,

0.1,

100

);

gl.uniformMatrix4fv(
projectionLocation,
false,
new Float32Array(projection)
);


// =====================
// Draw object
// =====================

function drawCube(position,scaleValues,color,useTexture=false,material=materials.default,drawingOutline=false)
{

if(toonMode && !drawingOutline)
{
    drawOutlineCube(
        position,
        scaleValues
    );
}

let model=modelMatrix(

position[0],
position[1],
position[2],

scaleValues[0],
scaleValues[1],
scaleValues[2]

);

gl.uniformMatrix4fv(
modelLocation,
false,
new Float32Array(model)
);

gl.uniform4fv(
colorLocation,
color
);

gl.uniform1f(
    useTextureLocation,
    useTexture ? 1.0 : 0.0
    );

gl.uniform1f(
materialDiffuseLocation,
material.diffuse
);

gl.uniform1f(
materialSpecularLocation,
material.specular
);

gl.uniform1f(
materialShininessLocation,
material.shininess
);

gl.drawArrays(
gl.TRIANGLES,
0,
36
);

}

function drawOutlineCube(position,scaleValues)
{
    gl.cullFace(gl.FRONT);

let outlineAmount;

let maxDim=Math.max(
    scaleValues[0],
    scaleValues[1],
    scaleValues[2]
);

if(maxDim<0.5)
    outlineAmount=0.08;   // small objects
else if(maxDim<1.5)
    outlineAmount=0.05;   // medium objects
else
    outlineAmount=0.03;   // large objects

	drawCube(
    position,
[
    scaleValues[0]+outlineAmount,
    scaleValues[1]+outlineAmount,
    scaleValues[2]+outlineAmount
],
    [0,0,0,1],
    false,
    materials.default,
    true
);

    gl.cullFace(gl.BACK);
}

const keys={};

let mouseLook=false;

function degToRad(degrees)
{
    return degrees*Math.PI/180;
}

document.addEventListener(
'mousemove',
function(event)
{

if(!mouseLook)
{
    return;
}

    if(firstMouse)
    {
        lastX=event.clientX;
        lastY=event.clientY;
        firstMouse=false;
    }

    let xoffset=event.movementX;
let yoffset=-event.movementY;

    let sensitivity=0.1;

    xoffset*=sensitivity;
    yoffset*=sensitivity;

    yaw+=xoffset;
    pitch+=yoffset;

    if(pitch>89)
    {
        pitch=89;
    }

    if(pitch<-89)
    {
        pitch=-89;
    }

    let frontX=Math.cos(degToRad(yaw))*Math.cos(degToRad(pitch));

    let frontY=Math.sin(degToRad(pitch));

    let frontZ=Math.sin(degToRad(yaw))*Math.cos(degToRad(pitch));

    cameraFront=[
        frontX,
        frontY,
        frontZ
    ];

}
);

function drawDoor(x,y,z)
{
    // Door panel
    drawCube(
        [x,y,z],
        [0.6,1.5,0.08],
        [0.45,0.25,0.1,1],
        false,
        materials.wood
    );

    // Left frame
    drawCube(
        [x-0.65,y,z],
        [0.08,1.55,0.10],
        [0.3,0.15,0.05,1]
    );

    // Right frame
    drawCube(
        [x+0.65,y,z],
        [0.08,1.55,0.10],
        [0.3,0.15,0.05,1]
    );

    // Top frame
    drawCube(
        [x,y+1.55,z],
        [0.73,0.08,0.10],
        [0.3,0.15,0.05,1]
    );

    // Doorknob
    drawCube(
        [x+0.45,y-0.1,z+0.09],
        [0.06,0.06,0.06],
        [0.8,0.8,0.2,1],
        false,
        materials.steel
    );
}

function drawBookshelf(position,scale,rotation=0)
{
let x=position[0];
let y=position[1];
let z=position[2];

let sx=scale[0];
let sy=scale[1];
let sz=scale[2];

let width=0.7*sx;
let depth=0.25*sz;

if(rotation===90)
{
    let temp=width;
    width=depth;
    depth=temp;
}

// Left side
drawCube(
[
    x,
    y,
    rotation===0 ? z : z-depth
],
[
rotation===0 ? 0.08*sx : 0.25*sz,
1.2*sy,
rotation===0 ? 0.25*sz : 0.08*sx
],
[0.55,0.35,0.15,1],
false,
materials.wood
);

// Right side
drawCube(
[
    x,
    y,
    rotation===0 ? z : z+depth
],
[
    rotation===0 ? 0.08*sx : 0.25*sz,
    1.2*sy,
    rotation===0 ? 0.25*sz : 0.08*sx
],
[0.55,0.35,0.15,1],
false,
materials.wood
);

// Top
drawCube(
[
rotation===0 ? x : x,
y+1.2*sy,
rotation===0 ? z : z
],
[
rotation===0 ? 0.7*sx : 0.25*sz,
0.08*sy,
rotation===0 ? 0.25*sz : 0.7*sx
],
[0.55,0.35,0.15,1],
false,
materials.wood
);

// Bottom
drawCube(
[
rotation===0 ? x : x,
y-1.2*sy,
rotation===0 ? z : z
],
[
rotation===0 ? 0.7*sx : 0.25*sz,
0.08*sy,
rotation===0 ? 0.25*sz : 0.7*sx
],
[0.55,0.35,0.15,1],
false,
materials.wood
);

// Middle shelf 1
drawCube(
[
    x,
    y+0.4*sy,
    z
],
[
    rotation===0 ? 0.7*sx : 0.25*sz,
    0.06*sy,
    rotation===0 ? 0.25*sz : 0.7*sx
],
[0.55,0.35,0.15,1],
false,
materials.wood
);

// Middle shelf 2
drawCube(
[
    x,
    y-0.4*sy,
    z
],
[
    rotation===0 ? 0.7*sx : 0.25*sz,
    0.06*sy,
    rotation===0 ? 0.25*sz : 0.7*sx
],
[0.55,0.35,0.15,1],
false,
materials.wood
);

}

function drawBook(position,scale,color)
{
drawCube(position,scale,color,false,materials.default);
}

function drawBookshelfUnit(position,scale,rotation) {

let x=position[0];
let y=position[1];
let z=position[2];

let sx=scale[0];
let sy=scale[1];
let sz=scale[2];

drawBookshelf(
        position,
        scale,
        rotation
    );

//red book
drawBook(
[x,y+0.65*sy,z-0.6*sx],
[0.15,0.25,0.07],
[1,0,0,1]
);

//blue book
drawBook(
[x,y+0.71*sy,z-(0.12)-0.48*sx],
[0.15,0.32,0.07],
[0,0,1,1]
);

//green book
drawBook(
[x,y+0.70*sy,z-(0.25)-0.36*sx],
[0.15,0.28,0.07],
[0,1,0,1]
);

//yellow book
drawBook(
[x,y+0.75*sy,z-(0.37)-0.24*sx],
[0.15,0.35,0.07],
[1,1,0,1]
);

// purple book
drawBook(
[x,y+0.73*sy,z-(0.49)-0.12*sx],
[0.15,0.31,0.07],
[0.7,0,1,1]
);

// cyan book
drawBook(
[x,y+0.68*sy,z-(0.61)],
[0.15,0.27,0.07],
[0,1,1,1]
);

// orange book
drawBook(
[x,y+0.76*sy,z-(0.73)+0.12*sx],
[0.15,0.36,0.07],
[1,0.5,0,1]
);

// dark red book
drawBook(
[x,y+0.69*sy,z-(0.85)+0.24*sx],
[0.15,0.29,0.07],
[0.6,0.1,0.1,1]
);

// white book
drawBook(
[x,y+0.72*sy,z-(0.97)+0.36*sx],
[0.15,0.33,0.07],
[0.9,0.9,0.9,1]
);

//top book
drawBook(
[x,y+0.58*sy,z+(1.3)-0.35*sx],
[0.26,0.08,0.16],
[0.8,0.2,0.2,1]
);

//Middle book
drawBook(
[x,y+0.54*sy,z+(1.3)-0.35*sx],
[0.275,0.07,0.20],
[0.2,0.2,0.8,1]
);

//Bottom book
drawBook(
[x,y+0.50*sy,z+(1.3)-0.35*sx],
[0.29,0.06,0.24],
[0.2,0.22,0.2,1]
);

//adding books to middle shelf
z= z + 1.8;
y= y - 1;
//book
drawBook(
[x,y+0.65*sy,z-0.6*sx],
[0.15,0.25,0.07],
[0,1,0,1]
);

//book
drawBook(
[x,y+0.71*sy,z-(0.12)-0.48*sx],
[0.15,0.32,0.07],
[0,0,1,1]
);

//book
drawBook(
[x,y+0.70*sy,z-(0.25)-0.36*sx],
[0.15,0.28,0.07],
[0.7,1,0,1]
);

//book
drawBook(
[x,y+0.75*sy,z-(0.37)-0.24*sx],
[0.15,0.35,0.07],
[0.6,0.4,0,1]
);

// book
drawBook(
[x,y+0.73*sy,z-(0.49)-0.12*sx],
[0.15,0.31,0.07],
[0,0,1,1]
);

// book
drawBook(
[x,y+0.68*sy,z-(0.61)],
[0.15,0.27,0.07],
[0,1,1,1]
);

}

function drawCrate(x,y,z)
{
const e=0.03;

// Wooden body
drawCube(
[x,y,z],
[0.35,0.35,0.35],
[0.40,0.25,0.10,1],
false,
materials.wood
);

// Front steel frame
drawCube(
[x,y+0.35,z+0.35],
[0.35,e,e],
[0.8,0.8,0.85,1],
false,
materials.steel
);

drawCube(
[x,y-0.35,z+0.35],
[0.35,e,e],
[0.8,0.8,0.85,1],
false,
materials.steel
);

drawCube(
[x+0.35,y,z+0.35],
[e,0.35,e],
[0.8,0.8,0.85,1],
false,
materials.steel
);

drawCube(
[x-0.35,y,z+0.35],
[e,0.35,e],
[0.8,0.8,0.85,1],
false,
materials.steel
);

//Right face top
drawCube(
[x+0.35,y+0.35,z],
[e,e,0.35],
[0.8,0.8,0.85,1],
false,
materials.steel
);

//Right face bottom
drawCube(
[x+0.35,y-0.35,z],
[e,e,0.35],
[0.8,0.8,0.85,1],
false,
materials.steel
);

//Right face left vertical
drawCube(
[x+0.35,y,z-0.35],
[e,0.35,e],
[0.8,0.8,0.85,1],
false,
materials.steel
);

//Right face right vertical
drawCube(
[x+0.35,y,z+0.35],
[e,0.35,e],
[0.8,0.8,0.85,1],
false,
materials.steel
);
}

function drawPlant(x,y,z)
{
    // Pot
    drawCube(
    [x,y,z],
    [0.20,0.20,0.18],
    [0.65,0.35,0.15,1]
    );

    // Stem
    drawCube(
    [x,y+0.40,z],
    [0.03,0.40,0.03],
    [0.1,0.6,0.1,1]
    );

    // Left leaf
    drawCube(
    [x-0.04,y+0.60,z],
    [0.04,0.12,0.02],
    [0.2,0.8,0.2,1]
    );

    // Right leaf
    drawCube(
    [x+0.04,y+0.60,z],
    [0.04,0.12,0.02],
    [0.2,0.8,0.2,1]
    );

}

function drawTV(x,y,z)
{
    // Frame
    drawCube(
    [x,y,z],
    [1.4,0.9,0.04],
    [0.9,0.9,0.95,1],
    false,
    materials.steel
    );

    // Screen
    drawCube(
    [x,y,z+0.05],
    [1.3,0.8,0.05],
    [0.02,0.02,0.08,1],
    false,
    materials.default
    );
}

function drawRemote(x,y,z)
{
    drawCube(
    [x,y,z],
    [0.1,0.03,0.25],
    [0.08,0.08,0.08,1],
    false,
    materials.default
    );
//remote buttons
y+= 0.03;
x+= 0.06;
z-= 0.05;
//power red button
    drawCube(
[x,y+0.02,z-0.08],
[0.015,0.005,0.015],
[1,0,0,1]
);

//Front grey button
drawCube(
[x-0.1,y+0.02,z-0.08],
[0.015,0.005,0.015],
[0.5,0.5,0.5,1]
);

//Centre buttons (4 grey)
x+= -0.06;
z-= -0.05;

//Top left:

drawCube(
[x-0.03,y+0.02,z+0.05],
[0.015,0.005,0.015],
[0.5,0.5,0.5,1]
);

//Top right:

drawCube(
[x+0.03,y+0.02,z+0.05],
[0.015,0.005,0.015],
[0.5,0.5,0.5,1]
);

//Bottom left:

drawCube(
[x-0.03,y+0.02,z+0.11],
[0.015,0.005,0.015],
[0.5,0.5,0.5,1]
);

//Bottom right:

drawCube(
[x+0.03,y+0.02,z+0.11],
[0.015,0.005,0.015],
[0.5,0.5,0.5,1]
);

}

function drawSofa(x,y,z,s=1.5)
{
    // Seat
    drawCube(
    [x,y,z],
    [0.45*s,0.20*s,1.0*s],
    [0.25,0.25,0.30,1],
    false,
    materials.default
    );

    // Backrest
    drawCube(
    [x+0.35*s,y+0.50*s,z],
    [0.10*s,0.35*s,1.0*s],
    [0.22,0.22,0.28,1],
    false,
    materials.default
    );

    // Front armrest
    drawCube(
    [x,y+0.15*s,z-0.90*s],
    [0.45*s,0.35*s,0.10*s],
    [0.22,0.22,0.28,1],
    false,
    materials.default
    );

    // Back armrest
    drawCube(
    [x,y+0.15*s,z+0.90*s],
    [0.45*s,0.35*s,0.10*s],
    [0.22,0.22,0.28,1],
    false,
    materials.default
    );

    // Left cushion
    drawCube(
    [x,y+0.12*s,z-0.45*s],
    [0.40*s,0.10*s,0.40*s],
    [0.35,0.35,0.42,1]
    );

    // Right cushion
    drawCube(
    [x,y+0.12*s,z+0.45*s],
    [0.40*s,0.10*s,0.40*s],
    [0.35,0.35,0.42,1]
    );
}

function drawTable(x,y,z,s=1.0)
{
    // Table top

    gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture(
    gl.TEXTURE_2D,
    texture
    );

    gl.uniform1i(
    textureLocation,
    0
    );

    drawCube(
    [x,y,z],
    [1.2*s,0.15*s,0.8*s],
    [1,1,1,1],
    true,
    materials.default
    );

    // Table legs

    gl.activeTexture(gl.TEXTURE1);

    gl.bindTexture(
    gl.TEXTURE_2D,
    legTexture
    );

    gl.uniform1i(
    textureLocation,
    1
    );

    drawCube(
    [x-0.9*s,y-0.8*s,z-0.5*s],
    [0.12*s,0.8*s,0.12*s],
    [1,1,1,1],
    true,
    materials.default
    );

    drawCube(
    [x+0.9*s,y-0.8*s,z-0.5*s],
    [0.12*s,0.8*s,0.12*s],
    [1,1,1,1],
    true,
    materials.default
    );

    drawCube(
    [x-0.9*s,y-0.8*s,z+0.5*s],
    [0.12*s,0.8*s,0.12*s],
    [1,1,1,1],
    true,
    materials.default
    );

    drawCube(
    [x+0.9*s,y-0.8*s,z+0.5*s],
    [0.12*s,0.8*s,0.12*s],
    [1,1,1,1],
    true,
    materials.default
    );
}

function drawLaptopSetup(x,y,z,s=1.0)
{
    // Screen frame
    drawCube(
    [x,y+0.2,z],
    [0.45*s,0.30*s,0.03*s],
    [0.8,0.8,0.85,1]
    );

    // Screen
    drawCube(
    [x,y+0.2,z+0.04*s],
    [0.40*s,0.25*s,0.01*s],
    [0.02,0.02,0.08,1]
    );

    // Stand
    drawCube(
    [x,y-0.25*s,z],
    [0.03*s,0.20*s,0.03*s],
    [0.2,0.2,0.2,1]
    );

    // Base
    drawCube(
    [x,y-0.38*s,z],
    [0.15*s,0.02*s,0.10*s],
    [0.2,0.2,0.2,1]
    );

// Keyboard
drawCube(
[x,y-0.38*s,z+0.30*s],
[0.29*s,0.04*s,0.14*s],
[0.08,0.08,0.08,1]
);

// Mouse
drawCube(
[x+0.39*s,y-0.38*s,z+0.30*s],
[0.06*s,0.03*s,0.07*s],
[0.1,0.1,0.1,1]
);
}

function drawClock(x,y,z,s=1.0)
{
//black outline:
drawCube(
    [x,y,z-0.03],
    [0.30*s,0.30*s,0.03*s],
    [0,0,0,1]
    );

    // Clock body
    drawCube(
    [x,y,z],
    [0.25*s,0.25*s,0.03*s],
    [0.95,0.95,0.95,1]
    );

    // Center hub
    drawCube(
    [x,y,z+0.05*s],
    [0.01*s,0.01*s,0.01*s],
    [0,0,0,1]
    );

    // Hour hand
    drawCube(
    [x,y+0.06*s,z+0.05*s],
    [0.01*s,0.05*s,0.005*s],
    [0,0,0,1]
    );

    // Minute hand
    drawCube(
    [x+0.07*s,y,z+0.05*s],
    [0.065*s,0.01*s,0.005*s],
    [0,0,0,1]
    );

    // 12 marker
    drawCube(
    [x,y+0.18*s,z+0.05*s],
    [0.01*s,0.02*s,0.005*s],
    [0,0,0,1]
    );

    // 3 marker
    drawCube(
    [x+0.18*s,y,z+0.05*s],
    [0.02*s,0.01*s,0.005*s],
    [0,0,0,1]
    );

    // 6 marker
    drawCube(
    [x,y-0.18*s,z+0.05*s],
    [0.01*s,0.02*s,0.005*s],
    [0,0,0,1]
    );

    // 9 marker
    drawCube(
    [x-0.18*s,y,z+0.05*s],
    [0.02*s,0.01*s,0.005*s],
    [0,0,0,1]
    );
}

document.addEventListener(
'keydown',
function(event)
{
    let key=event.key.toLowerCase();

    keys[key]=true;

if(key==='t')
{
    toonMode=!toonMode;
}

    if(key==='l')
    {
        lightOn=!lightOn;
    }

});

let qpressed = false;

document.addEventListener(
'keypress',
function(event)
{
let key=event.key.toLowerCase();

  if(key==='q')
{
    qpressed=!qpressed;

if (qpressed) { canvas.requestPointerLock(); }
if (!qpressed) { document.exitPointerLock(); }
}

}
);

document.addEventListener(
'keyup',
function(event)
{
    keys[event.key.toLowerCase()]=false;

});

document.addEventListener(
'pointerlockchange',
function()
{
    mouseLook=document.pointerLockElement===canvas;
}
);

function lookAt(eye,target,up)
{

let zx=eye[0]-target[0];
let zy=eye[1]-target[1];
let zz=eye[2]-target[2];

let zLength=Math.hypot(zx,zy,zz);

if(zLength===0)
{
    zLength=0.0001;
}

zx/=zLength;
zy/=zLength;
zz/=zLength;

let xx=up[1]*zz-up[2]*zy;
let xy=up[2]*zx-up[0]*zz;
let xz=up[0]*zy-up[1]*zx;

let xLength=Math.hypot(xx,xy,xz);

xx/=xLength;
xy/=xLength;
xz/=xLength;

let yx=zy*xz-zz*xy;
let yy=zz*xx-zx*xz;
let yz=zx*xy-zy*xx;

return [

xx,yx,zx,0,
xy,yy,zy,0,
xz,yz,zz,0,

-(xx*eye[0]+xy*eye[1]+xz*eye[2]),
-(yx*eye[0]+yy*eye[1]+yz*eye[2]),
-(zx*eye[0]+zy*eye[1]+zz*eye[2]),
1

];

}

// =====================
// Render loop
// =====================

function render()
{
gl.uniform1f(
toonModeLocation,
toonMode ? 1.0 : 0.0
);

gl.uniform1f(
isLightSourceLocation,
0.0
);

gl.uniform1f(
lightOnLocation,
lightOn ? 1.0 : 0.0
);

gl.uniform1f(
materialDiffuseLocation,
1.0
);

gl.uniform1f(
materialSpecularLocation,
1.0
);

gl.uniform1f(
materialShininessLocation,
32.0
);

gl.uniform3fv(
lightPosLocation,
new Float32Array(
[0.0,1.2,1]
)
);

gl.uniform3fv(
viewPosLocation,
new Float32Array(
[
cameraX,
cameraY,
cameraZ
]
)
);

gl.clearColor(
0.1,
0.1,
0.15,
1
);

gl.clear(
gl.COLOR_BUFFER_BIT|
gl.DEPTH_BUFFER_BIT
);

let brightness=
lightOn ? 1.0 : 0.25;

gl.uniform1f(
brightnessLocation,
brightness
);


let speed=0.08;

if(keys['w'])
{
    cameraX+=cameraFront[0]*speed;
    cameraY+=cameraFront[1]*speed;
    cameraZ+=cameraFront[2]*speed;
}

if(keys['s'])
{
    cameraX-=cameraFront[0]*speed;
    cameraY-=cameraFront[1]*speed;
    cameraZ-=cameraFront[2]*speed;
}

if(keys['a'])
{
    cameraX+=cameraFront[2]*speed;
    cameraZ-=cameraFront[0]*speed;
}

if(keys['d'])
{
    cameraX-=cameraFront[2]*speed;
    cameraZ+=cameraFront[0]*speed;
}

const cameraTarget=[

cameraX+cameraFront[0],
cameraY+cameraFront[1],
cameraZ+cameraFront[2]

];

const viewMatrix=lookAt(

[cameraX,cameraY,cameraZ],

cameraTarget,

[0,1,0]

);

//console.log(viewMatrix);

gl.uniformMatrix4fv(
viewLocation,
false,
new Float32Array(viewMatrix)
);

gl.activeTexture(gl.TEXTURE4);

gl.bindTexture(
    gl.TEXTURE_CUBE_MAP,
    cubeMapTexture
);

gl.uniform1i(
    cubeMapLocation,
    4
);

gl.activeTexture(
gl.TEXTURE3
);

gl.bindTexture(
gl.TEXTURE_2D,
carpetTexture
);

gl.uniform1i(
textureLocation,
3
);

//floor
drawCube(
[0,-2,0],
[6,0.2,7.5],
[1,1,1,1],
true,
materials.default
);

// Ceiling
drawCube(
[0,3,0],
[6,0.2,7.5],
[0.2,0.2,0.2,1]
);


gl.activeTexture(
gl.TEXTURE2
);

gl.bindTexture(
gl.TEXTURE_2D,
wallTexture
);

gl.uniform1i(
textureLocation,
2
);


// Left wall
drawCube(
[-6,0.5,0],
[0.2,3,7.5],
[1,1,1,1],
true
);

// Right wall
drawCube(
[6,0.5,0],
[0.2,3,7.5],
[1,1,1,1],
true
);

// Back wall
drawCube(
[0,0.5,-5],
[6,3,0.2],
[1,1,1,1],
true
);

gl.uniform1f(
isLightSourceLocation,
1.0
);

//light cube
drawCube(
[0.0,1.9,1],
[0.22,0.22,0.22],

lightOn ?
[1,1,1,1] :
[0.3,0.3,0.3,1]
);

gl.uniform1f(
isLightSourceLocation,
0.0
);


// Light holder/stem

drawCube(
[0,2.5,1],
[0.04,0.4,0.04],
[0.6,0.6,0.6,1],
false,
materials.default
);


// Shelf
drawCube(
[2,0,-4.2],
[1.7,0.15,0.5],
[0.6,0.4,0.2,1],
false,
materials.default
);

gl.uniform1f(reflectiveObjectLocation,1.0);

//cubemap for environment shading:
//drawCube(
//[0,0.5,3],
//[0.35,0.35,0.35],
//[0.9,0.9,0.9,1],
//materials.default
//);

gl.uniform1f(reflectiveObjectLocation,0.0);


drawDoor(
-4.5,
-0.4,
-4.75
);

drawBookshelfUnit(
[-5.5,-0.32,1.5],
[2.2,1.2,1.2],
90
);

drawCrate(
-5.3,
1.6,
0.7
);

drawPlant(
-5.5,
1.4,
2.1
);

drawTV(
2,
1.5,
-4.6
);

//draw tv wire
drawCube(
[1.5,0.7,-4.6],
[0.03,0.8,0.01],
[0.05,0.05,0.05,1]
);

drawRemote(
2.25,
0.22,
-4.2
);

drawSofa(
5.1,
-1.6,
0.5
);

drawTable(
0,
-1,
0.8,
1.5
);

drawLaptopSetup(
-1,
-0.30,
0.4,
1.2
);

drawClock(
-2.5,
1.5,
-4.7,
2
);

requestAnimationFrame(
render
);

}

render();