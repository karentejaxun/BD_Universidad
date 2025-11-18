const db = require("../models");
const Matricula = db.matricula;  // ← Evita conflictos de nombre
const Op = db.Sequelize.Op;

// Crear un nuevo libro
exports.create = (req, res) => {
    if (!req.body.id_matricula) {
        return res.status(400).send({ message: "El ID de la matricula no puede estar vacío." });
    }

    const nuevaMatricula = {
        id_matricula: req.body.id_matricula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        carnet: req.body.carnet,
    };

    Matricula.create(nuevaMatricula)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al crear la matrícula." });
        });
};

// Obtener todos los libros (con filtro opcional por autor)
exports.findAll = (req, res) => {
    const id_matricula = req.query.id_matricula;
    const condition = id_matricula ? { id_matricula: { [Op.iLike]: `%${id_matricula}%` } } : null;

    Matricula.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener matrículas." });
        });
};

// Obtener una sola matrícula por ID
exports.findOne = (req, res) => {
    const id_matricula = req.params.id_matricula;

    Matricula.findByPk(id_matricula)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "matricula no encontrado." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al recuperar la matrícula con ID=" + id_matricula });
        });
};

// Actualizar matrícula
exports.update = (req, res) => {
    const id_matricula = req.params.id_matricula;

    Matricula.update(req.body, {
        where: { id_matricula: id_matricula }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Matrícula actualizada correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar la matrícula con ID=${id_matricula}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar la matrícula con ID=" + id_matricula });
        });
};

// Eliminar un libro
exports.delete = (req, res) => {
    const id_matricula = req.params.id_matricula;

    Matricula.destroy({ where: { id_matricula: id_matricula } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Matrícula eliminada correctamente." });
            } else {
                res.send({ message: `No se encontró matrícula con ID=${id_matricula}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al eliminar la matrícula con ID=" + id_matricula });
        });
};

// Eliminar todos los libros
exports.deleteAll = (req, res) => {
    Matricula.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} matrículas eliminadas correctamente.` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al eliminar todas las matrículas." });
        });
};
