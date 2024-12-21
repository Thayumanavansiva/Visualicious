import * as React from 'react';
import NavBar from './NavBar.jsx';


export default function ArrayApp() {
    const [arraySize, setArraySize] = React.useState(10);
    const [speed, setSpeed] = React.useState(1);
    const [isSokerMode, setisSoker] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    return (
        <NavBar 
        arraySize={arraySize}
        updateArraySize={(data) => setArraySize(data)}
        speed={speed}
        updateSpeed={(data) => setSpeed(data)}
        isSokerMode={isSokerMode}
        updateSokerMode={(data) => setisSoker(data)}
        disabled={disabled}
        />
    )
}