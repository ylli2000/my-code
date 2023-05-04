import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Pokemons from './pokemons';
import Pokemon from './pokemon';
import { useQueryClient } from 'react-query';


function App() {
    const client = useQueryClient();
    return (
        <div className="main">
            <p>(Firstly set the default staleTime in index to say 1 minute, long enough to demo this button feature)<br />
            Open React Query Debugger, you will see fresh queries in gree.<br />
            'Invalidate All' will trigger pokemon list to set everything under the key 'pokemon' to stale.<br />
            The current page components will reload because page is active and data is stale<br />
            If you click into any item, you will also find it reloading as well<br />
            <button onClick={()=>client.invalidateQueries('pokemon')}>Invalidate All</button>
            </p>
            <BrowserRouter>
                <Routes>
                    <Route path='pokemon/' element={<Pokemons />}/>
                    <Route path='pokemon/:id' element={<Pokemon /> } />
                    <Route path='*' element={<Pokemons />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;