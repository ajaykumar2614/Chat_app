$(function(){
    //making the connection
    var socket =io.connect('http://localhost:9000')

    //button and input
    var username=$("#username");
    var send_username=$("#send_username");
    var message=$("#message");
    var send_message=$("#send_message");
    var chatroom=$("#chatroom");
    var feedback=$("#feedback");


    //emit message
    send_message.click(()=>{
        socket.emit('new_message',{message: message.val()})
    })

    //emit username
    send_username.click(()=>{
        socket.emit('change_username',{username : username.val()})
    })

    //listen on new_message
    socket.on("new message",(data)=>{
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username+":" + data.message + "</p>")
    })

    //Emit on typing
    message.bind("keypress",()=>{
        socket.emit('typing')
    })

    //listen on typing
    socket.on('typing',(data)=>{
        feedback.html("<p><i>"+data.username+" is typing a message"+"</i><p>");
    })




})