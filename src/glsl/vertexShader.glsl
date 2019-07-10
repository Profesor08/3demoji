varying vec2 vUv;
varying vec3 vecPos;
varying vec3 v_position;
uniform float time;
uniform float blend;
uniform sampler2D original;
uniform sampler2D target;
void main() {
  vUv = uv;
  v_position = position.xyz;
  float roundblend = sin(3.1415926*blend);
  float stepblend = clamp( 2.*(v_position.x + v_position.y) +3.*blend - 1., 0.,1.);
  float originalR = texture2D(original,vUv).r;
  float targetR = texture2D(target,vUv).r;
  v_position.z = 0.2* mix(originalR,targetR,stepblend) + roundblend*0.1*sin(v_position.x*10. + time/100.);
  
  v_position.x = position.x + roundblend*0.1*sin(v_position.y +v_position.x + blend);
  v_position.y = position.y + roundblend*0.1*sin(v_position.y +v_position.x + blend);
  vecPos = (modelViewMatrix * vec4(v_position, 1.0)).xyz;
  gl_Position = projectionMatrix * vec4(vecPos, 1.0);
}