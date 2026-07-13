import { useState } from 'react'
import toggleIcon from '../../../assets/ic_toggle.png'
import './Dropdown.css'

function Dropdown({
  options = [],
  value,
  onChange,
  className = '',
  placeholder = '선택',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption =
    options.find((option) => option.value === value) ?? options[0]
  const isDisabled = options.length === 0

  return (
    <div className={`dropdown ${className}`.trim()}>
      <button
        className="dropdown-button"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={isDisabled}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <span>{selectedOption?.label ?? placeholder}</span>
        <span className="dropdown-icon-box">
          <img className="dropdown-icon" src={toggleIcon} alt="" />
        </span>
      </button>

      {isOpen && !isDisabled && (
        <ul className="dropdown-menu" role="listbox">
          {options.map((option) => (
            <li key={option.value}>
              <button
                className="dropdown-menu-button"
                type="button"
                role="option"
                aria-selected={option.value === selectedOption?.value}
                onClick={() => {
                  onChange?.(option.value, option)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
