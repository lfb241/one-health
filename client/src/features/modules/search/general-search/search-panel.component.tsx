import { useContext, useEffect, useState } from 'react';
import React from 'react';
import {
    LoadingPlaceholderComponent,
    PageTitle
} from '../../../../components';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { MessageServiceContext } from '../../../shared/messages';
import { dependencyFactory } from '../../../shared/injection';
import {
    IGeneralSearchHistoryService, SERVICES
} from '../../../../services';
import { ISavedGeneralSearch } from '../search-history/saved-general-search';
import { INeighborhoodExplorerStore } from '../../../../stores/neighborhood-explorer-store';
import { ITutorialStore, STORES } from '../../../../stores';
import { useNavigate, Link } from 'react-router-dom';
import GeneralSearchPageTourComponent from './general-search-tour.component';
import './general-search.component.scss';
import CompoundSearchModal from '../compound-search/compound-search-modal';
import { Dialog } from 'primereact/dialog';
import OpenChemLib from 'openchemlib/full';
import { SearchResultsPanel } from './search-results-table.component';
import { RootStoreContext } from '../../../../stores/mobx/root-store';
import { observer } from "mobx-react-lite";
import HistoryTokenList from './search-history-token-list.component';

export const SearchPanel: React.FC = () => {
    const navigate = useNavigate();

    const searchEntityStore = useContext(RootStoreContext).searchEntityStore;


    const neighborhoodExplorerStore =
        dependencyFactory.get<INeighborhoodExplorerStore>(
            STORES.INeighborhoodExplorerStore,
        );
    const tutorialStore = dependencyFactory.get<ITutorialStore>(
        STORES.ITutorialStore,
    );


    const [runTutorial, setRunTutorial] = useState<boolean>(
        tutorialStore.getShowGeneralSearchTutorial(),
    );

    const helpClickedHandler = () => {
        setRunTutorial(true);
    };

    const helpTourCallback = () => {
        setRunTutorial(false);
        searchEntityStore.initHistory()
        tutorialStore.setShowGeneralSearchTutorial(false);
        // tutorialStore.setShowCoOccurrencesSummaryTutorial(false);
    };




    const [savedMolFile, setSavedMolFile] = useState<string | null>(null);
    const [editor, setEditor] = useState<any>(null);


    const handleHide = () => {
        if (editor) {
            const mol = editor.getMolFile();
            setSavedMolFile(mol);
        }
        searchEntityStore.setIsModalOpen(false);
    };

    const initEditor = () => {
        const newEditor = OpenChemLib.StructureEditor.createSVGEditor(
            'structureSearchEditor',
            1
        );

        if (savedMolFile) {
            newEditor.setMolFile(savedMolFile);
        }

        setEditor(newEditor);
    }

    useEffect(() => {
        searchEntityStore.initHistory()
    });

    return (

        <div id='general-search-panel'>

            <GeneralSearchPageTourComponent
                run={runTutorial}
                callback={helpTourCallback}>
            </GeneralSearchPageTourComponent>

            <div
                className='general-search-header'
                id="general-search-header">

                <div className='wrapper' style={{ width: '80%', justifyContent: 'center', display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                    <div style={{ display: 'flex' }}>
                        <div className="p-inputgroup general-search-header-input">

                           {/*  <HistoryTokenList/> */}

                            <InputText
                                style={{
                                    border: 'none',
                                    boxShadow: 'none',
                                }}
                                value={searchEntityStore.query}
                                onChange={(e) => {

                                    searchEntityStore.setQuery(e.target.value)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') searchEntityStore.runQuery();
                                }}
                                placeholder="Search in knowledge base (e.g. disease name, plant name, compound name, InChI key, ...)"
                            />
                            <Button
                                icon="pi pi-search"
                                className="p-button-rounded p-button-text"
                                onClick={(e) => searchEntityStore.runQuery()}
                                tooltip="Search in knowledge base"
                                tooltipOptions={{ position: 'bottom', showDelay: 1000 }}
                            />
                        </div>


                        <Button
                            id="page-title-help-button"
                            icon="pi pi-question-circle"
                            style={{ marginLeft: '5px' }}
                            onClick={helpClickedHandler}
                            tooltip={`Watch tutorial`}
                            tooltipOptions={{ position: 'bottom', showDelay: 1000 }}
                        />

                    </div>
                    {/* TODO: implement as Buttons?*/}
                    <div className="general-search-links">
                        <Link to="/" className="general-search-link">
                            <i className="pi pi-angle-down" style={{ fontSize: '1rem' }}></i>Advanced Search
                        </Link>
                        <Link to="#" className="general-search-link" onClick={(e) => {
                            e.preventDefault; searchEntityStore.setIsModalOpen(false);
                        }}>
                            <i className="fa fa-atom" style={{ fontSize: '1rem' }}></i> Compound Search
                        </Link>
                        <Link to="/" className="general-search-link">
                            <i className="pi pi-history" style={{ fontSize: '1rem' }}></i> Search History
                        </Link>
                        {/* more links can be added here */}
                    </div>
                </div>
                <Dialog
                    visible={searchEntityStore.isModalOpen}
                    header={() => { return (<PageTitle icon="fa fa-atom" title="Compound Search" help={false} helpClickedHandler={helpClickedHandler} />) }}
                    onHide={handleHide}
                    onShow={initEditor}
                    modal
                    style={{ width: '80%' }}
                >
                    <CompoundSearchModal editor={editor} elements={searchEntityStore.entities} selectedElements={searchEntityStore.selectedEntities} />
                </Dialog>

                <p style={{ marginTop: '20px' }}>
                    using an advanced data collection, exchange and
                    analysis platform, with focus on the flora and
                    epidemiological needs of Latin-America
                </p>

            </div>
            <div id='search-table'>
                {searchEntityStore.isSearching && (<LoadingPlaceholderComponent></LoadingPlaceholderComponent>)}

                {searchEntityStore.isSearching === false && (

                    <div className='general-search-table'>
                        <SearchResultsPanel />

                        <Button
                            icon="fa fa-compass"
                            className='visualize-button'
                            label='Visualize'
                            size='small'
                            onClick={() => {
                                neighborhoodExplorerStore.nodes =
                                    neighborhoodExplorerStore.nodes.concat(
                                        searchEntityStore.selectedEntities.map((x) => {
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
                            tooltip="Show selection in neighborhood explorer"
                            tooltipOptions={{
                                position: 'bottom',
                                showDelay: 1000,
                            }}
                        />
                    </div>)}





            </div>
        </div>

    )
}

export default observer(SearchPanel);