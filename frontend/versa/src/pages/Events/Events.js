import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventCard from "../../components/Events/EventCard";
import { searchEvents, getAllEvents } from "../../axios/gets";
import { Magnifying } from "../../images/icons";
import theme from "../../components/Reusable/Colors.js";
import Box from "../../components/Redesign/Reusable/Box";
import PageContainer from "../../components/Redesign/Reusable/PageContainer";
import Header from "../../components/Redesign/Reusable/Header";
import Loading from "../../components/Redesign/Reusable/Loading";
import { DateRangeSearch } from "../../components/Redesign/Reusable/DateRangeSearch";
const Events = () => {
    const [events, setEvents] = useState();
    const [searchQuery, setSearchQuery] = useState();
    const [date1, setDate1] = useState(new Date("Jan 1 1900"));
    const [date2, setDate2] = useState(new Date("Dec 31 2999"));
    const [filteredEvents, setFilteredEvents] = useState();

    useEffect(() => {
        const getEvents = async () => {
            let data = await getAllEvents();
            console.log(data);
            setEvents(data);
        };
        window.scrollTo({
            top: 0,
            left: 0,
        });
        getEvents();
    }, []);
    useEffect(() => {
        if (events) {
            let tempEvents = events.filter((event) => {
                return (
                    new Date(event.end_time) - date1 > 0 &&
                    date2 - new Date(event.start_time) > 0
                );
            });
            setFilteredEvents(tempEvents);
        }
    }, [events, date1, date2]);
    const search = async () => {
        let data = await searchEvents(searchQuery);
        setEvents(data);
    };

    
    return (
        <PageContainer>
            <Header
                title="Events"
                sub="Meet fellow Calgarians and discover talented artists. Connect with your local community."
                search
                placeholder="Search for events"
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        search();
                    }
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <DateRangeSearch setDate1={setDate1} setDate2={setDate2}/>
            {!filteredEvents ? (
                <Loading />
            ) : (
                <Box
                    dataToMap={filteredEvents
                        .sort((event1, event2) => {
                            let eventDate1 = new Date(event1.start_time);
                            let eventDate2 = new Date(event2.start_time);
                            if (new Date() - eventDate1 > 0) {
                                return 1;
                            } else if (new Date() - eventDate2 > 0) {
                                return -1;
                            }
                            return eventDate1 - eventDate2;
                        })
                        .map((event) => {
                            const mappedEvent = {
                                ...event,
                                startTime: new Date(
                                    event.start_time
                                ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }),
                                startDate: new Date(
                                    event.start_time
                                ).toLocaleDateString([], {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }),
                            };
                            return mappedEvent;
                        })}
                    type="event"
                    link="events"
                    awsFolder="eventImages"
                    action
                />
            )}
        </PageContainer>
    );
};

export default Events;

export const SearchBarDiv = styled.div`
    position: relative;
`;


