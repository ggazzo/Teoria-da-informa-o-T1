const {bwt, ibwt} = require('burrows-wheeler-transform');
const params = process.argv.slice(2).reduce((obj, val) => {
  const [key, value] = val.split('=')
  obj[key]= value
  return obj;
}, {});


function mtf_decode(text, mtf){
  return [[...text].map(c => {
    const i = parseInt(c);
    const ret = mtf[i];
    // console.log(i, ret);
    if(typeof i != 'undefined' && ret){
      mtf.splice(i, 1);
      mtf.unshift(ret);
    }

    return ret;
  }), mtf];
}

function range(start,stop) {
  var result=[];
  for (var idx=start.charCodeAt(0),end=stop.charCodeAt(0); idx <=end; ++idx){
    result.push(String.fromCharCode(idx));
  }
  return result;
};

function mtf_encode(text) {
  const set = new Set();
  const data = [...text];
  data.forEach(d => {
    set.add(d);
  });
  let mtf = Array.from(set).sort();
  // console.log(mtf);
  let coded = data.map(c => {
    const index = mtf.indexOf(c);
    const [el] = mtf.splice(index,1);
    mtf.unshift(el);
    return index;
  })
  return [coded, mtf.sort()];
}
// LZW-compress a string
function lzw_encode(s) {
    // s = s.join("")
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    console.log(code);
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}
// Decompress an LZW-encoded string
function lzw_decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    console.log(code)
    return out.join("").split(',').map(v => parseInt(v));
}

module.exports = {params, bwt, ibwt, lzw_encode, lzw_decode, mtf_encode, mtf_decode};
