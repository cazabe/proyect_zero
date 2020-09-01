const con = require('../dbConnector');
const user = require('../models/usuario');

module.exports = {
    create(req, res) {
        try {
            if (req.get('Content-Type') != 'application/json') {
                res.send(500);
            }

            newUser = req.body;
            console.log('newUser: ', newUser);
            // Accept only user
            if (typeof newUser !== typeof user) {
                res.json({ 'message': 'INVALID_DATA' });
            }

            const sql = 'INSERT INTO USUARIO SET ?';

            con.query(sql, newUser, (err, result) => {
                if (err) {
                    res.json({ 'message': 'INTERNAL_ERROR' + err });
                }
                res.json({ 'message': 'OK' });
            });
        }
        catch (e) {
            res.json({ 'message': 'INTERNAL_ERROR' + e });
        }
    },
    read(req, res) {
        try {
            const sql = 'SELECT * FROM usuario WHERE estado = "A"';
            res.set('Content-type', 'application/json');
            con.query(sql, (err, result) => {
                if (err) {
                    res.json({ 'SQL': `INTERNAL_ERROR: ${err}` });
                }
                res.json(result);
            });
        }
        catch (e) {
            res.json({ 'CATCH': `INTERNAL_ERROR: ${e}` });
        }
    },
    update(req, res) {
        try {
            if (req.get('Content-Type') != 'application/json') {
                res.send(500);
            }

            newUserData = req.body;
            console.log('newUserData: ', newUserData);
            // Accept only user
            if (typeof newUserData !== typeof user) {
                res.json({ 'message': 'INVALID_DATA' });
            }

            const sql = 'UPDATE usuario SET rol_id = ?, nombres = ?, apellidos = ?,' +
                ' correo = ?, username = ?, password = ?, estado = ? where usuario_id = ?';

            const nU = newUserData;
            let params = [nU.rol_id, nU.nombres, nU.apellidos, nU.correo, nU.username,
            nU.password, nU.estado, nU.usuario_id];

            con.query(sql, params, (err, result) => {
                if (err) {
                    // res.json({'message': `INTERNAL_ERROR: ${err}`});
                    res.json({ 'message': `INTERNAL_ERROR` });
                }
                res.json({ 'message': 'OK' });
            });
        }
        catch (e) {
            res.json({ 'message': `INTERNAL_ERROR: ${e}` });
        }
    },
    delete(req, res) {
        try {
            if (req.get('Content-Type') != 'application/json') {
                res.send(500);
            }

            const user = req.body;
            const sql = 'UPDATE usuario SET estado = "I" where usuario_id = ?';

            con.query(sql, user.usuario_id, (err, result) => {
                if (err) {
                    res.json({ 'message': `INTERNAL_ERROR: ${e}` });
                }
                res.json('OK');
            });
        }
        catch (e) {
            res.json({ 'message': `INTERNAL_ERROR: ${e}` });
        }
    },
}