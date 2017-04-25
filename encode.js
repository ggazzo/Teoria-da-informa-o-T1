const fs = require('fs')
const {params, bwt, mtf_encode, lzw_encode} = require('./utils')
const {ibwt, mtf_decode, lzw_decode} = require('./utils')
// const decode = require('./decode').fn;
// console.log(decode);
const {file, out, debug} = Object.assign({
  file: "./alice29.txt",
  out: './alice29.out'
}, params);
fs.readFile(file, function (err, text) {
  if (err) {
    return console.log(err);
  }
  const initSize = text.length;
  if(debug) {
    console.log(initSize);
  }
  const {start, eof, data} = bwt(text);
  if(debug) {
    console.log(data.length);
  }
  const [codedMtf, mtf] = mtf_encode(data);
  if(debug) {
    console.log(codedMtf.length);
  }
  const final = lzw_encode(codedMtf)

  fs.writeFile(out, `${start},${eof},${mtf}\n${final}`, 'ucs2', function (err) {
    if (err) return console.log(err);
    console.log("tamanho inicial:", initSize);
    console.log("tamanho compactado:", final.length * 2)
    console.log(`taxa de compressão ${100 - 2*final.length*100 / initSize }%`);
  });
});
