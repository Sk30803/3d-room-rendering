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


// =====================
// Cube vertices
// =====================

const cubeVertices=[

-1,-1,1,
1,-1,1,
1,1,1,

-1,-1,1,
1,1,1,
-1,1,1,

-1,-1,-1,
-1,1,-1,
1,1,-1,

-1,-1,-1,
1,1,-1,
1,-1,-1,

-1,1,-1,
-1,1,1,
1,1,1,

-1,1,-1,
1,1,1,
1,1,-1,

-1,-1,-1,
1,-1,-1,
1,-1,1,

-1,-1,-1,
1,-1,1,
-1,-1,1,

1,-1,-1,
1,1,-1,
1,1,1,

1,-1,-1,
1,1,1,
1,-1,1,

-1,-1,-1,
-1,-1,1,
-1,1,1,

-1,-1,-1,
-1,1,1,
-1,1,-1

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
0,
0
);

gl.enableVertexAttribArray(
positionLocation
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

// Camera

let cameraX=0;
let cameraY=-0.5;
let cameraZ=-6;

// Perspective matrix

const projection=[

1,0,0,0,
0,1,0,0,
0,0,-1,-1,
0,0,-0.2,0

];

gl.uniformMatrix4fv(
projectionLocation,
false,
new Float32Array(projection)
);


// =====================
// Draw object
// =====================

function drawCube(position,scaleValues,color)
{

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

gl.drawArrays(
gl.TRIANGLES,
0,
36
);

}

const keys={};

document.addEventListener(
'keydown',
function(event)
{
    let key=event.key.toLowerCase();

    keys[key]=true;

    if(key==='l')
    {
        lightOn=!lightOn;
    }
});


document.addEventListener(
'keyup',
function(event)
{
    keys[event.key.toLowerCase()]=false;
});

// =====================
// Render loop
// =====================

function render()
{

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


let speed=0.05;

if(keys['w'])
{
    cameraZ+=speed;
}

if(keys['s'])
{
    cameraZ-=speed;
}

if(keys['a'])
{
    cameraX+=speed;
}

if(keys['d'])
{
    cameraX-=speed;
}

const viewMatrix=[

1,0,0,0,
0,1,0,0,
0,0,1,0,
cameraX,
cameraY,
cameraZ,
1

];

gl.uniformMatrix4fv(
viewLocation,
false,
new Float32Array(viewMatrix)
);


// Floor
drawCube(
[0,-2,0],
[6,0.2,6],
[0.6,0.6,0.6,1]
);


// Ceiling
drawCube(
[0,2,0],
[6,0.2,6],
[0.2,0.2,0.2,1]
);


// Left wall
drawCube(
[-3,0,0],
[0.2,4,6],
[0.8,0.3,0.3,1]
);


// Right wall
drawCube(
[3,0,0],
[0.2,4,6],
[0.3,0.3,0.8,1]
);


// Back wall
drawCube(
[0,0,-3],
[6,4,0.2],
[0.5,0.5,0.7,1]
);

// Table top

drawCube(
[0,-1,0.8],
[1.2,0.15,0.8],
[0.2,0.7,0.2,1]
);


// Table legs

drawCube(
[-0.9,-1.8,0.3],
[0.12,0.8,0.12],
[0.4,0.2,0.1,1]
);

drawCube(
[0.9,-1.8,0.3],
[0.12,0.8,0.12],
[0.4,0.2,0.1,1]
);

drawCube(
[-0.9,-1.8,1.3],
[0.12,0.8,0.12],
[0.4,0.2,0.1,1]
);

drawCube(
[0.9,-1.8,1.3],
[0.12,0.8,0.12],
[0.4,0.2,0.1,1]
);


//Chair Seat 

drawCube(
[-2.3,-1.15,1.2],
[0.22,0.08,0.22],
[0.7,0.4,0.2,1]
);


//Chair Back

drawCube(
[-2.3,-0.75,1.12],
[0.22,0.50,0.06],
[0.7,0.4,0.2,1]
);


//Chair Legs 

drawCube(
[-2.40,-1.85,1.10],
[0.05,0.65,0.05],
[0.4,0.2,0.1,1]
);

drawCube(
[-2.20,-1.85,1.10],
[0.05,0.65,0.05],
[0.4,0.2,0.1,1]
);

drawCube(
[-2.40,-1.85,1.30],
[0.05,0.65,0.05],
[0.4,0.2,0.1,1]
);

drawCube(
[-2.20,-1.85,1.30],
[0.05,0.65,0.05],
[0.4,0.2,0.1,1]
);

// Light bulb cube

drawCube(
[0,1.5,1],
[0.15,0.15,0.15],

lightOn ?
[1,1,0,1] :
[0.3,0.3,0,1]

);


// Light holder/stem

drawCube(
[0,1.90,1],
[0.04,0.25,0.04],
[0.6,0.6,0.6,1]
);


// Shelf
drawCube(
[2,0,-2.5],
[1.5,0.15,0.5],
[0.6,0.4,0.2,1]
);


// Decorative cube / plant pot
// Pot (narrower + taller)

drawCube(
[2,0.25,-2.5],
[0.10,0.25,0.10],
[0.65,0.35,0.15,1]
);


// Plant stem (thin + tall)

drawCube(
[2,0.65,-2.5],
[0.03,0.40,0.03],
[0.1,0.6,0.1,1]
);


// Left leaf

drawCube(
[1.96,0.85,-2.5],
[0.04,0.12,0.02],
[0.2,0.8,0.2,1]
);


// Right leaf

drawCube(
[2.04,0.85,-2.5],
[0.04,0.12,0.02],
[0.2,0.8,0.2,1]
);


requestAnimationFrame(
render
);

}

render();