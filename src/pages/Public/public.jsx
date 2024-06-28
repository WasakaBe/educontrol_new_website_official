import Breadcrumb from "../../constants/Breadcrumbs/Breadcrumbs";
import { About, Activities, Carreras, Contact, Cultural, Header, InforAreas, Inscription, Navbar, Welcome } from "../../sections/Public";

export default function Public() {
  return (
    <div>
     <Navbar/>
     <div className='flex container mx-auto justify-center'>
        <Breadcrumb path={'Inicio'} />
      </div>
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
