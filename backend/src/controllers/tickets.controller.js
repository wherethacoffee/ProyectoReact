export const save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).json(err); // Enviar respuesta de error y salir de la función
            return;
        }

        conn.query('INSERT INTO turno SET ?', [data], (err, turno) => {
            if (err) {
                res.status(500).json(err); // Enviar respuesta de error en caso de error en la consulta
                return;
            }
            
            res.send('Registrando'); // Solo enviar la respuesta en caso de éxito
        });
    });
};


export const list = async (req, res) => {
    try {
        const conn = await new Promise((resolve, reject) => {
            req.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                }
                resolve(conn);
            });
        });

        const turnos = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM VistaTurno', (err, turnos) => {
                if (err) {
                    reject(err);
                }
                resolve(turnos);
            });
        });

        res.json(turnos);
    } catch (error) {
        res.json(error);
    }
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