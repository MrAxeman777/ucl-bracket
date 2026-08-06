let knockout = [];

function generateKnockout(){

    knockout = [
        ["Inter Milan","Borussia Dortmund"],
        ["Aston Villa","Liverpool"],
        ["Sporting CP","Villarreal"],
        ["Napoli","AS Roma"]
    ];

    render();

}


function pickWinner(team){

    alert("You picked: " + team);

}


function render(){

    let box = document.getElementById("bracket");

    box.innerHTML = "<h2>Playoffs</h2>";

    knockout.forEach(match => {

        box.innerHTML += `

        <div class="match">

        <button onclick="pickWinner('${match[0]}')">
        ${match[0]}
        </button>

        VS

        <button onclick="pickWinner('${match[1]}')">
        ${match[1]}
        </button>

        </div>

        `;

    });

}
