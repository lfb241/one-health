import { DataTable } from "primereact/datatable"
import { Column } from 'primereact/column';
import { nameColumnTemplate, smilesColumnTemplate, structureDrawTemplate, weightColumnTemplate } from "./column-templates";
import { useContext } from "react";
import { RootStoreContext } from "../../../../stores/mobx/root-store";

import {observer} from "mobx-react-lite";
import { Entity } from "../../../../stores/mobx/models/Entity";
import { Instance } from "mobx-state-tree";

interface NaturalProductTableProps{
    results: Instance<typeof Entity>[]
}

export const NaturalProductTable:React.FC<NaturalProductTableProps> = ({results}) => {
    
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
            <Column header="Structure" body={structureDrawTemplate} ></Column>
            <Column field="name" header="Mol. Formula" body={nameColumnTemplate} sortable></Column>
            <Column header="Mol.Weight" body={weightColumnTemplate}></Column>
            <Column header="SMILES" body={smilesColumnTemplate}></Column>
        </DataTable>
    )
}
export default observer(NaturalProductTable);