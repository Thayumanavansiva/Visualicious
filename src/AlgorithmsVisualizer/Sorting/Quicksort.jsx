import * as React from 'react';

import NavBar from './NavBar';
import Popup from './Popup';
import Bars from './Bars';

import { QuickSortWrapper } from '../../Algorithms/SortingAlgorithms/QuickSort';
import { SOKERS } from '../CONSTANTS';
import { shuffle, generateArray } from '../helper';

export default function QuickSortApp() {
    const [arraySize, setArraySize] = React.useState(10);
    const [array, setArray] = React.useState(Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100)));
    const [speed, setSpeed] = React.useState(1);
    const [isSokerMode, setisSoker] = React.useState(false);

    const [disabled, setDisabled] = React.useState(false);

    const [bars] = React.useState(document.getElementsByClassName("bars"));
    const [animationTimeouts, setAnimationTimeouts] = React.useState([]);
    const [isPopup, setisPopup] = React.useState(false);
    const [sokerIndex, setSokerIndex] = React.useState(bars.length - 1);
    const [Sokers] = React.useState(SOKERS);


    React.useEffect(() => {
        for (let i = 0; i < (Math.random() * 5) + 1; i++) {
            shuffle([...Sokers]);
        }
    }, [Sokers]);

    React.useEffect(() => {
        setArray(generateArray(arraySize));
    }, [arraySize]);

    function QuickSortCaller() {
        animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        setAnimationTimeouts([]);
        setDisabled(true);
    
        let auxillaryArray = array.slice();
        let animations = QuickSortWrapper(auxillaryArray);
    
        const baseDelay = 1600;
        const delayFactor = 1 / speed; 
        const delay = baseDelay * delayFactor; 
    
        let timeouts = animations.map((animation, index) => {
            return setTimeout(() => {
                const { comparison, swap, pivot } = animation;
    
                setArray((prevArray) => {
                    const updatedArray = [...prevArray];
                    if (swap) {
                        const [i, j] = swap;
                        [updatedArray[i], updatedArray[j]] = [updatedArray[j], updatedArray[i]];
                    }
                    return updatedArray;
                });
    
                if (comparison) {
                    const [i, j] = comparison;
                    bars[i].style.backgroundColor = "#FF4949";
                    bars[j].style.backgroundColor = "#FF4949";
                }
    
                if (pivot !== undefined) {
                    bars[pivot].style.backgroundColor = "yellow";
                }
    
                setTimeout(() => {
                    if (comparison) {
                        const [i, j] = comparison;
                        bars[i].style.backgroundColor = "#229799";
                        bars[j].style.backgroundColor = "#229799";
                    }
                }, 600 * delayFactor);
            }, index * delay);
        });
    
        setAnimationTimeouts(timeouts);
    
        setTimeout(() => {
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = "#229799";
            }
            setArray(auxillaryArray); 
            setSokerIndex(bars.length - 1);
            setisPopup(true);
            setDisabled(false);
        }, animations.length * delay);
    }
    

    return (
        <>
            {isSokerMode && <Popup isPopup={isPopup} setisPopup={(data) => setisPopup(data)} sokerIndex={sokerIndex} bars={bars} />}
            <NavBar
                name="Quick Sort" 
                arraySize={arraySize}
                updateArraySize={(data) => setArraySize(data)}
                speed={speed}
                updateSpeed={(data) => setSpeed(data)}
                isSokerMode={isSokerMode}
                updateSokerMode={(data) => setisSoker(data)}
                disabled={disabled}
                caller={QuickSortCaller}
                Sokers={Sokers}
            />
            <Bars array={array} arraySize={arraySize} isSokerMode={isSokerMode} Sokers={Sokers}/>
        </>
    );
}

