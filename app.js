const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const TaskRouter = require('./router/task.router.js')
const path = require('path')

//Cho phép truy cập vào thư mục public từ file html
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'home.html'))
})

//Cho phép truy cập dữ liệu sử dụng req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/task', TaskRouter)

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
})