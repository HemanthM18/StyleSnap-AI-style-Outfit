export function getDominantColorFromImage(imgElement) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width = imgElement.naturalWidth || imgElement.width;
  const height = canvas.height = imgElement.naturalHeight || imgElement.height;
  const ratio = Math.min(200 / width, 200 / height, 1);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const counts = {};
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2];
    const key = `${Math.round(r/16)*16},${Math.round(g/16)*16},${Math.round(b/16)*16}`;
    counts[key] = (counts[key] || 0) + 1;
  }
  let max = 0, dominant = null;
  Object.keys(counts).forEach(k => {
    if (counts[k] > max) { max = counts[k]; dominant = k; }
  });
  if (!dominant) return '#000000';
  const [r,g,b] = dominant.split(',').map(n => +n);
  return rgbToHex(r,g,b);
}

function rgbToHex(r,g,b) {
  const toHex = n => ('0' + n.toString(16)).slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
