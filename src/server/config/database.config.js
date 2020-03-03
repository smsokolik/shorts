var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'YOUR USERNAME (PREFERABLY FROM process.env.dbUsername)',
    password: 'YOU PASSWORD (PREFERABLY FROM process.env.password)',
    city: 'YOU PASSWORD (PREFERABLY FROM process.env.city)',
    database: 'YOUR DATABASE (PREFERABLY FROM process.env.db)'
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) connection.release()
    return
})

module.exports = pool;