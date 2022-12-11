import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const addressApi = createApi({
  reducerPath: "addressApi",
  //header: "token",
  baseQuery: fetchBaseQuery({ baseUrl: "https://thongtindoanhnghiep.co/api" }),
  endpoints: (builder) => ({
    getAllAddress: builder.query({
      query: () => `city`,
    }),
  }),
});
export const { useGetAllAddressQuery } = addressApi;
