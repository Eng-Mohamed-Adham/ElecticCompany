import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';

function Main({title}) {

const posts = [
  `# Our Vision


  _April 1, 2020 
  
  *Our vision* is to revolutionize the world of electronics by offering innovative, **maintainable, and eco-friendly solutions that reduce electronic waste and save resources**. We envision a future where technology enriches lives while preserving the planet for generations to come.
  
 
  
  ## What Sets Us Apart

  
  ### Sustainability
  
  Sustainability is at the core of everything we do. We are committed to minimizing the environmental impact of electronics through thoughtful design, responsible sourcing, and efficient production processes.`,
  `
  # Innovation

  _March 23, 2020 
  
  We constantly push the boundaries of innovation to create products that are not only cutting-edge but also easy to maintain. Our team of skilled engineers and designers work tirelessly to ensure our electronics are user-friendly and serviceable.`,

  `
  # Customer-Centric Approach

  _March 23, 2020 
  
  Our customers are our partners. We listen to their needs and feedback, and we tailor our solutions to meet and exceed their expectations. Our dedicated customer support team is always ready to assist.

  ##A Greener Tomorrow

We are on a mission to reduce electronic waste. By choosing **Golden Tech Associates**, you are making a conscious choice to contribute to a more sustainable future.`,
]

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
        <Markdown className="markdown" key={post.substring(0, 40)}>
          {post}
        </Markdown>
      ))}
    </Grid>
  );
}



export default Main;
