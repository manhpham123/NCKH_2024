import useSWR from "swr"
import { CommonGetAllParams,Filter } from "../../constants/types/common.type";

export const useAllitem = () => {
    const {data, error, isLoading, mutate}= useSWR('/items', {refreshInterval: 0});
    return {data,error,isLoading,mutate}
}

export const usePhantrang = (
    params?: CommonGetAllParams,
    filter?: Filter
) => {
    const { data, error, isLoading, mutate } = useSWR(
        `items/?page=${params?.page}&limit=10`,
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}
