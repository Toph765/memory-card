function Card({ pokeList, click}) {
    return (
        <div className="poke">
            {pokeList.map(poke => {
                return (<button key={poke.id} name={poke.name} onClick={() => click(poke.name)}><img src={poke.img} alt={poke.name} /></button>);
                
            })}
        </div>
    )
}

export default Card;