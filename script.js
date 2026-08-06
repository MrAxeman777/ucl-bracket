let league = [...teams];


const container = document.getElementById("teams");


league.forEach((team,index)=>{

let div=document.createElement("div");

div.className="team";

div.innerHTML =
`${index+1}. ${team}`;

div.onclick=()=>{

let newPos =
prompt(
"Move "+team+
" to position (1-36)"
);

if(newPos){

league.splice(index,1);

league.splice(
newPos-1,
0,
team
);

location.reload();

}

}

container.appendChild(div);

});



function generateBracket(){

let top8 = league.slice(0,8);

let playoffs = league.slice(8,24);


let bracket =
document.getElementById("bracket");


bracket.innerHTML =
"<h2>Playoffs</h2>";


for(let i=0;i<playoffs.length;i+=2){

bracket.innerHTML +=
`
<div class="match">
${playoffs[i]}
<br>
VS
<br>
${playoffs[i+1]}
</div>
`;

}


bracket.innerHTML +=
"<h2>Round of 16</h2>";

top8.forEach(team=>{

bracket.innerHTML +=
`
<div class="match">
${team}
<br>
VS
<br>
Winner Playoff
</div>
`;

});


}
