export interface Item {
    name: string,
    keepFor: string[],
    usedIn: RecipeItem[],
    recyclesTo: string[],
    rarity: string,
    sell: string,
    shouldKeep: boolean
}

export interface RecipeItem {
    output: string
    ingredientName: string
    numberRequired: number
    needsBlueprint: boolean
    upgrades?: RecipeItem[]
}

import itu_untyped from "./itemToUpgrade.json"
import btr_untyped from "./blueprintToRecipe.json"


const itu: {
    name: string, 
    keepFor: string[],
    recyclesTo: string[],
    sell: string,
    rarity: string
}[] = itu_untyped

interface RawBlueprint{name: string, needs: string[], blueprintRequired: boolean}
const btr: RawBlueprint[] = btr_untyped



export const items: Item[] = itu.map(item => {
    const ingredientName: string = item.name

    const usedIn: RecipeItem[] = []
    const upgrades: {[base: string]: RawBlueprint[]} = {}

    btr.forEach(recp => {
        recp.needs.forEach(input => {
            //  input = input into a recipe {blpt.name}
            if(input.toLowerCase().includes(ingredientName.toLowerCase())) {
                const numRequired = parseInt(input.split("x ")[0])
                const ingredientName = input.split("x ")[1]
                
                // Check if the item is an upgrade
                // if(usedIn.find(u => u.numberRequired == ))
                if(recp.name.match(/^.*? IV?I?I?$/g)) {
                    return
                }
                // let baseItem = recp.name.replace(/^(.*?) IV?I?I?$/g, "$1")
                // if(baseItem !== recp.name) {
                //     if(!upgrades[baseItem]) {
                //         upgrades[baseItem] = [recp]
                //         return
                //     }
                //     else{upgrades[baseItem].push(recp)}
                // }

                usedIn.push({
                    output: recp.name,
                    ingredientName: ingredientName,
                    numberRequired: numRequired,
                    needsBlueprint: recp.blueprintRequired
                })
            }
        })
    })

    console.log(upgrades)



    item.keepFor = item.keepFor.filter(u => u !== '')

    return {
        name: ingredientName,
        keepFor: [
            ...item.keepFor
        ],
        usedIn: usedIn,
        recyclesTo: item.recyclesTo,
        sell: item.sell,
        rarity: item.rarity,
        shouldKeep: item.keepFor.length > 0 || usedIn.length > 0,
    }
})
