import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo1.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export const Footer = () => {
    const position = { lat: 51.559665, lng: -0.2787139 };

    return (
        <div>
            <div>
                <h2 className='map-title'>
                    Our Location
                </h2>
                <div className='map'>
                    <APIProvider apiKey={'AIzaSyADxBcGvpSQ44vj0ql8H618jOdmhqnbu7A'}>
                        <Map defaultCenter={position} defaultZoom={10}>
                            <Marker position={position} />
                        </Map>
                    </APIProvider>
                </div>
            </div>
            <div className='footer'>
                <div className="footer-logo">
                    <img src={footer_logo} alt="" />
                    <p>SHOPPER</p>
                </div>
                <ul className="footer-links">
                    <li>Company</li>
                    <li>Products</li>
                    <li>Offices</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
                <div className="footer-social-icons">
                    <div className='footer-icons-container'>
                        <img src={instagram_icon} alt="" />
                    </div>
                    <div className='footer-icons-container'>
                        <img src={pintester_icon} alt="" />
                    </div>
                    <div className='footer-icons-container'>
                        <img src={whatsapp_icon} alt="" />
                    </div>
                </div>
                <div className="footer-copyright">
                    <hr />
                    <p>Copyright @ 2024 - All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}
