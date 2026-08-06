let league = [...teams];

let knockout = {
    playoffs: [],
    r16: [],
    qf: [],
    sf: [],
    final: []
};


function createMatch(a,b,stage,id){

return `
<div class="match">

<button onclick="pickWinner('${a}','${stage}',${id})">
${a}
</button>

<p>VS</p>

<button onclick="pickWinner('${b}','${stage}',${id})">
${b}
</button>

</div>
`;

}



function pickWinner(team,stage,id){

knockout[stage][id]=team;

renderBracket();

}





function generateKnockout(){

knockout.playoffs=[];

let teams =
league.slice(8,24);


for(let i=0;i<16;i+=2){

knockout.playoffs.push({
a:teams[i],
b:teams[i+1],
winner:null
});

}


renderBracket();

}





function renderBracket(){

let box=document.getElementById("bracket");

let html="";



// PLAYOFFS

if(knockout.playoffs.length){

html+="<h2>Playoff Round</h2>";

knockout.playoffs.forEach((m,i)=>{

if(m.winner){

html+=`
<div class="match">
Winner: ${m.winner}
</div>
`;

}

else{

html+=createMatch(
m.a,
m.b,
"playoffs",
i
);

}

});

}




// R16

if(knockout.playoffs.filter(x=>x.winner).length===8){

html+="<h2>Round of 16</h2>";

let playoffWinners=
knockout.playoffs.map(x=>x.winner);


let r16Teams=[
...league.slice(0,8),
...playoffWinners
];


for(let i=0;i<16;i+=2){

html+=createMatch(
r16Teams[i],
r16Teams[i+1],
"r16",
i/2
);

}

}




box.innerHTML=html;


}





function resetAll(){

localStorage.clear();

location.reload();

}


loadLeague();
