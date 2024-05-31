const canvas = document.getElementById("gameView");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "rgb(100,100,100)";

//테이블 사이즈 중대 4구
var tableSizeX = canvas.width * 0.8
var tableSizeY = tableSizeX/2
//공 반지름
var ballRadius = tableSizeX / 2448 * 65.5 /2 
//상태 : ready=준비중(공 치는 준비)  play=게임 표현중(공 움직이는중)
var state = "ready"
//표현할 애니메이션 프레임(공들의 위치를 배열의 형태로 가짐)
var frame = []



var backGround = {
  color : "rgb(150, 160, 200)",
  x : canvas.width*0.05,
  y : canvas.height*0.05,
  width : canvas.width*0.9,
  height : canvas.height*0.9,
  draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height); 
  }
}
backGround.draw();

//국내식 중대 사이즈 1224mm x 2448mm, 4구 65.5mm
var billiardTable = {
  color : "rgb(81, 165, 94)",
  x : canvas.width * 0.1,
  y : canvas.height * 0.07,
  width : tableSizeX,
  height : tableSizeY,
  draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height); 
  }
}
billiardTable.draw();

//각도 오른쪽이동
var rightButton = {
  backColor : "rgb(218, 218, 218)",
  x : canvas.width * 0.85,
  y : canvas.height * 0.85,
  width : canvas.width * 0.05,
  height : canvas.height * 0.07,
  draw(){
    //네모 박스
    ctx.beginPath();
    ctx.fillStyle = this.backColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = '#000000'; 
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    //삼각형
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(this.x + this.width*0.45, this.y + this.height*0.35);
    ctx.lineTo(this.x + this.width*0.45, this.y + this.height*0.65);
    ctx.lineTo(this.x + this.width*0.6, this.y + this.height*0.5);
    //ctx.lineTo(this.x + this.width*0.5, this.y + this.height*0.6);
    ctx.closePath();
    ctx.fill();
  }
}
rightButton.draw();

//각도 왼쪽이동
var leftButton = {
  backColor : "rgb(218, 218, 218)",
  x : canvas.width * 0.79,
  y : canvas.height * 0.85,
  width : canvas.width * 0.05,
  height : canvas.height * 0.07,
  draw(){
    //네모 박스
    ctx.beginPath();
    ctx.fillStyle = this.backColor;
    ctx.fillRect(this.x, this.y, this.width, this.height); 
    ctx.strokeStyle = '#000000'; 
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    //삼각형
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(this.x + this.width*0.55, this.y + this.height*0.35);
    ctx.lineTo(this.x + this.width*0.55, this.y + this.height*0.65);
    ctx.lineTo(this.x + this.width*0.4, this.y + this.height*0.5);
    //ctx.lineTo(this.x + this.width*0.5, this.y + this.height*0.6);
    ctx.closePath();
    ctx.fill();
  }
}
leftButton.draw();

//공 시네루 버튼
var ballButton = {
  backColor : "rgb(218, 218, 218)",
  lineColor : "rgb(100, 100, 100)",
  x : canvas.width * 0.7,
  y : canvas.height * 0.9,
  radius : canvas.width * 0.05,
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.backColor;
    ctx.fill();
    ctx.strokeStyle = '#000000'; 
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.strokeStyle = this.lineColor; 
    ctx.lineWidth = 1;
    ctx.moveTo(this.x - this.radius*1.15, this.y);
    ctx.lineTo(this.x + this.radius*1.15, this.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = this.lineColor; 
    ctx.lineWidth = 1;
    ctx.moveTo(this.x, this.y - this.radius*1.15);
    ctx.lineTo(this.x, this.y + this.radius*1.15);
    ctx.stroke();
  }
}
ballButton.draw();


//큐파워 버튼
var cuePowerButton = {
  backColor : "rgb(218, 218, 218)",
  x : canvas.width * 0.1,
  y : canvas.height * 0.85,
  width : canvas.width * 0.5,
  height : canvas.height * 0.07,
  fontSize : 20,
  draw(){
    //네모 박스
    ctx.beginPath();
    ctx.fillStyle = this.backColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = '#000000'; 
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
   
    ctx.font = this.fontSize+"px serif";
    ctx.fillStyle = '#000000';
    ctx.fillText("100", this.x - this.fontSize * 0.8, this.y + this.height + this.fontSize);

    ctx.font = this.fontSize+"px serif";
    ctx.fillStyle = '#000000';
    ctx.fillText("50", this.x + this.width*0.5 - this.fontSize * 0.3, this.y + this.height + this.fontSize);

    ctx.font = this.fontSize+"px serif";
    ctx.fillStyle = '#000000';
    ctx.fillText("0", this.x + this.width - this.fontSize * 0.3, this.y + this.height + this.fontSize);
  }
}
cuePowerButton.draw();

