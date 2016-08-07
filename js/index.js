function getDir(obj,ev){
	var x=obj.getBoundingClientRect().left+obj.offsetWidth/2-ev.clientX;
	var y=obj.getBoundingClientRect().top+obj.offsetHeight/2-ev.clientY;
	
	return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
}

function through(obj){
	var oS=obj.children[0];
	
	obj.onmouseenter=function (ev){
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent);
		switch(dir){
			case 0:
				oS.style.left=250+'px';
				oS.style.top=0;
				break;
			case 1:
				oS.style.left=0;
				oS.style.top=250+'px';
				break;
			case 2:
				oS.style.left=-250+'px';
				oS.style.top=0;
				break;
			case 3:
				oS.style.left=0;
				oS.style.top=-250+'px';
				break;
		}
		move(oS,{left:0,top:0});
	};
	obj.onmouseleave=function (ev){
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent);
		switch(dir){
			case 0:
				move(oS,{left:250,top:0});
				break;
			case 1:
				move(oS,{left:0,top:250});
				break;
			case 2:
				move(oS,{left:-250,top:0});
				break;
			case 3:
				move(oS,{left:0,top:-250});
				break;
		}
	};
}
/*function introshow(){
	var oIntro_box=document.getElementById('intro_box');
	var aIntro_obj=oIntro_box.children;

	var n=0;
	var timer=null;

	timer=setInterval(function (){
		aIntro_obj[n].style.display='block';
		n++;
		if(n==aIntro_obj.length){
			clearInterval(timer);
		}
	},500);
}*/
function scrollMove(obj,iTarget){
	var start=document.documentElement.scrollTop||document.body.scrollTop;
	var iTarget=iTarget;
	var dis=iTarget-start;
	var count=Math.floor(500/30);
	
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		var a=1-n/count;
		bOk=false; 		
		var cur=start+dis*(1-Math.pow(a,3));
		document.documentElement.scrollTop=document.body.scrollTop=cur;
		if(n==count){
			clearInterval(obj.timer);
		}
	},30);
}

window.onload=function (){
	var aTl=document.querySelector('.header .title span');
	var oBtn_box=document.getElementById('btn_box');
	var aBtn=oBtn_box.getElementsByTagName('li');
	var oIntro_box=document.getElementById('intro_box');
	var aIntro_obj=oIntro_box.children;
	var oShow_box=document.getElementById('show_box');
	var aShow_obj=oShow_box.children;
	var oLeft=document.querySelector('#js .left');
	var oRight=document.querySelector('#js .right');
	var aJs_obj=document.querySelectorAll('#js #js_box li');
	var oSide_nav=document.getElementById('side_nav');
	var aSide_btn=oSide_nav.children;

	var sT=document.documentElement.scrollTop||document.body.scrollTop;


	var n=0;
	var timer=null;

	aSide_btn[0].onclick=function (){
		scrollMove(aSide_btn[0],0);
	};
	aSide_btn[1].onclick=aBtn[0].onclick=function (){
		scrollMove(aSide_btn[1],600);
	};
	aSide_btn[2].onclick=aBtn[1].onclick=function (){
		scrollMove(aSide_btn[2],1280);
	};
	aSide_btn[3].onclick=aBtn[2].onclick=function (){
		scrollMove(aSide_btn[3],2060);
	};

	/*window.onscroll=function (){
		if(sT>200){
			oSide_nav.style.display='block';
		}else{
			oSide_nav.style.display='none';
		}
	};*/

	for(var i=0; i<aBtn.length; i++){
		aBtn[i].onmouseover=function (){
			this.style.transform='rotate(360deg) scale(2,2)';
		};
		aBtn[i].onmouseout=function (){
			this.style.transform='none';
		};
	}

	var w=40;

	for(var i=0; i<aIntro_obj.length; i++){
		aIntro_obj[i].style.right=w*i+'px';
	}

	for(var i=0; i<aIntro_obj.length; i++){
		(function(a){
			aIntro_obj[a].onclick=function(){
				for(var i=0; i<aIntro_obj.length; i++){
					if(i>a){
						move(aIntro_obj[i],{right:oIntro_box.offsetWidth-w*(aIntro_obj.length-i)});
					}else{
						move(aIntro_obj[i],{right:w*i});
					}
				}
			}
		})(i);
	}

	for(var i=0; i<aShow_obj.length; i++){
		through(aShow_obj[i]);
		aShow_obj[i].style.backgroundImage='url(images/show_0'+i+'.png)'
	}

	var aClass=[];
    for(var i=0; i<aJs_obj.length; i++){
        aClass[i]=aJs_obj[i].className;
    }

    oLeft.onclick=function(){
        aClass.unshift(aClass.pop());
        for(var i=0; i<aJs_obj.length; i++){
            aJs_obj[i].className=aClass[i];
        }
    };
    oRight.onclick=function(){
        aClass.push(aClass.shift());
        for(var i=0; i<aJs_obj.length; i++){
            aJs_obj[i].className=aClass[i];
        }
    };
}