let video;
let poseNet;
let poses = [];
var indexTrack = 0;
var allKeys = [];
// var newArray = new Array(34);

var min;
var max;
// var indexTrack = 0;
var options = {
 imageScaleFactor: 0.3,
 outputStride: 16,
 flipHorizontal: false,
 minConfidence: 0.5,
 maxPoseDetections: 5,
 scoreThreshold: 0.5,
 nmsRadius: 20,
 detectionType: 'single',
 multiplier: 0.75,
}
// var allKeys = [];
var keyVector = new Array(34);
var index = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, options, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results[0].pose;
    keypoints = poses.keypoints;
    // console.log(poses);

    // for (var i = 0; i < keypoints.length; i++){
    //   keyVector[i + index] = keypoints[i].position.x;
    //   index = index + 1;
    //   keyVector[i + index] = keypoints[i].position.y;
    //
    // }
    //
    // console.log(keyVector.length);
    // console.log(keyVector[28],keyVector[29]);
    // console.log(keyVector[30],keyVector[31]);
    // console.log(keyVector[32],keyVector[33]);
    // index = 0;
    keypointsToVec();


  });
    video.hide();
  }

  function modelReady() {
    select('#status').html('Model Loaded');
  }

  function draw() {
    image(video, 0, 0, width, height);
  }

  function keypointsToVec(){
    for (var i = 0; i < keypoints.length; i++){
      keyVector[i + index] = keypoints[i].position.x;
      index = index + 1;
      keyVector[i + index] = keypoints[i].position.y;

    }

    console.log(keyVector.length);
    // console.log(keyVector[28],keyVector[29]);
    // console.log(keyVector[30],keyVector[31]);
    // console.log(keyVector[32],keyVector[33]);

    index = 0;
  }
