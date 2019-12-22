//Part 1
let s=new Array(10007).fill(0).map((_,i)=>i);
let commands=document.getElementsByTagName("pre")[0].innerText.trim().split("\n");
commands.forEach(cmd=>{
    if (cmd=="deal into new stack") {
	s.reverse();
    } else if(cmd.substr(0,3)=="cut") {
	let v=parseInt(cmd.substr(4));
	if (v>0) {
	    let part=s.splice(0,v);
	    s=s.concat(part);
	} else {
	    let part=s.splice(10007-Math.abs(v),Math.abs(v));
	    s=part.concat(s);
	}
    } else {
	let v=parseInt(cmd.substr(20));
	let n=new Array(10007);
	s.forEach((c,i)=>{
	    n[(i*v)%10007]=c;
	})
	s=n;
    }
})
s.indexOf(2019);
