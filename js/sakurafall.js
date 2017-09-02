let toggleSfPlay=undefined;
(function(elementname) {
	//utility
	let util={};
	util.genRandom=(max,min)=>{
		return (Math.floor(Math.random()*(max-min))+min);
	}
	util.genRandomF=(max,min)=>{
		return (Math.random()*(max-min))+min;
	}
	/////////////
	let sakurafall={};
	let canvas=document.getElementById(elementname);
	canvas.onresize=function(arg){
		canvas.width=canvas.offsetWidth;
		canvas.height=canvas.offsetHeight;
		console.log("canvas changed to: %sx%s",canvas.width,canvas.height)
	};
	canvas.onresize();
	onresize=canvas.onresize;
	let ctx=canvas.getContext("2d");

	//sf draw
	let petalimg1=new Image(),petalimg2=new Image();
	petalimg1.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0RBODkyQTU4RjBDMTFFNzlDQzZEMEZGMzgzRTBCOEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0RBODkyQTY4RjBDMTFFNzlDQzZEMEZGMzgzRTBCOEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDREE4OTJBMzhGMEMxMUU3OUNDNkQwRkYzODNFMEI4RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDREE4OTJBNDhGMEMxMUU3OUNDNkQwRkYzODNFMEI4RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg1vg9QAAAGWSURBVHjahJLLSxtBHMc/s5vdGjzYk6TWR0QNNUgugimK2AiCeBAEPeml9KL0VPFqQby1f0LtoVA92nqIhYK19YX4wqCo4BOKgi3E5/pMdp3dhUaI2h8MA7/5fR/znRGWZfFACbZ+1zIz/5rt7QjnZ4/R9HNyc2eoev6eQGFU3Euws/uCn+Nv2VyPkLgCjyrpFLDnEwm5C6xw5SdPGvDguJjvo++ILTZhXoOuyaW7Z7fABJ5NiNKSLykHFhpTc52M/OjGOMp0QIqSInbmJND3dIlITQ+lRYN21yX4Ew/xNfqBjbUKdGlKTTfmKD8pWOFVWzVePf4vJGtkspexX11cGBmOqhB3Z2ILJZMQDA3T3NjKI+3QbisoIolpKvyvbGJVBhlbaODj51GOTv2uA5t5dz/MULSPnc0yNNW9wn1OZFicnEJ+8RIdL6tTISbNDGYX25mafsPf/XwwXUVFuOFZpj3j4MnJW6O+rpMS/7f0f3B5ncXqehPLKy3s7ZVzZmRjynfzeg/x+WKEyvoJBQekU8MevxFgAJyOmwTXkSJNAAAAAElFTkSuQmCC";
	petalimg2.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAYAAAA7KqwyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDQxNDcwMEQ4RjBDMTFFNzg2MzRGRTYzMjkyOThGNzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDQxNDcwMEU4RjBDMTFFNzg2MzRGRTYzMjkyOThGNzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENDE0NzAwQjhGMEMxMUU3ODYzNEZFNjMyOTI5OEY3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENDE0NzAwQzhGMEMxMUU3ODYzNEZFNjMyOTI5OEY3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmgs2QYAAAFcSURBVHjahJBNSwJRFIbfq8440xBYQi5aNFKZGxdtiiCIWugyWgUFRf2MdkH9hxZ9EIWBQUFBLQrCCmoR1SIiF0PYwkoLlHS6fs3tXjUkEnzgwOXAee57DrFOLpbxkfIhnfEim/WAUhcplVQwZgdBmTkkE5qWhNsdg951Tvy9h+hof0QNwvaP13AZnYdTBmyEd4hoow4DLFFW5QlV+0IgEEFwbAGakiSsWFaxvn0GIzYIRUFTrDLwnQf07gfMTgUJY1z7me7DyuoVcpk2SHJziYgiJAND4apAYLyEsLl1gFJehiRV44I1nhdripUkldYFgidjAjuRMAqmArlJksocv/MfgSCeGMHu3gbeE14oTn5YW2MBpUCP//q/QJCjHpxGF3F3OwNqqnBwic1e+5lHLxQBT+czpifHGwt+eU31s5v7ORhGiGTSOt/bwVq0N/h8R2R0eAmu1viPAAMAVAKJA3PztAIAAAAASUVORK5CYII=";
	//save the anchor for performance
	petalimg1.midX=petalimg1.width/2;
	petalimg1.midY=petalimg1.height/2;
	petalimg2.midX=petalimg2.width/2;
	petalimg2.midY=petalimg2.height/2;

	sakurafall.petalimgs=[petalimg1,petalimg2];
	let petals=[];
	let numPetals=10;
	for (let i = 0; i < numPetals; i++) {
		let petal={};
		petal.img=i%2==0?petalimg1:petalimg2;
		petal.resetPos=()=>{
			//desktop
			if(document.body.clientWidth>768)
			{
				petal.x=util.genRandom(document.body.clientWidth,document.body.clientWidth*0.75);
				petal.y=0-petal.img.height;
				petal.vx=util.genRandomF(2,0.1);
				petal.vy=util.genRandomF(3,0.1);
				petal.fading=util.genRandomF(10,5);
			}
			//mobile
			else{
				petal.x=document.body.clientWidth+petal.img.width;
				petal.y=util.genRandom(canvas.clientHeight*0.5,0);
				petal.vx=util.genRandomF(2,0.1);
				petal.vy=util.genRandomF(1,0.1);
				petal.fading=util.genRandomF(5,2);
			}
			petal.rotation=0;
			//petal.scale=util.genRandomF(2,0);
		}
		petal.draw=()=>{
			ctx.save();
			petal.x-=petal.vx;
			petal.y+=petal.vy;
			petal.fading-=(Math.ceil(petal.vx+petal.vy)*0.01);
			petal.rotation+=(0.017453292519943295*(petal.vx+petal.vy));
			if(petal.fading<=0||(petal.x<-petal.img.width||petal.y>canvas.height)){
				petal.resetPos();
			}
			ctx.translate(petal.x,petal.y);
			ctx.rotate(petal.rotation);
			//ctx.scale(petal.scale,petal.scale);
			ctx.scale(Math.sin(petal.fading),Math.cos(petal.fading));
			ctx.globalAlpha=Math.sin(petal.fading);
			ctx.drawImage(petal.img,-petal.img.midX,-petal.img.midY);
			ctx.restore();
		};
		petal.resetPos();
		petals.push(petal);
	}
	sakurafall.petals=petals;
	let willdraw=true;
	sakurafall.draw=()=>{
		if(willdraw){
			sakurafall.clear();
			for (var i = 0; i < petals.length; i++) {
				petals[i].draw();
			}
		}
		requestAnimationFrame(sakurafall.draw);
	}
	sakurafall.toggleDraw=function(val){
		willdraw=val===undefined?!willdraw:val;
		console.log("Sakurafall ",willdraw?"resume":"paused");
	}
	//sf clear
	sakurafall.clear=()=>{
		ctx.clearRect(0,0,canvas.width,canvas.height);
	};
	sakurafall.canvas=canvas;
	sakurafall.ctx=ctx;
	sakurafall.draw();
	console.log("sakurafall started");
	toggleSfPlay=sakurafall.toggleDraw;
})("sakurafall");