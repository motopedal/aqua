import useSWR from "swr";
import { fetcherGRAPHQL } from "./fetcher";
import { LANDING_PAGE_QUERY, PRODUCT_PAGE_QUERY } from "./schemas/query";

const useLandingPage = () => {
  const { data, error } = useSWR(LANDING_PAGE_QUERY, fetcherGRAPHQL);
  return { data, error };
};

const useProductPage = () => {
  const { data, error } = useSWR(PRODUCT_PAGE_QUERY, fetcherGRAPHQL);
  return { data, error };
};

export { useLandingPage, useProductPage };
