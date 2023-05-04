import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {QueryCache, QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import axios from 'axios';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/';
const queryCache = new QueryCache();
const queryClient = new QueryClient({
    queryCache,
    defaultOptions: {
      queries: {
        
        //The time the data becomes stale. Infinity is never.
        //Usage:
        //Example, if we do list -> detail -> back to list very fast
        //The list is still considered fresh, will not fetch again.
        //e.g. 5000ms
        staleTime: 5000, 
        
        //The time the data is cached. Infinity is always, 0 never.
        //when component unmount and reload you will data list flash
        //because there is no temp data there to fill the list.
        //Usage: 
        //for lists set Infinity if appropriate.
        //for items set to 5 minutes normally (it is default).
        cacheTime: 300000, //5 minutes

        //if 404, 500 ...etc, how many auto retries do you want, 
        //remove it to have  default multiple auto retries on.
        //Usage:
        //retries will give a user a slow feeling when you got error.
        //notmally set to 0, if it fails it fails.
        retry: 0,

      }
    }
})

// Create a root
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
    </QueryClientProvider>
  </React.StrictMode>,
);