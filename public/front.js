console.log('socket ui')
const socket=io.connect();

const render=(data)=>{
    const html=data.map((element,index)=>{
        return(`
            <div>
                <strong>${element.author}</strong> 
                <em>${element.text} </em>
            </div>
        `)
    }).join('');
    document.getElementById('messages').innerHTML=html;
}

socket.on('messages',(messages)=>{
    console.log(messages);
    render(messages);
}) 

const addMessage=()=>{
    const message={
        author: document.getElementById('username').value,
        text: document.getElementById('text').value
    };
    socket.emit('new-message',message);
    return false
}

const element=document.getElementById('form')

element.addEventListener('submit',(event)=>{
    event.preventDefault()
    //addMessage();
    //console.log('submit')
});





