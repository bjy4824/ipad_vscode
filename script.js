const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;

var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = "rgba(12,45,200,1)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
dino.draw();

class Cactus{
    
}