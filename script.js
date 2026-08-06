let league=[...teams];


let knockout={

playoffs:[],
r16:[],
qf:[],
sf:[],
final:[]

};



if(localStorage.getItem("league")){

league=
JSON.parse(
localStorage.getItem("league")
);

}



function save(){

localStorage.setItem(
"league",
JSON.stringify(league)
);

}



function loadTeams(){


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
"from",
index
);

};



div.ondragover=e=>{

e.preventDefault();

};



div.ondrop=e=>{


let from=
Number(
e.dataTransfer.getData("from")
);



let moved=
league.splice(from,1)[0];


league.splice(
index,
0,
moved
);



save();

loadTeams();


};



box.appendChild(div);


});


}





function createMatch(a,b,stage,id){


return `

<div class="match">


<button onclick="pick('${a}','${stage}',${id})">

${a}

</button>


<h3>VS</h3>


<button onclick="pick('${b}','${stage}',${id})">

${b}

</button>


</div>

`;

}





function pick(team,stage,id){


knockout[stage][id]=team;


render();


}





function generateKnockout(){


let box=document.getElementById("bracket");

box.innerHTML="";


let playoffs=
league.slice(8,24);



box.innerHTML+="<h2>Playoffs</h2>";



for(let i=0;i<16;i+=2){


box.innerHTML+=
createMatch(
playoffs[i],
playoffs[i+1],
"playoffs",
i/2
);


}


}





function render(){


let box=document.getElementById("bracket");


let html="";



let p=
knockout.playoffs.filter(Boolean);



if(p.length===8){


html+="<h2>Round of 16</h2>";



let r16=[

...league.slice(0,8),
...p

];



for(let i=0;i<16;i+=2){


html+=
createMatch(
r16[i],
r16[i+1],
"r16",
i/2
);


}


}





let r=
knockout.r16.filter(Boolean);



if(r.length===8){


html+="<h2>Quarterfinals</h2>";



for(let i=0;i<8;i+=2){


html+=
createMatch(
r[i],
r[i+1],
"qf",
i/2
);


}


}





let q=
knockout.qf.filter(Boolean);



if(q.length===4){


html+="<h2>Semifinals</h2>";



for(let i=0;i<4;i+=2){


html+=
createMatch(
q[i],
q[i+1],
"sf",
i/2
);


}


}





let s=
knockout.sf.filter(Boolean);



if(s.length===2){


html+="<h2>FINAL</h2>";



html+=
createMatch(
s[0],
s[1],
"final",
0
);


}





if(knockout.final[0]){


html+=`

<div class="champion">

🏆 CHAMPIONS LEAGUE WINNER 🏆

<h1>
${knockout.final[0]}
</h1>

</div>

`;

}



box.innerHTML=html;


}





function resetAll(){


localStorage.clear();


league=[...teams];


knockout={

playoffs:[],
r16:[],
qf:[],
sf:[],
final:[]

};



loadTeams();


document.getElementById("bracket").innerHTML="";


}




loadTeams();
