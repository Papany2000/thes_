import { Button, TextField } from '@mui/material';
import { Controller, useForm, useFormState } from 'react-hook-form';
import React from 'react';
import Box from '@mui/material/Box';
import { getGoodsList, postGoods } from '../api/apiGoods';
import Swal from 'sweetalert2';

function NameForm({ setGoods, onClose }) {
  const { handleSubmit, control } = useForm();
  const { errors } = useFormState({
    control
  });

  const onSubmit = async (data) => {

    try {
      await postGoods(data);
      Swal.fire({
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        width: 200,
        position: 'top-start',
        title: 'info!',
        text: 'Успешно',
        timer: 1500,
      });
      await setGoods((await getGoodsList()).data);
      onClose();
    } catch (e) {
      Swal.fire({
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        width: 200,
        position: 'top-end',
        title: 'Error!',
        text: 'Do you want to continue',
        timer: 1500,
      });
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <Box mr={3} style={{ width: '50%', borderRight: '25%' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ borderRight: '25%' }}>
          <Controller
            control={control}
            name="id"
            rules={{ required: 'обязательно к заполнению' }}
            render={({ field }) => (
              <TextField
                style={{ marginTop: '10%' }}
                autoFocus
                margin="dense"
                name="id"
                label="Идентификатор"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ''}
                error={!!errors.id?.message}
                helperText={errors.id?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="name"
            rules={{ required: 'обязательно к заполнению' }}
            render={({ field }) => (
              <TextField
                style={{ marginTop: '10%' }}
                autoFocus
                margin="dense"
                name="name"
                label="наименование"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ''}
                error={!!errors.name?.message}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="quantity"
            rules={{ required: 'обязательно к заполнению' }}
            render={({ field }) => (
              <TextField
                style={{ marginTop: '10%' }}
                autoFocus
                margin="dense"
                name="quantity"
                label="количество"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ''}
                error={!!errors.quantity?.message}
                helperText={errors.quantity?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="storageLocation"
            rules={{ required: 'обязательно к заполнению' }}
            render={({ field }) => (
              <TextField
                style={{ marginTop: '10%' }}
                autoFocus
                margin="dense"
                name="storageLocation"
                label="место хранения"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ''}
                error={!!errors.storageLocation?.message}
                helperText={errors.storageLocation?.message}
              />
            )}
          />
          <Button type="submit" fullWidth={true} variant="contained">
            Введите данные
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default NameForm;
