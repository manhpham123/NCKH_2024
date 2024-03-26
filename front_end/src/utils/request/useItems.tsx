import useSWR from "swr"
import { Alertfilter, CommonGetAllParams,Flowfilter } from "../../constants/types/common.type";

export const useAllitem = () => {
    const {data, error, isLoading, mutate}= useSWR('/items', {refreshInterval: 0});
    return {data,error,isLoading,mutate}
}

export const useStaticService = () => {
    const {data, error, isLoading, mutate}= useSWR('/statc/service', {refreshInterval: 0});
    return {data,error,isLoading,mutate}
}

export const useStaticProtocol = () => {
    const {data, error, isLoading, mutate}= useSWR('/statc/protocol', {refreshInterval: 0});
    return {data,error,isLoading,mutate}
}

export const usePhantrang = (
    params?: CommonGetAllParams,
    filter?: Flowfilter
) => {
    const { data, error, isLoading, mutate } = useSWR(
        `items/?page=${params?.page}&limit=${params?.limit}`,
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}

export const useAlert = (
    params?: CommonGetAllParams,
    filter?: Alertfilter
) => {
    const { data, error, isLoading, mutate } = useSWR(
        'alert',
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}