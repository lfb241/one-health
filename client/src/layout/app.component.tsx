import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../Style.scss';
import './app.component.scss';
import Layout from './layout.component';
import {
    CoOcurrencesSummaryPageComponent,
    DataLoadPageComponent,
    DocumentationPageComponent,
    EntityTypeFormPageComponent,
    HomePageComponent,
    LegalPageComponent,
    LinkTypeFormPageComponent,
    MetadataOverviewPageComponent,
    NeighborhoodExplorerPageComponent,
} from '../pages';
import { CompoundSearchPageComponent } from '../components';


function App() {
    return (


        <div className="app">
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/entity-type-form">Entity Type Form</Link> |{" "}
                <Link to="/link-type-form">Link Type Form</Link> |{" "}
                <Link to="/ontology/overview">Ontology Overview</Link> |{" "}
                <Link to="/ontology/data-load/0">Data Load</Link> |{" "}
                <Link to="/neighborhood-explorer">Neighborhood Explorer</Link> |{" "}
                <Link to="/visualization/co-occurrence-search">Co-Occurrences</Link> |{" "}
                <Link to="/documentation">Documentation</Link> |{" "}
                <Link to="/imprint">Imprint</Link> | {" "}
                <Link to="/privacy">Privacy</Link> | {" "}
                <Link to="/accessibility">Accessibility</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route index element={<HomePageComponent />} />

                    <Route path="entity-type-form" element={<EntityTypeFormPageComponent />} />
                    <Route path="entity-type-form/:id" element={<EntityTypeFormPageComponent />} />

                    <Route path="link-type-form" element={<LinkTypeFormPageComponent />} />
                    <Route path="link-type-form/:id" element={<LinkTypeFormPageComponent />} />

                    <Route path="ontology/overview" element={<MetadataOverviewPageComponent />} />
                    <Route path="ontology/data-load/0" element={<DataLoadPageComponent />} />

                    {/*                     <Route path="search/structure-search" element={<CompoundSearchPageComponent />} />
                    <Route path="search/general-search" element={<GeneralSearchPageComponent />} />
 */}
                    <Route path="neighborhood-explorer" element={<NeighborhoodExplorerPageComponent />} />
                    <Route path="visualization/co-occurrence-search" element={<CoOcurrencesSummaryPageComponent />} />

                    <Route path="documentation" element={<DocumentationPageComponent />} />

                    <Route path="imprint" element={<LegalPageComponent activeIndex={0} />} />
                    <Route path="privacy" element={<LegalPageComponent activeIndex={1} />} />
                    <Route path="accessibility" element={<LegalPageComponent activeIndex={2} />} />

                </Route>
            </Routes>
        </div>


    );
}

export default App;
