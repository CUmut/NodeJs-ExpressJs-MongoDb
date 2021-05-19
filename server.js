const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser');

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Veritabanı bağlantısı gerçekleştirildi.!");
  })
  .catch(err => {
    console.log("Veritabanına bağlanılamıyor!", err);
    process.exit();
  });

// Anasayfa route
app.get("/", (req, res) => {
  res.send("Welcome to application.");
});


require("./app/routes/people.routes")(app);

// istekleri 8080 portundan dinleyelim
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


