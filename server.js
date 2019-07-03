var express = require('express')
var bodyparser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

var dbUrl = 'mongodb+srv://user:user@cluster0-8frhi.mongodb.net/test?retryWrites=true&w=majority'

var Message = mongoose.model('Message',{
    name:String,
    message:String
})

var messages = [
    {name:'Tim',message:'hi'},
    {name:'Jack',message:'check'}
]

app.get('/messages',(req,res)=>{
    Message.find({},(err,messages) => {
        res.send(messages)
    })
   
})

app.post('/messages',(req,res)=>{
    var message = new Message(req.body)
    message.save((err) =>{
        if(err)
            sendStatus(500)
        
        //messages.push(req.body)
        io.emit('message',req.body)
        res.sendStatus(200)
    })
    
})

io.on('connection',(socket) =>{
    console.log('a user connected')
})

mongoose.connect(dbUrl,{useNewUrlParser:true},(err) => {
    console.log('mongodb connection', err)
})

var server = http.listen(3000,()=>{
    console.log('server is listening on port: ', server.address().port)
})

