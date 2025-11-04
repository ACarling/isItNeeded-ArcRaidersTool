import { Item } from "../data/LookupTable";


function displayUse(item: Item, doShow: boolean) {
    if(doShow) {
        return <>
            {item.keepFor.map(item => <p key={item}>{item}</p>)}
            {item.shouldKeep && <hr />}
            {item.usedIn.map(item => <p key={item.output}>{item.numberRequired}x {item.output} {item.needsBlueprint ? "*" : ""}</p>)}
        </>
    }

    if(item.shouldKeep) {
        return <p>...</p>
    }
}


export default function(props: {item: Item, doShowUse: boolean}) {
    const {item, doShowUse} = props
    return (
        <div className={`item ${item.shouldKeep && "needed"}`} key={item.name}>
            <div className={`color-tag ${item.rarity.toLowerCase()}`}></div>
            <p>{item.name}</p>
            <div>
                {displayUse(item, doShowUse)}
            </div>
            <div>
                {item.recyclesTo.map(item => <p key={item}>{item}</p>)}
            </div>
            <p>${item.sell}</p>
        </div>
    )
}