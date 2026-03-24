
import { TabView, TabPanel } from 'primereact/tabview';
import { NaturalProductTable } from './natural-product-table.component';


const getObjectsOfType = (results: { type: string }[], type: string) => {
    return results.filter(e => e.type == type);
}


export const GeneralSearchResultsPanel = (data: { results: { type: string }[] }) => {
    const naturalProducts = getObjectsOfType(data.results, "Natural Product");
    const plants = getObjectsOfType(data.results, "Plant");
    const diseases = getObjectsOfType(data.results, "Disease");
    return <TabView>
        <TabPanel header={"Natural Products (" + naturalProducts.length + ")"} >
            <NaturalProductTable naturalProducts={naturalProducts} />
        </TabPanel>
        < TabPanel header={"Plants (" + plants.length + ")"} >

        </TabPanel>
        < TabPanel header={"Diseases (" + diseases.length + ")"} >

        </TabPanel>
    </TabView>
}