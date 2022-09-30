import React from 'react'
import PropTypes from 'prop-types'
import Notification from '../components/Notification'

const Header = ({ title, notification }) => (
  <div>
    <h2>{title}</h2>
    <Notification notification={notification} />
  </div>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
  notification: PropTypes.object.isRequired,
}
export default Header