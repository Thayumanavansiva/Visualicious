import * as React from 'react';
import { Typography, AppBar, Box, Stack, Slider, Button, FormControlLabel, Checkbox } from '@mui/material';
import { InsertionSortWrapper } from '../../Algorithms/SortingAlgorithms/insertionSort.jsx';
import { shuffle, generateArray } from '../helper.jsx';
import {SOKERS} from '../CONSTANTS.js';
import Popup from './Popup.jsx';
import NavBar from './NavBar.jsx';
import Bars from './Bars.jsx';

export default function InsertionSortApp(){

    const [bars] = React.useState(document.getElementsByClassName("bars"));
    const [Sokers] = React.useState(SOKERS);



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
            shuffle([...Sokers]);
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

    
    function insertionSortCaller(){
        animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        setAnimationTimeouts([]);
        setDisabled(true);

        let auxillaryArray = array.slice();
        let tempArray = array.slice();
        let animations = InsertionSortWrapper(auxillaryArray);
        const values = document.getElementsByClassName("values");
        const baseDelay = 1600; // Base delay for animation
        const delayFactor = 1 / speed; // Speed scaling factor
        const delay = baseDelay * delayFactor; // Final delay per step

        let timeouts = animations.map((animation, index) =>{
            setTimeout(() => {
                const {comparison, swap} = animation;

                bars[comparison[0]].style.backgroundColor = "#FF4949";
                bars[comparison[1]].style.backgroundColor = "#FF4949";
                setCodeLineCounter(1);
                setValuesCompared([tempArray[comparison[0]], tempArray[comparison[1]]]);

                if (swap.length > 0) {
                    let temp = window.getComputedStyle(bars[swap[0]]).height;
                    let temp2 = values[swap[0]].innerHTML;
                    let temp3 = tempArray[swap[0]];
                    tempArray[swap[0]] = tempArray[swap[1]];
                    tempArray[swap[1]] = temp3;
                    setCodeLineCounter(2);
                    setValuesCompared([tempArray[swap[0]], tempArray[swap[1]]]);
                    
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
            setCodeLineCounter(-1);
            setValuesCompared([]);
        }, animations.length * delay);
    }

    return (
        <>
        {isSokerMode && <Popup isPopup={isPopup} setisPopup={(data) => setisPopup(data)} sokerIndex={sokerIndex} bars={bars} />}
        <NavBar
            name="Insertion Sort" 
            arraySize={arraySize}
            updateArraySize={(data) => setArraySize(data)}
            speed={speed}
            updateSpeed={(data) => setSpeed(data)}
            isSokerMode={isSokerMode}
            updateSokerMode={(data) => setisSoker(data)}
            disabled={disabled}
            caller={insertionSortCaller}
            Sokers={Sokers}
        />
        <Bars array={array} arraySize={arraySize} isSokerMode={isSokerMode} Sokers={Sokers}/>
        <Box sx={{width: "300px", borderStyle: "solid", position: "absolute", right: "5px", bottom: "30px"}}>
                    <Box sx={{borderStyle: "solid"}}>
                        <Typography variant="h6" component="div" sx={{ fontFamily: "Pixelify Sans", textAlign: "center", color: "red", padding: "10px" }}>
                            {
                                codelineCouter === 1 ? "Comparing" : codelineCouter === 2 ? "Swapping" : "Looping..."
                            }
                            {
                                valuesCompared.length > 0 ? ` ${valuesCompared[0]} and ${valuesCompared[1]}` : ""
                            }
                        </Typography>
                    </Box>
                    <span style={{ fontFamily: "Pixelify Sans", textAlign: "left", color: "white", padding: "10px" }}>
                        <span ref={loop} id="loop" style={{ fontFamily: "Pixelify Sans", textAlign: "left", color: "white" }}>
                            for(i = 1; i &lt; N; i++) {"{"}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;int j = i;<br />
                        </span>
                        <span ref={compare} id="compare" style={{ fontFamily: "Pixelify Sans", textAlign: "left", color: "white"}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;while (j &gt; 0 && array[j] &lt; array[j-1]){"{"}<br />
                        </span>
                        <span ref={swap} id="swap" style={{ fontFamily: "Pixelify Sans", textAlign: "left", color: "white" }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;swap(array[j], array[j-1]);<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;j--;<br />
                        </span>
                        <span style={{ fontFamily: "Pixelify Sans", textAlign: "left", color: "white" }}>
                            {"}"}<br />
                        </span>
                    </span>
        </Box>
        </>
    );
} 