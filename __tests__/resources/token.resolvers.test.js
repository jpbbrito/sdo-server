const { request } = require('../test-utils')
const { app } = require('../test-utils')
const truncate = require('../truncate')
const createInitialDatas = require('../../config/utils/create.initial.datas')

describe('Token', () => {
    let adminToken = '';

    beforeAll(async() => {
        await truncate()
        await createInitialDatas()
    })

    describe('Mutation', () => {
        
        describe('CreateToken()', () => {
            test('Should return acess token', async() => {
                let body = {
                    query: `
                        mutation GettToken($userName: String!, $password: String!){
                            createToken (userName: $userName, password: $password) {
                                token
                            }
                        }
                        
                    `,
                    variables: {
                        userName: 'admin',
                        password: 'admin'
                    }
                }
      
                const response = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .send(JSON.stringify(body))
                
                expect(response.body.data.createToken).toHaveProperty('token')
                adminToken = response.body.data.createToken.token
                
            }) 

        })
    })
    
})
