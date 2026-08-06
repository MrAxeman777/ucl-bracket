let league = [...teams];

let playoffs = [];


function loadTeams(){

    const box = document.getElementById("teams");

    box.innerHTML = "";

    league.forEach((team,index)=>{

        let div = document.createElement("div");

        div.className = "team";

        div.innerHTML = `${index+1}. ${team}`;

        box.appendChild(div);

    });

}



function generateKnockout(){

    playoffs = [];


    let playoffTeams = league.slice(8,24);


    for(let i = 0; i < playoffTeams.length; i += 2){

        playoffs.push({

            a: playoffTeams[i],

            b: playoffTeams[i+1],

            winner: null

        });

    }


    renderBracket();

}



function pickWinner(team,index){


    playoffs[index].winner = team;


    renderBracket();

}



function renderBracket(){

    const box = document.getElementById("bracket");


    let html = "<h2>Playoffs</h2>";


    playoffs.forEach((match,index)=>{


        if(match.winner){

            html += `

            <div class="match winner">

            Winner:
            ${match.winner}

            </div>

            `;

        }

        else{


            html += `

            <div class="match">


            <button onclick="pickWinner('${match.a}',${index})">

            ${match.a}

            </button>


            <h3>VS</h3>


            <button onclick="pickWinner('${match.b}',${index})">

            ${match.b}

            </button>


            </div>

            `;

        }


    });


    box.innerHTML = html;

}



function resetAll(){

    location.reload();

}



loadTeams();
