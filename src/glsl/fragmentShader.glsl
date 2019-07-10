varying vec3 v_position;
varying vec2 vUv;
uniform sampler2D original;
uniform sampler2D target;
uniform float blend;
void main(void) {
  
	vec2 st = v_position.xy;
	float koef = clamp(v_position.z/60.,0.,1.);
	vec3 color1 = vec3(1.,1.,1.);
	vec3 color2 = vec3(1.,0.,0.);
	vec3 color3 = mix(color1,color2,koef);
	vec2 grid = abs(fract(500.*st/4. - 0.5) - 0.5) / fwidth(500.*st/4.);
  	float color = min(grid.x, grid.y);
  	gl_FragColor = vec4(color3,1. - color);
  	gl_FragColor = vec4(1.,0.,0.,1.);
  	float stepblend = clamp(v_position.x + v_position.y +3.*blend - 1., 0.,1.);
  	vec4 originalC = texture2D(original,vUv);
  	vec4 targetC = texture2D(target,vUv);
  	vec4 result = originalC*(1. - stepblend) + targetC*stepblend;
  	gl_FragColor = result*(1. - color);
}