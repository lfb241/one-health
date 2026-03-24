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
    IGeneralSearchHistoryService,
    IGeneralSearchService,
    SERVICES,
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
import SearchResultTable from './search-result-table.component';
import { SelectButton } from 'primereact/selectbutton';

export const SearchPanel: React.FC = () => {
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


    const initWidgets = async () => {
        setHistory(await historyService.getAllAsOptions(messageService!));
    };



    const [value, setValue] = useState<number | null>(null)
    const [options, setOptions] = useState([
        { name: "Natural Products", counter: 0, value: 0 },
        { name: "Plants", counter: 0, value: 1 },
        { name: "Diseases", counter: 0, value: 2 },
    ]);

    const runQuery = async () => {
        if ((!searching || searching === null) && query) {
            setSearching(true);
            const elements = await searchService.findEntities(
                query,
                messageService!,
            );
            setElements(elements);


            const updatedOptions = options.map(option => ({
                ...option,
                counter: 0
            }));

            elements.forEach((element: { type: any }) => {
                switch (element.type) {
                    case "Natural Product":
                        updatedOptions[0].counter += 1;
                        break;
                    case "Plant":
                        updatedOptions[1].counter += 1;
                        break;
                    case "Disease":
                        updatedOptions[2].counter += 1;
                        break;
                }
            });
        
            const maxIndex = updatedOptions.reduce((maxIdx, opt, idx) => {
                return opt.counter > updatedOptions[maxIdx].counter ? idx : maxIdx;
            }, 0);

            setValue(maxIndex);
            setOptions(updatedOptions);
            setSelectedElements([]);
            setSearching(false);
            await historyService.create(
                { id: '0', query: query, datetime: '', results: elements },
                messageService!,
            );
            setHistory(await historyService.getAllAsOptions(messageService!));

        }
    };

    const HistoryTokenList = (
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


    // TODO: Typen zählen und vom höchsten Value dazu


    const optionTemplate = (option: any) => {
        return <span>{option.name} ({option.counter})</span>
    }

    useEffect(() => {
    }, []);


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

                            {HistoryTokenList(history)}

                            <InputText
                                style={{
                                    border: 'none',  
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
                    {/* TODO:Buttons mit Navigate?*/}
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
                
                {/* TODO: verheiraten mit Compound-Search Logik */}
                {/* TODO: add correct tutorial */}
                <Dialog
                    visible={isModalOpen} 
                    header={() => { return (<PageTitle icon="fa fa-atom" title="Compound Search" help={false} helpClickedHandler={helpClickedHandler} />) }}
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
                {searching === false
                 && (

                    <div>
                        <SelectButton value={value} onChange={(e) => { setValue(e.value) }} itemTemplate={optionTemplate} options={options} optionLabel="name" />
                        <div className='general-search-table'>
                            <SearchResultTable
                                elements={elements}
                                type={value}
                                selectedElements={selectedElements}
                                setSelectedElements={setSelectedElements}
                            />
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
                    </div>
                )}

            </div>


        </div>

    )
}

export default SearchPanel;