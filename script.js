let leagueTeams = [...teams];

let rounds = {
    playoffs: [],
    r16: [],
    qf: [],
    sf: [],
    final: []
};


const leagueTable = document.getElementById("leagueTable");
const knockout = document.getElementById("knockout");


function saveData() {
    localStorage.setItem(
        "uclLeague",
        JSON.stringify(leagueTeams)
    );

    localStorage.setItem(
        "uclRounds",
        JSON.stringify(rounds)
    );
}


function loadData() {

    const savedTeams =
        localStorage.getItem("uclLeague");

    const savedRounds =
        localStorage.getItem("uclRounds");


    if(savedTeams){
        leagueTeams = JSON.parse(savedTeams);
    }


    if(savedRounds){
        rounds = JSON.parse(savedRounds);
    }

}



function renderLeague(){

    leagueTable.innerHTML = "";


    leagueTeams.forEach((team,index)=>{

        let div=document.createElement("div");

        div.className="team";

        div.draggable=true;


        div.innerHTML =
        `
        <span class="position">${index+1}</span>
        ${team}
        `;


        div.addEventListener(
            "dragstart",
            ()=>{
                div.classList.add("dragging");
                dragged=index;
            }
        );


        div.addEventListener(
            "dragend",
            ()=>{
                div.classList.remove("dragging");
            }
        );


        div.addEventListener(
            "dragover",
            e=>{
                e.preventDefault();
            }
        );


        div.addEventListener(
            "drop",
            ()=>{

                let temp=leagueTeams[dragged];

                leagueTeams.splice(dragged,1);

                leagueTeams.splice(index,0,temp);

                saveData();

                renderLeague();

            }
        );


        leagueTable.appendChild(div);


    });

}



let dragged;



function createMatch(team1,team2,round,index){


return `

<div class="match">


<button onclick="chooseWinner('${team1}','${round}',${index})">
${team1}
</button>


<div class="vs">
VS
</div>


<button onclick="chooseWinner('${team2}','${round}',${index})">
${team2}
</button>


</div>

`;

}



function chooseWinner(team,round,index){


    rounds[round][index]=team;


    advanceRound(round);


    saveData();

    renderKnockout();

}




function generateKnockout(){


rounds.playoffs=[];


let teams =
leagueTeams.slice(8,24);



for(let i=0;i<teams.length;i+=2){

    rounds.playoffs.push({
        teams:[
            teams[i],
            teams[i+1]
        ],
        winner:null
    });

}


saveData();

renderKnockout();


}





function advanceRound(round){


if(round==="playoffs"){

let winners =
rounds.playoffs.filter(
m=>m.winner
);

if(winners.length===8){

rounds.r16=[];

let teams=[
...leagueTeams.slice(0,8),
...winners.map(x=>x.winner)
];


for(let i=0;i<16;i+=2){

rounds.r16.push({
teams:[
teams[i],
teams[i+1]
],
winner:null
});

}

}


}



if(round==="r16"){

createNextRound(
"r16",
"qf"
);

}



if(round==="qf"){

createNextRound(
"qf",
"sf"
);

}



if(round==="sf"){

createNextRound(
"sf",
"final"
);

}


}



function createNextRound(from,to){


let winners =
rounds[from]
.filter(m=>m.winner)
.map(m=>m.winner);


let needed =
to==="final"?2:4;


if(winners.length===needed){


rounds[to]=[];


for(let i=0;i<winners.length;i+=2){

rounds[to].push({

teams:[
winners[i],
winners[i+1]
],

winner:null

});

}


}



}





function renderKnockout(){


knockout.innerHTML="";


Object.keys(rounds).forEach(round=>{


if(rounds[round].length===0)
return;


let section=document.createElement("div");

section.className="round";


section.innerHTML=
`<h3>${round.toUpperCase()}</h3>`;



rounds[round].forEach((match,index)=>{


if(match.winner){

section.innerHTML +=

`

<div class="match">

<div class="winner">

Winner:
<br>

${match.winner}

</div>

</div>

`;

}

else{


section.innerHTML +=

createMatch(
match.teams[0],
match.teams[1],
round,
index
);


}


});


knockout.appendChild(section);


});


}





function resetAll(){

localStorage.clear();

location.reload();

}



document
.getElementById("generateBtn")
.onclick=generateKnockout;


document
.getElementById("resetBtn")
.onclick=resetAll;



loadData();

renderLeague();

renderKnockout();
