
const dt=new Date();
const yr=dt.getFullYear();


function GameOver({onClick,score}){
return <div className="head" style={{height:"50vh",top:"20vh"}}>
    <h1>G A M E - O V E R</h1>
    <h2>P O N G - G A M E</h2>
    <h3>L I F E : D E A T H</h3>
    <h3>   {score}   :  1       </h3>
    <h3>S C O R E -{score} </h3>
    <h6 style={{color:   "rgba(105, 97, 251,0.5)"}}>C o p y r i g h t - P r i y a d a r s h i - {yr}</h6>
    <button onClick={onClick} className="button" style={{top:"60vh",left:"48vw",cursor:"pointer"}}>P L A Y - A G A I N</button>
</div>;
}


export default GameOver;