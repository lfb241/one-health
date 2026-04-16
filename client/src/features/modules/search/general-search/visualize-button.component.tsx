import { Button } from "primereact/button";
import { STORES } from "../../../../stores";
import { INeighborhoodExplorerStore } from "../../../../stores/neighborhood-explorer-store";
import { dependencyFactory } from "../../../shared/injection";
import { useContext } from "react";
import { RootStoreContext } from "../../../../stores/mobx/root-store";
import { useNavigate } from "react-router-dom";
import './general-search.component.scss';


const VisualizeButton: React.FC = () => {

    const navigate = useNavigate();

    const generalSearchStore = useContext(RootStoreContext).generalSearchStore;


    const neighborhoodExplorerStore =
        dependencyFactory.get<INeighborhoodExplorerStore>(
            STORES.INeighborhoodExplorerStore,
        );

    return (
        <Button
            icon="fa fa-compass"
            className='visualize-button'
            label='Visualize'
            size='small'
            style={{margin:5}}
            onClick={() => {
                neighborhoodExplorerStore.nodes =
                    neighborhoodExplorerStore.nodes.concat(
                        generalSearchStore.selectedEntities.map((x) => {
                            return {
                                data: {
                                    id: x.id,
                                    color: x.color,
                                    label: x.name,
                                },
                            };
                        }),
                    );

                navigate('/neighborhood-explorer');
            }}
            tooltip="Show selected records in neighborhood explorer"
            tooltipOptions={{
                position: 'bottom',
                showDelay: 1000,
            }}
        />
    )
}
export default VisualizeButton