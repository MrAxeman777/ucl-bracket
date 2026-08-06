let league = [...teams];

const container = document.getElementById("teams");


function loadTeams(){

container.innerHTML="";

league.forEach((team,index)=>{

let div=document.createElement("div");

div.className="team";

div.draggable=true;

div.id=index;

div.innerHTML=
`${index+1}. ${team}`;


div.addEventListener(
"dragstart",
e=>{
e.dataTransfer.setData(
"text",
index
);
});


div.addEventListener(
"dragover",
e=>{
e.preventDefault();
});


div.addEventListener(
"drop",
e=>{

let from =
e.dataTransfer.getData("text");

let to=index;


let moved =
league.splice(from,1)[0];


league.splice(
to,
0,
moved
);


loadTeams();

});


container.appendChild(div);

});

}


loadTeams();



function generateBracket(){

let top8 =
league.slice(0,8);

let playoffTeams =
league.slice(8,24);


let bracket =
document.getElementById("bracket");


bracket.innerHTML="";


bracket.innerHTML+=
"<h2>Knockout Playoffs</h2>";


for(let i=0;i<16;i+=2){

bracket.innerHTML+=`

<div class="match">

${playoffTeams[i]}

<br>

VS

<br>

${playoffTeams[i+1]}

</div>

`;

}



bracket.innerHTML+=
"<h2>Round of 16</h2>";


top8.forEach(team=>{

bracket.innerHTML+=`

<div class="match">

${team}

<br>

VS

<br>

Playoff Winner

</div>

`;

});


}
