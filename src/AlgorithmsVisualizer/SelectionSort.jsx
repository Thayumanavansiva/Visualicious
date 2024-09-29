import * as React from 'react';
import { Typography, AppBar, Box, Stack, Slider, Button } from '@mui/material';
import { SelectionSortWrapper } from '../Algorithms/SortingAlgorithms/SelectionSort';

export default function SelectionSortApp(){
    const [arraySize, setArraySize] = React.useState(10);
    const [array, setArray] = React.useState(Array.from({length: arraySize}, () => Math.floor(Math.random() * 100)));
    const [speed, setSpeed] = React.useState(1);
    const [animationTimeouts, setAnimationTimeouts] = React.useState([]);

    function generateArray(size) {
        const newarray = Array.from({ length: size }, () => Math.floor(Math.random() * (100 - 5) + 5));
        return newarray;
    }

    React.useEffect(() => {
        setArray(generateArray(arraySize));
    }, [arraySize]);
    
    function SelectionSortCaller(){
        animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        setAnimationTimeouts([]);

        let auxillaryArray = array.slice();
        let animations = SelectionSortWrapper(auxillaryArray);
        const bars = document.getElementsByClassName("bars");
        const values = document.getElementsByClassName("values");

        const baseDelay = 1600; // Base delay for animation
        const delayFactor = 1 / speed; // Speed scaling factor
        const delay = baseDelay * delayFactor; // Final delay per step

        let timeouts = animations.map((animation, index) =>{
            setTimeout(() => {
                const {comparison, swap} = animation;

                if (comparison.length > 0){
                    bars[comparison[0]].style.backgroundColor = "purple"; // minimum element
                    bars[comparison[1]].style.backgroundColor = "#FF4949";
                }

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
            setArray(auxillaryArray);
        }, animations.length * delay);
    }

    return (
        <>
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="fixed" sx={{backgroundColor:"black", height: "70px"}}>
                <Stack direction="row" sx={{columnGap: {"sm": "10px", "md": "100px"}}}>
                <Typography variant="h5" component="div" sx={{fontFamily: "Pixelify Sans", padding: "20px 0px 0px 20px" }}>
                    Selection Sort
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
                    min={1}
                    max={50}
                />  
                </Box>
                </Stack>
                <div style={{ padding: "20px 0px 0px 20px" }}>
                            <Button onClick={SelectionSortCaller} sx={{ textAlign: "center" }}>
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
                array.map((value, index) => (
                    <Stack key={index}>
                    <Box key={index} className="bars" sx={{width: `${Math.floor(window.innerWidth / (arraySize* 3))}px`, height: `${value*0.9}%`, backgroundColor: "#229799"}} />
                    <Typography className= "values" variant="body2" component="div" sx={{fontFamily: "Pixelify Sans", color: "white", textAlign: "center", fontSize: `${Math.floor(window.innerWidth / (arraySize*7))}px`}}>{value}</Typography>
                    </Stack>                
                    ))
                }
            </Stack>
        </Box>
        </>
    );
} 