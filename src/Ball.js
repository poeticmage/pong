

function Ball({x,y}){
    return <div className="ballSize ball" style={{left:`${x}%`,top:`${y}%`}}>
                 <div className="ballSize"style={{backgroundColor:" rgb(105, 97, 251)", boxShadow:"inset 0px 0px 15px rgb(38, 5, 92)"}} >
                  </div>
            </div>;
}

export default Ball;