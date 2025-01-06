import React from "react";
import BasicModal from "./ui/modal";
import Button from "@mui/material/Button"
import LoginForm from "./form/loginForm";
import { UserContext } from "./context/contextAuth";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const{auth, setAuth} = React.useContext(UserContext)
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogout = () => {
        const token = localStorage.setItem('access_token', '');
        if (!token){
         setAuth(false)
         setOpen(false);
         navigate("/login");
         alert('Вы вышли')
        } 
     }

    return (
        <div>
            {!auth ? <Button onClick={handleOpen}>Login</Button> : <Button onClick={handleLogout}>logout</Button>}
            <BasicModal
                open={open}
                onClose={handleClose}
                children={<LoginForm onClose={handleClose} />}
            />
        </div>
    );
};

export default Login;