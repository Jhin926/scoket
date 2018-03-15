var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var cp = require('child_process');

app.listen(8088);
cp.exec('start http://localhost:8088');



function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  let num = 0;
  setInterval(() => {
	num++;
    socket.emit('news', {
	  msg: `这是第${num}次推送消息`,
	  idx: num
	});
  }, 3000);
  socket.on('temporary msg', function (data) {
    socket.emit('news', {
	  msg: `这是临时的推送消息`,
	  frontMsg: JSON.stringify(data)
	});
  });
});