import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import { darkenHexColor, truncateString } from '../../../../utils';
import './general-search.component.scss';
import MolecularDrawComponent from '../../../shared/molecular-draw/molecular-draw.component';
import { SelectButton } from 'primereact/selectbutton';



/*
Hinzufügen:
- State-Handling: Value / Option 
- Selected Element Handling
- Neighborhood Explorer Store
- Button Visualize
- 
Auslagern:
- TableSettings
*/

interface SearchResultTableProps {
    elements: any[]
    type: number|null
    selectedElements: any[]
    setSelectedElements: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SearchResultTable: React.FC<SearchResultTableProps> = ({ elements, selectedElements, setSelectedElements, type }) => {


    const nameColumnTemplate = (result: any) => {
        return <span>{truncateString(result.name, 150)}</span>;
    };

    const structureDrawTemplate = (compound: any, options: any) => {
        return (
            <MolecularDrawComponent
                smiles={getPropertyValue(compound, "SMILES")}
                xkey={options.rowIndex}
            />
        );
    }

    // TODO: auslagern
    interface TableSettings {
        type: string,
        sortField: string,
        sortOrder: any,
        columns: { field: string, header: string, body: ((rowData: any, options?: any) => JSX.Element) | undefined, sortable: boolean }[]


    }


    const getPropertyValue = (element: any, key: string) => {
        return element.properties.find((e: any) => e.name === key)?.value || ""

    }

    const NpTableSettings: TableSettings = {
        type: "Natural Product",
        sortField: "molWeight",
        sortOrder: 1,
        columns: [
            { field: "", header: "Structure", body: structureDrawTemplate, sortable: false },
            { field: "name", header: "Mol. Formula", body: nameColumnTemplate, sortable: true },
            { field: "molWeight", header: "Mol. Weight", body: (row: any) => <>  {Math.round(getPropertyValue(row, "Molecular Weight") * 100) / 100}</>, sortable: false },
            { field: "smiles", header: "SMILES", body: (row: any) => getPropertyValue(row, "SMILES"), sortable: false }
        ]
    }
    const PlantsTableSettings: TableSettings = {
        type: "Plant",
        sortField: "name",
        sortOrder: 1,
        columns: [
            { field: "name", header: "Scientific Name", body: nameColumnTemplate, sortable: true },
            { field: "kingdom", header: "Kingdom", body: (row: any) => getPropertyValue(row, "Kingdom"), sortable: false },
            { field: "phylum", header: "Phylum", body: (row: any) => getPropertyValue(row, "Phylum"), sortable: false },
            { field: "family", header: "Family", body: (row: any) => getPropertyValue(row, "Family"), sortable: false }
        ]

    }

    const DiseasesTableSettings = {
        type: "Disease",
        sortField: "name",
        sortOrder: 1,
        columns: [
            { field: "name", header: "Disease", body: nameColumnTemplate, sortable: true },
            { field: "classification", header: "Classification", body: (row: any) => getPropertyValue(row, "Classification"), sortable: false }
        ]

    }


const tableSettings = useMemo(() => {
    switch (type) {
        case 0:
            return NpTableSettings;
        case 1:
            return PlantsTableSettings;
        case 2:
            return DiseasesTableSettings;
        default:
            return null;
    }
}, [type]);


    return (
        // TODO: conditional rendering nach Typen
        <>
            <DataTable
                scrollable
                scrollHeight="650px"
                selectionMode="multiple"
                metaKeySelection={false}
                selection={selectedElements}
                sortField='name'
                sortOrder={1}
                emptyMessage="No entries found... Try again!"
                onSelectionChange={(e) =>
                    setSelectedElements(e.value)
                }
                value={elements.filter((element => element.type === tableSettings.type))}
                //value={elements}
                tableStyle={{ minWidth: '50rem' }}>
                {tableSettings.columns.map((col, i) => (
                    <Column field={col.field} key={i} body={col.body} header={col.header} sortable={col.sortable} />
                ))}
            </DataTable>
        </>
    )
}
export default SearchResultTable;
