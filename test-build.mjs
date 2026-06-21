// Simple smoke test - check all imports work
import { PlayerProvider, usePlayer } from './src/context/PlayerContext.jsx';
import Nav from './src/components/Nav.jsx';
import Hero from './src/components/Hero.jsx';
import Discography from './src/components/Discography.jsx';
import AlbumCard from './src/components/AlbumCard.jsx';
import Player from './src/components/Player.jsx';
import Contact from './src/components/Contact.jsx';
import Footer from './src/components/Footer.jsx';
import { artist, albums, contact } from './src/data.js';

console.log('✓ All imports successful');
console.log('✓ Artist:', artist.name);
console.log('✓ Albums:', albums.length);
console.log('✓ Components:', [Nav, Hero, Discography, AlbumCard, Player, Contact, Footer].length);
