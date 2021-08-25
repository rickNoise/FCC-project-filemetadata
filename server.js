var express = require('express');
var cors = require('cors');
require('dotenv').config()

/* Multer is a node.js middleware for handling multipart/form-data, 
which is primarily used for uploading files. 
https://github.com/expressjs/multer */
const multer = require('multer');
const upload = multer({ dest: 'user_uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

/***** Start of Exercises *****/

/* 
You can submit a form that includes a file upload.

The form file input field has the name attribute set to upfile.

When you submit a file, you receive the file name, type, and size in bytes within the JSON response. 
*/

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  // req.file is the `upfile` file
  // req.body will hold the text fields, if there were any
  console.log('req.file: ', req.file);
  console.log('req.file.originalname : ', req.file.originalname);
  console.log('req.file.mimetype : ', req.file.mimetype);
  console.log('req.file.size : ', req.file.size);

  res.send({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
  next();
})


/***** End of Exercises *****/

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
