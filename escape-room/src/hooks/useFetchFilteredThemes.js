import { useQuery } from "react-query"; // ✅ 추가
import useAxiosInstance from "../api/axiosInstance"; // ✅ 추가

export const useFetchFilteredThemes = (filters) => {
  const axiosInstance = useAxiosInstance();

  return useQuery(
    ["filteredThemes", filters],
    async () => {
      const { levelMin, levelMax, isFearActive, isActivityActive, searchTerm } = filters;

      // ✅ 1. 검색어가 있으면 search endpoint
      if (searchTerm.trim()) {
        const endpoint = `/api/theme/search?keyword=${searchTerm.trim()}`;
        const response = await axiosInstance.get(endpoint);
        return response.data;
      }

      // ✅ 2. 아무 필터도 선택되지 않은 기본 상태 → 인기순 반환
      const isDefaultLevel = levelMin === 1 && levelMax === 5;
      const isDefaultFilter = !isFearActive && !isActivityActive;

      if (isDefaultLevel && isDefaultFilter) {
        const response = await axiosInstance.get("/api/theme?sort=rating");
        return response.data;
      }

      // ✅ 3. 그 외에는 filter endpoint
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