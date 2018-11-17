var port = 3333;
var url = 'localhost';
var socket = io.connect(url + ':' + port);


//take each image
//run posenet

//create an object
//store in an array (array of objects)
// <img id='cat' src='/images/haley1.jpg'/>

// for loop to create each object
var imageData = [];
var imageScaleFactor = 0.5;
var outputStride = 16;
var flipHorizontal = true;
var indexTrack = 0;

socket.on("connect", function(){
  console.log("Connected!");
});

function setupData(){

  for (let i = 0; i < 1; i++){
    imageData[i] = {
      image: 'images/img' + i.toString() + '.jpg',
      allData: '', //the vector with all values.
      kVectorData: [], //0-33
      confVectorData: [],//34-51
      confSum: [] //52
    };

  }
}
function setup(){
  setupData();
  console.log(imageData);
  poseData();
  exportData();
  console.log(imageData);
  // socket.emit('message', "wtf");

}


var body = document.getElementById("data");

function poseData(){
  var allKeys = [];
  for (var i = 0; i < imageData.length; i++){

    var image = document.createElement("img");
    body.appendChild(image);
    image.src = imageData[i].image;


    // var img = createImg(imageData[i].image);
    var imageElement = document.getElementById('cat');


    posenet.load().then(function(net){
      return net.estimateSinglePose(image, imageScaleFactor, flipHorizontal, outputStride)
    }).then(function(pose){
      // console.log(pose);

      for (var i = 0; i < pose.keypoints.length; i++){

        allKeys[i+indexTrack] = pose.keypoints[i].position.x;
        indexTrack = indexTrack + 1;
        allKeys[i+indexTrack] = pose.keypoints[i].position.y;
        // console.log(indexTrack);
      }


    });

    imageData[i].allData = allKeys;
    // socket.emit('imageData', {image: imageData[i].allData.toString()});

  }
}



function exportData(){
//
  socket.emit('imageData', imageData);
  console.log("sent");

}
// exportData();
