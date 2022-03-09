var canvas = document.querySelector("#ahorcado");
var pincel = canvas.getContext("2d");

function reiniciar (){
    pincel.clearRect(0,0,400,400);
}

function baseAhorcado (){
    pincel.fillStyle = "darkblue";
    pincel.fillRect(0,390,150,400);
    pincel.fillRect(0,0,10,400);
    pincel.fillRect(0,0,200,10);
    pincel.fillRect(195,0,10,50);

    pincel.strokeStyle = "darkblue";
    pincel.lineWidth = 10;
    pincel.beginPath();
    pincel.moveTo(0,50);
    pincel.lineTo(200,10);
    pincel.stroke();

    pincel.fillStyle = "#EDEDED";
    pincel.fillRect(205,0,200,10);
    pincel.fillRect(390,0,10,400);
    pincel.fillRect(150,390,250,10);
}

function ahorcado(intentos){

    if(intentos>5){
        // cabeza
        pincel.fillStyle = "#FBCEB1";
        pincel.strokeStyle = "#dba17c";
        pincel.beginPath();
        pincel.arc(225,110,30,180,Math.PI);
        pincel.fill();
        pincel.stroke();
        
        pincel.strokeStyle = "red";
        pincel.beginPath();
        pincel.strokeRect(210,115,0,10);
        pincel.strokeRect(205,120,10,0);
        pincel.strokeRect(230,125,0,10);
        pincel.strokeRect(225,130,10,0);
        pincel.stroke();
    }else{
        if(intentos>4){
            // brazo 2
            pincel.fillStyle = "#FBCEB1";
            pincel.strokeStyle = "#dba17c";
            pincel.lineWidth = 1;
            pincel.beginPath();
            pincel.moveTo(225,110);
            pincel.lineTo(240,120);
            pincel.lineTo(245,170);
            pincel.lineTo(245,250);
            pincel.lineTo(225,250);
            pincel.lineTo(225,110);
            pincel.fill();
            pincel.stroke();
        }else{
            if(intentos>3){
            // brazo 1
            pincel.fillStyle = "#FBCEB1";
            pincel.strokeStyle = "#dba17c";
            pincel.lineWidth = 1;
            pincel.beginPath();
            pincel.moveTo(175,110);
            pincel.lineTo(160,120);
            pincel.lineTo(155,170);
            pincel.lineTo(155,250);
            pincel.lineTo(175,250);
            pincel.lineTo(175,110);
            pincel.fill();
            pincel.stroke();
            }else{
                if(intentos>2){
                    // pierna 1
                    pincel.fillStyle = "#FBCEB1";
                    pincel.strokeStyle = "#dba17c";
                    pincel.lineWidth = 1;
                    pincel.beginPath();
                    pincel.moveTo(235,210)
                    pincel.lineTo(235,350);
                    pincel.lineTo(215,350);
                    pincel.lineTo(215,235);
                    pincel.lineTo(235,210);
                    pincel.fill();
                    pincel.stroke();
            }else{
                if(intentos>1){
                    // pierna 2
                    pincel.fillStyle = "#FBCEB1";
                    pincel.strokeStyle = "#dba17c";
                    pincel.lineWidth = 1;
                    pincel.beginPath();
                    pincel.moveTo(165,210);
                    pincel.lineTo(165,350);
                    pincel.lineTo(185,350);
                    pincel.lineTo(185,235);
                    pincel.lineTo(165,210);
                    pincel.fill();
                    pincel.stroke();
                }else{
                    if(intentos>0){
                            // torso
                        pincel.fillStyle = "#FBCEB1";
                        pincel.lineWidth = 1;
                        pincel.beginPath();
                        pincel.arc(200,140,40,0,2*Math.PI);
                        pincel.arc(200,210,35,0,2*Math.PI);
                        pincel.lineTo(165,210);
                        pincel.lineTo(160,140);
                        pincel.fill();

                        // horca
                        pincel.strokeStyle = "darkblue";
                        pincel.lineWidth = 5;
                        pincel.beginPath();
                        pincel.moveTo(200,50)
                        pincel.lineTo(200,75);
                        pincel.arc(200,110,12,0,(2*Math.PI)/2);
                        pincel.lineTo(200,75);
                        pincel.stroke();
                    }
                    }
                }
            }
        }
    }
}