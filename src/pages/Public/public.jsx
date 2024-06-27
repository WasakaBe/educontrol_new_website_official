import { About, Activities, Carreras, Contact, Cultural, Header, InforAreas, Inscription, Navbar, Welcome } from "../../sections/Public";

export default function Public() {
  return (
    <div>
     <Navbar/>
     <Header/>
     <Welcome/>
     <Activities/>
     <Inscription/>
     <Cultural/>
     <About/>
     <Carreras/>
     <InforAreas/>
     <Contact/>
    </div>
  )
}
