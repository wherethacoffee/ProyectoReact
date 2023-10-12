
export const save = (req, res) => {
    const data = req.body;

    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO turno SET ?', [data], (err, turno) => {
            if (err) {
                res.json(err);
            }
            res.send('Registrando')
        });
    });
};

export const list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM turno', (err, turnos) => {
            if (err) {
                res.json(err);
            }
            res.json(turnos);
        });
    });
};

export const remove = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM turno WHERE id = ?', [id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.send('Eliminando')
        });
    });
}

export const update = (req, res) => {
    const { id } = req.params;
    const newTurno= req.body;
    console.log(newTurno);
    req.getConnection((err, conn) => {
        conn.query('UPDATE turno set ? WHERE id = ?', [newTurno, id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.send('Actualizando')
            res.json(rows);
        });
    });
}
