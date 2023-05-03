import { useContext, useEffect, useState } from "react";
import "./home.scss";
import logo from './logo.png';
import Navbar from '../../components/navbar/Navbar';
import Card from '../../components/card/Card'
import { Link } from "react-router-dom";
import { getEvents } from "../../services/event";


export default function Home(){
    const [eventName,setEventName] = useState("");
    const [eventType,setEventType] = useState("");
    const [nativeLanguage,setNativeLanguage] = useState("")
    const [minRating,setMinRating] = useState(0);
    const [maxRating,setMaxRating] = useState(5);
    const [eventList,setEventList] = useState([]);
    useEffect( () =>{
        const events = async()=>{
            const res = await getEvents({eventType , ratingMin : minRating , ratingMax: maxRating , nativeLanguage , searchTerm :  eventName});
            setEventList(res.events);
            console.log(res);
        }
        events();
    }, [ eventName , eventType , nativeLanguage , minRating , maxRating ] );
    return(
        <div className="Home" >
            <Navbar 
                eventName={eventName} 
                setEventName={setEventName}  
                eventType = {eventType} 
                setEventType={setEventType}
                minRating = {minRating}
                setMinRating = {setMinRating}
                maxRating = {maxRating}
                setMaxRating = {setMaxRating}
                nativeLanguage = {nativeLanguage}
                setNativeLanguage = {setNativeLanguage}
            />
            {
                eventList.map( (event)=>
                    <Card
                        type={event.eventType}
                        desc = {event.description}
                        name={event.title}
                        rating={event.rating}
                        language={event.nativeLanguage}
                        images={event.pictures}
                    />
                )
            }
        </div>
    )
};