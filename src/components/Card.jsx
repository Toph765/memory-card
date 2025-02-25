function Card({ pokeList}) {
    return (
        <div className="poke">
            {console.log('card', pokeList)}
            {pokeList.map(poke => {
                return (<button key={poke.id}><img src={poke.img} alt={poke.name} /></button>);
                
            })}
        </div>
    )
}

export default Card;