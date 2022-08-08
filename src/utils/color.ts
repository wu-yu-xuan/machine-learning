const colorArray = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"];

export default function getColorByIndex(index?: number) {
  if (typeof index !== "number") {
    return "#000";
  }
  const res = colorArray[index];
  if (res) {
    return res;
  }
  colorArray[index] = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)})`;
  return colorArray[index];
}
