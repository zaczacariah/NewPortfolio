import './AppContainer.scss';
import { PropTypes } from 'prop-types';


const AppContainer = () => {
  return (
    <>
      <div className='app-container'>
      <div className='scatter' />
      </div>
      <div className='siteFrame topFrame' />
      <div className='siteFrame rightFrame' />
      <div className='siteFrame bottomFrame' />
      <div className='siteFrame leftFrame' />

    </>
  )
}

AppContainer.propTypes = {
  children: PropTypes.node
}


export default AppContainer