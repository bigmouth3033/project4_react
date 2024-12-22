import axiosClient from "../../../../shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

export const PropertiesRequest = (
  categoryId,
  propertyType,
  amenities,
  isInstant,
  isSelfCheckin,
  isPetAllow,
  priceRange,
  room,
  bed,
  bathRoom,
  locationId,
  guest
) => {
  const request = async (
    categoryId,
    propertyType,
    amenities,
    isInstant,
    isSelfCheckin,
    isPetAllow,
    priceRange,
    room,
    bed,
    bathRoom,
    locationId,
    guest
  ) => {
    const response = await axiosClient.get("listingCM/propertyCM", {
      params: {
        categoryId,
        propertyType,
        amenities,
        isInstant,
        isSelfCheckin,
        isPetAllow,
        priceRange,
        room,
        bed,
        bathRoom,
        locationId,
        guest,
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }), //với param dạng String: qs nhận null nhưng gửi đi chuỗi "" => Sprinh nhận về "" => phải chuyển lại thành null
    });
    return response.data;
  };

  return useQuery({
    queryKey: [
      "properties",
      categoryId,
      propertyType,
      amenities,
      isInstant,
      isSelfCheckin,
      isPetAllow,
      priceRange,
      room,
      bed,
      bathRoom,
      locationId,
      guest,
    ],
    queryFn: () =>
      request(
        categoryId,
        propertyType,
        amenities,
        isInstant,
        isSelfCheckin,
        isPetAllow,
        priceRange,
        room,
        bed,
        bathRoom,
        locationId,
        guest
      ),
  });
};
