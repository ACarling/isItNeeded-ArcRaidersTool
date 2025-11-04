import {useState} from 'react';
import {Greet} from "../wailsjs/go/main/App";
import { lookup } from './assets/needed';

function App() {
    const [search, setSearch] = useState<string>("")

    const items = lookup

    return (
        <div className='search-box'>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
            {lookup.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map(u => <div className='item'>
                <p>{u.name}</p>
                <p>{u.needed}</p>
            </div>)}
        </div>  
    )
}

export default App
