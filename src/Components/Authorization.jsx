import React from "react";
import BasicModal from "./ui/modal";
import Button from "@mui/material/Button"
import RegistrationForm from "./form/loginRegistrationForm";



const Authorization = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
 
   
    return (
        <div>
            <Button onClick={handleOpen}>Авторизация</Button> 
            <BasicModal
                open={open}
                handleClose={handleClose}
                children={<RegistrationForm handleClose={handleClose} />}
            />
        </div>
    );
};

export default Authorization;