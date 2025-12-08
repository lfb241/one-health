import React from 'react';
import logoGlacier from '../assets/logo_glacier.png';
import logoDaad from '../assets/logo_daad.png';
import logoDip from '../assets/logo_dip.png';
import logoLeibniz from '../assets/logo_leibniz.png';
import logoIpb from '../assets/logo_ipb.png';
import logoForeign from '../assets/logo_foreign_office.png';
import './footer.component.scss';

const Footer: React.FC = () => {
    return (
        <div className="app-footer">

            <div className='app-footer-coloured-light row'>
                <ul>
                    <li>
                        <a href='/documentation'>Documentation</a>
                    </li>
                    <li>
                        <a href='/imprint'>Imprint</a>
                    </li>
                    <li>
                        <a href='/privacy'>Privacy Policy</a>
                    </li>
                    <li>
                        <a href='/accessibility'>Accessibility</a>
                    </li>


                </ul>
            </div>

            <div className='app-footer-coloured-dark row' style={{ padding: '0px' }}>
                <div className="col-7">
    
                        <div className="col-2">
                            <img
                                alt="logo"
                                src={logoIpb}
                                height="60"
                                style={{ marginRight: '3px' }}></img>
                        </div>

                </div>
                <div
                    className="col-5"
                    style={{ display: 'flex',  justifyContent: 'end', alignItems:'center' }}>
                    <img
                        alt="logo"
                        src={logoGlacier}
                        height="60"
                        style={{ marginRight: '3px'}}></img>
                    <img
                        alt="logo"
                        src={logoForeign}
                        height="80"
                        style={{ marginRight: '3px' }}></img>
                    <img
                        alt="logo"
                        src={logoDaad}
                        height="80"
                        style={{ marginRight: '3px' }}></img>
                    <img
                        alt="logo"
                        src={logoDip}
                        height="40"
                        style={{ marginRight: '3px' }}></img>
                    <img
                        alt="logo"
                        src={logoLeibniz}
                        height="60"
                        style={{ marginRight: '3px' }}></img>
                </div>
            </div>
        </div>
    );
};

export default Footer;
