import React from 'react';
import { Link } from 'react-router-dom';
import './TuneDetailed.css';

const TuneDetailed = (props) => {

    const item = props.location.selectedItem;

    if (item) {
        return (
            <div className="tune-detailed">
                <div className="main-content">
                    <video className="media-player" controls autoPlay={true}>
                        <source src={item.previewUrl} />
                    </video>
                    <div className="under-player">
                        <div className="detailes">
                            <div className="track-name-detailed">{item.trackName}</div>
                            <div className="artist-name-detailed">{item.artistName}</div>
                            <div className="kind">{item.kind}</div>
                            <div className="collection">collection: {item.collectionName}</div>
                            <div className="date">realese date: {item.releaseDate.split('T')[0]}</div>
                        </div>
                        <div className="back">
                            <Link to={{
                                pathname: '/',
                                searchTerm: props.location.searchTerm
                            }}>
                                <button>back</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="tune-detailed-faild">
                <div className="message">Tune Not Found</div>
                <Link to={'/'}>
                    <div className="link">You must search first</div>
                </Link>
            </div>
        );
    }
}

export default TuneDetailed;