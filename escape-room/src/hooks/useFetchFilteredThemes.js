// src/hooks/useFetchFilteredThemes.js
import { useQuery } from "react-query";
import useAxiosInstance from "../api/axiosInstance";

// ✅ 필터된 테마 검색 React Query 훅
export const useFetchFilteredThemes = (filters) => {
  const axiosInstance = useAxiosInstance();

  return useQuery(
    ["filteredThemes", filters], // 필터링된 테마 캐시 키 (필터마다 다르게 캐싱)
    async () => {
      const { region, levelMin, levelMax, isFearActive, isActivityActive, searchTerm } = filters;
      let endpoint = "/api/theme?sort=rating";

      // ✅ 검색어 기반 요청
      if (searchTerm.trim()) {
        endpoint = `/api/theme/search?keyword=${searchTerm.trim()}`;
      } else {
        // ✅ 필터 조건 설정
        const params = new URLSearchParams();
        if (region) params.append("location", region);
        if (levelMin) params.append("levelMin", levelMin);
        if (levelMax) params.append("levelMax", levelMax);
        if (isFearActive) params.append("horror", 1);
        if (isActivityActive) params.append("activity", 1);
        endpoint = `/api/theme/filter?${params.toString()}`;
      }

      const response = await axiosInstance.get(endpoint);
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, // 5분 동안 캐싱된 데이터 사용
      cacheTime: 10 * 60 * 1000, // 10분 동안 캐시 유지
      refetchOnWindowFocus: false, // 포커스 시 자동 리패칭 X
      retry: 2, // 실패 시 2회 자동 재시도
      enabled: !!filters, // 필터가 정의된 경우에만 요청 수행
    }
  );
};