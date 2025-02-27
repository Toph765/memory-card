function Card({ pokeList, click}) {
    return (
        <div className="poke">
            {pokeList.map(poke => {
                return (
                    <button key={poke.id} name={poke.name} onClick={() => click(poke.name)}>
                        <figure>
                            <img src={poke.img} alt={poke.name} />
                            <figcaption>{poke.name}</figcaption>
                        </figure>
                </button>);
                
            })}
        </div>
    )
}

export default Card;