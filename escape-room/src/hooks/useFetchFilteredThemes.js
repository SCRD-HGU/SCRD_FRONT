// 기존 import 제거: useAxiosInstance ❌
import { useQuery } from "react-query";

export const useFetchFilteredThemes = (filters, axiosInstance) => {
  return useQuery(
    ["filteredThemes", filters],
    async () => {
      const { levelMin, levelMax, isFearActive, isActivityActive, searchTerm } = filters;

      if (searchTerm.trim()) {
        const endpoint = `/api/theme/search?keyword=${searchTerm.trim()}`;
        const response = await axiosInstance.get(endpoint);
        return response.data;
      }

      const isDefaultLevel = levelMin === 1 && levelMax === 5;
      const isDefaultFilter = !isFearActive && !isActivityActive;

      if (isDefaultLevel && isDefaultFilter) {
        const response = await axiosInstance.get("/api/theme?sort=rating");
        return response.data;
      }

      const params = new URLSearchParams();
      params.append("horror", isFearActive ? 1 : 0);
      params.append("activity", isActivityActive ? 1 : 0);
      if (levelMin !== undefined) params.append("levelMin", levelMin);
      if (levelMax !== undefined) params.append("levelMax", levelMax);

      const endpoint = `/api/theme/filter?${params.toString()}`;
      const response = await axiosInstance.get(endpoint);
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 2,
      enabled: !!filters,
    }
  );
};