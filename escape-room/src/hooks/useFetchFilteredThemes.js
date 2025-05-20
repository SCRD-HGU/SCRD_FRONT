// src/hooks/useFetchFilteredThemes.js
import { useQuery } from "react-query";
import useAxiosInstance from "../api/axiosInstance";

// ✅ 필터된 테마 검색 React Query 훅
export const useFetchFilteredThemes = (filters) => {
  const axiosInstance = useAxiosInstance();

  return useQuery(
    ["filteredThemes", filters],
    async () => {
      const {
        region,
        levelMin,
        levelMax,
        isFearActive,
        isActivityActive,
        searchTerm,
        selectedDate = new Date().toISOString().split("T")[0], // 기본값: 오늘 날짜
        page = 0,
        size = 5,
      } = filters;

      const params = new URLSearchParams();

      if (region) params.append("location", region);
      if (selectedDate) params.append("date", selectedDate);
      params.append("horror", isFearActive ? 1 : 0);
      params.append("activity", isActivityActive ? 1 : 0);
      if (levelMin != null) params.append("levelMin", levelMin);
      if (levelMax != null) params.append("levelMax", levelMax);
      params.append("page", page);
      params.append("size", size);

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