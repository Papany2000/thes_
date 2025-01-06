import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Controller, useForm, useFormState } from 'react-hook-form';
import React from 'react';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { postRecipes } from '../api/apiRecipes';

function RecipesForm({ updateRecipesList, handleClose }) {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            // Установите начальное значение для поля private
            private: false
        }
    });
    const { errors } = useFormState({
        control
    });

    const onSubmit = async (data) => {
        try {
            await postRecipes(data);
            Swal.fire({
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                width: 200,
                position: 'top-start',
                title: 'info!',
                text: 'Успешно',
                timer: 1500,
            }).then(async () => {
                try {
                    updateRecipesList()
                    handleClose()
                } catch (updateError) {
                    console.error('Ошибка при обновлении списка рецептов:', updateError);
                }
                });
        } catch (e) {
            Swal.fire({
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                width: 200,
                position: 'top-end',
                title: 'Ошибка!',
                text: 'Что то пошло не так',
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
                        name="title"
                        rules={{ required: 'обязательно к заполнению' }}
                        render={({ field }) => (
                            <TextField
                                style={{ marginTop: '10%' }}
                                autoFocus
                                margin="dense"
                                name="title"
                                label="Название рецепта"
                                type="text"
                                fullWidth={true}
                                onChange={(e) => field.onChange(e)}
                                value={field.value || ''}
                                error={!!errors.title?.message}
                                helperText={errors.title?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="recipeurl"
                        render={({ field }) => (
                            <TextField
                                style={{ marginTop: '10%' }}
                                autoFocus
                                margin="dense"
                                name="recipeurl"
                                label="url ссылка на рецепт"
                                type="text"
                                fullWidth={true}
                                onChange={(e) => field.onChange(e)}
                                value={field.value || ''}
                                error={!!errors.recipeurl?.message}
                                helperText={errors.recipeurl?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="photourl"
                        render={({ field }) => (
                            <TextField
                                style={{ marginTop: '10%' }}
                                autoFocus
                                margin="dense"
                                name="photourl"
                                label="url ссылка на фото рецепта"
                                type="text"
                                fullWidth={true}
                                onChange={(e) => field.onChange(e)}
                                value={field.value || ''}
                                error={!!errors.photourl?.message}
                                helperText={errors.photourl?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="videourl"
                        render={({ field }) => (
                            <TextField
                                style={{ marginTop: '10%' }}
                                autoFocus
                                margin="dense"
                                name="videourl"
                                label="url ссылка на видео рецепта"
                                type="text"
                                fullWidth={true}
                                onChange={(e) => field.onChange(e)}
                                value={field.value || ''}
                                error={!!errors.videourl?.message}
                                helperText={errors.videourl?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="recipes"
                        rules={{ required: 'обязательно к заполнению' }}
                        render={({ field }) => (
                            <TextField
                                style={{ marginTop: '10%' }}
                                autoFocus
                                margin="dense"
                                name="recipes"
                                label="описание рецепта"
                                type="textarea"
                                fullWidth={true}
                                onChange={(e) => field.onChange(e)}
                                value={field.value || ''}
                                error={!!errors.recipes?.message}
                                helperText={errors.recipes?.message}
                            />
                        )}
                    />
                    <Controller
                        name="private"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                }
                                label="Приватный рецепт"
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

export default RecipesForm;