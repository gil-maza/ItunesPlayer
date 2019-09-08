import React from 'react';
import { Link } from 'react-router-dom';
import './TuneItem.css';

const TuneItem = (props) => {

    const { item } = props;
    const displayName = item.trackName.length > 50 ? item.trackName.substring(0, 50) + "..." : item.trackName;
    const year = item.releaseDate.split('-')[0];
    const type = item.kind === 'song' ? 'audio' : 'video';

    return (
        <Link className="link" to={{
            pathname: `/${item.trackId}`,
            selectedItem: item,
            searchTerm: props.searchTerm
        }}>
            <div className="tune-item">
                <div className="track-name">{displayName}</div>
                <div className="artist-name">{item.artistName}</div>
                <div className="bottom">
                    <div className="type">{type}</div>.
                    <div className="year">{year}</div>
                </div>
            </div>
        </Link>
    );
}

export default TuneItem;