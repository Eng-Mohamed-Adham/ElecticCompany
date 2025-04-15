import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMicrochip} from '@fortawesome/free-solid-svg-icons'

function Header(props) {
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <FontAwesomeIcon icon={faMicrochip} siza="2xl" style={{color: "#1e72bd",}} />
        <Typography
          component="h2"
          variant="h5"
          color="#1e72bd"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <Link href="/" sx={{textDecoration:'none'}}> 
            {title}
          </Link>
        </Typography>
     
        <Button component="button" variant="outlined" size="small">
          <Link href="login" sx={{textDecoration:'none'}}>
            Sign In
          </Link>
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            id={section.url}
            color="#1e72bd"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0,textDecoration:'none',fontWeight:'bold' }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;