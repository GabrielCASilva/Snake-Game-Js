const pontos = document.getElementById('pontos')
const iniciar = document.getElementById('iniciar')

const jogo = document.getElementById('tela-jogo')
const ctx = jogo.getContext("2d")
// o grid é de 25 quadrados de 24 cada

// variaveis em relação ao jogo
let tamQuad = 24
let qtdGrid = 25
let espacamento = 4
let ponto = 1

// variaveis em relação a cobra

let vel = 100

let velX = 0 
let velY = 0

let posX = 10
let posY = 10

let rastro = []
let cauda = 1

// variaveis em relação a maçã

let macaPx = 15
let macaPy = 15

const game = () => {
    tela()
    cobra()    
    posMaca()
}
    
const tela = () => {
    ctx.fillStyle = "#000"
    ctx.fillRect(0,0, jogo.width, jogo.height)
}

const cobra = () => {
    posX += velX
    posY += velY

    if(posX < 0){
        posX = qtdGrid - 1
    }
    if(posX > qtdGrid - 1){
        posX = 0
    }
    if(posY < 0){
        posY = qtdGrid - 1
    }
    if(posY > qtdGrid - 1){
        posY = 0
    }

    ctx.fillStyle = '#ff0'
    for(let i = 0; i < rastro.length; i++){
        ctx.fillRect(rastro[i].x * tamQuad, rastro[i].y * tamQuad, 
            tamQuad - espacamento, tamQuad - espacamento)
        colisaoCaudaCobra(rastro[i].x, rastro[i].y)
        colisaoMaca(rastro[i].x, rastro[i].y)
    }

    rastro.push(
        {
            x:posX,
            y:posY
        },
    )

    while (rastro.length > cauda){
        rastro.shift()
    }
}

const colisaoCaudaCobra = (rx,ry) => {
    if(rx == posX && ry == posY){
        velX = 0
        velY = 0
        cauda = 1
        ponto = 0
        vel = 100
        pontos.innerHTML = `Points: ${ponto}`
        

        posicaoQuandoMorrer()
    }
}

const posicaoQuandoMorrer = () => {
    
    posX = 10
    posY = 10
    macaPx = 15
    macaPy = 15
}

const colisaoMaca = (rx, ry) => {
    if ( macaPx == posX && macaPy == posY ){
        cauda ++
        macaPx = Math.floor(Math.random() * qtdGrid)
        macaPy = Math.floor(Math.random() * qtdGrid)

        macaPx = macaPx != posX ? macaPx : Math.floor(Math.random() * qtdGrid)
        macaPy = macaPx != posY ? macaPy : Math.floor(Math.random() * qtdGrid)

        macaPx = macaPx != rx ? macaPx : Math.floor(Math.random() * qtdGrid)
        macaPy = macaPx != ry ? macaPy : Math.floor(Math.random() * qtdGrid)

        if(vel > 30){
            vel -= 5
            pontuacao()
        }
        
    }
}

const pontuacao = () => {
    ponto++
    pontos.innerHTML = `Points: ${ponto}`
}

const posMaca = () => {
    ctx.fillStyle = '#f00'
    ctx.fillRect(macaPx * tamQuad,macaPy * tamQuad, tamQuad -espacamento, tamQuad -espacamento)
}

const teclado = () => {
    document.addEventListener('keydown', wasd)
    document.addEventListener('keydown', setas)
}

const wasd = (e) => {

    if(e.keyCode == 87){
        if(velY == 1) return
        velX = 0
        velY = -1
    }
    if(e.keyCode == 83){
        if(velY == -1) return
        velX = 0
        velY = 1
    }
    if(e.keyCode == 68){
        if(velX == -1) return
        velX = 1
        velY = 0
    }
    if(e.keyCode == 65){
        if(velX == 1) return
        velX = -1
        velY = 0
    }
}

const setas = (e) => {

    if(e.keyCode == 38){
        if(velY == 1) return
        velX = 0
        velY = -1
    }
    if(e.keyCode == 40){
        if(velY == -1) return
        velX = 0
        velY = 1
    }
    if(e.keyCode == 39){
        if(velX == -1) return
        velX = 1
        velY = 0
    }
    if(e.keyCode == 37){
        if(velX == 1) return
        velX = -1
        velY = 0
    }
}



document.addEventListener('DOMContentLoaded', () => {  
    iniciar.addEventListener('click', () => {
        teclado()
        vel = 100
        setInterval(game, vel)
    })     
})