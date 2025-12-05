import './home-page.component.scss';
import heroSectionImage from '../../assets/img/hero-section-bg.png';
import logoGlacier from '../../assets/logo_glacier.png';
import logoIpb from '../../assets/logo_ipb.png';
import logoForeign from '../../assets/logo_foreign_office.png';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import neighborhoodExplorerImage from '../../assets/img/neighborhood-explorer.png';
import coocurrencesSummaryImage from '../../assets/img/cooccurrences-summary.png';
import contributeImage from '../../assets/img/contribute.jpeg';
import { useNavigate } from 'react-router-dom';
import './home-page.component.scss';
import { Tag } from 'primereact/tag';
import React from 'react';



const HomePageComponent: React.FC = () => {
    const navigate = useNavigate()

    const heroSectionRow = () => {

    const neighborhoodExplorerCardHeader = (
        <img
            alt="Neighborhood Explorer"
            src={neighborhoodExplorerImage}
            style={{ height: '100%' }}></img>
    );

    const neighborhoodExplorerCardFooter = (
        <Button
            label="Tutorial"
            onClick={() => {
                navigate('/neighborhood-explorer');
            }}></Button>
    );

    const coOccurrencesSummaryCardHeader = (
        <img
            alt="Co-Occurrences Summary"
            src={coocurrencesSummaryImage}
            style={{ height: '100%' }}></img>
    );

    const coOccurrencesSummaryCardFooter = (
        <Button
            label="Tutorial"
            onClick={() => {
                navigate('/visualization/co-ocurrence-search/');
            }}></Button>
    );

    const contributeCardHeader = (
        <img
            alt="Contribute"
            src={contributeImage}
            style={{ height: '100%' }}></img>
    );

    const contributeCardFooter = (
        <Button
            label="Tutorial"
            onClick={() => {
                navigate('/ontology/data-load/0');
            }}></Button>
    );

    return (

        <div className="row home-card-section" id="hero-section" style={{
            marginTop: '30px',      // FIXME: Right margins
            marginBottom: '30px',
            /* marginBottom: '', */
            height: '100%',
        }}>

            <div className="col-3">
                <Card
                    title="Explore"
                    footer={neighborhoodExplorerCardFooter}
                    header={neighborhoodExplorerCardHeader}
                    className="md:w-25rem">     {/*  FIXME: Useless no Primeflex Import? */}
                    <p>
                        Explore the connections found in
                        scientific data between species, natural
                        products and diseases
                    </p>
                </Card>
            </div>
            <div className="col-3">
                <Card
                    title="Discover"
                    footer={coOccurrencesSummaryCardFooter}
                    header={coOccurrencesSummaryCardHeader}
                    className="md:w-25rem"> {/*  FIXME: Useless no Primeflex Import? */}
                    <p>
                        Discover co-occurrences of scientific
                        concepts found in literature and
                        datasets
                    </p>
                </Card>
            </div>
            <div className="col-3">
                <Card
                    title="Contribute"
                    footer={contributeCardFooter}
                    header={contributeCardHeader}
                    className="md:w-25rem"> {/*  FIXME: Useless no Primeflex Import? */}
                    <p>
                        Contribute to the platform by uploading
                        and analyzing your publications and
                        datasets
                    </p>
                    <Tag
                        severity="danger"
                        value="Under development"></Tag>
                </Card>
            </div>
            <div className="col-3" >
                <img
                    src={heroSectionImage}
                    alt="Your SVG"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );}


    return (
        <div className='container-fluid px-5' style={{ marginTop: '30px' }} id="home-page">
            <div className='row'>
                <h2 style={{ textAlign: 'center' }}>
                    Empowering the research on plant-derived natural
                    products for the treatment of diseases
                </h2>

                <p style={{ textAlign: 'center' }}>
                    using an advanced data collection, exchange and
                    analysis platform, with focus on the flora and
                    epidemiological needs of Latin-America
                </p>

            </div>
            {heroSectionRow()}

            <div className='row'>
                <div style={{ marginTop: '20px' }}>
                    <small style={{ textAlign: 'center' }}>
                        developed and curated by
                    </small>
                    <img
                        alt="logo"
                        src={logoGlacier}
                        height="80"
                        style={{
                            marginRight: '3px',
                            marginLeft: '50px',
                        }}></img>
                    <img
                        alt="logo"
                        src={logoIpb}
                        height="80"
                        style={{
                            marginRight: '15px',
                            marginLeft: '50px',
                        }}></img>
                    <small style={{ textAlign: 'center' }}>
                        and funded by the German Federal Foreign Office
                    </small>
                    <img
                        alt="logo"
                        src={logoForeign}
                        height="100"
                        style={{
                            marginRight: '3px',
                            marginLeft: '40px',
                        }}></img>

                    <div style={{ height: '20px' }}></div>
                    <small>
                        <b>GLACIER</b> (German Latin-American Center for
                        Infection and Epidemiology Research &amp;
                        Training) is an international multidisciplinary
                        consortium that aims to level regional
                        disparities in Latin America by strengthening
                        surveillance and response to emerging infectious
                        diseases and developing new vaccines and
                        therapies. GLACIER is made up of more than 30
                        cooperating institutions from nine countries
                        (Germany, Mexico, Cuba, Costa Rica, Nicaragua,
                        Honduras, El Salvador, Panama, and Guatemala).
                    </small>
                    <br></br>
                    <small>
                        For further information, please visit the
                        GLACIER consortium’s official website{' '}
                        <a href="https://glacieronehealth.org/about/">
                            About | GLACIER One Health Project
                        </a>
                    </small>
                </div>

            </div>
            <div className='row'></div>



            <div className='row'>
            </div>
        </div>



    );
;}



export default HomePageComponent;