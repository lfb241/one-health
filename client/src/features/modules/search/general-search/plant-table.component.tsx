import { DataTable } from "primereact/datatable"
import { Column } from 'primereact/column';
import { familyColumnTemplate, kingdomColumnTemplate, nameColumnTemplate, phylumColumnTemplate } from "./column-templates";
import {observer} from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { Entity } from "../../../../stores/mobx/models/Entity";
import { useContext } from "react";
import { RootStoreContext } from "../../../../stores/mobx/root-store";

interface PlantTableProps{
    results: Instance<typeof Entity>[]
}

export const PlantTable:React.FC<PlantTableProps> = ({results}) => {
    
    const searchEntityStore = useContext(RootStoreContext).searchEntityStore;   


    return (
        <DataTable
            scrollable
            scrollHeight="650px"
            metaKeySelection={false}
            selectionMode="multiple"
            selection={searchEntityStore.selectedEntities}
            sortField="name"
            sortOrder={1}
            emptyMessage="No entries found... Try again!"
            onSelectionChange={(e) => searchEntityStore.setSelectedEntities(e.value)}
            value={results}
            tableStyle={{ minWidth: '50rem' }}
        >
            <Column field="name" header="Scientific Name" body={nameColumnTemplate} sortable></Column>
            <Column header="Kingdom" body={kingdomColumnTemplate}></Column>
            <Column header="Phylum" body={phylumColumnTemplate}></Column>
            <Column header="Family" body={familyColumnTemplate}></Column>
        </DataTable>
    )
}
export default observer(PlantTable);