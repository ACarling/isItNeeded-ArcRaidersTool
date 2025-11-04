import {useEffect, useState} from 'react';

import { items } from './data/LookupTable';
import ItemListRow from './components/ItemListRow';
import { LucideEye, LucideEyeClosed, LucideInfo } from 'lucide-react';

function App() {

    const [search, setSearch] = useState<string>("")
    const [doShowUse, setDoShowUse] = useState<boolean>(true)
    const [showUsageInfo, setShowUsageInfo] = useState<boolean>(false)
    const [isReady, setIsReady] = useState<boolean>(false)

    useEffect(() => {
        if(window.localStorage.getItem("doShowUse") === "False") {
            setDoShowUse(false)
        }
        setIsReady(true)
    }, [])

    useEffect(() => {
        window.localStorage.setItem("doShowUse", doShowUse ? "True" : "False")
    }, [doShowUse])

    if(!isReady) {
        return <></>
    }

    return (
        <div>

            <LucideInfo size={36} className='usage-info-button' onClick={() => setShowUsageInfo(!showUsageInfo)}/>


            <input type="text" name="search" className="search-bar" placeholder="Search for an item" value={search} onChange={(e) => setSearch(e.target.value)} />

            {showUsageInfo && <div className='usage-info'>
                <strong>Usage info:</strong>
                <p>1. Top section of "used for" is for upgrades / quests</p>
                <p>2. Bottom section is for craftables</p>
                <p>3. Astrix next to craftable means you need a blueprint</p>
                <p>4. The data sources are pretty bad for this so some info might be incorrect or out of date (sorry)</p>
                <p>5. If something is wrong make a PR here: <a href="https://github.com/ACarling/isItNeeded-ArcRaidersTool">https://github.com/ACarling/isItNeeded-ArcRaidersTool</a></p>
            </div>}

            <div className="item header">
                <div className='color-tag no-color'></div>
                <p>Name</p>
                <span onClick={() => setDoShowUse(!doShowUse)}><p>Used for</p>{doShowUse ? <LucideEye /> : <LucideEyeClosed />}</span>
                <p>Recycles to</p>
                <p>Sell price</p>
            </div>

            {items.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map((u) => (
                <ItemListRow item={u} key={u.name} doShowUse={doShowUse} />)
            )}
        </div>  
    );
}

export default App
