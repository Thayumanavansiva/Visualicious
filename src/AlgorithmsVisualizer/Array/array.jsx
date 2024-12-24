import * as React from 'react';
import NavBar from './NavBar.jsx';
import Createarray from './createArray.jsx';
import { Container, Stack } from '@mui/material';

export default function ArrayApp() {
    const [type, setType] = React.useState("CREATE");
    const [params, setParams] = React.useState({"arraySize": 10, "N": 6});

    const updateParams = (key, value) => {
        setParams((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    const updateType = (event) => {
        setType(event.target.value);
    }

    return (
        <>

        <NavBar 
        name="Array"
        type={type}
        params={params}
        updateParams={updateParams}
        updateType={updateType}
        />

        <Container sx={{marginTop: "20%", alignItems: "center", justifyContent: "center", display: "flex"}}>
        <Createarray />
        </Container>

        </>
    )
}