import useSWR from "swr"
import { CommonGetAllParams,Itemfilter } from "../../constants/types/common.type";

export const useAllitem = () => {
    const {data, error, isLoading, mutate}= useSWR('/items', {refreshInterval: 0});
    return {data,error,isLoading,mutate}
}

export const usePhantrang = (
    params?: CommonGetAllParams,
    filter?: Itemfilter
) => {
    const { data, error, isLoading, mutate } = useSWR(
        `items/?page=${params?.page}&limit=${params?.limit}`,
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}
