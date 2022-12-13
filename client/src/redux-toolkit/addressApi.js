import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
  reducerPath: "addressApi",
  //header: "token",
  baseQuery: fetchBaseQuery({ baseUrl: "https://vn-public-apis.fpo.vn" }),
  endpoints: (builder) => ({
    getAllAddress: builder.query({
      query: () => `/provinces/getAll?limit=-1`,
    }),
  }),
});
export const { useGetAllAddressQuery } = addressApi;
