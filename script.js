let league = [...teams];

let knockout = {
    playoffs: Array(8).fill(null),
    r16: Array(8).fill(null),
    qf: Array(4).fill(null),
    sf: Array(2).fill(null),
    final: Array(1).fill(null)
};


function saveLeague(){
    localStorage.setItem(
        "uclLeague",
        JSON.stringify(league)
    );
}


let saved = localStorage.getItem("uclLeague");

if(saved){
    league = JSON.parse(saved);
}



function loadLeague(){

    let box=document.getElementById("teams");

    box.innerHTML="";


    league.forEach((team,index)=>{

        let div=document.createElement("div");

        div.className="team";

        div.draggable=true;


        div.innerHTML=
        `${index+1}. ${team}`;


        div.ondragstart=e=>{
            e.dataTransfer.setData(
                "index",
                index
            );
        };


        div.ondragover=e=>{
            e.preventDefault();
        };


        div.ondrop=e=>{

            let from=
            Number(
                e.dataTransfer.getData("index")
            );


            let moved=
            league.splice(from,1)[0];


            league.splice(
                index,
                0,
                moved
            );


            saveLeague();

            loadLeague();

        };


        box.appendChild(div);

    });

}





function createMatch(team1,team2,stage,id){

return `

<div class="match">

<button onclick="pickWinner('${team1}','${stage}',${id})">
${team1}
</button>

<h3>VS</h3>

<button onclick="pickWinner('${team2}','${stage}',${id})">
${team2}
</button>

</div>

`;

}




function pickWinner(team,stage,id){

    knockout[stage][id]=team;

    renderBracket();

}




function generateKnockout(){

    knockout.playoffs =
    Array(8).fill(null);

    let playoffTeams =
    league.slice(8,24);


    let html="<h2>🔥 Playoffs</h2>";


    for(let i=0;i<16;i+=2){

        html += createMatch(
            playoffTeams[i],
            playoffTeams[i+1],
            "playoffs",
            i/2
        );

    }


    document.getElementById("bracket").innerHTML=html;

}





function renderBracket(){

let html="";



let playoffWinners =
knockout.playoffs.filter(Boolean);



if(playoffWinners.length===8){

html+="<h2>🏆 Round of 16</h2>";

let teams16=[

...league.slice(0,8),

...playoffWinners

];


for(let i=0;i<16;i+=2){

html+=createMatch(
teams16[i],
teams16[i+1],
"r16",
i/2
);

}

}





let r16=
knockout.r16.filter(Boolean);


if(r16.length===8){

html+="<h2>Quarterfinals</h2>";

for(let i=0;i<8;i+=2){

html+=createMatch(
r16[i],
r16[i+1],
"qf",
i/2
);

}

}





let qf=
knockout.qf.filter(Boolean);


if(qf.length===4){

html+="<h2>Semifinals</h2>";

for(let i=0;i<4;i+=2){

html+=createMatch(
qf[i],
qf[i+1],
"sf",
i/2
);

}

}





let sf=
knockout.sf.filter(Boolean);


if(sf.length===2){

html+="<h2>FINAL</h2>";

html+=createMatch(
sf[0],
sf[1],
"final",
0
);

}




if(knockout.final[0]){

html+=`

<div class="champion">

🏆 CHAMPION 🏆

<h1>
${knockout.final[0]}
</h1>

</div>

`;

}



document.getElementById("bracket").innerHTML=html;

}





function resetAll(){

localStorage.clear();

location.reload();

}





loadLeague();
