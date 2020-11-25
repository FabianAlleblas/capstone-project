import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function useForm(initialInput) {
  const history = useHistory()
  const [formData, setFormData] = useState(initialInput)

  return { handleInputChange, handleCancel, formData }

  function handleInputChange(e) {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    setFormData({ ...formData, [fieldName]: fieldValue })
  }

  function handleCancel() {
    history.push('/')
  }
}
