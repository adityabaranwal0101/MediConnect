


const socket = io('http://localhost:3000');


var videoChatForm=document.getElementById('video-chat-form');
var videoChatRoom=document.getElementById('video-chat-rooms');
var joinBtn=document.getElementById('join');
var roomInput=document.getElementById('roomName');
var userVideo=document.getElementById('user-video');
var divBtnGroup=document.getElementById('btn-group');
var muteButton=document.getElementById('muteButton');
var hideCameraBtn=document.getElementById('hideCamera');
var leaveRoomBtn=document.getElementById('leaveRoomBtn');

var muteFlag=false;
var hideCameraFlag=false;

//upgrading
var peerVideo=document.getElementById('peer-video');

var roomName;
document.getElementById('join').addEventListener('click', function() {
    roomName = roomInput.value;
    console.log(roomName);
});

navigator.getUserMedia=navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var creator=false;
var rtcPeerConnection;

var userStream;
var iceServers={
    iceServers:[
        {urls:"stun:stun1.l.google.com:19302"}

    ]
};


joinBtn.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key ==='Enter') {
        if(roomInput.value==""){
            alert('please enter a room name');
        }
        else{
            roomName=roomInput.value;
            console.log(roomName);
            socket.emit("join",roomName);
            
            
        }
    }
  });

joinBtn.addEventListener('click',function(){
    if(roomInput.value==""){
        alert('please enter a room name');
    }
    else{
        roomName=roomInput.value;
        console.log(roomName);
        socket.emit("join",roomName);
        
        
    }
})
muteButton.addEventListener('click',function(){
    muteFlag=!muteFlag;
    if(muteFlag){
      userStream.getTracks()[0].enabled=false;
      muteButton.textContent='Unmute';  
    }
    else{
      userStream.getTracks()[0].enabled=true;
      muteButton.textContent='Mute';
    }
})

hideCameraBtn.addEventListener('click',function(){
    hideCameraFlag=!hideCameraFlag;
    if(hideCameraFlag){
      userStream.getTracks()[1].enabled=false;
      hideCameraBtn.textContent='show Camera';  
    }
    else{
      userStream.getTracks()[1].enabled=true;
      hideCameraBtn.textContent='Hide Camera';
    }
})


socket.on("created",function(){
    creator=true;
    navigator.getUserMedia(
        {
          audio:true,
          video:{
            width:700,height:900
          }
        },
        function(stream){
            userStream=stream;
            videoChatForm.style="display:none";
            divBtnGroup.style="display:flex";
           userVideo.srcObject=stream
           userVideo.onloadedmetadata=function(e){
            userVideo.play();
           }
           console.log(roomName);
           socket.emit("ready",roomName);
        },
        function(error){
           alert("you can't access Media ");
        }
        );
})
socket.on("joined",function(){
    creator=false;
    console.log("joined" +roomName);
    navigator.getUserMedia(
        {
          audio:true,
          video:{
            width:700,height:900
          }
        },
        function(stream){
            userStream=stream;
            videoChatForm.style="display:none";
            divBtnGroup.style="display:flex";
           userVideo.srcObject=stream
           userVideo.onloadedmetadata=function(e){
            userVideo.play();
           }
           socket.emit("ready",roomName);
        },
        function(error){
           alert("you can't access Media ");
        }
        );
})
socket.on("full",function(){
    alert("Room is Full");
});

socket.on("ready",function(){
    
    if(creator){
        rtcPeerConnection= new RTCPeerConnection(iceServers);
        rtcPeerConnection.onicecandidate=OnIceCandidateFunction;
        rtcPeerConnection.ontrack=OnTrackFunction;
        rtcPeerConnection.addTrack(userStream.getTracks()[0],userStream);// for audio track
        rtcPeerConnection.addTrack(userStream.getTracks()[1],userStream);// for video track
        
        rtcPeerConnection.createOffer(
            function(offer){
               rtcPeerConnection.setLocalDescription(offer); 
              socket.emit("offer",offer,roomName);
            },
            function(error){

            }
        );
    }
});
socket.on("candidate",function(candidate){
    var iceCandidate=new RTCIceCandidate(candidate);
    rtcPeerConnection.addIceCandidate(iceCandidate);
});
socket.on("offer",function(offer){
    if(!creator){
        rtcPeerConnection= new RTCPeerConnection(iceServers);
        rtcPeerConnection.onicecandidate=OnIceCandidateFunction;
        rtcPeerConnection.ontrack=OnTrackFunction;
        rtcPeerConnection.addTrack(userStream.getTracks()[0],userStream);// for audio track
        rtcPeerConnection.addTrack(userStream.getTracks()[1],userStream);// for video track
        rtcPeerConnection.setRemoteDescription(offer);
        rtcPeerConnection.createAnswer(
            function(answer){
              rtcPeerConnection.setLocalDescription(answer);
              socket.emit("answer",answer,roomName);
            },
            function(error){

            }
        );
    }
})
socket.on("answer",function(answer){
    rtcPeerConnection.setRemoteDescription(answer);
})


leaveRoomBtn.addEventListener("click",function(){
    socket.emit("leave",roomName);
    videoChatForm.style="display:block";
    divBtnGroup.style="display:none";
    
    if(userVideo.srcObject){
        userVideo.srcObject.getTracks()[0].stop();
        userVideo.srcObject.getTracks()[1].stop();
    }
    if(peerVideo.srcObject){
        peerVideo.srcObject.getTracks()[0].stop();
        peerVideo.srcObject.getTracks()[1].stop();
    }

    if(rtcPeerConnection){
        rtcPeerConnection.ontrack=null;
        rtcPeerConnection.onicecandidate=null;
        rtcPeerConnection.close();
    }
});
socket.on("leave",function(){
    creator=true;
    if(peerVideo.srcObject){
        peerVideo.srcObject.getTracks()[0].stop();
        peerVideo.srcObject.getTracks()[1].stop();
    }

    if(rtcPeerConnection){
        rtcPeerConnection.ontrack=null;
        rtcPeerConnection.onicecandidate=null;
        rtcPeerConnection.close();
    }
});


function OnIceCandidateFunction(event){
    if(event.candidate){
        socket.emit("candidate",event.candidate,roomName);
    }
}
function OnTrackFunction(event){
    peerVideo.srcObject=event.streams[0];
    peerVideo.onloadedmetadata=function(e){
      peerVideo.play();
    }
}