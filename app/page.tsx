import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CoupleIntro from "./components/CoupleIntro";
import OurStory from "./components/OurStory";
import Gallery from "./components/Gallery";
import CountdownSection from "./components/Countdown";
import EventDetails from "./components/EventDetails";
import MapSection from "./components/MapSection";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";
import Petals from "./components/Petals";
import MusicPlayer from "./components/MusicPlayer";
import AdminAccess from "./components/AdminAccess";

export default function Home() {
  return (
    <>
      <Petals />
      <MusicPlayer />
      <AdminAccess />
      <Nav />
      <Hero />
      <CoupleIntro />
      <OurStory />
      <Gallery />
      <CountdownSection />
      <EventDetails />
      <MapSection />
      <RSVP />
      <Footer />
    </>
  );
}