var ballYellow = {
  color : "rgb(229, 197, 51)",
  x : billiardTable.x + 0.25 * billiardTable.width,
  y : billiardTable.y + 0.5 * billiardTable.height,
  radius : ballRadius,
  angle : 0,
  //공의 속도 x,y축
  velocityX : 1,
  velocityY : 0,
  //공의 회전 축을 기준으로 컬
  spinX : 0,
  spinY : 0,
  spinZ : 0,
  velocity(){
    return (Math.sqrt(this.velocityX**2 + this.velocityY**2));
  }
}

function anglePoint1(){//오른쪽 아래
  return Math.atan((billiardTable.y + billiardTable.height - ballYellow.y)/(billiardTable.x + billiardTable.width - ballYellow.x));
}
function anglePoint2(){//왼쪽 아래
  return Math.atan((billiardTable.y + billiardTable.height - ballYellow.y)/(billiardTable.x - ballYellow.x)) + Math.PI; 
}
function anglePoint3(){//왼쪽 위
  return Math.atan((billiardTable.y - ballYellow.y)/(billiardTable.x - ballYellow.x)) + Math.PI;
}
function anglePoint4(){//오른쪽 위
  return Math.atan((billiardTable.y - ballYellow.y)/(billiardTable.x + billiardTable.width - ballYellow.x)) + Math.PI*2;
}

