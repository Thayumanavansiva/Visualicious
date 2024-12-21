import PropType from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';

export default function Bars({array, arraySize, isSokerMode, Sokers}) {
    return (
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
                    <Typography className= "values" variant="body2" component="div" sx={{fontFamily: "Pixelify Sans", color: "white", textAlign: "center", fontSize: `${Math.floor(window.innerWidth / (arraySize*7))}px`}}>{value}</Typography>
                    </Stack>
                ))
                }
        </Stack>
    )
}

Bars.propTypes = {
    array: PropType.array.isRequired,
    arraySize: PropType.number.isRequired,
    isSokerMode: PropType.bool.isRequired,
    Sokers: PropType.array.isRequired
}

