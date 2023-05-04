import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { logQueryInfo, useInfiniteGet } from "./queries";
import ListHeader from "./listHeader";
import ListItem from "./listItem";

const InfiniteList = ({path}) => {
    const info = useInfiniteGet(path, {
        searchParams: paramsFn,
        getNextPageParam: nextFn,
        getPrevPageParam: prevFn
    });
    const {isSuccess, isLoading, isError, data, error, 
        hasNextPage, fetchNextPage, isFetchingNextPage} = info;
    logQueryInfo({path, ...info});
    return <div>
        {isError && <div>Error! {error?.message}</div>}
        {isLoading && <div>Loading...</div>}
        {isSuccess && data?.pages && (
            <div>
                <ListHeader isFetching={isFetchingNextPage} data={data}/>
                <InfiniteScroll
                    dataLength={data.pages.reduce((acc, page) => acc + page.results.length, 0)}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={<div>Loading...</div>}
                    endMessage={<p>- You have seen it all -</p>}
                >
                    {data.pages.map((page, i)=> (
                        <Fragment key={i+''}>
                        {page.results.map((item, j)=> (
                            <ListItem key={i+'.'+j} path={path} item={item}/>
                        ))}
                    </Fragment>
                    ))}
                </InfiniteScroll>
            </div>
        )}
    </div>
}
//Make this populate data longer than the max screen size
//also consider longer than portrait size.
//NOTE! Important! if the list is shorter than the screen,
//it will not trigger the initial scroll.
const pageSize = 100; 
const paramsFn = page => {
    return `?offset=${(page || 0)*pageSize}&limit=${pageSize}`;
}
const nextFn = ({next}) => {
    return next ? parseInt(new URL(next).searchParams.get('offset'))/pageSize : null;
}
const prevFn = ({previous}) => {
    return previous ? parseInt(new URL(previous).searchParams.get('offset'))/pageSize : null;    
}
export default InfiniteList;