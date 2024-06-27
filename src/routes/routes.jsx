import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Admin, Publico } from '../pages';
import { Footer } from '../sections/Public';
import { Inscriptionformulario } from '../forms';

export default function AppRoutes(){
return(
<div>
    <>
       <Router>
           <Routes>
                  <Route exact path="/" element={<Publico />} /> 
                  <Route path="/Administration/:userName?" element={<Admin />} /> 
                  <Route path="/Formulario/Inscription" element={<Inscriptionformulario/>} /> 
           </Routes>
       </Router>
       <Footer/>
    </>
</div>
)
}