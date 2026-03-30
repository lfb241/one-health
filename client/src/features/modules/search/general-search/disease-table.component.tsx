import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import { classificationColumnTemplate, nameColumnTemplate } from "./column-templates";
import { ResultTableProps } from "./models/result-table-props";
import { Instance } from "mobx-state-tree";
import { Entity } from "../../../../stores/mobx/models/Entity";
import { RootStoreContext } from "../../../../stores/mobx/root-store";
import { useContext } from "react";
import {observer} from "mobx-react-lite";

interface DiseaseTableProps{
    results: Instance<typeof Entity>[]
}


export const DiseaseTable:React.FC<DiseaseTableProps> = ({results}) => {
    
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
            <Column header="Classification" body={classificationColumnTemplate}></Column>
        </DataTable>
    )
}
export default observer(DiseaseTable);