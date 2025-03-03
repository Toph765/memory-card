import { useState, useEffect } from 'react'
import './styles/App.css';
import Board from './components/Board'; 
import ScoreBoard from './components/ScoreBoard';
import LoadingScreen from './components/LoadingScreen';

function App() {
    const [pokeList, setPokeList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [loadIsHidden, setLoadIsHidden] = useState(false);
    const [boardIsHidden, setBoardIsHidden] = useState(true);

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
                const temp = [];
                for (let i = 0; i < list.length; i++) {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${list[i]}/`, {signal: controller.signal});
                    const src = await response.json();
                    const img = await src.sprites.front_default;
                    const name = await src.name;
                    temp.push({
                        id: list[i],
                        name: name,
                        img: img,
                    });
                }
                setPokeList(temp);
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

    useEffect(() => {
        if (pokeList.length === 18) {
            setBoardIsHidden(false);
            setLoadIsHidden(true);
        } else {
            setBoardIsHidden(true);
            setLoadIsHidden(false);
        }
    }, [pokeList]);

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
            <header>
                <h1>Pokemon Shuffle!</h1>
                <ScoreBoard score={score} highScore={highScore} />
            </header>
            <main>
                <LoadingScreen isHidden={loadIsHidden} />
                <Board pokeList={pokeList} click={handleClick} boardIsHidden={boardIsHidden}/>
            </main>
            <footer>
                <h2>Instructions</h2>
                <ol type='1'>
                    <li>Earn scores by clicking the pokemon ONCE.</li>
                    <li>The board will reset if:</li>
                    <ul>
                        <li>You clicked a pokemon TWICE.</li>
                        <li>You clicked all of the pokemon on the board.</li>
                    </ul>
                </ol>
            </footer>
        </>
    )
}

export default App;
