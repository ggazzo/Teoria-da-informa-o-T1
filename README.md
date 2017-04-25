# Teoria da informação T1
## first
```bash
git clone https://github.com/ggazzo/Teoria-da-informa-o-T1.git
cd Teoria-da-informa-o-T1
npm install
```
### to encode
```bash
node encode.js
//or 
node encode.js file=./somefile.txt out=./somefile.out
```

### to decode
```bash
node decode.js
//or 
node decode.js file=./somefile.out out=./decoded.txt
```

### to check
```bash
md5sum alice29.txt alice29_decoded.txt 
```
### a proposta
primeiro utilizando o algoritmo de burrows-wheeler para aumentar as repetições dos caracteres
depois utilizar a tecnica de move to front, e por final a tecnica lzw para compactar o texto.
a primeira linha do arquivo recebe um cabeçalho com os dados gerados pela duas técnicas de ordenação e o resto do arquivo é o dado comprimido.

### testes 

```
# MTF + LZW
➜  alice git:(master) ✗ node encode.js
tamanho inicial: 148482
tamanho compactado: 118912
taxa de compressão 19.914871836316863%

# 
➜  alice git:(master) ✗ node encode.js
tamanho inicial: 148482
tamanho compactado: 86640
taxa de compressão 41.64949286782236%

# burrows-wheeler + LZW 
➜  alice git:(master) ✗ node encode.js
tamanho inicial: 148482
tamanho compactado: 86640
taxa de compressão 41.64949286782236%

# LZW
➜  alice git:(master) ✗ node encode.js
tamanho inicial: 148482
tamanho compactado: 69476
taxa de compressão 53.209143195808245%

# MTF + burrows-wheeler + LZW
➜  alice git:(master) ✗ node encode.js
tamanho inicial: 148482
tamanho compactado: 119358
taxa de compressão 19.614498727118445%

# burrows-wheeler + MTF + LZW
➜  alice git:(master) ✗ node encode.js
tamanho inicial: 148482
tamanho compactado: 62414
taxa de compressão 57.96527525221912%

```


### limitações
arquivos grandes, estouram o dicionario de 2 bytes da LZW.
