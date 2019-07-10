import * as THREE from "three";

export function getTextureFromEmoji(emoji: string) {
  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");

  canvas.width = 256;
  canvas.height = 256;

  ctx.font = "180px serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);

  texture.needsUpdate = true;

  return texture;
}

export function getRandomEmojiTexture(emojiArray: string[]) {
  return getTextureFromEmoji(
    emojiArray[Math.floor(Math.random() * emojiArray.length - 1)],
  );
}
