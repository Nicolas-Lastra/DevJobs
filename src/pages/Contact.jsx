import ContactFormSection from "../components/ContactFormSection"

export default function Contact() {
  
  const handleSearch = (fields) => {
    console.log('Formulario enviado correctamente')
    console.log(fields)
  }

  return (

    <main>
      <ContactFormSection onSubmit={handleSearch}/>
    </main>
  )
}
