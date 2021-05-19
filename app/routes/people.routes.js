module.exports = app => {
    const people = require("../controller/people.controller");

    var router = require("express").Router();
  
    router.post("/", people.create);
  
    router.get("/", people.findAll);
    
    router.get("/:id", people.findOne);
  
    router.put("/:id", people.update);
  
    router.delete("/:id", people.delete);
  
    router.delete("/", people.deleteAll);
  
    app.use("/api/people", router);
  };