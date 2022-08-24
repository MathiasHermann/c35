var balao,balloonImage1,balloonImage2;
var database;
var altura;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

//Função para definir o ambiente inicial
function setup() {

   database=firebase.database();

  createCanvas(1500,700);

  balao=createSprite(250,650,150,150);
  balao.addAnimation("hotAirBalloon",balloonImage1);
  balao.scale=0.5;

  var balloonaltura=database.ref('balao/altura');
  balloonaltura.on("value",readaltura, showError);



  textSize(20); 
}

// função para exibir a UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updatealtura(-10,0);
    balao.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updatealtura(10,0);
    balao.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updatealtura(0,-10);
    balao.addAnimation("hotAirBalloon",balloonImage2);
    balao.scale=balao.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updatealtura(0,+10);
    balao.addAnimation("hotAirBalloon",balloonImage2);
    balao.scale=balao.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use as setas para mover o balão de ar quente!",40,40);
}

 function updatealtura(x,y){
   database.ref('balao/altura').set({
     'x': altura.x + x ,
     'y': altura.y + y
   })
 }


//ESCOLHA A FUNÇÃO DE READaltura CORRETA
// function readaltura(data){
//   balao.x = altura.x;
//   balao.y = altura.y;
// }

function readaltura(data){
  altura = data.val();
  balao.x = altura.x;
  balao.y = altura.y;
}

// function readaltura(data){
//   altura = data.val();
// }

// function readaltura(){
//   altura = val();
//   balao.x = altura.x;
//   balao.y = altura.y;
// }

function showError(){
  console.log("Erro ao escrever no banco de dados");
}
