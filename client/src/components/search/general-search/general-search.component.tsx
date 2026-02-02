import { ReactNode, useContext, useEffect, useState } from 'react';
import React from 'react';
import { StructureFilterMatchMode } from '../../../features/filters/enums/structure-filter-match-mode';
import {
    CollectionPlaceholderComponent,
    LoadingPlaceholderComponent,
    PageTitle,
} from '../..';
import { Panel } from 'primereact/panel';
import StructureEditor from '../../../features/filters/structure-editor.component';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MessageServiceContext } from '../../../features/shared/messages';
import { dependencyFactory } from '../../../features/shared/injection';
import {
    IGeneralSearchHistoryService,
    IGeneralSearchService,
    SERVICES,
} from '../../../services';
import { ISavedGeneralSearch } from '../../../features/modules/search/search-history/saved-general-search';
import { DataView } from 'primereact/dataview';
import { INeighborhoodExplorerStore } from '../../../stores/neighborhood-explorer-store';
import { ITutorialStore, STORES } from '../../../stores';
import { useNavigate, Link } from 'react-router-dom';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'primereact/badge';
import { darkenHexColor, truncateString } from '../../../utils';
import GeneralSearchPageTourComponent from './general-search-tour.component';
import './general-search.component.scss';
import CompoundSearchModal from '../compound-search/compound-search-modal';
import { Dialog } from 'primereact/dialog';
import OpenChemLib from 'openchemlib/full';
import { unescape } from 'querystring';


