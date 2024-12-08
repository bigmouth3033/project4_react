import axiosClient from "../../../../shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

export const PropertiesRequest = (
  categoryId,
  propertyType,
  isInstant,
  isSelfCheckin,
  isPetAllow,
  priceRange,
  room,
  bed,
  bathRoom
) => {
  const request = async (
    categoryId,
    propertyType,
    isInstant,
    isSelfCheckin,
    isPetAllow,
    priceRange,
    room,
    bed,
    bathRoom
  ) => {
    const response = await axiosClient.get("listingCM/propertyCM", {
      params: {
        categoryId,
        propertyType,
        isInstant,
        isSelfCheckin,
        isPetAllow,
        priceRange,
        room,
        bed,
        bathRoom,
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    });
    return response.data;
  };

  return useQuery({
    queryKey: [
      "properties",
      categoryId,
      propertyType,
      isInstant,
      isSelfCheckin,
      isPetAllow,
      priceRange,
      room,
      bed,
      bathRoom,
    ],
    queryFn: () =>
      request(
        categoryId,
        propertyType,
        isInstant,
        isSelfCheckin,
        isPetAllow,
        priceRange,
        room,
        bed,
        bathRoom
      ),
  });
};
