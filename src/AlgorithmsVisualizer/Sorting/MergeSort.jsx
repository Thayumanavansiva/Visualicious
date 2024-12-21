/* eslint-disable no-unused-vars */
import * as React from 'react';
import { getMergeSortAnimations } from '../../Algorithms/SortingAlgorithms/MergeSort.jsx';
import { shuffle, generateArray } from '../helper.jsx';
import {SOKERS} from '../CONSTANTS.js';
import NavBar from './NavBar.jsx';
import Popup from './Popup.jsx';
import Bars from './Bars.jsx';

export default function MergeSortApp(){

    const [bars] = React.useState(document.getElementsByClassName("bars"));
    const Sokers = React.useRef(SOKERS);



    const [arraySize, setArraySize] = React.useState(10);
    const [array, setArray] = React.useState(Array.from({length: arraySize}, () => Math.floor(Math.random() * 100)));
    const [speed, setSpeed] = React.useState(1);
    const [isSokerMode, setisSoker] = React.useState(false);
    const [isPopup, setisPopup] = React.useState(false);
    const [sokerIndex, setSokerIndex] = React.useState(bars.length - 1);
    const [animationTimeouts, setAnimationTimeouts] = React.useState([]);
    const [codelineCouter, setCodeLineCounter] = React.useState(0);
    const [valuesCompared, setValuesCompared] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);

    const loop = React.useRef(null);
    const compare = React.useRef(null);
    const swap = React.useRef(null);

    React.useEffect(() => {
        setArray(generateArray(arraySize));
    }, [arraySize]);

    React.useEffect(() => {
        for (let i=0; i<(Math.random()*5)+1; i++){
            shuffle([...Sokers.current]);
        }
    }
    , [Sokers]);

    React.useEffect(() => {
        switch(codelineCouter){
            case 0:
                if (loop.current === null || compare.current === null || swap.current === null){
                    break;
                }
                else{
                    loop.current.style.backgroundColor = "#229799";
                    compare.current.style.backgroundColor = "transparent";
                    swap.current.style.backgroundColor = "transparent";
                }
                break;
            case 1:
                if (loop.current === null || compare.current === null || swap.current === null){
                    break;
                }
                else{
                loop.current.style.backgroundColor = "transparent";
                compare.current.style.backgroundColor = "#229799";
                swap.current.style.backgroundColor = "transparent";
                }
                break;
            case 2:
                if (loop.current === null || compare.current === null || swap.current === null){
                    break;
                }
                else{
                loop.current.style.backgroundColor = "transparent";
                compare.current.style.backgroundColor = "transparent";
                swap.current.style.backgroundColor = "#229799";
                }
                break;
            default:
                if (loop.current === null || compare.current === null || swap.current === null){
                    break;
                }
                else{
                    loop.current.style.backgroundColor = "transparent";
                    compare.current.style.backgroundColor = "transparent";
                    swap.current.style.backgroundColor = "transparent";
                }
        }


    }, [codelineCouter]);
    
    function MergeSortCaller(){
        animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        setAnimationTimeouts([]);
        setDisabled(true);

        let auxillaryArray = array.slice();
        let tempArray = array.slice();
        let animations = getMergeSortAnimations(auxillaryArray);
        console.log(animations);
        const values = document.getElementsByClassName("values");
        const baseDelay = 1600; // Base delay for animation
        const delayFactor = 1 / speed; // Speed scaling factor
        const delay = baseDelay * delayFactor; // Final delay per step

        let timeouts = animations.map((animation, index) =>{
            setTimeout(() => {
                const isColorChange = index % 3 !== 2;

                if (isColorChange) {
                    const [barOneIdx, barTwoIdx] = animation;
                    const barOneStyle = bars[barOneIdx].style;
                    const barTwoStyle = bars[barTwoIdx].style;
                    const color = index % 3 === 0 ? "#FF4949" : "#229799";
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, index * delay);
                }
                else{
                    const [barIdx, newHeight] = animation;
                    const barStyle = bars[barIdx].style;
                    setTimeout(() => {
                        barStyle.height = `${newHeight * 0.9}%`;
                        values[barIdx].innerHTML = newHeight;
                    }, index * delay);
                }
                
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
            name="Merge Sort" 
            arraySize={arraySize}
            updateArraySize={(data) => setArraySize(data)}
            speed={speed}
            updateSpeed={(data) => setSpeed(data)}
            isSokerMode={isSokerMode}
            updateSokerMode={(data) => setisSoker(data)}
            disabled={disabled}
            caller={MergeSortCaller}
            Sokers={Sokers}
        />
        <Bars array={array} arraySize={arraySize} isSokerMode={isSokerMode} Sokers={Sokers}/>
        </>
    );
} 