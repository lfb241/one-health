import { useContext } from "react";
import { RootStoreContext } from "../../../../stores/mobx/root-store";
import { Button } from "primereact/button";

import { observer } from "mobx-react-lite";

const HistoryTokenList = () => {

    const searchEntityStore = useContext(RootStoreContext).searchEntityStore;

    if (!searchEntityStore.getHistoryAsJSON|| searchEntityStore.getHistorySize() == 0) return undefined
    return (

        <div className='token-list'>
            {searchEntityStore.getHistoryAsJSON().slice(0, 5).map((item) => (
                <div className="token"
                    onClick={(e) => {
                        if (item.query)
                            searchEntityStore.setQuery(item.query);
                    }}
                >
                    <span className="mb-0">{item.query}</span>
                    <Button
                        className='token-button'
                        text
                        rounded
                        size='small'
                        icon="pi pi-times"
                        onClick={async (e) => {
                            e.stopPropagation();
                            searchEntityStore.deleteHistoryItem(item)
                        }}
                        pt={{ icon: { style: { color: 'black' } } }}
                        tooltip="Remove from history"
                        tooltipOptions={{ position: 'bottom', showDelay: 1000 }}
                    />
                </div>
            ))}
        </div>

    )

}

export default observer(HistoryTokenList)