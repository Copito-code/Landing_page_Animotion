
import Header from '../components/Header'
import Nosotros from '../components/Nosotros'
import Showcase from '../components/Showcase'
import Donations from '../components/Donations'
import Footer from '../components/Footer'
import PollSection from '../components/PollSection'


// Estilos
import '../css/general.css'




function Home() {

    return(
        <>
            <title>Landing Page</title>
            <Header></Header>
            <Nosotros></Nosotros>
            {/* <Showcase></Showcase> */}
            <PollSection></PollSection>
            {/* <Donations></Donations> */}
            <Footer></Footer>
        </>
    )
    
}

export default Home