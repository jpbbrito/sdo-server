const bcrypt = require('bcrypt')

module.exports.userResolvers = {
    Query : {
        users: async (parent, {first = 10, offset = 0}, { db, user }, info) => {
            if (!user) {
                throw new Error('You are not authenticated!')
            }

            let users = await db.Users.findAll({
                            limit: first,
                            offset: offset
                        })

            return users
        },
        user: async (parent, args , { db, user }, info) => {
            if (!user) {
                throw new Error('You are not authenticated!')
            }

            let result = await db.Users.findOne({where: {id: args.id}})
        
            if(!result){
                throw new Error(`User with id ${args.id} not found`)
            }
            return result
        }
    },

    Mutation: {
       createUser: async ( parent, args, { db, user }, info) => {

            if (!user) {
                throw new Error('You are not authenticated!')
            }

            let userResult = await db.Users.findOne({where: {id: user.sub}})

            if(userResult.userName  != 'admin') {
                throw new Error('User is not authorized!')
            }
            
            let userCreated = await db.Users.create(args.input)
            if(!user){
                throw new Error(`User not created`)
            }
            return userCreated
       },
       updateUser: async (parent, args, { db, user }, info ) => {
           if (!user) {
               throw new Error('You are not authenticated!')
            }
            await db.Users.update(args.input,{where: {id: user.sub}})
           
           let userResult = await db.Users.findByPk(user.sub)
           
           if(!userResult){
               throw new Error(`User not found`)
            }
            
            return userResult
       },
       updateUserPassword: async(parent, args, { db, user }, info) => {
            if (!user) {
                throw new Error('You are not authenticated!')
            }

            const salt = bcrypt.genSaltSync()
            const passwordHash = bcrypt.hashSync(args.input.password, salt)

            try {
                await db.Users.update({password: passwordHash}, {where: {id : user.sub}})
            } catch(error) {
                throw new Error(`Password not changed`)
            }
            return true
       },
   }
} 