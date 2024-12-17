import { useQuery } from "@tanstack/react-query";
import axiosAdmin from "@/shared/api/axiosAdmin";
import qs from "qs";

export const GetBookingListRequest = (
  pageNumber,
  pageSize,
  status,
  hostSearch,
  customerSearch,
  bookingType,
  startDate,
  endDate,
  locationIds,
  propertySearch,
  refundIds
) => {
  const request = async (
    pageNumber,
    pageSize,
    status,
    hostSearch,
    customerSearch,
    bookingType,
    startDate,
    endDate,
    locationIds,
    propertySearch,
    refundIds
  ) => {
    const response = await axiosAdmin.get("bookingAD/get_admin_booking", {
      params: {
        pageNumber,
        pageSize,
        status,
        hostSearch,
        customerSearch,
        bookingType,
        startDate,
        endDate,
        locationIds,
        propertySearch,
        refundIds,
      },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
    });
    return response.data;
  };

  return useQuery({
    queryKey: [
      "listing_list",
      pageNumber,
      pageSize,
      status,
      hostSearch,
      customerSearch,
      bookingType,
      startDate,
      endDate,
      locationIds,
      propertySearch,
      refundIds,
    ],
    queryFn: () =>
      request(
        pageNumber,
        pageSize,
        status,
        hostSearch,
        customerSearch,
        bookingType,
        startDate,
        endDate,
        locationIds,
        propertySearch,
        refundIds
      ),
  });
};
