import ExtendedSearch from './extendedSearch';
import InfiniteList from './infiniteList';
import PagedList from './pagedList';

function Pokemons() {
    return (
        <div>
            <ExtendedSearch path={'pokemon'} dependentPath={'characteristic'} />
            <PagedList path={'pokemon'} />
            {/* <InfiniteList path={'pokemon'} /> */}
        </div>
    );
}

export default Pokemons;
