const multer = require('multer');

// ファイル名を変更して保存
function single() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  // const upload = multer({ dest: 'uploads/' })
  const upload = multer({ storage: storage });
  return upload.single('file');
}

module.exports = {single}