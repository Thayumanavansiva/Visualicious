import PropType from 'prop-types';

import { Typography, AppBar, Box, Stack, Slider, Button, FormControlLabel, Checkbox } from '@mui/material';


export default function NavBar({arraySize, updateArraySize, speed, updateSpeed, isSokerMode, updateSokerMode, disabled, Sokers}) {
    return (
        <>
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
                    defaultValue={5}
                    valueLabelDisplay="auto"
                    value={arraySize}
                    size="small"
                    onChange={(event) => {
                        updateArraySize(event.target.value);
                    }}
                    disabled={isSokerMode || disabled}
                    min={5}
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
                        updateSpeed(event.target.value);
                    }}
                    disabled={isSokerMode || disabled}
                    min={1}
                    max={50}
                />  
                </Box>
                </Stack>
                <Box sx={{padding: "18px 0px 0px 20px"}}>
                <FormControlLabel control={<Checkbox sx={{color: "#229799",'&.Mui-checked': {color: "#229799"}}} onChange={() => {updateSokerMode(!isSokerMode); shuffle(Sokers)}} />} label="Soker Mode 🤡!"></FormControlLabel>
                </Box>
                <div style={{ padding: "20px 0px 0px 20px" }}>
                            <Button sx={{ textAlign: "center" }} disabled={disabled}>
                                <Typography variant="body2" component="div" sx={{ fontFamily: "Pixelify Sans" }}>
                                    Sort Now!
                                </Typography>
                            </Button>
                        </div>         
                </Stack>
            </AppBar>            
        </Box>
        </>
    )
}

NavBar.propTypes = {
    arraySize: PropType.number,
    updateArraySize: PropType.func,
    speed: PropType.number,
    updateSpeed: PropType.func,
    isSokerMode: PropType.bool,
    updateSokerMode: PropType.func,
    disabled: PropType.bool,
    Sokers: PropType.array
}