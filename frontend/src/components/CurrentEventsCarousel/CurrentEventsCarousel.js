import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';


import "react-responsive-carousel/lib/styles/carousel.min.css";
import './CurrentEventsCarousel.css';

class CurrentEventsCarousel extends Component {
    constructor(props) {
        super(props);
        this.bets = {}
    }

    render() {

        const team1 = {
            "team": "Chelsea",
            "odd": 2.25
        }
        const team2 = {
            "team": "Arsenal",
            "odd": 1.14
        }

        const vs = "vs."

        // TODO : passar informacao dos blocos para um componente

        return (
            <div className="carousel-container">
                <Carousel interval={15000} showThumbs={false} infiniteLoop={true} autoPlay={true} showStats={false}>
                    <div>
                        <img src={require("../../assets/carousel/football.jpg")} alt="Football" />
                        <div className="team-block team-block-left shadow">Barcelona FC</div>
                        <p className="team-block-vs">{vs}</p>
                        <div className="team-block team-block-right shadow">Sporting FC</div>
                    </div>
                    <div>
                        <img src={require("../../assets/carousel/football.jpg")} alt="Football" />
                        <div className="team-block team-block-left shadow">Barcelona FC</div>
                        <p className="team-block-vs">{vs}</p>
                        <div className="team-block team-block-right shadow">Sporting FC</div>
                    </div>
                    <div>
                        <img src={require("../../assets/carousel/football.jpg")} alt="Football" />
                        <div className="team-block team-block-left shadow">Barcelona FC</div>
                        <p className="team-block-vs">{vs}</p>
                        <div className="team-block team-block-right shadow">Sporting FC</div>
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default CurrentEventsCarousel;