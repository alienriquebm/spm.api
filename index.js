const http = require('http');
const colors = require('colors');

http.createServer((req, res) => {
  res.write('Hola mundo');
  res.end();
}).listen(80);

console.log(colors.rainbow('Listen port 80'));
