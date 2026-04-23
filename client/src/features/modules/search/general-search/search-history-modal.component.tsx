import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { RootStoreContext } from "../../../../stores/mobx/root-store";
import { Column } from "primereact/column";
import { truncateString } from "../../../../utils";
import { HistoryItem } from "./models/history-item";
import { DataView } from 'primereact/dataview';

type HistoryModalProps = {
    visible: boolean;
    onHide: () => void;
};

const HistoryModal = ({ visible, onHide }: HistoryModalProps) => {
    const generalSearchStore = useContext(RootStoreContext).generalSearchStore;

    const historySearchStore = useContext(RootStoreContext).historySearchStore;


    const handleReuse = (entry: string) => {
        generalSearchStore.setQuery(entry);
        onHide?.(); 
    };

    const footer = (
        <div>
            <Button
                label="Clear History"
                icon="pi pi-trash"
                severity="danger"
                onClick={() => historySearchStore.clearHistory()}
            />
        </div>
    );

    const historyColumnTemplate = (items: HistoryItem[]) => {

        let list = items.map((item) => {
            return (
                <div style={{
                    border: "1px solid grey",
                    margin: "2px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>                     <span style={{ color: "black", marginLeft: "2px" }}>
                        {truncateString(item.query, 150)}
                    </span >

                    <Button
                        style={{ margin: "10px" }}
                        label="Reuse"
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => handleReuse(item.query)}
                    />
                </div >
            );
        })

        return (

            <div flex-align>{list}</div>

        )


    };
    return (

        <Dialog
            header="Search History"
            visible={visible}
            onHide={onHide}
            footer={footer}
            style={{ width: "40vw", minWidth: "320px" }}
            modal
        >
            <div>

                <DataView
                    sortField="name"
                    sortOrder={1}
                    value={historySearchStore.getHistoryAsJSON()}
                    listTemplate={historyColumnTemplate}
                >
                    <Column field="query" header="Queries" body={historyColumnTemplate} sortable></Column>
                </DataView>



            </div>
        </Dialog>
    );
};

export default observer(HistoryModal);