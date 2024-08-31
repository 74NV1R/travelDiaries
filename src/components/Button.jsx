import styles from './Button.module.css'
import PropTypes from 'prop-types'

Button.propTypes = {
    children: PropTypes.node.isRequired,   // 'children' can be anything that can be rendered (string, element, etc.)
    onClick: PropTypes.func.isRequired,    // 'onClick' should be a function
    type: PropTypes.string                 // 'type' is a string, usually 'button', 'submit', or 'reset'
}

export default function Button({ children, onClick, type }) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    )
}
