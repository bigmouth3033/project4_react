import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";

export const PropertiesRequest = () => {
  const request = async () => {
    const response = await axiosClient.get("propertyCM");
    return response.data;
  };

  return useQuery({
    queryKey: ["properties"],
    queryFn: request,
  });
};
