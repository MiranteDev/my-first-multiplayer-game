import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = {
        players:{},
        enemys:[{
            x:2,
            y:0,
            id:'e1'
        }],
        screen: {
            width: 10,
            height: 10
        }
    }


sockets.on('connection', (socket)=>{
    console.log(`Client connect with id: ${socket.id}`)
    
    
    const playerId = socket.id
    game.players[playerId] = {
        x: Math.floor(Math.random() * game.screen.width),
        y: Math.floor(Math.random() * game.screen.height)
    }
    sockets.emit('init',game)

    socket.on('disconnect',()=>{
        game.players[playerId] = {}
    })
    socket.on('move-player',(positon)=>{

        

        game.players[playerId].x = positon.x
        game.players[playerId].y = positon.y

        sockets.emit('run',game)
    })
})




server.listen('3000',() =>{
    console.log('Server connect')
})