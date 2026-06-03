const vertexShaderSource=`

attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 vFragPos;

void main()
{
    vNormal=aNormal;
    vFragPos=(uModel*vec4(aPosition,1.0)).xyz;

    gl_Position=
    uProjection *
    uView *
    uModel *
    vec4(aPosition,1.0);

    vTexCoord=aTexCoord;
}
`;

const fragmentShaderSource=`

precision mediump float;

uniform vec4 uColor;
uniform float brightness;

uniform sampler2D uTexture;
uniform float useTexture;
uniform vec3 lightPos;
uniform vec3 spotLightPos;
uniform vec3 lightColor;
uniform float lightOn;
uniform float isLightSource;
uniform vec3 viewPos;
uniform float toonMode;
uniform float reflectiveObject;
uniform samplerCube uCubeMap;
uniform float materialDiffuse;
uniform float materialSpecular;
uniform float materialShininess;

uniform float spotlightOn;
uniform vec3 spotDirection;
uniform float spotCutoff;

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 vFragPos;

void main()
{
    vec4 baseColor=uColor;

if(useTexture>0.5)
{
    baseColor=
    texture2D(
        uTexture,
        vTexCoord
    );
}

vec3 norm=normalize(vNormal);

vec3 activeLightPos=
(spotlightOn>0.5)
?
spotLightPos
:
lightPos;

vec3 lightDir=
normalize(
activeLightPos-vFragPos
);

float spotFactor=
dot(
    normalize(-lightDir),
    normalize(spotDirection)
);

float diff=
max(
dot(norm,lightDir),
0.0
);

if(spotlightOn>0.5)
{
    if(spotFactor<spotCutoff)
    {
        diff=0.0;
    }
}

vec3 viewDir=
normalize(
viewPos-vFragPos
);

vec3 reflectDir=
reflect(
-viewDir,
norm
);

vec3 specReflectDir=
reflect(
-lightDir,
norm
);

vec4 envColor=
textureCube(
uCubeMap,
reflectDir
);

if(reflectiveObject>0.5)
{
    baseColor=envColor;
}

float spec=
pow(
    max(dot(viewDir,specReflectDir),0.0),
    materialShininess
);

if(spotlightOn>0.5)
{
    if(spotFactor<spotCutoff)
    {
        spec=0.0;
    }
}

float distance=
length(
lightPos-vFragPos
);

float attenuation=
1.0/
(1.0+0.35*distance+0.12*distance*distance);

if(lightOn<0.5) {  diff=0.0;  spec=0.0;  }  //if light off, then there should be no diffuse and specular effect

diff*=attenuation*materialDiffuse;
spec*=attenuation*materialSpecular;

float ambient=0.35;

if(toonMode>0.5)
{
    if(diff>0.65)
        diff=1.0;
    else if(diff>0.3)
        diff=0.6;
    else if(diff>0.15)
        diff=0.3;
    else
        diff=0.1;

    spec=0.0;
}

float lighting= ambient+ (diff*1.9)+ (spec*1.2);

vec4 finalColor;

if(isLightSource>0.5)
{
    finalColor=baseColor;
}
else
{
    if(spotlightOn>0.5)
    {
        finalColor=
        vec4(
            baseColor.rgb*ambient +
            baseColor.rgb*lightColor*((diff*1.9)+(spec*1.2)),
            baseColor.a
        );
    }
    else
    {
        finalColor=
vec4(
    baseColor.rgb *
    lightColor *
    lighting,
    baseColor.a
);
    }
}

gl_FragColor =
vec4(
    finalColor.rgb * brightness,
    finalColor.a
);
}
`;