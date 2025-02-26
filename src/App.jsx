import { useState, useEffect } from 'react'
import './App.css';
import Card from './components/Card'; 

function App() {
    const [pokeList, setPokeList] = useState([]);

    const s = () => {
        console.log(pokeList)
    }
    
    const genRandomIds = () => {
        const ids = [];

        while (ids.length < 18) {
            let number = Math.floor((Math.random() * 1025) + 1);
            if (ids.includes(number)) continue;
            ids.push(number);
        }

        return ids;
    }

    useEffect(() => {
        const list = genRandomIds();
        let controller = new AbortController();

        const getPokeImgs = async () => {
            try {
                for (let i = 0; i < list.length; i++) {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${list[i]}/`, {signal: controller.signal});
                    const src = await response.json();
                    const img = await src.sprites.front_default;
                    const name = await src.name;
                    setPokeList(prevPoke => [...prevPoke, {
                        id: list[i],
                        name: name,
                        img: img,
                    }])
                }
            }
            catch (error) {
                console.log(error);
            }
        }

        getPokeImgs();
        
        return () => {
            controller?.abort();
        }
    }, []);

    const shuffleCard = () => {
        const list = [...pokeList];

        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        setPokeList(list);
    }

    return (
        <>
            <button onClick={shuffleCard}>S</button>
            <Card pokeList={pokeList} click={shuffleCard} />
        </>
    )
}

export default App;
