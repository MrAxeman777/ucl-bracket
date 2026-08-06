let league = [...teams];

let knockout = {
    playoffs: [],
    r16: [],
    qf: [],
    sf: [],
    final: [],
    champion: null
};


// LOAD SAVED PREDICTION

if(localStorage.getItem("uclLeague")) {
    league = JSON.parse(localStorage.getItem("uclLeague"));
}



// DISPLAY LEAGUE TABLE

function loadLeague(){

const container = document.getElementById("teams");

container.innerHTML="";


league.forEach((team,index)=>{

let div=document.createElement("div");

div.className="team";

div.draggable=true;

div.dataset.index=index;


div.innerHTML = `
<b>${index+1}</b>
<br>
${team}
`;


// DRAG START

div.addEventListener(
"dragstart",
e=>{
e.dataTransfer.setData(
"index",
index
);
});


// DRAG OVER

div.addEventListener(
"dragover",
e=>{
e.preventDefault();
});


// DROP

div.addEventListener(
"drop",
e=>{

let from =
Number(e.dataTransfer.getData("index"));

let to=index;


let moved =
league.splice(from,1)[0];


league.splice(
to,
0,
moved
);


save();

loadLeague();

});



container.appendChild(div);


});


}



function save(){

localStorage.setItem(
"uclLeague",
JSON.stringify(league)
);

}



// CREATE MATCH BUTTONS

function match(team1,team2,stage,id){

return `

<div class="match">

<button onclick="winner('${team1}','${stage}',${id})">

${team1}

</button>


<h3>VS</h3>


<button onclick="winner('${team2}','${stage}',${id})">

${team2}

</button>

</div>

`;

}



// PICK WINNER

function winner(team,stage,id){


knockout[stage][id]=team;


generateNext();


}



// CREATE KNOCKOUT

function createKnockout(){


save();


let bracket =
document.getElementById("bracket");


bracket.innerHTML="";


// PLAYOFFS

let playoffTeams =
league.slice(8,24);



bracket.innerHTML +=
"<h2>🔥 Knockout Playoffs</h2>";



for(let i=0;i<16;i+=2){

bracket.innerHTML +=
match(
playoffTeams[i],
playoffTeams[i+1],
"playoffs",
i/2
);

}



// DIRECT R16 TEAMS


knockout.r16=[];


}



function generateNext(){


let bracket =
document.getElementById("bracket");


let html="";



// PLAYOFF WINNERS

let playoffWinners =
knockout.playoffs.filter(Boolean);



if(playoffWinners.length===8){


html += "<h2>🏆 Round of 16</h2>";



let direct =
league.slice(0,8);



let teams16 =
[
...direct,
...playoffWinners
];



for(let i=0;i<16;i+=2){

html +=
match(
teams16[i],
teams16[i+1],
"r16",
i/2
);

}


}




// QUARTERS


let r16w =
knockout.r16.filter(Boolean);



if(r16w.length===8){


html += "<h2>Quarterfinals</h2>";



for(let i=0;i<8;i+=2){

html +=
match(
r16w[i],
r16w[i+1],
"qf",
i/2
);

}

}




// SEMIS


let qfw =
knockout.qf.filter(Boolean);


if(qfw.length===4){


html += "<h2>Semifinals</h2>";



for(let i=0;i<4;i+=2){

html +=
match(
qfw[i],
qfw[i+1],
"sf",
i/2
);

}

}




// FINAL


let sfw =
knockout.sf.filter(Boolean);


if(sfw.length===2){


html += "<h2>FINAL</h2>";



html +=
match(
sfw[0],
sfw[1],
"final",
0
);


}




// CHAMPION


if(knockout.final[0]){


knockout.champion =
knockout.final[0];


html += `

<div class="champion">

🏆 CHAMPION 🏆

<h1>
${knockout.champion}
</h1>

</div>

`;

}



bracket.innerHTML=html;


}



// RESET EVERYTHING

function reset(){

localStorage.removeItem("uclLeague");


league=[...teams];


knockout={
playoffs:[],
r16:[],
qf:[],
sf:[],
final:[],
champion:null
};


loadLeague();


document.getElementById("bracket").innerHTML="";


}




loadLeague();
