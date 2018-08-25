const express=require('express');

const app=express();

app.set('view engine','ejs')

// middleware
app.use(express.static('public'))

//routes
app.get('/',(req,res)=>{
    res.render('index')

})

//listen on port 9000
server=app.listen(9000,()=>{
    console.log("connected at port 9000");
})

//socket io instantio
const io=require("socket.io")(server)

//listen on every connetion

io.on('connection',(socket)=>{
    console.log('New user connected')

    //username
    socket.username="Anonymous"

    //when username change,listen on change_username
    socket.on('change_username',(data)=>{
        socket.username=data.username
    })

    socket.on('new_message',(data)=>{
        //broadcast new message

        io.sockets.emit('new_message',{message : data.message, username :socket.username});
    })

    //listen on typing

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',{username : socket.username})
    })


})