import { Box, Stack } from '@mui/material';

export default function createArray(){

    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <Stack direction="row">
            {
                array.map((value, index) => {
                    return (
                        <div key={index} className="array-element" onClick={(event)=> event.target.style.backgroundColor = "red"}>
                        <Box key={index} sx={{
                            backgroundColor: "black",
                            color: "white",
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "20px",
                            border: "1px solid white",
                            fontFamily: "Pixelify Sans"
                        }}>
                            {value}
                        </Box>
                        </div>
                    )
                })
            }
        </Stack>
    )
}