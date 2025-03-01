import { useState } from "react";

function Board({ pokeList, click, boardIsHidden}) {
    const [isHidden, setIsHidden] = useState(true);

    const handleCheckBox = (e) => {
        const { checked } = e.target;
        checked ? setIsHidden(() => false) : setIsHidden(() => true);
    } 

    return (
        <div  hidden={boardIsHidden}>
            <div className="checkbox">
                <input type="checkbox" onChange={handleCheckBox} id="caption" />
                <label htmlFor="caption">Show pokemon names</label>
            </div>
            <div className="poke">
                {pokeList.map(poke => {
                    return (
                        <button key={poke.id} name={poke.name} onClick={() => click(poke.name)}>
                            <figure>
                                <img src={poke.img} alt={poke.name} />
                                <figcaption hidden={isHidden}>{poke.name}</figcaption>
                            </figure>
                    </button>);
                })}
            </div>
        </div>
    )
}

export default Board;