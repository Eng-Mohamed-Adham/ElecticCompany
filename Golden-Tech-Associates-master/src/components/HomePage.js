import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';

import mainFeaturedPoastImg from './imgs/cro4.jpg';
import FeaturedPostImg1 from './imgs/cro2.jpg';
import FeaturedPostImg2 from './imgs/cro4.avif';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0D47A1', // deep blue
    },
    secondary: {
      main: '#FF6F00', // orange
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#222222',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.8rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.05rem',
    },
    body2: {
      fontSize: '0.95rem',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '2rem',
          paddingBottom: '2rem',
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

const sections = [
  { title: 'About Us', url: '#about' },
  { title: 'Services', url: '#services' },
  { title: 'Quality', url: '#quality' },
  { title: 'Our Team', url: '#teams' },
  { title: 'Our Vision', url: '#our-vision' },
  { title: 'Innovation', url: '#innovation' },
  { title: 'Contact Us', url: '#contact' },
];

const mainFeaturedPost = {
  title: 'About us',
  description:
    "At Golden Tech Associates, we are passionate about harnessing the power of technology to create sustainable solutions that stand the test of time...",
  image: `${mainFeaturedPoastImg}`,
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Maintenance of electronic devices',
    date: 'Nov 12 1997',
    description:
      'At Golden Tech Associates, we understand that electronic devices are an integral part of modern life...',
    image: `${FeaturedPostImg1}`,
    imageLabel: 'Image Text',
  },
  {
    title: 'Our Products',
    date: 'Sep 22 2007',
    description:
      'At Golden Tech Associates, we take pride in offering a diverse range of cutting-edge electronic products...',
    image: `${FeaturedPostImg2}`,
    imageLabel: 'Image Text',
  },
];

const sidebar = {
  title: 'Quality',
  description:
    'We prioritize quality above all else. Our products are built to last...',
  archives: [
    { title: 'Office equipment maintenance team', url: '#' },
    { title: 'Tablet maintenance team', url: '#' },
    { title: 'Mobile device maintenance team', url: '#' },
    { title: 'Smart devices maintenance team', url: '#' },
    { title: 'Creativity and development team', url: '#' },
    { title: 'A team of gaming hardware specialists', url: '#' },
    { title: 'Programming and development team', url: '#' },
    { title: 'Apple phone specialists team', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Golden Tech Associates" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4} id="services">
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Golden Tech Associates" />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Golden Tech Associates"
        description="Golden Tech Associates is the Best Choice 💙"
      />
    </ThemeProvider>
  );
}
