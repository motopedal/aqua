import { request } from "graphql-request";

const fetcherGRAPHQL = (query) => {
  return request("http://localhost:1337/graphql", query);
};

export { fetcherGRAPHQL };
