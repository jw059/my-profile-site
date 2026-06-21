import { PlayerProvider } from "./context/PlayerContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Discography from "./components/Discography";
import Player from "./components/Player";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { artist, albums, contact } from "./data";

function App() {
  return (
    <PlayerProvider>
      <Nav />
      <Hero artist={artist} />
      <Discography albums={albums} />
      <Contact contact={contact} />
      <Player />
      <Footer artist={artist} />
    </PlayerProvider>
  );
}

export default App;
