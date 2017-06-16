let http = require('http');
let fs = require('fs');
let url = require('url');
function readBooks(callBack) {
  fs.readFile('./books.json', 'utf8', function (err, data) {
    if (err || data.length === 0) {
      data = '[]'
    }
    callBack(JSON.parse(data));
  })
}
function writeBooks(data, callBack) {
  fs.writeFile('./books.json', JSON.stringify(data), callBack);
}

http.createServer(function (req, res) {
  var {pathname, query} = url.parse(req.url, true);  //{id:1}
  if (pathname === '/rook') {
    var id = query.id;
    console.log(id)
    switch (req.method) {
      case 'GET':
        if (id) {
          // console.log('id')  1
          readBooks(function (data) {
            var book = data.find(item => item.id == id);
            // console.log(book)  undefined
            res.end(JSON.stringify(book))

          })
        } else {
          console.log(3)
          readBooks(function (data) {
            res.end(JSON.stringify(data));
          });
        }
        break;
      case 'POST':
        var str = '';
        req.on('data', function (data) {
          str += data;
        });
        req.on('end', function () {
          var book = JSON.parse(str);
          readBooks(function (books) {
            console.log(3);
            book.id = books.length ? books[books.length - 1].id + 1 : 1;
            books.push(book);
            writeBooks(books, function () {
              console.log(3)
              res.end(JSON.stringify(book));
            })
          })
        });

        break;
      case 'PUT':
        var str = '';
        req.on('data', function (data) {
          str += data;
        });
        req.on('end', function () {
          let book = JSON.parse(str);
          readBooks(function (books) {
            books = books.map(item => {
              if (item.id == id) {
                return book;
              } else {
                return item;
              }
            });
            writeBooks(books, function () {
              res.end(JSON.stringify(books))
            })
          })
        });

        break;
      case 'DELETE':
        readBooks(function (books) {
          books = books.filter(item => item.id != id);
          writeBooks(books, function () {
            res.end(JSON.stringify({}));
          })
        });
        break;
    }
  } else {
    res.statusCode = 404;
    res.end('我操')
  }


}).listen(4500, function () {
  console.log('4500');
});

