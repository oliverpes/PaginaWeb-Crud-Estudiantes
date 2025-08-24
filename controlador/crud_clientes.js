import { conectar } from "../modelo/db_conectar.js";

var crud_estudiante = {};

// 📌 Leer estudiantes + tipos de sangre
crud_estudiante.leer = (req, res) => {
    const sql_estudiantes = `
        SELECT e.id_estudiante, e.carne, e.nombres, e.apellidos, e.direccion,
               e.telefono, e.correo_electronico, e.id_tipo_sangre, ts.sangre,
               DATE_FORMAT(e.fecha_nacimiento,"%Y-%m-%d") as fecha_nacimiento
        FROM estudiantes e
        LEFT JOIN tipos_sangre ts ON e.id_tipo_sangre = ts.id_tipo_sangre;
    `;
    const sql_tipos_sangre = `SELECT * FROM tipos_sangre`;

    conectar.query(sql_estudiantes, (error, results_estudiantes) => {
        if (error) throw error;
        conectar.query(sql_tipos_sangre, (err2, results_sangre) => {
            if (err2) throw err2;
            res.render('index', { resultado: results_estudiantes, tipos: results_sangre });
        });
    });
};

// 📌 Insertar, actualizar o eliminar estudiante
crud_estudiante.cud = (req, res) => {
    const { btn_crear, btn_actualizar, btn_borrar, txt_id, txt_carne, txt_nombres, txt_apellidos, txt_direccion, txt_telefono, txt_correo, txt_tipo_sangre, txt_fn } = req.body;

    if (btn_crear) {
        const sql = `
            INSERT INTO estudiantes (carne, nombres, apellidos, direccion, telefono, correo_electronico, id_tipo_sangre, fecha_nacimiento)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        conectar.query(sql, [txt_carne, txt_nombres, txt_apellidos, txt_direccion, txt_telefono, txt_correo, txt_tipo_sangre, txt_fn], (error) => {
            if (error) console.log(error);
            res.redirect('/');
        });
    }

    if (btn_actualizar) {
        const sql = `
            UPDATE estudiantes SET carne=?, nombres=?, apellidos=?, direccion=?, telefono=?, correo_electronico=?, id_tipo_sangre=?, fecha_nacimiento=?
            WHERE id_estudiante=?
        `;
        conectar.query(sql, [txt_carne, txt_nombres, txt_apellidos, txt_direccion, txt_telefono, txt_correo, txt_tipo_sangre, txt_fn, txt_id], (error) => {
            if (error) console.log(error);
            res.redirect('/');
        });
    }

    if (btn_borrar) {
        const sql = `DELETE FROM estudiantes WHERE id_estudiante=?`;
        conectar.query(sql, [txt_id], (error) => {
            if (error) console.log(error);
            res.redirect('/');
        });
    }
};

export { crud_estudiante };
