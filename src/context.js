import React, { Component } from 'react'
import items from './data';
import Client from './Contentful';

const RoomContext = React.createContext();


 class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price:600,
        minPrice:0,
        maxPrice:0,
        minSize: 0,
        maxSize:0,
        breakfast: false,
        pets: false,

    };

    getData = async () => {
        console.log(process.env.REACT_APP_API_SPACE)
        console.log(process.env.REACT_APP_ACCESS_TOKEN)
        try {
            let response = await Client.getEntries({
                content_type: "jacek",
                order: 'fields.price',
            })
            console.log(response.items)
            let rooms = this.formatData(response.items)
            console.log(rooms)
            let featuredRooms = rooms.filter(room=>room.featured === true)
            let maxPrice = Math.max(...rooms.map(item=> item.price))
            let maxSize = Math.max(...rooms.map(item=> item.size))
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                maxSize,
                maxPrice,
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getData()
        // let rooms = this.formatData(items);
        // let featuredRooms = rooms.filter(room => room.featured === true);
        // //
        // console.log(rooms)
        // let maxPrice = Math.max(...rooms.map(item => item.price));
        // let maxSize = Math.max(...rooms.map(item => item.size));
        // this.setState({
        //   rooms,
        //   featuredRooms,
        //   sortedRooms: rooms,
        //   loading: false,
        //   //
        //   price: maxPrice,
        //   maxPrice,
        //   maxSize
        // });
    }

    formatData(items) {
        let temp = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(img => img.fields.file.url)
            let room = {...item.fields, images:images, id:id}
            return room;
        })
        return temp;
  
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => room.slug === slug)
        console.log(room)
        return room;
    }
    handleChange = event => {
        const target = event.target;
        const type = event.target.type
        const name = event.target.name
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(`name: ${name} oraz value ${value}`)

        this.setState({
            [name]: value,  //np capacity: 4 || type: single
        }, this.filterRooms)
    }
    filterRooms = () => {

        let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state;
        let tempRooms = [...rooms];
        capacity = parseInt(capacity)
        price = parseInt(price)


        if(type!=='all'){
            tempRooms = tempRooms.filter(room => room.type === type) //wszystkie pokoje
        }
        if(capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity) //wszystkie capacity - room.capacity ... capacity: ustawione np 4
        }

            tempRooms = tempRooms.filter(room => room.price <= price);
            tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <=maxSize)

        if(breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }
        if(pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }


        this.setState({
            sortedRooms: tempRooms,
        })
    }
    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange:this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return (
            <RoomConsumer>
                {value=> <Component {...props} context={value} />}
            </RoomConsumer>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext} ;