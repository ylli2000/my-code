const ListHeader = ({isFetching, isFetchingNextPage,  data}) => {
    return <h2>
        There are {data.count || data.pages?.count} items in total
        {(isFetching || isFetchingNextPage) && ' ⌛'}
    </h2>
};

export default ListHeader;