'use client'
import Icon from './Icon'

export default function QuantityStepper({ value, onChange, small }) {
  return (
    <div className={`stepper ${small ? 'sm' : ''}`}>
      <button onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease"><Icon name="minus" size={small ? 13 : 15} /></button>
      <span>{value}</span>
      <button onClick={() => onChange(value + 1)} aria-label="Increase"><Icon name="plus" size={small ? 13 : 15} /></button>
    </div>
  )
}
