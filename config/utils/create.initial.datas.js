const  db  = require('../../src/models')

module.exports = async ( ) => {
    await db.Users.create({
        name: 'Administrador',
        userName: 'admin',
        password: 'admin'
    })

    await db.States.create({
        id: 1,
        name: 'Em andamento'
    })
    await db.States.create({
        id: 2,
        name: 'Finalizada'
    })
    await db.States.create({
        id: 3,
        name: 'Para fazer'
    })
    await db.States.create({
        id: 4,
        name: 'Deletada'
    })
}