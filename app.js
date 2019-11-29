const app = require('./config/server')
const PORT = 3000

app.listen(PORT, ()=> {
    console.log("Server on PORT 3000")
})
