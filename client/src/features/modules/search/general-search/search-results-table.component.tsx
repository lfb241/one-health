
import { TabView, TabPanel } from 'primereact/tabview';
import { NaturalProductTable } from './natural-product-table.component';
import { useState } from 'react';
import { IEntityDTO } from './models/entity-dto';
import { PlantTable } from './plant-table.component';
import { DiseaseTable } from './disease-table.component';
import { getObjectsOfType } from './utils/get-objects-of-type';


interface SearchResultsPanelProps {
    results: IEntityDTO[]
}


export const SearchResultsPanel: React.FC<SearchResultsPanelProps> = ({ results }) => {
    const naturalProducts = getObjectsOfType(results, "Natural Product");
    const plants = getObjectsOfType(results, "Plant");
    const diseases = getObjectsOfType(results, "Disease");
    const [selectedElements, setSelectedElements] = useState<any[]>([]);

    const maxResultsIndex = [naturalProducts.length, plants.length, diseases.length]
        .reduce((maxValueIndex, currentValue, currentIndex, arr) => currentValue > arr[maxValueIndex] ? currentIndex : maxValueIndex, 0)

    const [activeIndex, setActiveIndex] = useState<number>(maxResultsIndex)
                


return <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
    <TabPanel header={"Natural Products (" + naturalProducts.length + ")"} >
        <NaturalProductTable results={naturalProducts} selectedElements={selectedElements} setSelectedElements={setSelectedElements} />
    </TabPanel>
    < TabPanel header={"Plants (" + plants.length + ")"} >
        <PlantTable results={plants} selectedElements={selectedElements} setSelectedElements={setSelectedElements} />     </TabPanel>
    < TabPanel header={"Diseases (" + diseases.length + ")"} >
        <DiseaseTable results={diseases} selectedElements={selectedElements} setSelectedElements={setSelectedElements} />     </TabPanel>
</TabView>
}