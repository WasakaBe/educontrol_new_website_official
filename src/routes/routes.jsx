import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Admin, Alumn, Publico } from '../pages';
import { Footer } from '../sections/Public';
import { Inscriptionformulario } from '../forms';
import {AuthContextProvider} from '../Auto/Auth' 
export default function AppRoutes(){
return(
<div>
    <AuthContextProvider>
       <Router>
           <Routes>
                  <Route exact path="/" element={<Publico />} /> 
                  <Route path="/Administration/:userName?" element={<Admin />} />
                  <Route path="/Alumn/:userName?" element={<Alumn />} /> 
                  <Route path="/Formulario/Inscription" element={<Inscriptionformulario/>} /> 
           </Routes>
       </Router>
       <Footer/>
    </AuthContextProvider>
</div>
)
}