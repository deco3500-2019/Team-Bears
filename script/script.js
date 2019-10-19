var myGamePiece;
var myGameMonster;
var myBackground;
var charaHP;
var MonsHP;
var charaHPB;
var MonsHPB;

function startGame() {
    myGameArea.start();
    myGameMonster = new component(140, 140, "./statics/monster.png", 270, 110, "image");
    myBackground = new component(500, 300, "./statics/background.png", 0, 0, "background");
    myGamePiece = new component(92, 128, "./statics/character.png", 104, 120,"image");
    charaHP = new component(140,15, "#A1DD7C",74, 60 );
    charaHPB = new component(160,30, "#E5E5E5",65, 53 );
    MonsHP = new component(140, 15, "#DD7C8F", 280, 60);
    MonsHPB = new component(160,30, "#E5E5E5",270, 53);
    
    
}

var myGameArea = {
    canvas : document.getElementById("c"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image"||type =="background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image"||type =="background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
                if (type == "background") {
                    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
                  }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY; 
        if (this.type == "background") {
            if (this.x == -(this.width)) {
              this.x = 0;       
    }    
}}}

function updateGameArea() {
    
    var exercisevalue = $("#exerciseinput").val();
    var dietvalue = $("#dietinput").val();
    var attack =(dietvalue-exercisevalue);
    myGameArea.clear();
    myBackground.speedX = -1;
    myBackground.newPos();    
    myBackground.update();
    myGamePiece.newPos();    
    myGamePiece.update();
    charaHPB.update();
    charaHP.update();
    if(attack>0){
        myGameMonster.update();
        MonsHPB.update();
        MonsHP.update();
        console.log(attack);
        charaHP.width=140-attack;
        if(charaHP.width<0){
            charaHP.width=0;
        }
        
    }
    // if(exercisevalue>dietvalue){

    // }
    
}

function move(dir) {
    myGamePiece.image.src = "angry.gif";
    if (dir == "up") {myGamePiece.speedY = -1; }
    if (dir == "down") {myGamePiece.speedY = 1; }
    if (dir == "left") {myGamePiece.speedX = -1; }
    if (dir == "right") {myGamePiece.speedX = 1; }
}

function clearmove() {  
    myGamePiece.image.src = "smiley.gif";
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
