let league = [...teams];

let knockout = {
    playoffs: [],
    r16: [],
    qf: [],
    sf: [],
    final: []
};


// Load saved league order
const savedLeague = localStorage.getItem("uclLeague");

if (savedLeague) {
    league = JSON.parse(savedLeague);
}


// Save league order
function saveLeague() {
    localStorage.setItem(
        "uclLeague",
        JSON.stringify(league)
    );
}


// Load teams into page
function loadTeams() {

    const box = document.getElementById("teams");

    box.innerHTML = "";

    league.forEach((team, index) => {

        const div = document.createElement("div");

        div.className = "team";

        div.draggable = true;

        div.innerHTML =
            `${index + 1}. ${team}`;


        div.addEventListener(
            "dragstart",
            e => {
                e.dataTransfer.setData(
                    "index",
                    index
                );
            }
        );


        div.addEventListener(
            "dragover",
            e => {
                e.preventDefault();
            }
        );


        div.addEventListener(
            "drop",
            e => {

                let from =
                    Number(
                        e.dataTransfer.getData("index")
                    );


                let moved =
                    league.splice(from, 1)[0];


                league.splice(
                    index,
                    0,
                    moved
                );


                saveLeague();

                loadTeams();

            }
        );


        box.appendChild(div);

    });

}



// Create clickable match
function createMatch(team1, team2, stage, id) {

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



// Pick winner
function pickWinner(team, stage, id) {


    if (stage === "playoffs") {

        knockout.playoffs[id].winner = team;

    }

    else {

        knockout[stage][id] = team;

    }


    renderBracket();

}



// Generate playoffs
function generateKnockout() {


    knockout = {
        playoffs: [],
        r16: [],
        qf: [],
        sf: [],
        final: []
    };


    let playoffTeams =
        league.slice(8,24);



    for (let i = 0; i < 16; i += 2) {

        knockout.playoffs.push({

            team1: playoffTeams[i],

            team2: playoffTeams[i+1],

            winner: null

        });

    }


    renderBracket();

}



// Render bracket
function renderBracket() {


    const box =
        document.getElementById("bracket");


    let html = "";



    // PLAYOFFS

    html += "<h2>Playoffs</h2>";


    knockout.playoffs.forEach((match,index)=>{


        if(match.winner){

            html += `

            <div class="match">

            Winner:
            <b>${match.winner}</b>

            </div>

            `;

        }

        else {


            html += createMatch(

                match.team1,

                match.team2,

                "playoffs",

                index

            );

        }


    });



    // After all playoff winners

    let playoffWinners =
        knockout.playoffs
        .filter(x => x.winner)
        .map(x => x.winner);



    if(playoffWinners.length === 8){


        html += "<h2>Round of 16</h2>";


        let r16Teams = [

            ...league.slice(0,8),

            ...playoffWinners

        ];


        for(let i=0;i<16;i+=2){


            html += createMatch(

                r16Teams[i],

                r16Teams[i+1],

                "r16",

                i/2

            );

        }

    }



    // Quarter finals

    let r16Winners =
        knockout.r16.filter(Boolean);


    if(r16Winners.length === 8){


        html += "<h2>Quarterfinals</h2>";


        for(let i=0;i<8;i+=2){


            html += createMatch(

                r16Winners[i],

                r16Winners[i+1],

                "qf",

                i/2

            );

        }

    }



    // Semifinals

    let qfWinners =
        knockout.qf.filter(Boolean);


    if(qfWinners.length === 4){


        html += "<h2>Semifinals</h2>";


        for(let i=0;i<4;i+=2){


            html += createMatch(

                qfWinners[i],

                qfWinners[i+1],

                "sf",

                i/2

            );

        }

    }



    // Final

    let sfWinners =
        knockout.sf.filter(Boolean);


    if(sfWinners.length === 2){


        html += "<h2>FINAL</h2>";


        html += createMatch(

            sfWinners[0],

            sfWinners[1],

            "final",

            0

        );

    }



    // Champion

    if(knockout.final[0]){


        html += `

        <div class="champion">

        🏆 CHAMPION 🏆

        <h1>
        ${knockout.final[0]}
        </h1>

        </div>

        `;

    }



    box.innerHTML = html;

}



// Reset
function resetAll(){

    localStorage.clear();

    location.reload();

}



loadTeams();