function drawBallPath(){
  var a = 200;
  var lineColor = "rgb(100, 100, 100)"
  ballYellow.angle = ballYellow.angle + (Math.PI*2)
  if((ballYellow.angle % (Math.PI*2) >= anglePoint1()) && (ballYellow.angle % (Math.PI*2) <= anglePoint2())){
    a = -(ballYellow.y - billiardTable.y-billiardTable.height)/(Math.sin(ballYellow.angle));
    //lineColor = "blue";
  }else if((ballYellow.angle % (Math.PI*2) >= anglePoint2()) && (ballYellow.angle % (Math.PI*2) <= anglePoint3())){
    a = (-ballYellow.x + billiardTable.x)/(Math.cos(ballYellow.angle));
    //lineColor = "red";
  }else if((ballYellow.angle % (Math.PI*2) >= anglePoint3()) && (ballYellow.angle % (Math.PI*2) <= anglePoint4())){
    a = -(ballYellow.y - billiardTable.y)/(Math.sin(ballYellow.angle));
    //lineColor = "yellow";
  }else{
    a = (-ballYellow.x + billiardTable.x+billiardTable.width)/(Math.cos(ballYellow.angle));
    //lineColor = "black";
  }

  var endX = ballYellow.x + Math.cos(ballYellow.angle) * a;
  var endY = ballYellow.y + Math.sin(ballYellow.angle) * a;

  ctx.beginPath();
  ctx.strokeStyle = lineColor; 
  ctx.lineWidth = 1;
  ctx.moveTo(ballYellow.x, ballYellow.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function ballYellowBounceCushion(){
  if(ballYellow.y >= billiardTable.y+billiardTable.height-ballRadius){
    ballYellow.velocityY = ballYellow.velocityY * (-1);
  }
  if(ballYellow.y <= billiardTable.y+ballRadius){
    ballYellow.velocityY = ballYellow.velocityY * (-1);
  }
  if(ballYellow.x >= billiardTable.x+billiardTable.width-ballRadius){
    ballYellow.velocityX = ballYellow.velocityX * (-1);
  }
  if(ballYellow.x <= billiardTable.x+ballRadius){
    ballYellow.velocityX = ballYellow.velocityX * (-1);
  }
}

function yellowBallDraw(position){
  ctx.beginPath();
  ctx.arc(position[0], position[1], ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = ballYellow.color;
  ctx.fill(); 
}

function basicSystemDraw(){
  backGround.draw();
  billiardTable.draw();
  leftButton.draw();
  rightButton.draw();
  ballButton.draw();
  cuePowerButton.draw();
}

function drawGame(yellowPosition){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  basicSystemDraw();
  yellowBallDraw(yellowPosition);
  //drawBallPath();
}
drawGame([ballYellow.x, ballYellow.y]);
drawBallPath();

function moveBalls(){
  ballYellow.x += ballYellow.velocityX;
  ballYellow.y += ballYellow.velocityY;
  if(ballYellow.velocityX != 0){
    ballYellow.velocityX = ballYellow.velocityX * 0.9997
  }
  if(ballYellow.velocityY != 0){
    ballYellow.velocityY = ballYellow.velocityY * 0.9997
  }
  ballYellowBounceCushion();

  return [ballYellow.x, ballYellow.y];
}



function playingGame(){
  state = "play"
  frame = []
  //공들의 위치를 계산하여 일정 간격의 프레임으로 저장
  var i = 0;
  while(Math.abs(ballYellow.velocity()) >= 0.0008){
    moveBalls()
    if(i%20==0){
      frame.push(moveBalls());
    }
    i++;
    console.log(ballYellow.velocity())
    if(i>1000000){//무한반복시에 탈출
      break;
    }
  }
  console.log(frame.length)
  //저장된 프레임들을 애니메이션 그리기
  i = 0;
  let raf; // requestAnimationFrame을 담을 변수
  const performAnimation = () => {
    /* 스타일 조정 스크립트 */
    drawGame(frame[i])
    i++;

    // 특정한 조건일 경우 raf를 중지하고 콜백 종료
    if(i>=frame.length) {
        cancelAnimationFrame(raf);
        state = "ready";
        console.log("state turns to ready")
        drawBallPath();
      return;
    }


    raf = requestAnimationFrame(performAnimation) 
      // 함수 내부에서 다시 requestAnimationFrame을 호출하여 반복
  }
requestAnimationFrame(performAnimation);
}
//출처: https://inpa.tistory.com/entry/🌐-requestAnimationFrame-가이드 [Inpa Dev 👨‍💻:티스토리]

//playingGame();

function clickIsRightButton(mouseX, mouseY){
  if((mouseX>=rightButton.x && mouseX <= rightButton.x + rightButton.width) && (mouseY>=rightButton.y && mouseY <= rightButton.y + rightButton.height)){
    return true;
  }
  else{
    return false;
  }
}
function clickIsLeftButton(mouseX, mouseY){
  if((mouseX>=leftButton.x && mouseX <= leftButton.x + leftButton.width) && (mouseY>=leftButton.y && mouseY <= leftButton.y + leftButton.height)){
    return true;
  }
  else{
    return false;
  }
}
function clickIsCueButton(mouseX, mouseY){
  if((mouseX>=cuePowerButton.x && mouseX <= cuePowerButton.x + cuePowerButton.width) && (mouseY>=cuePowerButton.y && mouseY <= cuePowerButton.y + cuePowerButton.height)){
    return true;
  }
  else{
    return false;
  }
}

function clickIsTable(mouseX, mouseY){
  if((mouseX>=billiardTable.x && mouseX <= billiardTable.x + billiardTable.width) && (mouseY>=billiardTable.y && mouseY <= billiardTable.y + billiardTable.height)){
    return true;
  }
  else{
    return false;
  }
}
function clickGame(event){
  var mouseX = event.clientX - ctx.canvas.offsetLeft;
  var mouseY = event.clientY - ctx.canvas.offsetTop;


  if(state == "ready"){//ready 상태일때 클릭시
    if(clickIsRightButton(mouseX, mouseY)){
      ballYellow.angle += 0.01;
      console.log("angle+");
      if(ballYellow.angle >= Math.PI*2){
        ballYellow.angle -= Math.PI*2
      }
      drawGame([ballYellow.x, ballYellow.y]);
      drawBallPath();
    }else if(clickIsLeftButton(mouseX, mouseY)){
      ballYellow.angle -= 0.01;
      console.log("angle-");
      if(ballYellow.angle <= 0){
        ballYellow.angle += Math.PI*2
      }
      drawGame([ballYellow.x, ballYellow.y]);
      drawBallPath();
    }
    else if(clickIsCueButton(mouseX,mouseY)){
      ballYellow.velocityX = Math.cos(ballYellow.angle) * 1.5 * ((cuePowerButton.x + cuePowerButton.width - mouseX)/cuePowerButton.width);
      ballYellow.velocityY = Math.sin(ballYellow.angle) * 1.5 * ((cuePowerButton.x + cuePowerButton.width - mouseX)/cuePowerButton.width);
      playingGame();
      state = "play";
    }
    else if(clickIsTable(mouseX,mouseY)){
      if(ballYellow.x-mouseX < 0){
        ballYellow.angle = -Math.asin((ballYellow.y-mouseY)/Math.sqrt((ballYellow.x-mouseX)**2 + (ballYellow.y-mouseY)**2));
      }
      else{
        ballYellow.angle = Math.asin((ballYellow.y-mouseY)/Math.sqrt((ballYellow.x-mouseX)**2 + (ballYellow.y-mouseY)**2)) + Math.PI;  
      }
      console.log("angle");
      drawGame([ballYellow.x, ballYellow.y]);
      drawBallPath();
    }

  }else if(state=="play"){//play즉 애니메이션 상태일때 클릭시
    console.log("state is play")
  }else{
   console.log("state error")
  }
}

canvas.addEventListener("click", clickGame);