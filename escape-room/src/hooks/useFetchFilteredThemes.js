// src/hooks/useFetchFilteredThemes.js
import { useQuery } from "react-query";
import useAxiosInstance from "../api/axiosInstance";

// ✅ 필터된 테마 검색 React Query 훅
export const useFetchFilteredThemes = (filters) => {
  const axiosInstance = useAxiosInstance();

  return useQuery(
    ["filteredThemes", filters], // 필터마다 다르게 캐싱
    async () => {
      const {
        region,
        levelMin,
        levelMax,
        isFearActive,
        isActivityActive,
        searchTerm,
      } = filters;

      const params = new URLSearchParams();

      // 동적 필터 파라미터 구성
      if (region) params.append("location", region);
      if (searchTerm.trim()) params.append("keyword", searchTerm.trim());
      if (levelMin !== null && levelMin !== undefined) params.append("levelMin", levelMin);
      if (levelMax !== null && levelMax !== undefined) params.append("levelMax", levelMax);
      if (isFearActive) params.append("horror", 1);
      if (isActivityActive) params.append("activity", 1);

      const endpoint = `/api/theme/filter?${params.toString()}`;
      console.log("📡 요청 endpoint:", endpoint); // ✅ 디버깅용

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