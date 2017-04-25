const {params, ibwt, mtf_decode, lzw_decode} = require('./utils')
const fs = require('fs')
const {file, out} = Object.assign({
  file: "./alice29.out",
  out: './alice29_decoded.txt'
}, params);

fs.readFile(file, 'ucs2', function (err, data) {
  const [start, eof, ...tmp] = data.substr(0, data.indexOf('\n')).split(',')
  const mtf =  tmp.map(v => parseInt(v))
  const text = data.substr(data.indexOf('\n') + 1)
  const decodedLzw = lzw_decode(text)
  const [decodedMTF] = mtf_decode(decodedLzw, mtf)
  const decoded = ibwt({start: parseInt(start), eof: parseInt(eof) , data: decodedMTF}).map(v => String.fromCharCode(v));
  fs.writeFile(out, decoded.join(''), 'utf-8', function (err) {})
});
