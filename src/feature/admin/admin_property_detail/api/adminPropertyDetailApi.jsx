import axiosAdmin from "@/shared/api/axiosAdmin";
import { useQuery } from "@tanstack/react-query";

export const GetListingByIdRequest = (id) => {
  const request = async (id) => {
    const response = await axiosAdmin.get("listingAD/read_property_by_id", { params: { id } });
    return response.data;
  };

  return useQuery({
    queryKey: ["admin_listing", id],
    queryFn: () => request(id),
  });
};
