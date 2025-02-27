import { useState, useEffect } from 'react'
import './App.css';
import Board from './components/Board'; 
import ScoreBoard from './components/ScoreBoard';

function App() {
    const [pokeList, setPokeList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

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
        const currScore = score % list.length;

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

        if (currScore === 0) {
            setPokeList([]);
            getPokeImgs();
        };
        
        return () => {
            controller?.abort();
        }
    }, [score]);

    const shuffleCard = () => {
        const list = [...pokeList];

        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        setPokeList(list);
    }

    const selectPoke = (name) => {
        const list = [...selected];
        const poke = list.filter(item => item === name);
        const currScore = score;
        const currHighScore = highScore;
        
        if (poke.length === 0) {
            setSelected(prevItem => [...prevItem, name]);
            setScore(currScore + 1);
        } else {
            setSelected([]);
            setScore(0);
            changeHighScore(currScore, currHighScore);
        };
    }

    const changeHighScore = (a, b) => {
        (a > b) ? setHighScore(a) : setHighScore(b);
    }

    const handleClick = (name) => {
        shuffleCard();
        selectPoke(name);
    }

    return (
        <>
            <ScoreBoard score={score} highScore={highScore} />
            <Board pokeList={pokeList} click={handleClick} />
        </>
    )
}

export default App;
