//Part 1
let m=document.getElementsByTagName("pre")[0].innerText.split("").map(x=>parseInt(x));
let pat=[0,1,0,-1]
m.pop();
for(let i=0;i<100;i++)m=m.map((digit,i,arr)=>Math.abs(arr.slice(i).reduce((sum,d,j)=>sum+d*pat[Math.floor((j)/(i+1)+1)%4]))%10);
m.slice(0,8).join("");

//Part 2
m=document.getElementsByTagName("pre")[0].innerText.split("").map(x=>parseInt(x));
m.pop();
let offset=parseInt(m.slice(0,7).join(""))
let s=[];
for(let i=0;i<10000;i++)s.push(m);
s=s.flat();
s=s.slice(offset);
for(let i=0;i<100;i++)for(let j=s.length-1;j>=0;j--)s[j]=Math.abs((s[j+1]||0)+s[j])%10;
s.slice(0,8).join("");