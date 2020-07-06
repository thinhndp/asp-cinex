import React from 'react';
import { Container } from 'react-bootstrap';

import classes from './Section.module.scss';


function Home(props) {
  // const [toggler, setToggler] = useState(false);
  return (
    <div className={classes['section']}>
      <Container style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <div className={classes['section-title-container']}>
          <div className={classes['section-title-text']}>
            { props.title }
          </div>
          <div className={classes['deobietdatsao']}></div>
        </div>
        { props.children }
      </Container>
    </div>
  )
}

export default Home;