import { Container, Col, Button, Form } from "react-bootstrap"; 
import { useState, useEffect } from "react";
import axiosInstance from '../api/axiosInstance';
import "./TourCard.css";

const TourCard = ({ tour }) => {   
    const [tourCards, setTourCards]=useState([]);
    const [seeTourCards, setSeeTourCards]=useState(false);
    const [personaName, setPersonaName]=useState([]);
    const [selectedTourAvailability, setSelectedTourAvailability]=useState(null);

    useEffect(() => {   
        axiosInstance.get('/tours/availability')
        .then(response => {
            setTourCards(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }, [tourCards]);

    return (
        <Container className="tour-container"> 
            <Col>{tour.name}</Col>
            <Col>{tour.description}</Col>
            <Col>Price: ${tour.price}</Col> 
            <Col>Capacity: {tour.capacity}</Col>
            <Button className="btn-cardTours" onClick={() => setSeeTourCards(!seeTourCards)}>{seeTourCards? 'Ocultar disponibilidad':'Ver disponibilidad'}</Button>
            {seeTourCards && (
                <Container className="tour-container">
                    {tourCards.map((tourCard) => (      
                        <Container key={tourCard.id} className="tour-card">
                            <Form.Check
                                disabled={tourCard.seats_available === 0}
                                checked={selectedTourAvailability && selectedTourAvailability.id === tourCard.id}
                                onChange={() => setSelectedTourAvailability(tourCard)}  
                            >
                            </Form.Check>
                            <Col>Schedule Time: {new Date(tourCard.schedule_time).toLocaleString()}</Col>
                            <Col>Seats Available: {tourCard.seats_available}</Col>
                        </Container>
                    ))}
                    <Container>
                        <Form.Control
                            type="text"
                            placeholder="Nombre de la persona"
                            value={personaName}
                            onChange={(e) => setPersonaName(e.target.value)} 
                        >   
                        </Form.Control>
                        <Button className="btn-cardTours" onClick={async () => {
                            try {
                                const scheduleDate=new Date(selectedTourAvailability.schedule_time);
                                const formattedTime=scheduleDate.getFullYear() + '-' +
                                                    String(scheduleDate.getMonth() + 1).padStart(2, '0') + '-' +
                                                    String(scheduleDate.getDate()).padStart(2, '0') + ' ' +
                                                    String(scheduleDate.getHours()).padStart(2, '0') + ':' +
                                                    String(scheduleDate.getMinutes()).padStart(2, '0') + ':' +
                                                    String(scheduleDate.getSeconds()).padStart(2, '0');
                                const response=await axiosInstance.put('/tours/reserve', {                      
                                }   , {
                                    params: { 
                                        personName: personaName,                                        
                                        tourId: selectedTourAvailability.tour_id,
                                        scheduleTime: formattedTime
                                    }
                                });
                                console.log('Reservation response:', response.data);  
                                alert('Reservation successful');                              
                            }catch(error){
                                alert('Error making reservation');
                                console.error('Error making reservation:', error);
                            }   
                        }}>Reservar</Button>  
                    </Container>
                </Container>
            )}
        </Container>
    );
}

export default TourCard;