import { axiosClient } from "../utils/axiosClient";

export const postRecipes = async (recipes) =>
    axiosClient.post(`/recipes`, recipes);

//получение всех рецептов
export const getRecipesList = async function () {
    return axiosClient.get(
        `/recipes/all`
    );
};

export const getRecipesId = async function () {
    return axiosClient.get(
        `/recipes`
    );
};

export const removeRecipesId = async (id) => axiosClient.delete(`/goods/${id}`);

export const updateRecipesId = async (good, id) => axiosClient.patch(`/goods/${id}`, good)