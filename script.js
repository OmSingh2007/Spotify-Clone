async function getsongs(){
    let a = await fetch("http://127.0.0.1:3000/Songs/");
    let responce=await a.text();
    console.log(responce);
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
async function main(){
    let songs= await getsongs();
    console.log(songs);
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for(const song of songs){
        songul.innerHTML=songul.innerHTML+`<li> ${song.replaceAll("%20"," ").replaceAll("5C","")} </li>`;
    }  
    let audio=new Audio(songs[0]);
    // audio.play();


}
main();
