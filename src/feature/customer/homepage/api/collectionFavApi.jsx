import axiosClient from "../../../../shared/api/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import qs from "qs";

export const FavouriteRequest = (userId) => {
  const request = async (userId) => {
    const response = await axiosClient.get("favouriteCM/getFavourites", {
      params: { userId },
    });
    return response.data;
  };

  return useQuery({
    queryKey: ["favourites"],
    queryFn: () => request(userId),
  });
};

export const CreateFavouriteMutation = () => {
  const request = async (payload) => {
    const response = await axiosClient.post(
      "favouriteCM/createFavourite",
      payload
    );
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
export const DeleteFavouriteMutation = () => {
  const request = async (payload) => {
    const response = await axiosClient.post(
      "favouriteCM/deleteFavourites",
      payload
    );
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
