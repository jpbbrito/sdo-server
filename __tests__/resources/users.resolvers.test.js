const { request } = require('../test-utils')
const { app } = require('../test-utils')
const truncate = require('../truncate')
const createInitialDatas = require('../../config/utils/create.initial.datas')

describe('Users', () =>{
    let adminToken = '';
    let userTestToken = '';

    beforeAll( async() => {
        await truncate()
        await createInitialDatas()
    
        let body = {
            query: `
                mutation getToken($userName: String!, $password: String!){
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
        
        adminToken = response.body.data.createToken.token

    })

    describe('Mutation', () => {
        
  
        describe('createUser()', () => {
            it('Should be create user test with admin token and return new user', async () => {
                let body = {
                    query: `
                        mutation createNewUser ($input: UserCreateInput!) {
                            createUser (input: $input) {
                                name
                                userName
                            }
                        }
                    `,
                    variables: {
                        input: {
                            name: 'userTest',
                            userName: 'userTest',
                            password: 'userTest'
                        }
                    }
                
                }
                            
                const response = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${adminToken}`)
                    .send(JSON.stringify(body))

                expect(response.status).toBe(200)
                expect(response.body.data.createUser).toMatchObject({name: 'userTest', userName: 'userTest'})

            })
            it('Should deny create new user with user test token and return null', async() => {
                let bodyReq = {
                    query: `
                        mutation NewToken ($userName: String!, $password: String!){
                            createToken(userName: $userName, password: $password){
                                token
                            }                    
                        }
                        
                    `,
                    variables: {
                        userName: 'userTest',
                        password: 'userTest'
                    }
                }
                let response = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .send(JSON.stringify(bodyReq))

                userTestToken = response.body.data.createToken.token

                let body = {
                    query: `
                        mutation createNewUser ($input: UserCreateInput!) {
                            createUser (input: $input) {
                                name
                                userName
                            }
                        }
                    `,
                    variables: {
                        input: {
                            name: 'userTest2',
                            userName: 'userTest2',
                            password: 'userTest2'
                        }
                    }
                
                }
                            
                const res = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${userTestToken}`)
                    .send(JSON.stringify(body))

                expect(res.status).toBe(200)
                expect(res.body.data.createUser).toBe(null)
            })
            
        })

        describe('updateUser()', () => {
            it('Should update name of user test and return user datas updated', async () => {
                let body = {
                    query: `
                        mutation changerNameUser($input: UserUpdateInput!) {
                            updateUser (input: $input) {
                                name
                                userName
                            }
                        }
                        
                    `,
                    variables: {
                        input: {
                            name: 'Zé Mané'
                        }
                    }
                }
                            
                const response = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${userTestToken}`)
                    .send(JSON.stringify(body))

               expect(response.status).toBe(200)
               expect(response.body.data.updateUser).toMatchObject({name: 'Zé Mané'})

            })
        })

        describe('updateUserPassword()', () => {
            it('Should try update password of user admin', async () => {
                let body = {
                    query: `
                        mutation changePassword ($input: UserUpdatePasswordInput!) {
                            updateUserPassword(input: $input)
                        }
                    `,
                    variables: {
                        input: {
                            password: 'admin123'
                        }
                    }
                
                }
                            
                const response = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${adminToken}`)
                    .send(JSON.stringify(body))
                
                expect(response.status).toBe(200)
                expect(response.body.data.updateUserPassword).toEqual(true)
 
            })
            
            it('Should use new password of user admin and create new token access', async () => {
                let body = {
                    query: `
                        mutation changeToken($userName: String!, $password: String!) {
                            createToken (userName: $userName, password: $password) {
                                token
                            }
                        }
                    `,
                    variables: {
                            userName: 'admin',
                            password: 'admin123'
                    }
                
                }
                            
                const response = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .send(JSON.stringify(body))
                expect(response.status).toBe(200)
                adminToken = response.body.data.createToken.token
            })

            it('Should try get token using former passsword and return null', async() => {
                let body = {
                    query: `
                        mutation getToken($userName: String!, $password: String!) {
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

                expect(response.status).toBe(200)
                expect(response.body.data.createToken).toBe(null)
    
            })

        })
        
    })
})
