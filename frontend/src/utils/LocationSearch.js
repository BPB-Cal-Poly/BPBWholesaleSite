import { Input } from "antd";
import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";


export class LocationSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.address
        };
    }

  handleAddressChange = (address) => {
    this.setState({ address });
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.address !== this.props.address) {
      this.setState({ address: nextProps.address });
    }
  }

  render(){
    const { address } = this.state;

    return (
      <PlacesAutocomplete onChange={this.handleAddressChange} onSelect={this.props.onAddressSelect} value={address}>
        {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
              style={{ width: 200 }}
            />
            <div className="autocomplete-dropdown-container">
              {loading ? <div>Loading...</div> : null}
              {suggestions.map((suggestion) => {
                const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer", padding: 25 }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };

                const spread = {
                  ...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })
                };

                return (
                  <div {...spread}>
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}