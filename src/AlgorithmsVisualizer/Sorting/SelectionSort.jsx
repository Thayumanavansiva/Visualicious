import * as React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { SelectionSortWrapper } from '../../Algorithms/SortingAlgorithms/SelectionSort.jsx';
import { shuffle, generateArray } from '../helper.jsx';
import {SOKERS} from '../CONSTANTS';

import Popup from './Popup.jsx';
import NavBar from './NavBar.jsx';

export default function SelectionSortApp(){
    const [bars] = React.useState(document.getElementsByClassName("bars"));
    const Sokers = React.useRef(SOKERS);


    const [arraySize, setArraySize] = React.useState(10);
    const [array, setArray] = React.useState(Array.from({length: arraySize}, () => Math.floor(Math.random() * 100)));
    const [speed, setSpeed] = React.useState(1);
    const [animationTimeouts, setAnimationTimeouts] = React.useState([]);
    const [isSokerMode, setisSoker] = React.useState(false);
    const [isPopup, setisPopup] = React.useState(false);
    const [sokerIndex, setSokerIndex] = React.useState(bars.length - 1);
    const [codelineCouter, setCodelineCounter] = React.useState(0);
    const [valuesCompared, setValuesCompared] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);

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
        const loop = document.getElementById("loop");
        const compare = document.getElementById("compare");
        const swap = document.getElementById("swap");

        switch(codelineCouter){
            case 0:
                loop.style.backgroundColor = "#229799";
                compare.style.backgroundColor = "transparent";
                swap.style.backgroundColor = "transparent";
                break;
            case 1:
                loop.style.backgroundColor = "transparent";
                compare.style.backgroundColor = "#229799";
                swap.style.backgroundColor = "transparent";
                break;
            case 2:
                loop.style.backgroundColor = "transparent";
                compare.style.backgroundColor = "transparent";
                swap.style.backgroundColor = "#229799";
                break;
            default:
                loop.style.backgroundColor = "transparent";
                compare.style.backgroundColor = "transparent";
                swap.style.backgroundColor = "transparent";
        }


    }, [codelineCouter]);


    
    function SelectionSortCaller(){
        animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        setAnimationTimeouts([]);
        setDisabled(true);

        let auxillaryArray = array.slice();
        let animations = SelectionSortWrapper(auxillaryArray);
        const values = document.getElementsByClassName("values");

        const baseDelay = 1600; // Base delay for animation
        const delayFactor = 1 / speed; // Speed scaling factor
        const delay = baseDelay * delayFactor; // Final delay per step

        let timeouts = animations.map((animation, index) =>{
            setTimeout(() => {
                const {comparison, swap} = animation;

                if (comparison.length > 0){
                    setCodelineCounter(1);
                    setValuesCompared([array[comparison[0]], array[comparison[1]]]);
                    bars[comparison[0]].style.backgroundColor = "purple"; // minimum element
                    bars[comparison[1]].style.backgroundColor = "#FF4949";
                }

                if (swap.length > 0) {
                    let temp = window.getComputedStyle(bars[swap[0]]).height;
                    let temp2 = values[swap[0]].innerHTML;
                    setCodelineCounter(2);
                    setValuesCompared([array[swap[0]], array[swap[1]]]);
                    setTimeout(() => {
                        bars[swap[0]].style.backgroundColor = "green";
                        bars[swap[1]].style.backgroundColor = "green";
                        bars[swap[0]].style.height = window.getComputedStyle(bars[swap[1]]).height;
                        bars[swap[1]].style.height = temp;
                        values[swap[0]].innerHTML = values[swap[1]].innerHTML;
                        values[swap[1]].innerHTML = temp2;
                    }, 300 * delayFactor);

                    setTimeout(() => {
                        bars[swap[1]].style.backgroundColor = "#229799";
                        bars[swap[0]].style.backgroundColor = "yellow";
                    }, 600 * delayFactor);
                }
                else{
                    setTimeout(() => {
                        bars[comparison[0]].style.backgroundColor = "#229799";
                        bars[comparison[1]].style.backgroundColor = "#229799";
                    }, 600 * delayFactor);
                }
            }, index*delay);
        });

        setAnimationTimeouts(timeouts);

        setTimeout(() => {
            for (let i=0; i<bars.length; i++){
                bars[i].style.backgroundColor = "yellow";
            }
            setCodelineCounter(0);
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
            name="Selection Sort" 
            arraySize={arraySize}
            updateArraySize={(data) => setArraySize(data)}
            speed={speed}
            updateSpeed={(data) => setSpeed(data)}
            isSokerMode={isSokerMode}
            updateSokerMode={(data) => setisSoker(data)}
            disabled={disabled}
            caller={SelectionSortCaller}
            Sokers={Sokers}
        />
        <Box sx={{bgcolor: "#3C3D37", position: "relative"}}>
            <Stack direction="row" spacing={0.5} sx={{height: "90vh", mx: {"xs": "0px", "md": "130px"}, paddingTop: "60px", justifyContent: "center"}}>
                    {
                    isSokerMode ?
                    array.map((value, index) => (
                        <Stack key={index}>
                        <Box key={index} className="bars" sx={{width: `${Math.floor(window.innerWidth / (arraySize* 3))}px`, height: `${value*0.9}%`, backgroundColor: "#229799"}} />
                        {
                            index < Sokers.current.length && 
                            <img src={Sokers.current[index].image} width={`${Math.floor(window.innerWidth / (arraySize* 3))}px`}></img>
                        }
                        <Typography className= "values" variant="body2" component="div" sx={{fontFamily: "Pixelify Sans", color: "white", textAlign: "center", fontSize: `${Math.floor(window.innerWidth / (arraySize*7))}px`}}>{value}</Typography>
                        </Stack>
                    ))
                    :
                    array.map((value, index) => (
                        <Stack key={index}>
                        <Box key={index} className="bars" sx={{width: `${Math.floor(window.innerWidth / (arraySize* 3))}px`, height: `${value*0.9}%`, backgroundColor: "#229799"}} />
                        <img></img>
                        <Typography className= "values" variant="body2" component="div" sx={{fontFamily: "Pixelify Sans", color: "white", textAlign: "center", fontSize: `${Math.floor(window.innerWidth / (arraySize*7))}px`}}>{value}</Typography>
                        </Stack>
                    ))
                    }
                <Box sx={{width: "300px", borderStyle: "solid", position: "absolute", right: "5px", bottom: "30px"}}>
                    <Box sx={{borderStyle: "solid"}}>
                        <Typography variant="h6" component="div" sx={{ fontFamily: "Pixelify Sans", textAlign: "center", color: codelineCouter == 1 ? "red" : "#229799", padding: "10px" }}>
                            {
                                codelineCouter === 1 ? "Comparing" : codelineCouter === 2 ? "Swapping" : "Looping..."
                            }
                            {
                                valuesCompared.length > 0 ? ` ${valuesCompared[0]} and ${valuesCompared[1]}` : ""
                            }
                        </Typography>
                    </Box>
                    <span style={{ fontFamily: "Pixelify Sans", textAlign: "left", color: "white", padding: "10px" }}>
                        <span id="loop" style={{ fontFamily: "Pixelify Sans", textAlign: "left", color: "white" }}>
                            for(i = 0; i &lt; N; i++) {"{"}<br />
                            int min_index = i;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;for (j = i+1; j &lt; N; j++){"{"}<br />
                        </span>
                        <span id="compare" style={{ fontFamily: "Pixelify Sans", textAlign: "left", color: "white", paddingLeft: "40px" }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (arr[j] &lt; arr[min_index]){"{"}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min_index = j;<br />
                        </span>
                        <span style={{ fontFamily: "Pixelify Sans", textAlign: "left", color: "white", paddingLeft: "40px" }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br />
                        </span>
                        <span id="swap" style={{ fontFamily: "Pixelify Sans", textAlign: "left", color: "white" }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;if (min_index != i){"{"}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swap(arr[min_index], arr[i]);<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br />
                        </span>
                        <span style={{ fontFamily: "Pixelify Sans", textAlign: "left", color: "white" }}>
                            {"}"}<br />
                        </span>
                    </span>
                </Box>

            </Stack>
        </Box>
        </>
    );
} 