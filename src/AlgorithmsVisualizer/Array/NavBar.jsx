 
import * as React from 'react';
import PropType from 'prop-types';
import { FormControl, Select, MenuItem } from '@mui/material';
import { Typography, AppBar, Box, Stack, Slider, Button, TextField } from '@mui/material';

export default function NavBar({ name, type, params, updateParams, updateType }) {
    const [disable, setDisable] = React.useState(false);

    React.useEffect(() => {
        console.log(params);
        if (params.Array && params.Array.length > 0 && params.Array[0] !== "") {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [params]);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ backgroundColor: "black", height: "70px" }}>
                    <Stack direction="row" sx={{ columnGap: { "sm": "10px", "md": "100px" } }}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ fontFamily: "Pixelify Sans", padding: "15px 0px 0px 20px" }}
                        >
                            {name}
                        </Typography>

                        <FormControl
                            variant="outlined"
                            sx={{ width: "200px", padding: "5px 0px 0px 20px" }}
                        >
                            <Select
                                defaultValue={"CREATE"}
                                inputProps={{
                                    name: 'type',
                                    id: 'custom-select',
                                }}
                                sx={{
                                    '& .MuiSelect-select': { color: 'white', fontFamily: "Pixelify Sans" },
                                    '& .MuiMenuItem-root': { color: 'white', fontFamily: "Pixelify Sans" },
                                    backgroundColor: '#333',
                                }}
                                onChange={(event) => updateType(event)}
                            >
                                <MenuItem value="CREATE">Create</MenuItem>
                                <MenuItem value="INSERT">Insert</MenuItem>
                                <MenuItem value="REMOVE">Remove</MenuItem>
                                <MenuItem value="MINIMUM">Minimum</MenuItem>
                                <MenuItem value="MAXIMUM">Maximum</MenuItem>
                                <MenuItem value="UPDATE">Update</MenuItem>
                                <MenuItem value="Count">Count</MenuItem>
                                <MenuItem value="SEARCH">Search</MenuItem>
                                <MenuItem value="SUM">Sum</MenuItem>
                                <MenuItem value="Unique">Unique</MenuItem>
                            </Select>
                        </FormControl>

                        {type === "CREATE" && (
                            <Stack direction="row" gap={4} sx={{ padding: "5px 0px 0px 20px" }}>
                                <Box sx={{ width: "200px" }}>
                                    <Typography
                                        variant="body"
                                        component="div"
                                        sx={{ fontFamily: "Pixelify Sans" }}
                                    >
                                        Array Size
                                    </Typography>
                                    <Slider
                                        aria-label="Array Size"
                                        defaultValue={5}
                                        valueLabelDisplay="auto"
                                        value={params.arraySize}
                                        size="small"
                                        onChange={(event) => {
                                            updateParams("arraySize", event.target.value);
                                        }}
                                        min={5}
                                        disabled={disable}
                                        max={100}
                                    />
                                </Box>

                                <Box sx={{ width: "200px" }}>
                                    <Typography
                                        variant="body"
                                        component="div"
                                        sx={{ fontFamily: "Pixelify Sans" }}
                                    >
                                        Number of Elements
                                    </Typography>
                                    <Slider
                                        aria-label="Number of Elements"
                                        defaultValue={5}
                                        valueLabelDisplay="auto"
                                        value={params.N}
                                        size="small"
                                        onChange={(event) => {
                                            updateParams('N', event.target.value);
                                        }}
                                        disabled={disable}
                                        min={5}
                                        max={100}
                                    />
                                </Box>

                                <Typography
                                    variant="body"
                                    component="div"
                                    sx={{ fontFamily: "Pixelify Sans", padding: "15px 0px 0px 0px" }}
                                >
                                    OR
                                </Typography>

                                <TextField
                                    id="filled-basic"
                                    label="Define your array"
                                    variant="filled"
                                    sx={{
                                        backgroundColor: "#333",
                                        borderRadius: "0.5rem",
                                        "& .MuiInputBase-input": {
                                            color: "white",
                                            fontFamily: "Pixelify Sans",
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "white",
                                            fontFamily: "Pixelify Sans",
                                        },
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: "#333",
                                            borderRadius: "0.5rem",
                                        },
                                    }}
                                    onChange={(event) =>
                                        updateParams("Array", event.target.value.split(","))
                                    }
                                />
                            </Stack>
                        )}

                        {type === "INSERT" && (
    <Stack direction="row" gap={4} sx={{ padding: "1px 0px 0px 5px" }}>
        <Box sx={{ width: "200px" }}>
            <Typography
                variant="body"
                component="div"
                sx={{ fontFamily: "Pixelify Sans" }}
            >
                  Value to Insert
            </Typography>
            <TextField
                id=" insert-value"
                label="Enter Value"
                variant="filled"
                sx={{
                    backgroundColor: "#333",
                    borderRadius: "0.5rem",
                    "& .MuiInputBase-input": {
                        color: "white",
                        fontFamily: "Pixelify Sans",
                    },
                    "& .MuiInputLabel-root": {
                        color: "white",
                        fontFamily: "Pixelify Sans",
                    },
                    "& .MuiFilledInput-root": {
                        backgroundColor: "#333",
                        borderRadius: "0.5rem",
                    },
                }}
                onChange={(event) =>
                    updateParams("insertValue", event.target.value)
                }
            />
        </Box>

        <Box sx={{ width: "200px" }}>
            <Typography
                variant="body"
                component="div"
                sx={{ fontFamily: "Pixelify Sans" }}
            >
                  Index Position
            </Typography>
            <TextField
                id="insert-index"
                label="Enter Index"
                variant="filled"
                sx={{
                    backgroundColor: "#333",
                    borderRadius: "0.5rem",
                    "& .MuiInputBase-input": {
                        color: "white",
                        fontFamily: "Pixelify Sans",
                    },
                    "& .MuiInputLabel-root": {
                        color: "white",
                        fontFamily: "Pixelify Sans",
                    },
                    "& .MuiFilledInput-root": {
                        backgroundColor: "#333",
                        borderRadius: "0.5rem",
                    },
                }}
                onChange={(event) =>
                    updateParams("insertIndex", event.target.value)
                }
            />
        </Box>
    </Stack>
)}
{type === "REMOVE" && (
    <Stack
        direction="row"
        alignItems="center"
        spacing={4}
        sx={{
            padding: "5px 0px 0px 20px",
            justifyContent: "flex-start",
        }}
    >
    
        <Box sx={{ marginTop: "-5px" }}> 
            <Typography
                variant="body2"
                component="div"
                sx={{
                    fontFamily: "Pixelify Sans",
                    marginBottom: "3px",
                    textAlign: "center",
                }}
            >
                Index to Remove
            </Typography>
            <TextField
                id="remove-index"
                placeholder="Enter index"
                variant="outlined"
                size="small"
                sx={{
                    width: "130px",
                    backgroundColor: "#333",
                    borderRadius: "0.5rem",
                    "& .MuiInputBase-input": {
                        color: "white",
                        fontFamily: "Pixelify Sans",
                        textAlign: "center",
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" },
                        "&:hover fieldset": { borderColor: "#aaa" },
                        "&.Mui-focused fieldset": { borderColor: "blue" },
                    },
                }}
                onChange={(event) =>
                    updateParams("removeIndex", event.target.value)
                }
            />
        </Box>
    </Stack>
)}
{type === "MAXIMUM" && (
    <Stack direction="row" gap={4} sx={{ padding: "5px 0px 0px 20px" }}>
    <Box sx={{ width: "200px" }}>
        <Typography
            variant="body"
            component="div"
            sx={{ fontFamily: "Pixelify Sans" }}
        >
            Array Size
        </Typography>
        <Slider
            aria-label="Array Size"
            defaultValue={5}
            valueLabelDisplay="auto"
            value={params.arraySize}
            size="small"
            onChange={(event) => {
                updateParams("arraySize", event.target.value);
            }}
            min={5}
            disabled={disable}
            max={100}
        />
    </Box>

    <Box sx={{ width: "200px" }}>
        <Typography
            variant="body"
            component="div"
            sx={{ fontFamily: "Pixelify Sans" }}
        >
            Number of Elements
        </Typography>
        <Slider
            aria-label="Number of Elements"
            defaultValue={5}
            valueLabelDisplay="auto"
            value={params.N}
            size="small"
            onChange={(event) => {
                updateParams('N', event.target.value);
            }}
            disabled={disable}
            min={5}
            max={100}
        />
    </Box>

    <Typography
        variant="body"
        component="div"
        sx={{ fontFamily: "Pixelify Sans", padding: "15px 0px 0px 0px" }}
    >
        OR
    </Typography>

    <TextField
        id="filled-basic"
        label="Define your array"
        variant="filled"
        sx={{
            backgroundColor: "#333",
            borderRadius: "0.5rem",
            "& .MuiInputBase-input": {
                color: "white",
                fontFamily: "Pixelify Sans",
            },
            "& .MuiInputLabel-root": {
                color: "white",
                fontFamily: "Pixelify Sans",
            },
            "& .MuiFilledInput-root": {
                backgroundColor: "#333",
                borderRadius: "0.5rem",
            },
        }}
        onChange={(event) =>
            updateParams("Array", event.target.value.split(","))
        }
    />
</Stack>
)}
{type === "MINIMUM" && (
    <Stack direction="row" gap={4} sx={{ padding: "5px 0px 0px 20px" }}>
    <Box sx={{ width: "200px" }}>
        <Typography
            variant="body"
            component="div"
            sx={{ fontFamily: "Pixelify Sans" }}
        >
            Array Size
        </Typography>
        <Slider
            aria-label="Array Size"
            defaultValue={5}
            valueLabelDisplay="auto"
            value={params.arraySize}
            size="small"
            onChange={(event) => {
                updateParams("arraySize", event.target.value);
            }}
            min={5}
            disabled={disable}
            max={100}
        />
    </Box>

    <Box sx={{ width: "200px" }}>
        <Typography
            variant="body"
            component="div"
            sx={{ fontFamily: "Pixelify Sans" }}
        >
            Number of Elements
        </Typography>
        <Slider
            aria-label="Number of Elements"
            defaultValue={5}
            valueLabelDisplay="auto"
            value={params.N}
            size="small"
            onChange={(event) => {
                updateParams('N', event.target.value);
            }}
            disabled={disable}
            min={5}
            max={100}
        />
    </Box>

    <Typography
        variant="body"
        component="div"
        sx={{ fontFamily: "Pixelify Sans", padding: "15px 0px 0px 0px" }}
    >
        OR
    </Typography>

    <TextField
        id="filled-basic"
        label="Define your array"
        variant="filled"
        sx={{
            backgroundColor: "#333",
            borderRadius: "0.5rem",
            "& .MuiInputBase-input": {
                color: "white",
                fontFamily: "Pixelify Sans",
            },
            "& .MuiInputLabel-root": {
                color: "white",
                fontFamily: "Pixelify Sans",
            },
            "& .MuiFilledInput-root": {
                backgroundColor: "#333",
                borderRadius: "0.5rem",
            },
        }}
        onChange={(event) =>
            updateParams("Array", event.target.value.split(","))
        }
    />
</Stack>
)}
{type === "UPDATE" && (
    <Stack
        direction="row"
        alignItems="center"
        spacing={4}
        sx={{
            padding: "5px 0px 0px 10px", 
            justifyContent: "flex-start",
        }}
    >
        
        <Box>
            <Typography
                variant="body2"
                component="div"
                sx={{
                    fontFamily: "Pixelify Sans",
                    marginBottom: "3px",
                }}
            >
                Index to Update
            </Typography>
            <TextField
                id="update-index"
                placeholder="Enter Index"
                variant="filled"
                sx={{
                    backgroundColor: "#333",
                    borderRadius: "0.3rem",
                    "& .MuiInputBase-input": {
                        color: "white",
                        fontFamily: "Pixelify Sans",
                    },
                    "& .MuiInputLabel-root": {
                        color: "white",
                        fontFamily: "Pixelify Sans",
                    },
                    "& .MuiFilledInput-root": {
                        backgroundColor: "#333",
                        borderRadius: "0.3rem",
                    },
                }}
                onChange={(event) =>
                    updateParams("updateIndex", event.target.value)
                }
            />
        </Box>

                <Box>
            <Typography
                variant="body2"
                component="div"
                sx={{
                    fontFamily: "Pixelify Sans",
                    marginBottom: "3x",
                }}
            >
                Value to Update
            </Typography>
            <TextField
                id="update-value"
                placeholder="Enter Value"
                variant="filled"
                sx={{
                    backgroundColor: "#333",
                    borderRadius: "0.3rem",
                    "& .MuiInputBase-input": {
                        color: "white",
                        fontFamily: "Pixelify Sans",
                    },
                    "& .MuiInputLabel-root": {
                        color: "white",
                        fontFamily: "Pixelify Sans",
                    },
                    "& .MuiFilledInput-root": {
                        backgroundColor: "#333",
                        borderRadius: "0.3rem",
                    },
                }}
                onChange={(event) =>
                    updateParams("updateValue", event.target.value)
                }
            />
        </Box>
       
    </Stack>
)}






                        <div style={{ padding: "20px 0px 0px 20px" }}>
                            <Button
                                sx={{ textAlign: "center" }}
                                onClick={() => console.log("RUN button clicked")}
                            >
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontFamily: "Pixelify Sans" }}
                                >
                                    RUN!
                                </Typography>
                            </Button>
                        </div>
                    </Stack>
                </AppBar>
            </Box>
        </>
    );
}

NavBar.propTypes = {
    name: PropType.string,
    type: PropType.string,
    params: PropType.object,
    updateParams: PropType.func,
    updateType: PropType.func,
};
