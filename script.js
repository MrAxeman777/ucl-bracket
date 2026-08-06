let leagueTeams = [...teams];

let rounds = {
    playoffs: [],
    r16: [],
    qf: [],
    sf: [],
    final: []
};

let draggedIndex = null;


const leagueTable = document.getElementById("leagueTable");
const knockout = document.getElementById("knockout");



function saveData(){

    localStorage.setItem(
        "uclLeague",
        JSON.stringify(leagueTeams)
    );

    localStorage.setItem(
        "uclRounds",
        JSON.stringify(rounds)
    );

}



function loadData(){

    let savedTeams =
        localStorage.getItem("uclLeague");

    let savedRounds =
        localStorage.getItem("uclRounds");


    if(savedTeams){

        leagueTeams =
        JSON.parse(savedTeams);

    }


    if(savedRounds){

        rounds =
        JSON.parse(savedRounds);

    }

}




function renderLeague(){


    leagueTable.innerHTML="";


    leagueTeams.forEach((team,index)=>{


        let div=document.createElement("div");


        div.className="team";


        div.draggable=true;


        div.innerHTML=

        `
        <span class="position">
        ${index+1}
        </span>

        ${team}
        `;



        div.addEventListener(
            "dragstart",
            ()=>{

                draggedIndex=index;

                div.classList.add("dragging");

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


                let moved =
                leagueTeams[draggedIndex];


                leagueTeams.splice(
                    draggedIndex,
                    1
                );


                leagueTeams.splice(
                    index,
                    0,
                    moved
                );


                saveData();

                renderLeague();


            }
        );



        leagueTable.appendChild(div);


    });


}





function generateKnockout(){


    rounds.playoffs=[];


    let playoffTeams =
    leagueTeams.slice(8,24);



    for(let i=0;i<16;i+=2){


        rounds.playoffs.push({

            teams:[
                playoffTeams[i],
                playoffTeams[i+1]
            ],

            winner:null

        });


    }



    saveData();

    renderKnockout();


}






function createMatch(match,round,index){


    if(match.winner){


        return `

        <div class="match">

        <div class="winner">

        ${match.winner}

        </div>

        </div>

        `;

    }



    return `

    <div class="match">


    <button onclick="chooseWinner('${match.teams[0]}','${round}',${index})">

    ${match.teams[0]}

    </button>


    <div class="vs">

    VS

    </div>


    <button onclick="chooseWinner('${match.teams[1]}','${round}',${index})">

    ${match.teams[1]}

    </button>


    </div>

    `;


}






function chooseWinner(team,round,index){


    rounds[round][index].winner = team;


    createNextRound(round);


    saveData();


    renderKnockout();


}







function createNextRound(round){



let next;


if(round==="playoffs") next="r16";

if(round==="r16") next="qf";

if(round==="qf") next="sf";

if(round==="sf") next="final";



if(!next)
return;



let winners = rounds[round]
.filter(match=>match.winner)
.map(match=>match.winner);



let required =
round==="playoffs" ? 8 :
round==="r16" ? 4 :
round==="qf" ? 2 :
round==="sf" ? 1 :
0;



if(winners.length!==required)
return;



rounds[next]=[];



for(let i=0;i<winners.length;i+=2){


rounds[next].push({

teams:[
winners[i],
winners[i+1]
],

winner:null

});


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


section.innerHTML +=

createMatch(
match,
round,
index
);


});



knockout.appendChild(section);



});





let champion =
rounds.final[0]?.winner;


if(champion){


knockout.innerHTML +=

`

<div class="champion">

🏆 CHAMPION 🏆

<h1>${champion}</h1>

</div>

`;

}


}





function resetAll(){

localStorage.clear();

location.reload();

}





document
.getElementById("generateBtn")
.onclick =
generateKnockout;



document
.getElementById("resetBtn")
.onclick =
resetAll;





loadData();

renderLeague();

renderKnockout();
