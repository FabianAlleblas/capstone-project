import { useState } from 'react'

export default function useForm(initialInput) {
  const [formData, setFormData] = useState(initialInput)

  return { handleInputChange, formData }

  function handleInputChange(e) {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    setFormData({ ...formData, [fieldName]: fieldValue })
  }
}
