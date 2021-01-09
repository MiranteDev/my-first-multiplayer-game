export default function renderScreen(screen, requestAnimationFrame,game,myplayerId) {
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, 20, 20)

    for(const playerId in game.players){

        if(myplayerId === playerId)
            context.fillStyle = '#F0DB4F'
        else
            context.fillStyle = 'black'

        const player = game.players[playerId]
        context.fillRect(player.x, player.y, 1, 1)
    }
    for(const enemyId in game.enemys){
        const enemy = game.enemys[enemyId]
        context.fillStyle = 'red'
        context.fillRect(enemy.x, enemy.y, 1, 1)
    }
    requestAnimationFrame(() => {
        renderScreen(screen, requestAnimationFrame,game,myplayerId)
    })
}