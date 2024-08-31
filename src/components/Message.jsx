import styles from "./Message.module.css"
import PropTypes from 'prop-types'

Message.propTypes = {
  message: PropTypes.string.isRequired, // message is expected to be a string and required
}

function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
