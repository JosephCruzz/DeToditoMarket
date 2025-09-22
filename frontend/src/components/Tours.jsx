import { Container, Col, Button } from "react-bootstrap"; 
import { useState, useEffect } from "react";
import axiosInstance from '../api/axiosInstance';
import TourCard from "./TourCard";

const Tours = () => {   
    const [tours, setTours]=useState([]);
    const [seeTours, setSeeTours]=useState(false);

    useEffect(() => {   
        axiosInstance.get('/tours?limit=10&offset=0')
        .then(response => {
            setTours(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });     
    }, []);

    return (
        <Container className="tour-container">
            <Col>Tours Component</Col>
            <Button className="btn-tours" onClick={() => setSeeTours(!seeTours)}>{seeTours? 'Ocultar Tours':'Ver Tours'}</Button>
            {seeTours && (
                <Container>
                    {tours.map((tour) => (  
                        <TourCard key={tour.id} tour={tour}></TourCard> 
                    ))}
                </Container>
            )}
        </Container>
    );
}

export default Tours;