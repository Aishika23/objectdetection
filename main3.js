img = "";
Status = "";
objects = [];
percent = 0;

function preload(){
    img = loadImage('hallway.jpg');
  }
function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocoSSD', modelLoaded);
}
function modelLoaded() {
    console.log("Model Loaded");
    Status = true;
    objectDetector.detect(img, gotResults);
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else
    {
        console.log(results);
         objects = results;
    }
}
function draw()
{
    image(img, 0, 0, 640, 420);
    if (Status != "") {
        for (i = 0; i < objects.length; i++) 
        {
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y,  objects[i].height, objects[i].width);
        }
    }
    
}