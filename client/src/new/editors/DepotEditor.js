import React from 'react'
import DepotForm from './DepotForm'

const DepotEditor = ({ onDepotSubmit, farms }) => (
  <div className="entry-view open" style={{ top: '0px', opacity: 1, visibility: 'visible', display: 'block' }}>
    <div className="container">
      <section className="wizard">
        <div className="forms">
          <h2 className="headline">Neues Depot eintragen</h2>
          <DepotForm onSubmit={onDepotSubmit} farms={farms} />
        </div>
        <div className="legend">
          <p>Bei den mit einem Stern * gekennzeichneten
            Formularfelder handelt es sich um Pflichtangaben.
          </p>
        </div>
      </section>
    </div>
  </div>
)

DepotEditor.propTypes = {
  onDepotSubmit: React.PropTypes.func.isRequired,
  farms: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
}

export default DepotEditor
