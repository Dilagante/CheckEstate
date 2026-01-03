import { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/SearchForm.css'


function SearchForm({ onSearch }) {
  // Form state
  const [propertyType, setPropertyType] = useState(null)
  const [minPrice, setMinPrice] = useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const [minBedrooms, setMinBedrooms] = useState(null)
  const [maxBedrooms, setMaxBedrooms] = useState(null)
  const [dateFrom, setDateFrom] = useState(null)
  const [dateTo, setDateTo] = useState(null)
  const [postcode, setPostcode] = useState(null)

  // Property Type options
  const propertyTypeOptions = [
    { value:  'any', label: '🏘️ Any Type' },
    { value: 'house', label: '🏠 House' },
    { value: 'flat', label: '🏢 Flat' }
  ]

  // Price options
  const priceOptions = [
    { value: 0, label: 'No minimum' },
    { value: 100000, label: '£100,000' },
    { value:  150000, label: '£150,000' },
    { value:  200000, label: '£200,000' },
    { value: 250000, label:  '£250,000' },
    { value: 300000, label: '£300,000' },
    { value: 400000, label: '£400,000' },
    { value:  500000, label: '£500,000' },
    { value: 750000, label: '£750,000' },
    { value:  1000000, label: '£1,000,000' },
    { value: 1500000, label: '£1,500,000' },
    { value: 2000000, label: '£2,000,000' },
    { value: 3000000, label: '£3,000,000+' }
  ]

  const maxPriceOptions = [
    { value:  Infinity, label: 'No maximum' },
    ... priceOptions.slice(1)
  ]

  // Bedroom options
  const bedroomOptions = [
    { value: 0, label: 'Any' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value:  5, label: '5+' }
  ]

  // Postcode options
  const postcodeOptions = [
    { value: 'BR1', label: 'BR1 - Bromley' },
    { value:  'BR2', label: 'BR2 - Bromley' },
    { value:  'BR5', label: 'BR5 - Orpington' },
    { value: 'BR6', label:  'BR6 - Orpington' },
    { value: 'SE21', label: 'SE21 - Dulwich' },
    { value:  'E14', label: 'E14 - Canary Wharf' },
    { value: 'SW3', label: 'SW3 - Chelsea' },
    { value: 'NW1', label: 'NW1 - Camden' }
  ]

  // Custom styles for react-select
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '44px',
      borderColor: state.isFocused ?  '#2563eb' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none',
      '&:hover': {
        borderColor: '#2563eb'
      }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#2563eb' 
        : state.isFocused 
        ? 'rgba(37, 99, 235, 0.1)' 
        : 'white',
      color: state.isSelected ? 'white' : '#374151',
      cursor: 'pointer'
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9ca3af'
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const searchCriteria = {
      propertyType:  propertyType?. value || 'any',
      minPrice: minPrice?. value || 0,
      maxPrice: maxPrice?.value || Infinity,
      minBedrooms: minBedrooms?. value || 0,
      maxBedrooms: maxBedrooms?.value || Infinity,
      dateFrom: dateFrom,
      dateTo: dateTo,
      postcode: postcode?. value || null
    }

    onSearch(searchCriteria)
  }

  // Reset form
  const handleReset = () => {
    setPropertyType(null)
    setMinPrice(null)
    setMaxPrice(null)
    setMinBedrooms(null)
    setMaxBedrooms(null)
    setDateFrom(null)
    setDateTo(null)
    setPostcode(null)
    
    // Reset to show all properties
    onSearch({
      propertyType:  'any',
      minPrice: 0,
      maxPrice: Infinity,
      minBedrooms: 0,
      maxBedrooms: Infinity,
      dateFrom: null,
      dateTo: null,
      postcode: null
    })
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-form__header">
        <h2 className="search-form__title">
          🔍 Search Properties
        </h2>
        <p className="search-form__subtitle">
          Find your perfect home with our advanced search filters
        </p>
      </div>

      <div className="search-form__content">
        <Row className="g-3">
          {/* Property Type */}
          <Col md={6} lg={4}>
            <div className="form-group">
              <label htmlFor="property-type" className="form-label">
                Property Type
              </label>
              <Select
                inputId="property-type"
                options={propertyTypeOptions}
                value={propertyType}
                onChange={setPropertyType}
                placeholder="Select type..."
                isClearable
                styles={customSelectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </Col>

          {/* Min Price */}
          <Col md={6} lg={4}>
            <div className="form-group">
              <label htmlFor="min-price" className="form-label">
                Min Price
              </label>
              <Select
                inputId="min-price"
                options={priceOptions}
                value={minPrice}
                onChange={setMinPrice}
                placeholder="No minimum"
                isClearable
                styles={customSelectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </Col>

          {/* Max Price */}
          <Col md={6} lg={4}>
            <div className="form-group">
              <label htmlFor="max-price" className="form-label">
                Max Price
              </label>
              <Select
                inputId="max-price"
                options={maxPriceOptions}
                value={maxPrice}
                onChange={setMaxPrice}
                placeholder="No maximum"
                isClearable
                styles={customSelectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </Col>

          {/* Min Bedrooms */}
          <Col md={6} lg={4}>
            <div className="form-group">
              <label htmlFor="min-bedrooms" className="form-label">
                Min Bedrooms
              </label>
              <Select
                inputId="min-bedrooms"
                options={bedroomOptions}
                value={minBedrooms}
                onChange={setMinBedrooms}
                placeholder="Any"
                isClearable
                styles={customSelectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </Col>

          {/* Max Bedrooms */}
          <Col md={6} lg={4}>
            <div className="form-group">
              <label htmlFor="max-bedrooms" className="form-label">
                Max Bedrooms
              </label>
              <Select
                inputId="max-bedrooms"
                options={bedroomOptions}
                value={maxBedrooms}
                onChange={setMaxBedrooms}
                placeholder="Any"
                isClearable
                styles={customSelectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </Col>

          {/* Postcode */}
          <Col md={6} lg={4}>
            <div className="form-group">
              <label htmlFor="postcode" className="form-label">
                Postcode Area
              </label>
              <Select
                inputId="postcode"
                options={postcodeOptions}
                value={postcode}
                onChange={setPostcode}
                placeholder="e.g.  BR1, SW3..."
                isClearable
                styles={customSelectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </Col>

          {/* Date From */}
          <Col md={6} lg={4}>
            <div className="form-group">
              <label htmlFor="date-from" className="form-label">
                Added From
              </label>
              <DatePicker
                id="date-from"
                selected={dateFrom}
                onChange={setDateFrom}
                selectsStart
                startDate={dateFrom}
                endDate={dateTo}
                placeholderText="Select start date"
                dateFormat="dd/MM/yyyy"
                isClearable
                className="form-control datepicker-input"
                maxDate={new Date()}
              />
            </div>
          </Col>

          {/* Date To */}
          <Col md={6} lg={4}>
            <div className="form-group">
              <label htmlFor="date-to" className="form-label">
                Added To
              </label>
              <DatePicker
                id="date-to"
                selected={dateTo}
                onChange={setDateTo}
                selectsEnd
                startDate={dateFrom}
                endDate={dateTo}
                minDate={dateFrom}
                placeholderText="Select end date"
                dateFormat="dd/MM/yyyy"
                isClearable
                className="form-control datepicker-input"
                maxDate={new Date()}
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* Action Buttons */}
      <div className="search-form__actions">
        <Button 
          type="submit" 
          variant="primary" 
          size="lg"
          className="search-btn"
        >
          🔍 Search Properties
        </Button>
        <Button 
          type="button" 
          variant="outline-secondary" 
          size="lg"
          onClick={handleReset}
          className="reset-btn"
        >
          ↻ Reset Filters
        </Button>
      </div>
    </form>
  )
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchForm