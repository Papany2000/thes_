import { axiosClient } from "../utils/axiosClient";


export const postUser = async (user) =>
    axiosClient.post(`/auth/signin`, user);

export const login = function (loginParams) {
    return axiosClient.post(`/auth/login`, loginParams)
}