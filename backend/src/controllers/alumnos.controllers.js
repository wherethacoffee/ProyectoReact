export const save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO alumno SET ?', [data], (err, admin) => {
            if (err) {
                res.json(err);
            }
            res.send('Registrando')
        });
    });
};

export const list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM alumno', (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.json(rows);
        });
    });
};

export const remove = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM alumno WHERE id = ?', [id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.send('Eliminando')
        });
    });
}

export const update = (req, res) => {
    const { id } = req.params;
    const newAlumno= req.body;
    console.log(newAlumno);
    req.getConnection((err, conn) => {
        conn.query('UPDATE alumno set ? WHERE id = ?', [newAlumno, id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.send('Actualizando')
            res.json(rows);
        });
    });
}
