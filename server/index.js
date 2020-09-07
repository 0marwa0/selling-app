const experss = require("express");
const app = experss();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const uuidv4 = require("uuidv4");
const fileUpload = require("express-fileupload");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "itemappdata",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("data base contencted");
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4 + "-" + fileName);
  },
});
const DIR = "./public/";
var upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   if (
  //     file.mimetype == "image/png" ||
  //     file.mimetype == "image/jpg" ||
  //     file.mimetype == "image/jpeg"
  //   ) {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  //   }
  // },
}).array("images", 5);
var uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride(`_method`));
app.listen(9000, () => {
  console.log("working on 9000 port");
});

// POST REQUEST

app.use("/public", experss.static("public"));

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

app.get("/getPosts/:key", (req, res) => {
  let sql = `SELECT * FROM posts WHERE address like "${req.params.key}%"`;

  db.query(sql, (err, result) => {
    if (!err) {
      res.send(result);
    }
  });
});
app.post("/additem", (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  upload(req, res, (err) => {
    if (err) return res.send(err);
    else {
      let sql =
        "INSERT INTO `posts` (`id`, `address`, `images`, `likes`, `comments`, `uid`,`price`)VALUES (NULL, ?,?,?,?,?,?)";

      let images = req.files
        .map((item) => `${url}/public/${item.filename}`)
        .toString()
        .split(",")
        .toString();

      let data = [
        req.body.address,
        `${images}`,
        req.body.likes,
        req.body.comments,
        req.body.uid,
        req.body.price,
      ];
      db.query(sql, data, (err, result) => {
        if (err) {
          res.send(err);
          console.log(err, result);
        } else res.send("sended sccussflly");
      });
    }
  });
});
app.post("/addUser", uploadImage.single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");

  let sql =
    " INSERT INTO `users` (`id`,`user_name`,`image`,`phone`) VALUES (NULL, ?, ?,? )";

  let image = "";

  image = `${url}/public/${req.file.filename}`;

  let data = [req.body.user_name, image, req.body.phone];
  db.query(sql, data, (err, result) => {
    if (err) {
      res.send(err);
      console.log(err, result);
    } else res.send("sended sccussflly");
  });
});

app.get("/getUsers", (req, res) => {
  let sql = "SELECT * FROM `users`";
  db.query(sql, (err, result) => {
    if (!err) res.send(result);
    else res.send(err);
  });
});
