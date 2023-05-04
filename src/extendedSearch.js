import { useState } from 'react';
import { useSearch, logQueryInfo, useGet } from './queries';


//NOTE: Show case the dependent query with info and info2
const ExtendedSearch = ({ path, dependentPath }) => {
    const [keyword, setKeyword] = useState('');
    const info = useSearch([path, keyword]);
    const info2 = useGet([dependentPath, info.data?.id ?? ''], {
        enabled: !!(info.data?.id) //NOTE: that means it triggers by info only
    });
    logQueryInfo({ path: `${path}-search '${keyword}'`, ...info });
    logQueryInfo({ path: `${path}-search-ext '${keyword}'`, ...info2 });
    return (
        <div>
            <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            {(info.isLoading || info.isFetching) && ' ⌛'}
            {info.isError && <div>Error! {info.error?.message}</div>}
            {info.isSuccess && (
                <div>
                    {info.data?.sprites?.front_default ? (
                        <div>
                            <div><img src={info.data.sprites.front_default} alt={keyword} /></div>
                        </div>
                    ) : (
                        <div>Pokemon not found.</div>
                    )}
                </div>
            )}
            {!info2.isIdle && info2.isLoading && (
                <div>
                    [ ... ]
                </div>
            )}
            {info2.isSuccess && (
                <div>
                    [ {info2.data?.descriptions[info2.data.descriptions.length-1].description} ]
                </div>
            )}
        </div>
    );
};

export default ExtendedSearch;
