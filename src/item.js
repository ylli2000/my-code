import { useGet } from "./queries";

function Item({path, fields}) {
    const info = useGet(path);
    const {isSuccess, isLoading, isFetching, isError, data, error} = info;
    //NOTE: the image can sometimes take many seconds to load,
    //we can add default loading background in css 
    return (
        <div>
            {(isLoading || isFetching) && <div>...</div>}
            {isSuccess && fields && fields.map(field=>
                (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(getVal(data, field))
                ? <img key={data.id+'-'+field} src={getVal(data, field)} alt={getVal(data, field)} />
                : <div key={data.id+'-'+field}>{getField(field)} : {getVal(data, field)}</div>
            )}
            {isError && <div>🚫 {error.message}</div>}
        </div>
    );
}

const getVal = (data, field) => {
    const arr = Array.isArray(field)? field : field.split('.');
    if(field.length > 0 && data) {
        return getVal(data[arr.shift()], arr)
    } else {
        return data
    }
}
const getField =(field) => {
    return field.split('.').pop();
}
export default Item;