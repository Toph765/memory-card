const ScoreBoard = ({score, highScore}) => {
    return (
        <div className="scoreBoard">
            <div>{"Score: " + score}</div>
            <div>{"High Score: " + highScore}</div>
        </div>
    )
}

export default ScoreBoard;