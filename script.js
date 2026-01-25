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
function playmusic(track){
        currSong.src="Songs/"+track+".mp3";
        currSong.play();
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

}
main();
