
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'



export const Footer = () => {
  return (
    <footer>
      <div className="copiryghtIcon">
        <FontAwesomeIcon className='socialIcon'  icon={faCopyright} />
        <p> 2023    PetPlace | Digital Booking </p>
      </div>
      <div className="socialMedia">
        <Link className="socialLink" to="https://www.facebook.com/PetPlaceDB"> <FontAwesomeIcon className='socialIcon' icon={faFacebook} size="xl" />  </Link>
        <Link className="socialLink" to="https://twitter.com/PetPlacecasa"> <FontAwesomeIcon className='socialIcon' icon={faTwitter} size="xl" /> </Link>
        <Link className="socialLink" to="https://www.instagram.com/petplacecomoencasa/"> <FontAwesomeIcon className='socialIcon' icon={faInstagram} size="xl" /> </Link>
      </div>
    </footer>
  )
}
