// eslint-disable-next-line
const wookieMap: any = {
  a: "ra",
  b: "rh",
  c: "oa",
  d: "wa",
  e: "wo",
  f: "ww",
  g: "rr",
  h: "ac",
  i: "ah",
  j: "sh",
  k: "or",
  l: "an",
  m: "sc",
  n: "wh",
  o: "oo",
  p: "ak",
  q: "rq",
  r: "rc",
  s: "c",
  t: "ao",
  u: "hu",
  v: "ho",
  w: "oh",
  x: "k",
  y: "ro",
  z: "uf",
};

export function toShyriiwook(text: string): string {
  let translatedText: string = text;
  const translatedTextArr: Array<string> = text.split("").map((v: string) => {
    const origChar: string = wookieMap[v.toLowerCase()];
    let tChar: string = !origChar ? v : origChar;
    // tChar = (!!origChar && v === v.toUpperCase()) ? _.startCase(tChar) : tChar;
    // Proper names mantain the original character
    tChar = !!origChar && v === v.toUpperCase() ? v : tChar;

    return tChar;
  });

  translatedText = translatedTextArr.join("");
  translatedText = translatedText.replace(/<rhrc>/g, "<br>");

  return translatedText;
}
