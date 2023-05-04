import { useNavigate } from "react-router";

const PagedListButtons = ({data, isPreviousData, page}) => {
    const navigate = useNavigate();
    const navPrev = ()=>{
        if(data?.previous)
            navigate(`/pokemon?page=${page-1}`)
    };
    const navNext = ()=>{
        if(data?.next)
            navigate(`/pokemon?page=${page+1}`)
    }
    return <div>
        <button disabled={!data?.previous} onClick={navPrev}>
        &lt; Prev
        </button>
        <span> {page} </span>
        <button disabled={isPreviousData || !data?.next} onClick={navNext}>
        Next &gt;
        </button>
    </div>
}
export default PagedListButtons;