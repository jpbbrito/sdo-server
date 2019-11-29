const { request } = require('../test-utils')
const { app } = require('../test-utils')
const truncate = require('../truncate')
const createInitialDatas = require('../../config/utils/create.initial.datas')


describe('Token', () => {
    let adminToken = '';

    let occurrence1 = {
        problem: "Ocorrencia 1",
        note: "Observação da Ocorrencia 1",
        state: "1",
        typeService: "Tipo de Ocorrencia 1",
        createdDate: "20191128"
    }

    let occurrence2 = {
        problem: "Ocorrencia 2",
        note: "Observação da Ocorrencia 2",
        state: "1",
        typeService: "Tipo de Ocorrencia 2",
        createdDate: "20191128"
    }


    beforeAll(async() => {
        await truncate()
        await createInitialDatas()

        let body = {
            query: `
                mutation GetToken($userName: String!, $password: String!){
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
        expect(response.body.data.createToken).toHaveProperty('token')
    })

    describe('Mutation', () => {
        
        describe('createOccurrence()', () => {
            it('Should return occurrence 1 created', async() => {
                let body = {
                    query: `
                        mutation getOccurrence($input: OccurrenceCreateInput!){
                            createOccurrence (input: $input) {
                                id
                                problem
                                note
                                typeService
                                createdDate
                            }
                        }
                        
                    `,
                    variables:{
                        input: occurrence1
                    } 
                }
        
                const response = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${adminToken}`)
                    .send(JSON.stringify(body))

                occurrence1.id = Number(response.body.data.createOccurrence.id)
                expect(response.body.data.createOccurrence.problem).toBe(occurrence1.problem)
                expect(response.body.data.createOccurrence.note).toBe(occurrence1.note)
                expect(response.body.data.createOccurrence.typeService).toBe(occurrence1.typeService)
                
            }) 
            it('Should return occurrence 2 created', async() => {
                let body = {
                    query: `
                        mutation getOccurrence($input: OccurrenceCreateInput!){
                            createOccurrence (input: $input) {
                                id
                                problem
                                note
                                typeService
                                createdDate
                            }
                        }
                        
                    `,
                    variables:{
                        input: occurrence2
                    } 
                }
        
                const response = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${adminToken}`)
                    .send(JSON.stringify(body))

                occurrence2.id = Number(response.body.data.createOccurrence.id)
                expect(response.body.data.createOccurrence.problem).toBe(occurrence2.problem)
                expect(response.body.data.createOccurrence.note).toBe(occurrence2.note)
                expect(response.body.data.createOccurrence.typeService).toBe(occurrence2.typeService)
                
            }) 
        })
        
        describe('updateOccurrence()', () => {
            occurrence1.problem = "Ocorrencia 1 alterado"
            occurrence1.note = "Observação da Ocorrencia 1 alterado",

            it('should return new info', async() => {
                let body = {
                    query: `
                        mutation changeOccurrence($id: ID!, $input: OccurrenceUpdateInput!){
                            updateOccurrence (id: $id, input: $input) {
                                id
                                problem
                                state
                                note
                                typeService
                            }
                        }
                        
                    `,
                    variables: {
                        id: occurrence1.id,
                        input: {
                            problem: occurrence1.problem,
                            note: occurrence1.note
                        }
                    } 
                }
        
                const response = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${adminToken}`)
                    .send(JSON.stringify(body))
                expect(response.body.data.updateOccurrence.problem).toBe(occurrence1.problem)
                expect(response.body.data.updateOccurrence.note).toBe(occurrence1.note)
                expect(response.body.data.updateOccurrence.typeService).toBe(occurrence1.typeService)
                
            })
            
        })

    })
    
    describe('Query', () => {
        
        describe('occurrences()', () => {
            it('Should return all occurrences storage', async() => {
                let body = {
                    query: `
                        query {
                            occurrences  {
                                id
                                problem
                                state
                                note
                                typeService
                            }
                        }
                        
                    `
                }
        
                const response = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${adminToken}`)
                    .send(JSON.stringify(body))

                //console.log(response.body)
                // 1 
                expect(response.body.data.occurrences[0].problem).toBe(occurrence1.problem)
                expect(response.body.data.occurrences[0].note).toBe(occurrence1.note)
                expect(response.body.data.occurrences[0].typeService).toBe(occurrence1.typeService)
                // 2 
                expect(response.body.data.occurrences[1].problem).toBe(occurrence2.problem)
                expect(response.body.data.occurrences[1].note).toBe(occurrence2.note)
                expect(response.body.data.occurrences[1].typeService).toBe(occurrence2.typeService)
                
            }) 

        })
        
        describe('occurrence', () => {
            it('Should return occurrence 1', async() => {
                let body = {
                    query: `
                        query getOccurrence($id: ID!){
                            occurrence(id: $id)  {
                                id
                                problem
                                note
                                typeService
                            }
                        }
                        
                    `,
                    variables: {
                        id: occurrence1.id
                    }
                    }
            
                const response = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${adminToken}`)
                    .send(JSON.stringify(body))

                expect(response.body.data.occurrence.problem).toBe(occurrence1.problem)
                expect(response.body.data.occurrence.note).toBe(occurrence1.note)
                expect(response.body.data.occurrence.typeService).toBe(occurrence1.typeService)
                       
            })
            
            it('Should return occurrence 2', async() => {
                let body = {
                    query: `
                        query getOccurrence($id: ID!){
                            occurrence(id: $id)  {
                                id
                                problem
                                note
                                typeService
                            }
                        }
                        
                    `,
                    variables: {
                        id: occurrence2.id
                    }
                    }
            
                const response = await request(app)
                    .post('/graphql')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer ${adminToken}`)
                    .send(JSON.stringify(body))

                expect(response.body.data.occurrence.problem).toBe(occurrence2.problem)
                expect(response.body.data.occurrence.note).toBe(occurrence2.note)
                expect(response.body.data.occurrence.typeService).toBe(occurrence2.typeService)                    
            }) 
        })
    })
})