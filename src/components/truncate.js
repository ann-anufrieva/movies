
export default function truncate(str) {
  const text = str.slice(0, 100);
  const a = text.split(" ");
  if (a.length > 10) {
    a.splice(a.length - 1, 1);
  } else {
    return text;
  }
  const res = a.join(" ");
  return `${res}...`;
}