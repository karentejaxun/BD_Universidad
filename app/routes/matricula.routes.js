module.exports = app => {
    const Matricula = require("../controllers/matricula.controller.js");
    var router = require("express").Router();
    // Create a new matrícula
    router.post("/create/", Matricula.create);
    // Retrieve all matrícula
    router.get("/",  Matricula.findAll);
    // Retrieve a single matrícula with id
    router.get("/:id_matricula", Matricula.findOne);
    // Update a matrícula with id
    router.put("/update/:id_matricula", Matricula.update);
    // Delete a matrícula with id
    router.delete("/delete/:id_matricula", Matricula.delete);
    // Delete all matrícula
    router.delete("/delete/", Matricula.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api//
    app.use("/api/matriculas", router);
};
