import React, { useState, useEffect, useRef } from 'react';
import useOutsideClick from "../../useOutsideClick";
import TuneItem from '../../components/TuneItem/TuneItem';
import './Search.css';

const Search = (props) => {

    useEffect(() => {
        const newTerm = props.location.searchTerm;
        if (newTerm) {
            console.log(newTerm);
            fetchTunes(newTerm);
            setSearchTerm(newTerm);
        }
    },[]);

    const [tunes, setTunes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [topQueries, setTopQueries] = useState([]);
    const ref = useRef();

    useOutsideClick(ref, () => {
        if (topQueries) setTopQueries([]);
    });

    const fetchTunes = async (searchTermm) => {
        if (typeof searchTermm != 'string' || searchTermm === "") return null;
        const response = await fetch('http://localhost:3000/tunes/' + searchTermm);
        const tunes = await response.json();
        setTunes(tunes);

        fetch('http://localhost:3000/queries', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ term: searchTermm })
        });
    }

    const fetchTopQueries = async () => {
        const response = await fetch('http://localhost:3000/queries/top');
        const topQueries = await response.json();
        setTopQueries(topQueries);
    }

    const topQueriesButtonClick = () => {
        if (topQueries[0]) setTopQueries([]);
        else fetchTopQueries();
    }

    const handleChange = event => setSearchTerm(event.target.value)

    const keyHit = event => {
        if (event.key === 'Enter') submitSearch(searchTerm);
    }

    const submitSearch = () => {
        fetchTunes(searchTerm);
        setTopQueries([]);
    }

    const tuneItems = tunes.map(tune => <TuneItem key={tune.trackId} item={tune} searchTerm={searchTerm} />);

    const renderTopQueries = () => {
        if (topQueries.length === 0) return null;
        return (
            <ul ref={ref}>
                {topQueries.map(item =>
                    <li key={item._id}
                        onClick={() => {
                            setSearchTerm(item.term);
                            fetchTunes(item.term)
                            setTopQueries([]);
                        }}>{item.term}
                    </li>)}
            </ul>
        );
    }

    return (
        <div className="search-component">
            <div className="search-section">
                <div className="top-queries">
                    <input type="text" placeholder="search" onChange={handleChange} value={searchTerm} onKeyDown={keyHit} onFocus={() => setTopQueries([])} />
                    {renderTopQueries()}
                </div>
                <button className="button" onClick={submitSearch}>search</button>
                <button className="button" onClick={topQueriesButtonClick}>most searched</button>
            </div>
            <div className="results-section">
                {tuneItems}
            </div>
        </div>
    );
}

export default Search;