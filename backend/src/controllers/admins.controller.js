export const save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO admin SET ?', [data], (err, admin) => {
            if (err) {
                res.json(err);
            }
            res.send('Registrando')
        });
    });
};

export const list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM admin', (err, rows) => {
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
        conn.query('DELETE FROM admin WHERE id = ?', [id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.send('Eliminando')
        });
    });
}

export const update = (req, res) => {
    const { id } = req.params;
    const newAdmin= req.body;
    console.log(newAdmin);
    req.getConnection((err, conn) => {
        conn.query('UPDATE admin set ? WHERE id = ?', [newAdmin, id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.send('Actualizando')
            res.json(rows);
        });
    });
}
