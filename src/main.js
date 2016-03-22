import express from 'express'
import pkg from '../package.json'
import faker from 'faker'
import _ from 'lodash'
import bodyParser from 'body-parser'

const users = _.times(3, () => {
    return {
        fistName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: _.random(18, 99)
    }
})


const app = express()

app.use(bodyParser.json())

app.get('/package',(req, res) => {
    res.json(pkg)
})
    .use((req, res, next) => {
        next()
    })

    .get('/', (req, res) => {
        res.send('you are at root!')
    })

    .get('/city', (req, res) => {
        res.send(faker.address.city())
    })

    .get('/phrase', (req, res) => {
        res.send(faker.hacker.phrase())
    })

    .get('/quote', (req, res) => {
        res.json({
            author: faker.name.findName(),
            quote: faker.hacker.phrase()
        })
    })

    .get('/users', (req, res) => {
        res.json({
            page: 1,
            count: users.length,
            data: users
        })
    })

    .post('/users', (req, res) => {
        users.push(req.body)
        res.json(req.body)
    })

app.listen(3000, () => {
    console.log('Express app listening on port 3000')
})
