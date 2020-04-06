import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../../context';
import Title from '../../components/Title';

const getUnique = (rooms, value) => {
    console.log(rooms)
    return [...new Set(rooms.map(item=>item[value]))] //wchodzimy po . do wlasciwosci
}

export default function RoomFilter({room}) {

    const context = useContext(RoomContext);

    const { handleChange, rooms, type,capacity,price,minPrice,maxPrice,minSize,maxSize,breakfast,pets} = context;

    let types = getUnique(rooms, "type");
    types = ['all', ...types]
    console.log(types , 'types')
    
    let people = getUnique(rooms, 'capacity');
    people = people.map((item, index) => { return <option key={index} value={item}>{item}</option>})

    return (
        <section className="filter-container">
            <Title title="search rooms"/> 
            <form className="filter-form">
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                        { types.map(item=>  <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {people}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control"/>
                </div>
               
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className="size-input"></input> 
                        <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className="size-input"></input> 
                    </div>
                </div>

                <div className="form-group">
                    

                    <label htmlFor="breakfast">breakfast</label>
                    <div className="single-extra">
                    <input type="checkbox" name="breakfast" id="breakfast"  checked={breakfast} onChange={handleChange}></input>
                    </div>

                    <label htmlFor="pets">pets</label>
                    <div className="single-extra">
                    <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}></input>
                    </div>
                </div>
            </form>
        </section>
    )
}
