import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import PropTypes from 'prop-types'
import 'react-tabs/style/react-tabs.css'
import '../styles/PropertyTabs.css'


function PropertyTabs({ property }) {
    
  // Generate Google Maps embed URL
  const getMapsUrl = (location) => {
    const encodedLocation = encodeURIComponent(location)
    return `https://maps.google.com/maps?q=${encodedLocation}&output=embed`
  }

  return (
    <div className="property-tabs-container">
      <Tabs>
        <TabList>
          <Tab>
            <span className="tab-label">Description</span>
          </Tab>
          <Tab>
            <span className="tab-label">Floor Plan</span>
          </Tab>
          <Tab>
            <span className="tab-label">Location</span>
          </Tab>
        </TabList>

        {/* Description Tab */}
        <TabPanel>
          <div className="tab-content">
            <h3>Property Description</h3>
            <div className="description-text">
              <p>{property.description}</p>
            </div>

            <h4>Key Features</h4>
            <ul className="features-list">
              <li>🛏️ {property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' :  ''}</li>
              <li>🏠 {property.type}</li>
              <li>📋 {property.tenure}</li>
              <li>📅 {property.added.month} {property.added.year}</li>
            </ul>
          </div>
        </TabPanel>

        {/* Floor Plan Tab */}
        <TabPanel>
          <div className="tab-content">
            <h3>Floor Plan</h3>
            {property.floorPlan ?  (
              <div className="floor-plan-container">
                <img 
                  src={property. floorPlan} 
                  alt={`Floor plan for ${property.location}`}
                  className="floor-plan-image"
                />
                <p className="floor-plan-note">Click image to enlarge</p>
              </div>
            ) : (
              <div className="no-floor-plan">
                <p>Floor plan not available for this property</p>
              </div>
            )}
          </div>
        </TabPanel>

        {/* Location Tab */}
        <TabPanel>
          <div className="tab-content">
            <h3>Location</h3>
            <p className="location-address">
              <span className="icon">📍</span>
              {property.location}
            </p>

            <div className="map-container">
              <iframe
                src={getMapsUrl(property.location)}
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing ${property.location}`}
              />
            </div>

            <div className="location-info">
              <h4>About the Area</h4>
              <p>
                This property is located in {property.location. split(',').pop().trim()}, 
                offering excellent transport links and local amenities. 
              </p>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}

PropertyTabs.propTypes = {
  property: PropTypes.shape({
    description: PropTypes.string. isRequired,
    location: PropTypes.string.isRequired,
    floorPlan:  PropTypes.string,
    bedrooms: PropTypes.number. isRequired,
    type: PropTypes.string.isRequired,
    tenure: PropTypes.string. isRequired,
    added: PropTypes.shape({
      month: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
}

export default PropertyTabs