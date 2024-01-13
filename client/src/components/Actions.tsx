// imports

// types
type ActionsProps = {
    onStart: () => void;
    onStop: () => void;
};

const Actions = ({ onStart, onStop }: ActionsProps) => {
    return (
        <div className="actions sec">
            <div className="sec-heading">
                Actions
            </div>
            <div className="controlls">
                <button className="action" onClick={onStart}>Start</button>
                <button className="action" onClick={onStop}>Stop</button>
            </div>
        </div>
    );
};

export default Actions;