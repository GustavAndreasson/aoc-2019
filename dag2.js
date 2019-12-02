//Part 1
let a=document.getElementsByTagName("pre")[0].innerText.split(",").map(v=>parseInt(v));
run=ptr=>{if(a[ptr]==1){a[a[ptr+3]]=a[a[ptr+1]]+a[a[ptr+2]];return false;}else if(a[ptr]==2){a[a[ptr+3]]=a[a[ptr+1]]*a[a[ptr+2]];return false;}else{return true}}
let ctr=0;
a[1]=12;
a[2]=2;
while(!run(ctr)){ctr+=4}
a[0];

//Part 2
let prog=(x, y)=>{a=document.getElementsByTagName("pre")[0].innerText.split(",").map(v=>parseInt(v));a[1]=x;a[2]=y;ctr=0;while(!run(ctr)){ctr+=4};return a[0]}
for(var i=0; i<100;i++){for(var j=0; j<100;j++){if (prog(i,j)==19690720){console.log(i*100+j)}}}