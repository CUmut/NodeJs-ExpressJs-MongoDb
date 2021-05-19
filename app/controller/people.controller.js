const db = require("../models");
const App = db.app;

exports.create = (req, res) => {

  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "İsim alanı boş olamaz!" });
    return;
  }

  // Create a Person
  const app = new App({
    name: req.body.name,
    email: req.body.email,
    adress: req.body.adress
  });

  // Save Person in the database
  app
    .save(app)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Kişi kayıt işlemi başarısız.!"
      });
    });
  
};

//İsimlerine göre kişileri getir.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  App.find(condition)
  .then(data=>{
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message : err.message || "Kişiler yüklenirken hata oluştu."
    })
  })

};

exports.findOne = (req, res) => {
  
  const id = req.params.id;

  App.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Kişi Bulunamadı" + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Id'li kişi alınırken hata oluştu" + id });
    });

};

exports.update = (req, res) => {

  if(!req.body){
    return res.status(400).send({
      message : "Güncellenecek veriler boş olamaz"
    });
  }

  const id = req.params.id;

  App.findByIdAndUpdate(id,req.body,{ useFindAndModify: false })
    .then(data =>{
      if(!data){
        res.status(404).send({
          message : `Kişi bulunamadı id=${id}`
        })
      }else res.send({message : "Kişi başarılı şekilde güncellendi."})
    })
    .catch(err =>{
      res.status(500).send({
        message : "Id'li kişi güncellenemedi" + id
      });
    });
  
};

exports.delete = (req, res) => {

  const id = req.params.id;

  App.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `id=${id} 'li kişi silinemedi`
        });
      } else {
        res.send({
          message: "Kişi başarılı şekilde silindi"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Kişi silinirken bir hata oluştu..." + "Kişi Id:" + id
      });
    });

  
};

exports.deleteAll = (req, res) => {

  App.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} kişi kayıtlardan silindi.`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Bazı kişiler silinemedi."
    });
  });
  
};
