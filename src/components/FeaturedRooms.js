import React, { Component } from 'react'
import {RoomContext, RoomProvider} from '../context';
import Loading from './Loading';
import Room from './Rooms/Room';
import Title from './Title';
export default class FeaturedRooms extends Component {

    static contextType = RoomContext; //tak jakby parsowal caly obiekt na json


    render() {
        let {featuredRooms: rooms, loading,} = this.context;
        rooms = rooms.map(room=> {
            return <Room key={room.id} room={room}></Room>;
        })
        return (
            <section className="featured-rooms">
                <Title title="featured rooms"></Title>
                <div className="featured-rooms-center">
                {/* {loading?<Loading/>: rooms} */}
                {rooms}
                </div>
            </section>
        )
    }
}
