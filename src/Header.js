
const dt=new Date();
const yr=dt.getFullYear();


function Header(){
return <div className="head">
    <h1>P O N G - G A M E</h1>
    {/* <h3>L I F E : D E A T H</h3> */}
    {/* <h3>   N A M E : </h3> */}
    {/* <h3>S C O R E - </h3> */}
    <h6 style={{color:   "rgba(105, 97, 251,0.5)"}}>C o p y r i g h t - P r i y a d a r s h i  - {yr}</h6>
</div>;
}


export default Header;