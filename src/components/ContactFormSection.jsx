import { useEffect, useState, useId } from "react"

const useContactForm = ({onSubmit}) => {

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const isFormValid =
    values.name &&
    values.email &&
    values.phone &&
    values.message &&
    !errors.name &&
    !errors.email &&
    !errors.phone &&
    !errors.message

  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(false)
  }

  const validateName = (name) => {
    const nameRegex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{2,50}$/
    if (!nameRegex.test(name)) return "Please enter a valid name."
    return ""
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Please enter a valid email address."
    return "";
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^9[0-9]{8}$/
    if (!phoneRegex.test(phone)) return "Please enter a valid phone number"
    return ""
  }

  const validateMessage = (message) => {
    if (message.length < 20) return "Message must have at least 20 characters"
    return ""
  }

  const validateForm = (values) => {
    const newErrors = {
      name: validateName(values.name),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      message: validateMessage(values.message),
    }

    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key]
    })

    return newErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "name"
          ? validateName(value)
          : name === "email"
          ? validateEmail(value)
          : name === "phone"
          ? validatePhone(value)
          : name === "message"
          ? validateMessage(value)
          : prev[name],
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newErrors = validateForm(values);
    setErrors((prev) => ({ ...prev, ...newErrors }))

    if (Object.keys(newErrors).length > 0) return

    onSubmit(values)
    setShowModal(true)
  }

  useEffect(() => {
    const clearFormFields = () => {
      setValues({
        name: "",
        email: "",
        phone: "",
        message: "",
      })

      setErrors({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    }

    window.addEventListener('submit', clearFormFields)

    return () => {window.removeEventListener('submit', clearFormFields)}
  }, [])

  return {
    values,
    errors,
    isFormValid,
    showModal,
    handleSubmit,
    handleChange,
    handleModal
  }
}

export default function ContactFormSection({ onSubmit }) {
  const idName = useId()
  const idEmail = useId()
  const idPhone = useId()
  const idMessage = useId()

  const {
    values,
    errors,
    isFormValid,
    showModal,
    handleSubmit,
    handleChange,
    handleModal
  } = useContactForm({ onSubmit })

  return (
    <>
      <h1>📧 Contacto</h1>
      <p>¿Tienes alguna pregunta? Contáctanos.</p>

      {showModal === false && (
        <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            name="name"
            id={idName}
            type="text"
            required
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <label>Email Address</label>
          <input
            name="email"
            id={idEmail}
            type="email"
            required
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label>Phone number (+56)</label>
          <input
            name="phone"
            id={idPhone}
            type="tel"
            required
            value={values.phone}
            onChange={handleChange}
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        </div>
        <div>
          <label>Message</label>
          <textarea
            name="message"
            id={idMessage}
            type="text"
            required
            value={values.message}
            onChange={handleChange}
          />
          {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        </div>
        <div>
          <button disabled={!isFormValid} type="submit">
            Enviar
          </button>
        </div>
      </form>
      )}

      {showModal === true && (
          <div>
            <h2>Formulario enviado correctamente</h2>
            <button onClick={ handleModal }>Volver</button>
          </div>
      )}
    </>
  );
}
