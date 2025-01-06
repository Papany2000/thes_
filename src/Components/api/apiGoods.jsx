import { axiosClient } from "../utils/axiosClient";

export const postGoods = async (goods) =>
  axiosClient.post(`/goods`, goods);

export const getGoodsList = async function () {
  return axiosClient.get(
    `/goods`
  );
};

export const removeGoodsId = async (id) => axiosClient.delete(`/goods/${id}`);

export const updateGoodsId = async (good, id) => axiosClient.patch(`/goods/${id}`, good)