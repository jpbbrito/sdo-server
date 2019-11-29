module.exports.occurrenceResolvers = {
    Query: {
        occurrences: async(parent,  {first = 10, offset = 0}, { db, user }, info) => {
            
            if (!user) {
                throw new Error('You are not authenticated!')
            }

            let occurrences = await db.Occurrences.findAll({
                limit: first,
                offset: offset
            })

            return occurrences

        },
        occurrence: async(parent, args, { db, user }, info) => {
            if (!user) {
                throw new Error('You are not authenticated!')
            }

            let result = await db.Occurrences.findOne({where: {id: args.id}})
            
            if(!result){
                throw new Error(`Occurrence with id ${args.id} not found`)
            }
            return result
        }

    },
    
    Mutation: {
        createOccurrence: async (parent, args, { db, user}) => {
            if(!user) {
                throw new Error('You are not authenticated!')
            }

            let userResult = await db.Users.findByPk(user.sub)

            if(!userResult){
                throw new Error('Occurrence not created')
            }

            args.input.user = userResult.userName
            let occurrence = {};
            try {
                occurrence = await db.Occurrences.create(args.input)
            } catch (errors) {
                throw new Error(errors)
            }

            if(!occurrence){
                throw new Error('Occurrence not created')
            }

            return occurrence

        },

        updateOccurrence: async (parent, args, { db, user } )=> {
            if(!user) {
                throw new Error('You are not authenticated!')
            }

            let result = await db.Occurrences.update(args.input, {where: {id: args.id}  })
            if(!result){
                throw new Error('Occurrence not changed')

            }

            let occurrence = await db.Occurrences.findByPk(args.id)

            return occurrence

        }
    }

}