import { useState } from 'react'

export default function useForm(initialData) {
  const [formData, setFormData] = useState(initialData ?? {})

  return { handleInputChange, formData }

  function handleInputChange(event) {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    setFormData({ ...formData, [fieldName]: fieldValue })
  }
}