export const GeneralSearchPanel: React.FC = () => {
    const navigate = useNavigate();

    const [query, setQuery] = useState<string>();
    const [elements, setElements] = useState<any[]>([]);
    const [selectedElements, setSelectedElements] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);



    const searchService = dependencyFactory.get<IGeneralSearchService>(
        SERVICES.IGeneralSearchService,
    );
    const historyService = dependencyFactory.get<IGeneralSearchHistoryService>(
        SERVICES.IGeneralSearchHistoryService,
    );
    const neighborhoodExplorerStore =
        dependencyFactory.get<INeighborhoodExplorerStore>(
            STORES.INeighborhoodExplorerStore,
        );
    const tutorialStore = dependencyFactory.get<ITutorialStore>(
        STORES.ITutorialStore,
    );


    const [history, setHistory] = useState<Partial<ISavedGeneralSearch>[]>([])

    const { messageService } = useContext(MessageServiceContext);
    const [searching, setSearching] = useState<boolean | null>(null);

    const [runTutorial, setRunTutorial] = useState<boolean>(
        tutorialStore.getShowGeneralSearchTutorial(),
    );

    const helpClickedHandler = () => {
        setRunTutorial(true);
    };

    const helpTourCallback = () => {
        setRunTutorial(false);
        initWidgets();
        tutorialStore.setShowGeneralSearchTutorial(false);
        // tutorialStore.setShowCoOccurrencesSummaryTutorial(false);
    };

    useEffect(() => {
    }, []);

    const initWidgets = async () => {
        setHistory(await historyService.getAllAsOptions(messageService!));
    };

    const runQuery = async () => {
        if ((!searching || searching === null) && query) {
            setSearching(true);
            const elements = await searchService.findEntities(
                query,
                messageService!,
            );
            setElements(elements);
            setSelectedElements([]);
            setSearching(false);
            await historyService.create(
                { id: '0', query: query, datetime: '', results: elements },
                messageService!,
            );
            setHistory(await historyService.getAllAsOptions(messageService!));
        }
    };

    const typeColumnTemplate = (result: any) => {
        return (
            <Badge
                value={truncateString(result.type, 25)}
                style={{
                    background: darkenHexColor(result.color, -140),
                    border: `solid 2px ${result.color}`,
                    height: 27,
                    color: 'black',
                }}
            />
        );
    };

    const nameColumnTemplate = (result: any) => {
        return <span>{truncateString(result.name, 150)}</span>;
    };

    const tokenList = (
        items: Partial<ISavedGeneralSearch>[],
    ) => {
        if (!items || items.length === 0) return undefined
        return (

            <div className='token-list'>
                {items.slice(0, 5).map((query, index) => (
                    <div className="token"
                        onClick={(e) => {
                            setQuery(query.query);
                        }}
                    >
                        <span className="mb-0">{query.query}</span>
                        <Button
                            className='token-button'
                            text
                            rounded
                            size='small'
                            icon="pi pi-times"
                            onClick={async (e) => {
                                e.stopPropagation();
                                if (query.id != undefined)
                                    await historyService.delete(query.id);
                                setHistory(
                                    await historyService.getAllAsOptions(
                                        messageService!,
                                    ),
                                );
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

    const [savedMolFile, setSavedMolFile] = useState<string | null>(null);
    const [editor, setEditor] = useState<any>(null);


    const handleHide = () => {
        if (editor) {
            const mol = editor.getMolFile();
            setSavedMolFile(mol);  
        }
        setIsModalOpen(false);
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

                        {tokenList(history)}

                        <InputText
                            style={{
                                border: 'none',        // Input selbst keine Border
                                boxShadow: 'none',
                            }}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') runQuery();
                            }}
                            placeholder="Search in knowledge base (e.g. disease name, plant name, compound name, InChI key, ...)"
                        />
                        <Button
                            icon="pi pi-search"
                            className="p-button-rounded p-button-text"
                            onClick={runQuery}
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
                <div className="general-search-links">
                    <Link to="/" className="general-search-link">
                        <i className="pi pi-angle-down" style={{ fontSize: '1rem' }}></i>Advanced Search
                    </Link>
                    <Link to="#" className="general-search-link" onClick={(e) => { e.preventDefault; setIsModalOpen(true) }}>
                        <i className="fa fa-atom" style={{ fontSize: '1rem' }}></i> Compound Search
                    </Link>
                    <Link to="/" className="general-search-link">
                        <i className="pi pi-history" style={{ fontSize: '1rem' }}></i> Search History
                    </Link>
                    {/* more links can be added here */}
                </div>
            </div>

            <Dialog
                visible={isModalOpen} // TODO: add correct tutorial
                header={() => { return (<PageTitle icon="fa fa-atom" title="Compound Search" help={false} helpClickedHandler={helpClickedHandler}/>)}}
                onHide={handleHide}
                onShow={initEditor}
                modal
                style={{ width: '80%' }}
            >
                <CompoundSearchModal editor={editor} />
            </Dialog>

            <p style={{ marginTop: '20px' }}>
                using an advanced data collection, exchange and
                analysis platform, with focus on the flora and
                epidemiological needs of Latin-America
            </p>

        </div>

        <div id='search-table'>
            {searching && (

                <LoadingPlaceholderComponent></LoadingPlaceholderComponent>



            )}
            {searching === false && elements.length >= 0 && (

                <div className='general-search-table'>

                    <DataTable
                        scrollable
                        scrollHeight="650px"
                        selectionMode="multiple"
                        metaKeySelection={false}
                        selection={selectedElements}
                        emptyMessage="No entries found... Try again!"
                        onSelectionChange={(e) =>
                            setSelectedElements(e.value)
                        }
                        value={elements}
                        tableStyle={{ minWidth: '50rem' }}>
                        <Column
                            field="name"
                            style={{ width: '75%' }}
                            sortable
                            body={nameColumnTemplate}
                            header="Name"></Column>
                        <Column
                            field="type"
                            sortable
                            header="Type"
                            body={typeColumnTemplate}></Column>
                    </DataTable>
                    <Button
                        icon="fa fa-compass"
                        className='visualize-button'
                        label='Visualize'
                        size='small'
                        onClick={() => {
                            neighborhoodExplorerStore.nodes =
                                neighborhoodExplorerStore.nodes.concat(
                                    selectedElements.map((x) => {
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
                </div>

            )}

        </div>


    </div>

)
}

export default GeneralSearchPanel;