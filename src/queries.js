import axios from 'axios';
import { useEffect } from 'react';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { isNullOrBlank } from './util';

const useMyMutation = (path) => {
    //const [createItem, createItemInfo] = 
    const mutation = useMutation(newItem => {
        return axios.post(path, newItem)
    }, {
        onSettled: (data, error) => {},
        onMutate: (newItem) => {},
    });

}
const defaultGetOptions = options => ({
    requestDelay: 0,
    //to only re-render when the selected data changes, not from fresh to stale
    notifyOnChangeProps: ['data', 'error'], 
    cacheTime: 3600000, //1 hour
    onSuccess: data=> {
        //do whatever you like
        //console.log('useGet -> onSuccess')
    },
    ...options
});
const axiosGet = async (path, delay, axiosOpt ={}) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    const res = await axios.get(
        Array.isArray(path) 
        ? path.join('/').replace('//','/').replace('/?','?')
        : path
    , axiosOpt);
    console.log(res);
    return res.data;
}
export const useGet = (path, getOpt) => {
    getOpt = defaultGetOptions(getOpt);
    return useQuery(path, ()=>{
        return axiosGet(path, getOpt.requestDelay);
    }, getOpt);
};
const defaultInfiniteGetOptions = options => defaultGetOptions({
    getNextPageParam: () => {},
    getNextPreviousParam: () => {},
    ...options
});
export const useInfiniteGet = (path, infGetOpt) => {
    infGetOpt = defaultInfiniteGetOptions(infGetOpt);
    return useInfiniteQuery(path, ({pageParam}) => {
        return axiosGet(`${path}/${infGetOpt.searchParams(pageParam)}`, infGetOpt.requestDelay);
    }, infGetOpt);
}
export const usePrefetch = (path, getOpt) => {
    getOpt = defaultGetOptions(getOpt);
    return useQueryClient().prefetchQuery(path, ()=>{
        return axiosGet(path, getOpt.requestDelay);
    }, getOpt);
};
const searchOptions = (keyword, options) => ({
    requestDelay: 500, //NOTE: human typing keystroke interval, debounce delay
    notifyOnChangeProps: ['data', 'error'], //to only re-render when the selected data changes, not from fresh to stale
    enabled: !isNullOrBlank(keyword),
    cacheTime: 300000, //5 minutes
    onSuccess: data=> {
        //do whatever you like
    },
    ...options
});
//NOTE:
//1. show case debounce query technique
//2. show case less re-render with notifyOnChangeProps
let searchAbortCtrl;
export const useSearch = (path, searchOpt) => {
    const keyword = Array.isArray(path) && path.length>1 ? path[1] : '';
    searchOpt = searchOptions(keyword, searchOpt);
    return useQuery(path, ()=>{
            if (searchAbortCtrl) searchAbortCtrl.abort();
            searchAbortCtrl = new AbortController();
            const signal = searchAbortCtrl.signal;
            return axiosGet(path, searchOpt.requestDelay, {signal});
        }, searchOpt);
};

export const logQueryInfo = ({ path, isIdle, isSuccess, isLoading, isFetching, isStale, isError }) => {
    console.log(
        `render ${path}${isIdle ? ' isIdle':''}${isSuccess ? ' isSuccess' : ''}${isStale ? ' isStale' : ' isFresh'}${
            isLoading ? ' isLoading' : ''}${isFetching ? ' isFetching' : ''}${isError ? ' isError' : ''}`
    );
};
