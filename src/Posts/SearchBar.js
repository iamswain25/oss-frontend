import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "rc-slider";
import { Form, Checkbox, Button, Divider } from "semantic-ui-react";
import "rc-slider/assets/index.css";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const initialState = {
  keyword: "",
  locationFilter: {},
  speedRange: []
};
class SearchBar extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidUpdate(prev) {
    // console.log(this.props, prev)
    // console.log(this.props.originalPosts.length,prev.originalPosts.length)
    if (this.props.originalPosts.length !== prev.originalPosts.length) {
      this.resetStates();
      // this.setState({ locationFilter, speedRange });
    }
  }

  resetStates = e => {
    const getLocations = posts => {
      const location = {};
      posts.forEach(post => {
        if (location[post.location] === undefined) {
          location[post.location] = { enabled: true };
          location[post.location].count = 1;
        } else {
          location[post.location].count += 1;
        }
      });
      // console.log(location);
      return location;
    };
    const getSpeedRange = posts => {
      // console.log(posts.map(post => post.speed));
      const max = Math.max.apply(null, posts.map(post => post.speed));
      const min = Math.min.apply(null, posts.map(post => post.speed));
      // console.log(min);
      return [min, max];
    };
    const getPriceRange = posts => {
      // console.log(posts.map(post => post.speed));
      const max = Math.max.apply(null, posts.map(post => post.price));
      const min = Math.min.apply(null, posts.map(post => post.price));
      // console.log(min);
      return [min, max];
    };
    const locationFilter = getLocations(this.props.originalPosts);
    const speedRange = getSpeedRange(this.props.originalPosts);
    const priceRange = getPriceRange(this.props.originalPosts);
    // console.log({ ...initialState, locationFilter, speedRange });
    this.setState(
      { ...initialState, locationFilter, speedRange, priceRange },
      () => this.props.filterSearch(this.state)
    );
  };

  searchKeyword = e => {
    // console.log(e)
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, () =>
      this.props.filterSearch(this.state)
    );
  };

  speedRangeChange = range => {
    // console.log(range);
    this.setState({ speedRange: range }, () =>
      this.props.filterSearch(this.state)
    );
  };
  priceRangeChange = range => {
    // console.log(range);
    this.setState({ priceRange: range }, () =>
      this.props.filterSearch(this.state)
    );
  };

  locationChange = (e, { checked, name }) => {
    const locationFilter = this.state.locationFilter;
    // console.log(locationFilter, name);
    locationFilter[name].enabled = checked;
    this.setState({ locationFilter }, () =>
      this.props.filterSearch(this.state)
    );
  };

  render() {
    return Object.keys(this.props.originalPosts).length !== 0 ? (
      <Form className="thingy">
        <Form.Field>
          <label>Search Title</label>
          <input
            name="keyword"
            value={this.state.keyword}
            onChange={this.searchKeyword}
            placeholder="Put in Search Keyword"
          />
        </Form.Field>

        <Form.Field>
          <label>Internet Speed</label>
          <Range
            // min={this.state.speedRange[0]}
            // max={this.state.speedRange[1]}
            name="speedRange"
            allowCross={false}
            value={this.state.speedRange}
            // onChange={this.props.filterSearch}
            onChange={this.speedRangeChange}
            tipFormatter={value => `${value}mb/s`}
          />
        </Form.Field>

        <Form.Field>
          <label>Location</label>
          {Object.keys(this.state.locationFilter).map(key => (
            <Checkbox
              label={`${key} (${this.state.locationFilter[key].count})`}
              key={key}
              checked={this.state.locationFilter[key].enabled}
              // defaultChecked
              onChange={this.locationChange}
              name={key}
            />
          ))}
        </Form.Field>
        <Form.Field>
          <label>EOS</label>
          <Range
            name="priceRange"
            allowCross={false}
            value={this.state.priceRange}
            onChange={this.priceRangeChange}
            tipFormatter={value => `${value} eos`}
          />
        </Form.Field>
        <Divider />
        <Form.Field>
          <Button onClick={this.resetStates}>Reset All</Button>
        </Form.Field>
      </Form>
    ) : (
      ""
    );
  }
}
SearchBar.displayName = "SearchBar"; // Tell React Dev Tools the component name

// Assign Prop Types
SearchBar.propTypes = {
  filterSearch: PropTypes.func.isRequired
};

export default SearchBar;
