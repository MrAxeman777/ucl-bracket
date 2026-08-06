let league=[...teams];


let playoffs=[];

let r16=[];

let qf=[];

let sf=[];

let final=[];



function loadTeams(){

let box=document.getElementById("teams");

box.innerHTML="";


league.forEach((team,index)=>{


let div=document.createElement("div");

div.className="team";


div.innerHTML=

(index+1)+". "+team;


box.appendChild(div);


});


}



function generateKnockout(){


playoffs=[];


let teams16 =
league.slice(8,24);



for(let i=0;i<16;i+=2){


playoffs.push({

a:teams16[i],

b:teams16[i+1],

winner:null

});


}



render();


}





function makeMatch(match,index,type){



if(match.winner){


return `

<div class="match">

<div class="winner">

Winner:
<br>

${match.winner}

</div>

</div>

`;


}



return `

<div class="match">


<button onclick="choose('${match.a}','${type}',${index})">

${match.a}

</button>


<h3>VS</h3>


<button onclick="choose('${match.b}','${type}',${index})">

${match.b}

</button>


</div>

`;



}





function choose(team,type,index){


if(type==="playoffs"){

playoffs[index].winner=team;

}


render();


}





function render(){


let box=document.getElementById("bracket");

let html="";


html+="<h2>Playoffs</h2>";


playoffs.forEach((m,i)=>{

html+=makeMatch(
m,
i,
"playoffs"
);

});



box.innerHTML=html;


}




function resetAll(){

location.reload();

}



loadTeams();
