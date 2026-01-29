let currSong=new Audio();
let currentSongname=null;
let isrepeat=false;
let currFolder;
async function getsongs(folder){
    currFolder=folder
    let a = await fetch(`/Songs/${folder}`);
    let responce=await a.text();
    let div=document.createElement("div");
    div.innerHTML=responce;
    let as=div.getElementsByTagName("a");
    let songs=[];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`%5C${currFolder}%`)[1]);
        }

    }
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songul.innerHTML="";
    for(const song of songs){
        songul.innerHTML=songul.innerHTML+`<li>
                            <img class="songplay" src="thumbnail/${song.replaceAll("%20"," ").replaceAll("5C","").replace(".mp3", "")}.jpg" alt="thumbnail">
                            <div class="info">
                                <div class="songname">${song.replaceAll("%20"," ").replaceAll("5C","").replace(".mp3", "")}</div>
                            </div>
                            <div class="playnow">
                                <img class="invert" src="Images/play.svg" alt="playimg">
                            </div>
        </li>`;
        
    } 
    // Attaching a event listner to the li tag
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",()=>{
            playmusic(e.querySelector(".info").firstElementChild.innerHTML);
        });
    });

    return songs;
}
function secondtominute(second){
    if(isNaN(second) || second<0){
        return "00:00";
    }
    let minute=Math.floor(second/60);
    let remainingsec=Math.floor(second%60);

    let formattedmin=String(minute).padStart(2,'0');
    let formattedsec=String(remainingsec).padStart(2,'0');
    return `${formattedmin}:${formattedsec}`;
}

currSong.addEventListener("timeupdate",()=>{
    let current=currSong.currentTime;
    let duration=currSong.duration;
    let percent=(current/duration)*100
    document.querySelector(".startTime").innerHTML=`${secondtominute(current)}`;
    document.querySelector(".endTime").innerHTML=`${secondtominute(duration)}`;
    
    document.querySelector(".pointer").style.left=percent +"%";
    document.querySelector(".seekbar").style.background = `linear-gradient(to right, #00ff5e ${percent}%, white ${percent}%)`;
});

document.querySelector(".seekbar").addEventListener("click",(e)=>{
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.querySelector(".pointer").style.left=percent+"%";
    document.querySelector(".seekbar").style.backgroundColor="green";
    currSong.currentTime=(currSong.duration*percent)/100;

    document.querySelector(".seekbar").style.background = `linear-gradient(to right, #00ff5e ${percent}%, white ${percent}%)`;
    
}); 
function playmusic(track){
        currentSongname=track;
        currSong.src="Songs/"+currFolder+"/"+track+".mp3";
        currSong.play();
        //The change of the play and stop icon
        document.querySelector(".playbutton img").src="Images/pause.svg";
        //The image change in the playbar
        document.querySelector("#current-song-image").src=`thumbnail/${track}.jpg`;
        //The song name change in the playbar
        document.querySelector(".current-song-info").innerHTML=track;
        document.querySelector(".songdetails").style.opacity="1";
}
async function displayalbum(){
    let a = await fetch("Songs/");
    let response=await a.text();
    let div=document.createElement("div");
    div.innerHTML=response;
    let anchors=div.getElementsByTagName("a");
    let cardContainer=document.querySelector(".cardContainer");
    let array=Array.from(anchors); // foreach won't work therefore using traditional for loop here beacause we need to make the for each function async that creates problem
        for(let index=0;index<array.length;index++){
        const e=array[index];
        if(e.href.includes("%5CSongs")){
            //get the folder name
            let folder=e.href.split("Songs%5C")[1];
            //Get the metadata of the folder
            let a = await fetch(`Songs/${folder}/info.json`);
            let responce=await a.json();
            cardContainer.innerHTML=cardContainer.innerHTML+`<div class="card" data-folder="${folder.replace("/","")}"}>
                        <div class="play">
                            <div class="greencircle"> <img id="playbutton" src="Images/play.svg" alt="play">
                            </div>
                        </div>
                        <img src="Songs/${folder}/cover.jpeg" alt="Happy Hits">
                        <h2>${responce.title}</h2>
                        <p>${responce.description}</p>
                    </div>`
            }
        }
        //load album when clicked on songs
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click",async item=>{
            songs=await getsongs(item.currentTarget.dataset.folder);
        });
    });
    
}
async function main(){
    //Get the list of all the songs
    let songs= await getsongs("happyhits"); 
    //Display albums 
    displayalbum();
    //Attach event listner to play and pause and next and previous song 
    let play=document.querySelector(".playbutton");
    play.addEventListener("click",()=>{
        // If there is no song playing currently the play button should become non-functional
        if(currentSongname===null){
            return;
        }
        if(currSong.paused){
            currSong.play();
            document.querySelector(".playbutton img").src="Images/pause.svg";
        }
        else{
            currSong.pause();
            document.querySelector(".playbutton img").src="Images/play.svg";
        }
    });
    currSong.addEventListener("ended", () => {
    document.querySelector(".nextsongbutton").click();
    })

    let previousbutton=document.querySelector(".previousbutton");
    previousbutton.addEventListener("click",()=>{
        let currSongplaying="5C"+currSong.src.split("/").pop();
        let index=songs.indexOf(currSongplaying);
        if((index-1>=0)){
            playmusic(songs[index-1].replaceAll("%20"," ").replaceAll("5C","").replace(".mp3",""));
        }
        
    });
    let next=document.querySelector(".nextsongbutton");
    next.addEventListener("click",()=>{
        let currSongplaying="5C"+currSong.src.split("/").pop();
        let index=songs.indexOf(currSongplaying);
        if((index+1<=songs.length)){
            playmusic(songs[index+1].replaceAll("%20"," ").replaceAll("5C","").replace(".mp3",""));
        }
    });
    //for repeat button
    reapeat=document.querySelector(".reapeat").addEventListener("click",()=>{
        isrepeat=!isrepeat
        if(isrepeat){
            currSong.currentTime=0;
            document.querySelector(".playbutton img").src="Images/pause.svg"
            currSong.play();
        }
        else{
            document.querySelector(".nextsongbutton").click;
        }
    });
    //for hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0";
    });
    //for closing the library
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-150%"
    });
    //volume control
    let Volume=document.querySelector(".range").getElementsByTagName("input")[0];
    Volume.addEventListener("input",(e)=>{
        currSong.volume=parseInt(e.target.value)/100;
        if(currSong.volume==0){
            document.querySelector(".volume").src="Images/mute.svg";
        }
        else{
            document.querySelector(".volume").src="Images/volume.svg"
        }
    });
    document.querySelector(".volume").addEventListener("click",(e)=>{
        if (e.target.src.includes("volume.svg")) {
        e.target.src = e.target.src.replace("volume.svg", "mute.svg");
        currSong.volume = 0;
        }
        else{
            e.target.src=e.target.src.replace("mute.svg","volume.svg");
            currSong.volume=1;
        }
    });

}
main();
