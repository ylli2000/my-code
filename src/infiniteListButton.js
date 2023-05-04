const InfiniteListButton = ({hasNextPage, isFetchingNextPage, fetchNextPage}) => {
    return <div>
        <button 
            disabled={!hasNextPage || isFetchingNextPage} 
            onClick={fetchNextPage}>
            {isFetchingNextPage 
            ? 'Loading...' 
            : hasNextPage 
            ? 'Load More'
            : 'No More'}
        </button>
    </div>
}

export default InfiniteListButton;