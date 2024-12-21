import PropTypes from "prop-types"
import { Modal, Box, Typography } from "@mui/material";

export default function Popup({isPopup, updatePopup, bars, sokerIndex}){
    return (
    <Modal
        open={isPopup}
        onClose={() => updatePopup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Box sx={{ backgroundColor: "white", height: "70vh", width: "80vh", borderRadius: "1rem", color: "black" }}>
            <Typography id="modal-modal-title" variant="h5" component="h2" textAlign="center" sx={{ fontFamily: "Pixelify Sans" }}>
                Soker of the Sort 🤡🫠
            </Typography>
            <img src={bars[sokerIndex]?.nextElementSibling?.src} width="100%" height="85%"></img>
            <Typography id="modal-name" variant="h4" component="h2" textAlign="center" sx={{ fontFamily: "Pixelify Sans" }}>
            </Typography>
        </Box>
    </Modal>
    )
}

Popup.propTypes = {
    isPopup: PropTypes.bool,
    updatePopup: PropTypes.func,
    bars: PropTypes.array,
    sokerIndex: PropTypes.number
}

