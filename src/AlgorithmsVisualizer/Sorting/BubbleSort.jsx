import * as React from 'react';

import NavBar from './NavBar';
import Popup from './Popup';
import Bars from './Bars';

import {BubbleSortWrapper} from '../../Algorithms/SortingAlgorithms/BubbleSort';
import {SOKERS} from '../CONSTANTS';
import { shuffle, generateArray } from '../helper';

export default function BubbleSortApp(){
    const [arraySize, setArraySize] = React.useState(10);
    const [array, setArray] = React.useState(Array.from({length: arraySize}, () => Math.floor(Math.random() * 100)));
    const [speed, setSpeed] = React.useState(1);
    const [isSokerMode, setisSoker] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    const [bars] = React.useState(document.getElementsByClassName("bars"));
    const [animationTimeouts, setAnimationTimeouts] = React.useState([]);
    const [isPopup, setisPopup] = React.useState(false);
    const [sokerIndex, setSokerIndex] = React.useState(bars.length - 1);
    const [Sokers] = React.useState(SOKERS);

    React.useEffect(() => {
        for (let i=0; i<(Math.random()*5)+1; i++){
            shuffle([...Sokers]);
        }
    }
    , [Sokers]);
    

    React.useEffect(() => {
        setArray(generateArray(arraySize));
    }, [arraySize]);
    
    function BubbleSortCaller(){
        animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        setAnimationTimeouts([]);
        setDisabled(true);

        let auxillaryArray = array.slice();
        let animations = BubbleSortWrapper(auxillaryArray);
        const values = document.getElementsByClassName("values");

        const baseDelay = 1600; // Base delay for animation
        const delayFactor = 1 / speed; // Speed scaling factor
        const delay = baseDelay * delayFactor; // Final delay per step


        let timeouts = animations.map((animation, index) =>{
            setTimeout(() => {
                const {comparison, swap} = animation;

                bars[comparison[0]].style.backgroundColor = "#FF4949";
                bars[comparison[1]].style.backgroundColor = "#FF4949";

                if (swap.length > 0) {
                    let temp = window.getComputedStyle(bars[swap[0]]).height;
                    let temp2 = values[swap[0]].innerHTML;
                    setTimeout(() => {
                        bars[swap[0]].style.backgroundColor = "green";
                        bars[swap[1]].style.backgroundColor = "green";
                        bars[swap[0]].style.height = window.getComputedStyle(bars[swap[1]]).height;
                        bars[swap[1]].style.height = temp;
                        values[swap[0]].innerHTML = values[swap[1]].innerHTML;
                        values[swap[1]].innerHTML = temp2;
                    }, 300 * delayFactor);

                    setTimeout(() => {
                        bars[swap[0]].style.backgroundColor = "#229799";
                        bars[swap[1]].style.backgroundColor = "#229799";
                    }, 600 * delayFactor);
                }

                setTimeout(() => {
                    bars[comparison[0]].style.backgroundColor = "#229799";
                    bars[comparison[1]].style.backgroundColor = "#229799";
                }, 600 * delayFactor);
            }, index*delay);
        });

        setAnimationTimeouts(timeouts);

        setTimeout(() => {
            for (let i=0; i<bars.length; i++){
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
            name="Bubble Sort" 
            arraySize={arraySize}
            updateArraySize={(data) => setArraySize(data)}
            speed={speed}
            updateSpeed={(data) => setSpeed(data)}
            isSokerMode={isSokerMode}
            updateSokerMode={(data) => setisSoker(data)}
            disabled={disabled}
            caller={BubbleSortCaller}
            Sokers={Sokers}
        />
        <Bars array={array} arraySize={arraySize} isSokerMode={isSokerMode} Sokers={Sokers}/>
        </>
    );
} 