//Part 1
let reacts = {}
document.getElementsByTagName("pre")[0].innerText.split("\n").forEach(row=>{
    if (row) {
	let res=row.split(" => ")[1].match(/([0-9]+) ([A-Z]+)/);
	reacts[res[2]]={
	    mult: parseInt(res[1]),
	    used: 0,
	    unused: 0,
	    inpts: row.split(" => ")[0].split(", ").map(i=>{return {chem: i.split(" ")[1], nr: parseInt(i.split(" ")[0])}})
	}
    }
})
reacts["ORE"]={mult:1,used:0,unused:0,inpts:[]}
let use=(chem,nr)=>{
    if (nr<reacts[chem].unused) {
	reacts[chem].unused-=nr;
	reacts[chem].used+=nr;
	return;
    }
    nr-=reacts[chem].unused;
    reacts[chem].unused=0;
    let times=Math.ceil(nr/reacts[chem].mult);
    reacts[chem].used+=nr;
    reacts[chem].unused+=times*reacts[chem].mult-nr;
    reacts[chem].inpts.forEach(inpt=>use(inpt.chem, inpt.nr*times));
}
use("FUEL",1);
reacts["ORE"].used

//Part 2
let test=nr=>{
    reacts = {}
    document.getElementsByTagName("pre")[0].innerText.split("\n").forEach(row=>{
	if (row) {
	    let res=row.split(" => ")[1].match(/([0-9]+) ([A-Z]+)/);
	    reacts[res[2]]={
		mult: parseInt(res[1]),
		used: 0,
		unused: 0,
		inpts: row.split(" => ")[0].split(", ").map(i=>{return {chem: i.split(" ")[1], nr: parseInt(i.split(" ")[0])}})
	    }
	}
    })
    reacts["ORE"]={mult:1,used:0,unused:0,inpts:[]}
    use("FUEL",nr);
    return reacts["ORE"].used;
}
let t=5000000;
let b=0;
while(t>b+1) {
    if(test(b+Math.ceil((t-b)/2))>1000000000000) {
	t=b+Math.ceil((t-b)/2);
    } else {
	b=b+Math.ceil((t-b)/2);
    }
}
