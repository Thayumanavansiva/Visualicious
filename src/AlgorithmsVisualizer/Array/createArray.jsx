import { Box, Stack } from '@mui/material';

export default function createArray({params}){

    const generateArray = (params) => {
        let array = [];

        if (params.arraySize <= params.N) {
            params.N = params.arraySize;
        }

        for (let i = 0; i < params.N; i++) {
            array.push(Math.floor(Math.random() * 100));
        }

        if (params.arraySize > params.N) {
            for (let i = 0; i < params.arraySize - params.N; i++) {
                array.push(undefined);
            }
        }

        return array;

    }

    const array = params.Array.length > 0 && params.Array[0] !== "" ? params.Array : generateArray(params);

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