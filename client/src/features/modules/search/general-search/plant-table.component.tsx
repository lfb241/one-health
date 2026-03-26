import { DataTable } from "primereact/datatable"
import { Column } from 'primereact/column';
import { familyColumnTemplate, kingdomColumnTemplate, nameColumnTemplate, phylumColumnTemplate } from "./column-templates";
import { ResultTableProps } from "./models/result-table-props";



export const PlantTable = ({ results, selectedElements, setSelectedElements }: ResultTableProps) => {


    return (
        <DataTable
            scrollable
            scrollHeight="650px"
            metaKeySelection={false}
            selectionMode="multiple"
            selection={selectedElements}
            sortField="name"
            sortOrder={1}
            emptyMessage="No entries found... Try again!"
            onSelectionChange={(e) => setSelectedElements(e.value)}
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
