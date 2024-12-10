import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { Algos } from './CONSTANTS.js';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="fixed" sx={{backgroundColor:"black", maxHeight:"60px"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src="./logo.png" height="30px"/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Pixelify Sans" }}>
            Visualicious!
          </Typography>
          <Button color="inherit" sx={{fontFamily: "Pixelify Sans"}}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function Landing() {
  const [ToDisplay, setToDisplay] = React.useState(Algos);

  const navigate = useNavigate();

  return (
    <>
    <Stack rowGap="20px" sx={{justifyContent: "center", alignItems: "center", paddingTop: "65px"}}>
      <item><img src="./logo.png" height="200px" style={{userSelect: "none"}}/></item>
      <item>
        <Box sx={{textAlign: "center"}}>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontFamily: "Pixelify Sans" }}>Visualicious!</Typography>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: "Pixelify Sans" }}>Learn DSA Visually!</Typography>
        </Box>
      </item>
      <TextField
      sx={{"& input": {textAlign: "center",color: "white"}}}
      placeholder="Search your topic here..."
      variant='filled'
      onChange={(e) => {
        if (e.target.value == ""){
          setToDisplay(Algos);
        }
        else{
          setToDisplay(Algos.filter((v) => v.name.toLowerCase().includes(e.target.value.toLowerCase())))
        }
      }}
/>
    </Stack>

    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingTop: "2rem", margin: "10px"}}>
    {ToDisplay.map((algo, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Box sx={{backgroundColor: "white", paddingBottom: "20px", textAlign: "center", objectFit: "cover", borderRadius: "0.7rem", ":hover": {borderStyle: "solid", borderColor: "black"} }} onClick={() => {navigate(algo.path)}}>
          <Typography variant="h5" sx={{fontFamily: "Pixelify Sans", color: "black"}}>{`${algo.name} Sort`}</Typography>
            <img src={algo.image} width="100%">
          </img>
        </Box>
      </Grid>
    ))}
    </Grid>
    </>
  )
}

export default function App() {

  return (
    <>
    <div id="Home">
      <NavBar/>
      <Landing />
    </div>
    </>
  );
}