import './App.css';
import Paddle from './Paddle';
import Ball from "./Ball";
import React from "react";
import Header from "./Header";
import GameOver from './GameOver';

function App() {
  //ball displ and dir
 //initial speed ,score of ball
  const[ballx,ballxF]=React.useState(50);
  const[bally,ballyF]=React.useState(0);
  const[ballvx,ballvxF]=React.useState(0);
  const[ballvy,ballvyF]=React.useState(1);
  const[speed,speedF]=React.useState(0.5);
  const[score,scoreF]=React.useState(0);
  //
  const[ovr,gameover]=React.useState(false);
  const[strt,startgone]=React.useState(true); //controls the start of game...
  const[head,headset]=React.useState(false);
  const[xpad,setxpad]=React.useState(42.5);
  const[game,gamestarted]=React.useState(false); //controls paddle act with mouse...

  function headin(){ headset(true);} function headout(){headset(false);}
  
  function mousestart(e){ //console.log(0);
    gamestarted(true); 
    if (e.cancelable) e.preventDefault();
  }
  function mouseend(){
    gamestarted(false);

  }
  //References for paddle cureent
  const xpadref=React.useRef(xpad);
  // Update as state changes (since states are updated async)
  React.useEffect(()=>{
    xpadref.current=xpad;
  },[xpad]);
  function play(e){
     if(!game) return;
    //  console.log("hello");
     let x=0; 
     if(e.touches) x=e.touches[0].clientX; //touch
     else x= e.clientX;  //mouse click
     let vwpos=(x/window.innerWidth)*100 -7.5; //..to make sure the middle remains with the cursor
     setxpad(Math.max(0,Math.min(100-15,vwpos)));//to make sure paddle does not go out
     xpadref.current=Math.max(0,Math.min(100-15,vwpos));
     }
  


// References for  ball current vals
const scoreref=React.useRef(score);
const speedref=React.useRef(speed);
const ballxref=React.useRef(ballx);
const ballyref = React.useRef(bally);
const ballvxref = React.useRef(ballvx);
const ballvyref = React.useRef(ballvy);
// Update as state changes
React.useEffect(() => {
  ballxref.current = ballx;
  ballyref.current = bally;
  ballvxref.current = ballvx;
  ballvyref.current = ballvy;
}, [ballx, bally, ballvx, ballvy]);

  function ballflow(){
    // console.log(speed);
    if (ovr) return;
    ballxF((old)=>{
      const x=old+speedref.current*ballvxref.current;
      if(x<=0||x>=100){
         ballvxF(old=>(old*-1));
         ballvxref.current*=(-1);
        }
      return x;
    });
    ballyF((old)=>{
      const y=old+speedref.current*ballvyref.current; //console.log(y+" y");
      if(y>=84) batting(); // 100 minus footer-height ie 13 , for safety... and 3vh for paddle width
      if(y<=0){ 
        ballvyF(old=>(old*-1));
        ballvyref.current*=(-1);
      }
      return y;
    });
  }
 
  //BATTING AND GAME OVERS
  const scoredelarref=React.useRef(true);
  function batting(){ //console.log("batt");
    if(ovr||!scoredelarref.current) return;
    if(ballxref.current>xpadref.current&&ballxref.current<xpadref.current+15){
      const verticalshift=(Math.random()-0.5)*0.5;
      ballvyF(old=>((old*-1)+verticalshift)); //console.log("changed vy ",xpad);
      ballvyref.current=(ballvyref.current*-1)+verticalshift;
      //score increase on deflection:
      if(ballvyref.current<0){
        scoredelarref.current=false;
        setTimeout(() => {  //TO SLOW DOWN SCORING TO MISS QUICK MINUITE REBOUNDS AT EDGE AND ALL,,, AT HIGH SPEED
          scoreref.current++;
          scoreF(old=>(old+1));
          const addspeed=scoreref.current*0.01;
          speedref.current+=addspeed;
          speedF(old=>(old+addspeed));
          scoredelarref.current = true;
        }, 50);
       
      }
      //To make the ball move across::
      const horizontalshift=(Math.random()-0.5)*0.5;
      ballvxF(old=>(old+horizontalshift));
      ballvxref.current+=horizontalshift;
      if(ballxref.current>xpadref.current+13||ballxref.current<xpadref.current+2){ //If ball hits edge of pad
        const deflect=ballvxref.current+1; 
        if(deflect<0.98&&deflect>-0.98){
        ballvxF(old=>(old+1));
        ballvxref.current+=1;
      }
      }
    }
    if(ballyref.current>99.5){ 
      gameover(true);
      ballvyref.current=0; ballvyF(0);
      ballvxref.current=0; ballvxF(0);
      return; //VERY IMPORTANT TO STOP BATTING AFTER GAME OVER
    }//game  over at bottom of the screen
  }



React.useEffect(()=>{
  if(!strt){
    const interval=setInterval(()=>{if(!ovr) ballflow();},1);
    return ()=> clearInterval(interval);
  }
},[strt,ovr]);

function reload(){
  window.location.reload(); //after the  play again
}
  
  function startgo(){ //console.log("start");
    startgone(false);
   }
  
  return (<div className={`bg ${ovr? "gameover":""}`} onMouseMove={play} onMouseUp={mouseend} onTouchEnd={mouseend} onTouchMove={play} style={{cursor:game?"col-resize":"auto"}}> 
    <header onMouseOver={headin} onMouseLeave={headout}></header>
    {!strt&&<Ball x={ballx} y={bally}/>}
    {!head&&!ovr&&<div className='score'> <h2>{score}</h2></div>}
    {strt&&!head&&<button className="button" onClick={startgo}><h3>S T A R T</h3></button>}
    {head&&!game&&<Header/>}{ovr&&<GameOver onClick={reload} score={score}/> }
    {!strt&&<footer onMouseDown={mousestart} onTouchStart={mousestart} >
      <Paddle  x={xpad}/>
    </footer>}
    </div>);
}

export default App;
