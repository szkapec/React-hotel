import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import RoomsContainer from '../components/Rooms/RoomContainer';

export default function Rooms() {
    return (
        <>
        <Hero hero="roomsHero">
            <Banner title="out rooms">
                <Link to="/" className="btn-primary">
                    Return home
                </Link>
            </Banner>
        </Hero>
        <RoomsContainer/>

    </>

    )
}
