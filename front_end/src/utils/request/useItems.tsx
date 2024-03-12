import useSWR from "swr"


export const useItems = () => {
    const {data, error, isLoading, mutate}= useSWR('/items', {refreshInterval: 0});
    return {data,error,isLoading,mutate}
}
