import { TabView, TabPanel } from 'primereact/tabview';
import  NaturalProductTable  from './natural-product-table.component';
import { useContext, useState } from 'react';
import  PlantTable  from './plant-table.component';
import  DiseaseTable from './disease-table.component';
import { RootStoreContext } from '../../../../stores/mobx/root-store';
import { observer } from "mobx-react-lite";


const SearchResultsPanel: React.FC = () => {

    const generalSearchStore = useContext(RootStoreContext).generalSearchStore;


    const naturalProducts = generalSearchStore.getEntitiesOfType("Natural Product");
    const plants = generalSearchStore.getEntitiesOfType("Plant");
    const diseases = generalSearchStore.getEntitiesOfType("Disease");

    const maxResultsIndex = [naturalProducts.length, plants.length, diseases.length]
        .reduce((maxValueIndex, currentValue, currentIndex, arr) => currentValue > arr[maxValueIndex] ? currentIndex : maxValueIndex, 0)

    const [activeIndex, setActiveIndex] = useState<number>(maxResultsIndex)



    return <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
        <TabPanel header={"Natural Products (" + naturalProducts.length + ")"} >
            <NaturalProductTable results={naturalProducts} />
        </TabPanel>
        < TabPanel header={"Plants (" + plants.length + ")"} >
            <PlantTable results={plants} />     </TabPanel>
        < TabPanel header={"Diseases (" + diseases.length + ")"} >
            <DiseaseTable results={diseases} />     </TabPanel>
    </TabView>
}

export default observer(SearchResultsPanel)