function Card({ pokeList, click}) {
    return (
        <div className="poke">
            {pokeList.map(poke => {
                return (<button key={poke.id} onClick={click}><img src={poke.img} alt={poke.name} /></button>);
                
            })}
        </div>
    )
}

export default Card;