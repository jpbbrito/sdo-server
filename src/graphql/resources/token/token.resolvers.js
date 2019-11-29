const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../../utils/utils')
 
module.exports.tokenResolvers = {
    Mutation: {
        createToken: async (parent, args, {db}) => {
            let user = await db.Users.findOne({
                where: {
                    userName: args.userName
                },
                attributes: ['id', 'password']
            })

            let errorMessage = 'Unauthorized, wrong user name or password'
           
            if(!user){
                throw Error(errorMessage)
            }

            const samePassword = bcrypt.compareSync(args.password, user.password)
            
            if(!samePassword){
                throw Error(errorMessage)
            }

            const payload = { sub: user.get('id') }
            
            return {
                token: jwt.sign(payload, JWT_SECRET, { expiresIn: '1h'} )
            }
        }
    }
}