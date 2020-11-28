import { useState } from 'react'

export default function useForm(plant) {
  const [formData, setFormData] = useState(plant ?? '')

  return { handleInputChange, formData, setFormData }

  function handleInputChange(e) {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    setFormData({ ...formData, [fieldName]: fieldValue })
  }
}
