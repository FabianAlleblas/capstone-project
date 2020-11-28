import { useState } from 'react'

export default function useForm() {
  const [formData, setFormData] = useState()

  return { handleInputChange, formData }

  function handleInputChange(e) {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    setFormData({ ...formData, [fieldName]: fieldValue })
  }
}
