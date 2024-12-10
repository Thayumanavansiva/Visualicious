import * as React from 'react';
import { Typography, AppBar, Box, Stack, Slider, Button, FormControlLabel, Checkbox, Modal } from '@mui/material';
import {BubbleSortWrapper} from '../Algorithms/SortingAlgorithms/BubbleSort';
import {SOKERS} from '../CONSTANTS';
import { shuffle, generateArray } from './helper';

export default function BubbleSortApp(){
    const [arraySize, setArraySize] = React.useState(10);
    const [array, setArray] = React.useState(Array.from({length: arraySize}, () => Math.floor(Math.random() * 100)));
    const [speed, setSpeed] = React.useState(1);
    const [isSokerMode, setisSoker] = React.useState(false);
    const [bars] = React.useState(document.getElementsByClassName("bars"));
    const [animationTimeouts, setAnimationTimeouts] = React.useState([]);
    const [isPopup, setisPopup] = React.useState(false);
    const [sokerIndex, setSokerIndex] = React.useState(bars.length - 1);
    const [Sokers] = React.useState(SOKERS);

    const Popup = (
        <Modal
        open={isPopup}
        onClose={() => setisPopup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
        <Box sx={{backgroundColor: "white", height: "70vh", width: "80vh", borderRadius: "1rem", color: "black"}}>
            <Typography id="modal-modal-title" variant="h5" component="h2" textAlign="center" sx={{fontFamily : "Pixelify Sans"}}>
            Soker of the Sort 🤡🫠
            </Typography>
            <img src={bars[sokerIndex]?.nextElementSibling?.src} width="100%" height="85%"></img>
            <Typography id="modal-name" variant="h4" component="h2" textAlign="center" sx={{fontFamily : "Pixelify Sans"}}>
            
            </Typography>
        </Box>
        </Modal>
    )

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
        }, animations.length * delay);
    }

    return (
        <>
        {isSokerMode && Popup}
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="fixed" sx={{backgroundColor:"black", height: "70px"}}>
                <Stack direction="row" sx={{columnGap: {"sm": "10px", "md": "100px"}}}>
                <Typography variant="h5" component="div" sx={{fontFamily: "Pixelify Sans", padding: "20px 0px 0px 20px" }}>
                    Bubble Sort
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
                    onChange={(event) => {
                        setArraySize(event.target.value);
                    }}
                    disabled={isSokerMode}
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
                    onChange={(event) => {
                        setSpeed(event.target.value);
                    }}
                    disabled={isSokerMode}
                    min={1}
                    max={50}
                />  
                </Box>
                </Stack>
                <Box sx={{padding: "18px 0px 0px 20px"}}>
                <FormControlLabel control={<Checkbox sx={{color: "#229799",'&.Mui-checked': {color: "#229799"}}} onChange={() => {setisSoker(!isSokerMode); shuffle(Sokers)}} />} label="Soker Mode 🤡!"></FormControlLabel>
                </Box>
                <div style={{ padding: "20px 0px 0px 20px" }}>
                            <Button onClick={BubbleSortCaller} sx={{ textAlign: "center" }}>
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
                        index < Sokers.length && 
                        <img src={Sokers[index].image} width={`${Math.floor(window.innerWidth / (arraySize* 3))}px`}></img>
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
            </Stack>
        </Box>
        </>
    );
} 