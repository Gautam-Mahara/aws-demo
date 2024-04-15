import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { useNavigate } from 'react-router-dom';
import './table.css';

const CityTable: React.FC = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async (Search:String) => {
      try {
        if(searchQuery.trim() !== '') {
          Search = searchQuery;
        }
        const response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=name%20LIKE%20%27${Search}%25%27&limit=100`)
        if (response.data && response.data.results) {
          setCities(response.data.results);
          setLoading(false);
        } else {
          setError('No data available');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchCities(searchQuery);
    } else {
      fetchCities('a');
    }
  }, [searchQuery]);

  const handleSearchChange = (event: React.FormEvent<any>, { newValue }: Autosuggest.ChangeEvent) => {
    setSearchQuery((event.target as HTMLInputElement).value);
  };

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : cities.filter(city =>
      city.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event: React.FormEvent<any>, { suggestion }: { suggestion: any }) => {
    setSearchQuery(suggestion.name);
  };

  const inputProps: Autosuggest.InputProps<any> = {
    placeholder: 'Search cities...',
    value: searchQuery,
    onChange: handleSearchChange
  };

  const Work = (lon: number, lat: number) => () => {
    navigate(`/rooms/new?lon=${lon}&lat=${lat}`);
  }

  return (
    <div className='container'>
      <h1>Cities Table</h1>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion: any) => suggestion.name}
        renderSuggestion={(suggestion: any) => <div>{suggestion.name}</div>}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
      />

      <table className='table'>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.geoname_id} className='table-row' onClick={Work(city.coordinates.lon, city.coordinates.lat)}>
              <td>{city.name}</td>
              <td>{city.cou_name_en}</td>
              <td>{city.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;