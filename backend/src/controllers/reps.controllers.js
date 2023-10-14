export const save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO representante SET ?', [data], (err, admin) => {
            if (err) {
                res.json(err);
            }
            res.send('Registrando')
        });
    });
};

export const list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM representante', (err, rows) => {
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
        conn.query('DELETE FROM representante WHERE id = ?', [id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.send('Eliminando')
        });
    });
}

export const update = (req, res) => {
    const { id } = req.params;
    const newRep= req.body;
    console.log(newRep);
    req.getConnection((err, conn) => {
        conn.query('UPDATE representante set ? WHERE id = ?', [newRep, id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.send('Actualizando')
            res.json(rows);
        });
    });
}
