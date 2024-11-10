import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

export const GetHostBookingRequest = (status) => {
  const request = async (status) => {
    const response = await axiosClient.get("bookingCM/bookings", { params: { status } });
    return response.data;
  };

  return useQuery({
    queryKey: ["bookings", status],
    queryFn: () => request(status),
  });
};

export const GetHostBookingCountRequest = () => {
  const request = async () => {
    const response = await axiosClient.get("bookingCM/booking_count");
    return response.data;
  };

  return useQuery({
    queryKey: ["booking_count"],
    queryFn: () => request(),
  });
};
