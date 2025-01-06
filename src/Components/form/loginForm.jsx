import React from 'react'
import { Button, TextField } from '@mui/material';
import { Controller, useForm, useFormState } from "react-hook-form";
import Box from '@mui/material/Box';
import { login } from '../api/apiUser';
import Swal from 'sweetalert2';
import { setAuthToken } from '../utils/axiosClient';
import { UserContext } from '../context/contextAuth';
import { useNavigate } from 'react-router-dom';




function LoginForm({ onClose }) {

  const{setAuth} = React.useContext(UserContext)
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm()
  const { errors } = useFormState({
    control
  });
  const onSubmit = async (data) => {
   console.log(data);
    try {
      const res = await login(data);
      setAuthToken(res.data.token)
      const token = localStorage.setItem('access_token', res.data.token)
      if (res.data.token) { 
        setAuth(true)
        setAuthToken(token);
        navigate("/goods");
       }
      Swal.fire({
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        width: 200,
        position: "top-start",
        title: "Успешно",
        text: "Вы вошли",
        timer: 1500,
      });
      onClose();
    } catch (e) {
      Swal.fire({
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        width: 200,
        position: "top-end",
        title: "Ошибка!",
        text: "Проверьте логин и пароль",
        timer: 1500,
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
          <Button type="submit" fullWidth={true} variant="contained">Авторизуйтесь</Button>
        </form>
      </Box>

    </div>

  );
}

export default LoginForm;