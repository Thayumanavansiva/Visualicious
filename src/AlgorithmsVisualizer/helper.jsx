import { Modal, Box, Typography } from "@mui/material";

export const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 

export const generateArray = (size) => {
  const newarray = Array.from({ length: size }, () => Math.floor(Math.random() * (100 - 5) + 5));
  return newarray;
}

export const sokerPopup = (isPopup, setisPopup, sokerIndex, bars) => (
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