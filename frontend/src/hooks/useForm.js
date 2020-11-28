import { useState } from 'react'

export default function useForm(initialData) {
  const [formData, setFormData] = useState(initialData ?? {})

  return { handleInputChange, formData, setFormData }

  function handleInputChange(e) {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    setFormData({ ...formData, [fieldName]: fieldValue })
  }
}
