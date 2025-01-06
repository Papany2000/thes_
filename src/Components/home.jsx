import React, { useState, useEffect } from "react";
import RecipesForm from "./form/recipesForm";
import BasicModal from "./ui/modal";
import { Button, Grid2, ToggleButton, ToggleButtonGroup } from "@mui/material";
import InteractiveCard from "./ui/card";
import { getRecipesId, getRecipesList } from "./api/apiRecipes";

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [open, setOpen] = useState(false);
    const [viewMode, setViewMode] = useState('all');

    const fetchRecipes = React.useCallback(() => {
        if (viewMode === 'all') {
            getRecipesList()
                .then((result) => {
                    setRecipes(result.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            getRecipesId()
                .then((result) => {
                    setRecipes(result.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [viewMode]);

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    const updateRecipesList = React.useCallback(async () => {
        try {
            const updatedRecipes = await getRecipesList();
            setRecipes(updatedRecipes.data);
        } catch (error) {
            console.error('Ошибка при обновлении списка рецептов:', error);
        }
    }, []);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDelete = (id) => {
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
        // Здесь также нужно добавить логику для удаления рецепта с сервера
    };

    const handleViewModeChange = (event, newViewMode) => {
        if (newViewMode !== null) {
            setViewMode(newViewMode);
        }
    };

    return (
        <div className={'home'}>
            <div style={{display: 'flex', justifyContent: 'space-around', margin: '1rem 1rem'}}>    
                <ToggleButtonGroup
                    color="primary"
                    value={viewMode}
                    exclusive
                    onChange={handleViewModeChange}
                    aria-label="view mode"
                >
                    <ToggleButton variant="prymary" value="all" aria-label="all recipes">
                        Все рецепты
                    </ToggleButton>
                    <ToggleButton value="user" aria-label="user recipes">
                        Мои рецепты
                    </ToggleButton>    
                </ToggleButtonGroup>
                <Button onClick={handleOpen}>Создать новый рецепт</Button>
            </div>
           
            <BasicModal
                open={open}
                handleClose={handleClose}
                children={<RecipesForm updateRecipesList={updateRecipesList} handleClose={handleClose} />}
            />
            <Grid2 container spacing={2}>
                {recipes.map((recipe) => (
                    <Grid2 item="true" xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                        <InteractiveCard {...recipe}
                            onDelete={() => handleDelete(recipe.id)}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </div>
    );
}

export default Home;