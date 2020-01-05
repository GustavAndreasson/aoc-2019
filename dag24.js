//Part 1
let map=document.getElementsByTagName("pre")[0].innerText.trim().split("\n").map(row=>row.split("").map(c=>c=="."?0:1));
let used=[];
while (!used.includes(parseInt(map.flat().join(""), 2))) {
    used.push(parseInt(map.flat().join(""), 2));
    map=map.map((row,y)=>row.map((c,x)=>{
	let nr=(y>0&&map[y-1][x]||0)+(y<4&&map[y+1][x]||0)+(map[y][x-1]||0)+(map[y][x+1]||0);
	return (c?nr==1:nr==1||nr==2)?1:0;
    }));
}
parseInt(map.flat().reverse().join(""), 2)
