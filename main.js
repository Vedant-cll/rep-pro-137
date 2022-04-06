video="";
status="";
var objects=new Array();
var obj_name= "";
var song= "";
var no_objects;
var synth = window.speechSynthesis;

function preload(){
    canvas=createCanvas(500,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(500,500);
    video.hide();
    
}

function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();
}

function start(){
    
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "status : Detecting objects";
obj_name = document.getElementById("inputtext").value;

}


function modelLoaded(){
    console.log("modelLoaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);

}



function gotResult(error, results){

    if(error){
        console.error(error);
    }
    else{
    console.log(results);
    objects = results;
    no_objects = objects.length;
    }
}

function draw(){
    image(video, 0 , 0 , 500 , 500);

    if(status != ""){
        objectDetector.detect(video, gotResult);
        
        
        for(i=0; i< no_objects; i++){
            console.log(obj_name);
            if(objects[i].label == obj_name)
            {
                
                document.getElementById("status").innerHTML= "Status : Objects Detected" ;
               document.getElementById("number_of_objects").innerHTML= " Number of Objects Detected are : " + no_objects ;
        
        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x , objects[i].y );
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }

            if(objects[i].label != obj_name){
                document.getElementById("status").innerHTML = obj_name + " Not found" ;
            }

    }
        
        
        }

        for( i=0; i<objects.length; i++ ){
        if(objects[i].label == obj_name){
    
            console.log(obj_name);

            

            var utterance = new SpeechSynthesisUtterance(obj_name + 'Found');
            window.speechSynthesis.speak(utterance);
              }


            
        
            }

        }