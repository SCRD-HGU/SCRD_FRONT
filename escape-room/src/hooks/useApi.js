// src/hooks/useApi.js
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAxiosInstance from "../api/axiosInstance";

// ✅ React Query 기반 API 요청 훅
const useApi = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();

  // ✅ API GET 요청 (React Query)
  const useGet = (endpoint, options = {}) => {
    return useQuery(
      [endpoint],
      async () => {
        const response = await axiosInstance.get(endpoint);
        return response.data;
      },
      {
        ...options,
        staleTime: 5 * 60 * 1000, // 기본 5분 캐시
        cacheTime: 10 * 60 * 1000, // 10분 캐시 유지
        refetchOnWindowFocus: false,
        retry: 2, // 자동 재시도 2회
      }
    );
  };

  // ✅ API POST 요청 (React Query)
  const usePost = (endpoint, options = {}) => {
    return useMutation(
      async (data) => {
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([endpoint]); // POST 이후 데이터 새로고침
        },
        ...options,
      }
    );
  };

  // ✅ API PUT 요청 (React Query)
  const usePut = (endpoint, options = {}) => {
    return useMutation(
      async (data) => {
        const response = await axiosInstance.put(endpoint, data);
        return response.data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([endpoint]); // PUT 이후 데이터 새로고침
        },
        ...options,
      }
    );
  };

  // ✅ API DELETE 요청 (React Query)
  const useDelete = (endpoint, options = {}) => {
    return useMutation(
      async () => {
        const response = await axiosInstance.delete(endpoint);
        return response.data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([endpoint]); // DELETE 이후 데이터 새로고침
        },
        ...options,
      }
    );
  };

  return { useGet, usePost, usePut, useDelete };
};

export default useApi;