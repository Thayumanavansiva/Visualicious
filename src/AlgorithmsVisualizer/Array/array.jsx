import * as React from 'react';
import NavBar from './NavBar.jsx';


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
        <NavBar 
        name="Array"
        type={type}
        params={params}
        updateParams={updateParams}
        updateType={updateType}
        />
    )
}