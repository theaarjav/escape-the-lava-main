type OthersProps = {
    livesLeft: number,
    timeLeft: Number,
    score: Number
}
const Others = ({ livesLeft, timeLeft, score }: OthersProps) => {
    return (
        <div className="others sec">
            <div className="sec-heading">
                {`${livesLeft>0?`Lives: ${livesLeft}`:"GAME OVER"}`}
            </div>
            <div className="sec-heading">
                Time Left: {`${timeLeft}`}
            </div>
            <div className="sec-heading">
                Score: {`${score}`}
            </div>

        </div>
    );
};

export default Others;