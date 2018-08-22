import React from 'react'
import PropTypes from 'prop-types'
import { Field, Fields, reduxForm } from 'redux-form'
import Geocoder from '../../search/GeocoderSearchContainer'
import InputField from '../../common/InputField'
import TextAreaField from '../../common/TextAreaField'
import CheckboxGroup from '../../common/CheckboxGroup'
import UserInfo from './UserInfo'
import i18n from '../../i18n'
import { validator } from '../../common/formUtils'
import { mapInitiativeToApiParams } from '../editorActions'

const InitiativeForm = ({ handleSubmit, user, error, goals }) => (
  <form className="form-inputs">
    <strong>{error}</strong>
    <fieldset>
      <p>
        Hier kannst Du eine Initiative erfassen, die noch im Aufbau ist, um
        Partner, Mitglieder, Land oder einen Betrieb zu finden.
      </p>

      <Field
        name="goals"
        groupLabel="Art der Initiative"
        component={CheckboxGroup}
        options={goals.map(({ id, name }) => ({
          id,
          name,
          label: i18n.t(`forms.labels.goals.${name}`)
        }))}
      />

      <Field
        name="description"
        label="Beschreibung der Initiative"
        component={TextAreaField}
        maxLength="1000"
        placeholder="z.B. Informationen zum Hintergrund oder zu gemeinsamen Aktivitäten."
        rows="8"
      />
    </fieldset>
    <fieldset>
      <legend>Name</legend>

      <Field
        name="name"
        label="Bezeichnung der Initiative"
        component={InputField}
        type="text"
        maxLength="100"
        required
      />

      <Field
        name="url"
        label="Website"
        component={InputField}
        placeholder="http://beispiel.de"
        type="url"
        maxLength="100"
      />
    </fieldset>

    <fieldset className="geocoder">
      <legend>geplanter Standort der Initiative</legend>

      <Fields
        names={['city', 'address', 'latitude', 'longitude']}
        name="geocoder"
        label="Adresse und Ort"
        markerIcon="Initiative"
        component={Geocoder}
        required
      />
    </fieldset>

    <UserInfo user={user} />

    <div className="entries-editor-explanation">
      <p>Mit einem * gekennzeichneten Felder müssen ausgefüllt werden.</p>
      <input
        type="button"
        className="button submit"
        value="Speichern"
        onClick={handleSubmit}
      />
    </div>
  </form>
)

InitiativeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  goals: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  error: PropTypes.string
}

InitiativeForm.defaultProps = {
  error: ''
}

export default reduxForm({
  form: 'initiative',
  validate: validator('initiative')
})(InitiativeForm)
