import { useSearchParams } from "react-router-dom";
import ListHeader from "./listHeader";
import ListItem from "./listItem";
import PagedListButtons from "./pagedListButtons"
import { logQueryInfo, useGet, usePrefetch } from "./queries";

const PagedList = ({path}) => {
    const [params, setParams] = useSearchParams();
    let page = parseInt(params.get('page'));
    page = page && page > 0 ? page : 1;
    const limit = 20;
    const info = useGet(
        [path, `?offset=${limit*(page-1)}&limit=${limit}`],
        {keepPreviousData: true} //agressive prefetch part 1
    );
    const { isSuccess, isLoading, isFetching, isError, data, error} = info;
    //agressive prefetch part 2
    usePrefetch(
        [path, `?offset=${limit*(page)}&limit=${limit}`],
        {enabled: !!(info.data?.next), keepPreviousData: true}
    );
    logQueryInfo({path, ...info});
    return <div>
        {isError && <div>Error! {error?.message}</div>}
        {isLoading && <div>Loading...</div>}
        {isSuccess && data && (
            <div>
                <ListHeader isFetching={isFetching} data={data}/>
                <div className="list">
                    { data.results && data.results.map((item, i)=> (
                        <ListItem path={path} item={item} key={i}/>
                    ))}
                </div>
            </div>
        )}
        <PagedListButtons {...info} page={page}/>
    </div>
}
export default PagedList;