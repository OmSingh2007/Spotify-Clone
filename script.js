let currSong=new Audio();
async function getsongs(){
    let a = await fetch("http://127.0.0.1:3000/Songs/");
    let responce=await a.text();
    let div=document.createElement("div");
    div.innerHTML=responce;
    let as=div.getElementsByTagName("a");
    let songs=[];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("%5CSongs%")[1]);
        }

    }
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

        currSong.src="Songs/"+track+".mp3";
        currSong.play();
        //The change of the play and stop icon
        document.querySelector(".playbutton img").src="Images/pause.svg";
        //The image change in the playbar
        document.querySelector("#current-song-image").src=`thumbnail/${track}.jpg`;
        //The song name change in the playbar
        document.querySelector(".current-song-info").innerHTML=track;
        document.querySelector(".songdetails").style.opacity="1";
}
async function main(){
    let songs= await getsongs();
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
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
          console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playmusic(e.querySelector(".info").firstElementChild.innerHTML);
        });
    });
    
    //Attach event listner to play and pause and next and previous song 
    let play=document.querySelector(".playbutton");
    play.addEventListener("click",()=>{
        if(currSong.paused){
            currSong.play();
            document.querySelector(".playbutton img").src="Images/pause.svg";
        }
        else{
            currSong.pause();
            document.querySelector(".playbutton img").src="Images/play.svg";
        }
    });

    let previousbutton=document.querySelector(".previousbutton");
    previousbutton.addEventListener("click",()=>{
        let currSongplaying="5C"+currSong.src.split("/").pop();
        console.log(currSongplaying);
        console.log(songs);
        let index=songs.indexOf(currSongplaying);
        if((index-1>=0)){
            playmusic(songs[index-1].replaceAll("%20"," ").replaceAll("5C","").replace(".mp3",""));
        }
        
    });
    let next=document.querySelector(".nextsongbutton");
    next.addEventListener("click",()=>{
        let currSongplaying="5C"+currSong.src.split("/").pop();
        console.log(currSongplaying);
        console.log(songs);
        let index=songs.indexOf(currSongplaying);
        if((index+1<=songs.length)){
            playmusic(songs[index+1].replaceAll("%20"," ").replaceAll("5C","").replace(".mp3",""));
        }
    });
    
}
main();
