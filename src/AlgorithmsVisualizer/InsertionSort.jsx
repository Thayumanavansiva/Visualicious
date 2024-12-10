import * as React from 'react';
import { Typography, AppBar, Box, Stack, Slider, Button, FormControlLabel, Checkbox } from '@mui/material';
import { InsertionSortWrapper } from '../Algorithms/SortingAlgorithms/insertionSort';
import { shuffle, generateArray, sokerPopup } from './helper.jsx';
import {SOKERS} from '../CONSTANTS';

export default function InsertionSortApp(){

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

    const Popup = sokerPopup(isPopup, setisPopup, sokerIndex, bars);
    
    function insertionSortCaller(){
        animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        setAnimationTimeouts([]);

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
        }, animations.length * delay);
    }

    return (
        <>
        {isSokerMode && Popup}
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="fixed" sx={{backgroundColor:"black", height: "70px"}}>
                <Stack direction="row" sx={{columnGap: {"sm": "10px", "md": "100px"}}}>
                <Typography variant="h5" component="div" sx={{fontFamily: "Pixelify Sans", padding: "20px 0px 0px 20px" }}>
                    Insertion Sort
                </Typography>
                <Stack direction="row" gap={3} sx={{padding: "25px 0px 0px 20px"}}>
                <Typography variant = "body" component="div" sx={{fontFamily: "Pixelify Sans"}}>
                    Array Size
                </Typography>
                <Box sx={{width: "200px"}}>
                <Slider
                    aria-label="Array Size"
                    defaultValue={10}
                    valueLabelDisplay="auto"
                    value={arraySize}
                    size="small"
                    disabled={isSokerMode}
                    onChange={(event) => {
                        setArraySize(event.target.value);
                    }}
                    min={10}
                    max={100}
                />  
                </Box>
                <Typography variant = "body" component="div" sx={{fontFamily: "Pixelify Sans"}}>
                    Speed
                </Typography>
                <Box sx={{width: "200px"}}>
                <Slider
                    aria-label="Speed"
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    value={speed}
                    size="small"
                    disabled={isSokerMode}
                    onChange={(event) => {
                        setSpeed(event.target.value);
                    }}
                    min={1}
                    max={50}
                />  
                </Box>
                </Stack>
                <Box sx={{padding: "18px 0px 0px 20px"}}>
                <FormControlLabel control={<Checkbox sx={{color: "#229799",'&.Mui-checked': {color: "#229799"}}}/>} onChange={() => {setisSoker(!isSokerMode); shuffle(Sokers.current)}} label="Soker Mode 🤡!"></FormControlLabel>
                </Box>
                <div style={{ padding: "20px 0px 0px 20px" }}>
                            <Button onClick={insertionSortCaller} sx={{ textAlign: "center" }}>
                                <Typography variant="body2" component="div" sx={{ fontFamily: "Pixelify Sans" }}>
                                    Sort Now!
                                </Typography>
                            </Button>
                        </div>         
                </Stack>
            </AppBar>            
        </Box>
        <Box sx={{bgcolor: "#3C3D37", height: "100vh"}}>
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