import React from 'react'
import { Button, TextField } from '@mui/material';
import { Controller, useForm, useFormState } from "react-hook-form";
import Box from '@mui/material/Box';
import { postUser } from '../api/apiUser';
import Swal from 'sweetalert2';
import { setAuthToken } from '../utils/axiosClient';
import { UserContext } from '../context/contextAuth';


function RegistrationForm({ handleClose }) {

  const{setAuth} = React.useContext(UserContext)
  const { handleSubmit, control } = useForm()
  const { errors } = useFormState({
    control
  });
  const onSubmit = async (data) => {
    try {
      const res = await postUser(data);
      setAuthToken(res.data.token)
      const token = localStorage.setItem('access_token', res.data.token)
      if (res.data.token) { 
        setAuth(true)
        setAuthToken(token);
       }
      Swal.fire({
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        width: 200,
        position: "top-start",
        title: "info!",
        text: "Успешно",
        timer: 2000,
      });
      handleClose();
    } catch (error) {
      Swal.fire({
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        width: 200,
        position: "top-end",
        title: "Error!",
        text: error.response.data.message,
        timer: 2000,
      });
    }
  };

  return (

    <div style={{ display: 'flex', justifyContent: 'space-evenly', }}>


      <Box mr={3} style={{ width: '50%', borderRight: '25%', marginBottom: '10%' }}>

        <form onSubmit={handleSubmit(onSubmit)} style={{ borderRight: '25%' }}>
          <Controller
            control={control}
            name="login"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                style={{ marginTop: '10%' }}
                autoFocus
                margin='dense'
                name="login"
                label="Login пользователя"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ''}
                error={!!errors.login?.message}
                helperText={errors.login?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin='dense'
                name="password"
                label="пароль"
                type="password"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ''}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button type="submit" fullWidth={true} variant="contained">Зарегистрируйся</Button>
        </form>
      </Box>

    </div>

  );
}

export default RegistrationForm;