import './Footer.css'
export default function Footer() {
  return (
    <div className='container-footer'>
        <div className='sect-footer'>
            <div className='footer-info'>
              <h1>Datos de la empresa</h1>
              <ul>
              <li>
                  <p>Centro Bachillerato Tecnologico Agropecuario:</p>
                  <span>"Hermanos Flores Magon"</span>
              </li>
              <li>
                  <p>Direccion:</p>
                  <span>Adolfo López Mateos SN, Aviación Civil, 43000 Huejutla, Hgo.</span>
              </li>
              <li>
                  <p>Telefono:</p>
                  <span>789 896 0065</span>
              </li>
              <li>
                  <p>Celular:</p>
                  <span>+52 7713591287</span>
              </li>
   
              </ul>
            
            </div>
            <div className='footer-enlaces'>
            <h1>Terminos</h1>
              <ul>
                <li>
                  <a href='/'>Terminos y Condiciones</a>
                </li>
                <li>
                  <a href='/'>Aviso de privacidad</a>
                </li>
                <li>
                  <a href='/'>Aviso de clientes</a>
                </li>
              </ul>
            </div>
            <div className='footer-icons'>
            <h1>Redes de la empresa</h1>
              <ul>
                <li><a href='/' className='icon1'><ion-icon name="logo-facebook"></ion-icon></a></li>
                <li><a href='/' className='icon2'><ion-icon name="logo-twitter"></ion-icon></a></li>
                <li><a href='/' className='icon3'><ion-icon name="logo-youtube"></ion-icon></a></li>
                <li><a href='/' className='icon4'><ion-icon name="logo-instagram"></ion-icon></a></li>
              </ul>
            </div>
        </div>
        
        <div className='sect-footer-end'>
          <p>Todos los derechos reservados | © 2023 Cbta 5</p>
        </div>
    </div>
  )
}
