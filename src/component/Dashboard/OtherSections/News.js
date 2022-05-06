import { AcUnit, Newspaper, Opacity, Refresh, ShoppingCart } from '@mui/icons-material'
import { Box } from '@mui/material'
import React from 'react'

function News() {
  return (

    <div className="newsContainer">
          <Box sx={{color:"#078707"}}>
    <div className="newsContainer__top">
      <h4 className='title mb-4'>
        <span>News</span>
        <Newspaper style={{marginLeft:'10px'}} />
      </h4>
      {/* <Refresh /> */}
    </div>
    </Box>
    <div className="newsContainer__item">
      <Opacity style={{color:'#86EB80'}} />
      <p>
        Large oil supply uncovered in London. 
      </p>
    </div>
    <div className="newsContainer__item">
      <AcUnit style={{color:'#86EB80'}} />
      <p>
        Boris Johnson announces huge surge in attempts to increase 
        use of renewable energy sources. 
      </p>
    </div>
    <div className="newsContainer__item">
      <ShoppingCart style={{color:'#86EB80'}} />
      <p>
        Study reveals Global coal supply at an all time low and expected
        to run out by 2040. 
      </p>
    </div>
  </div>

  )
}

export default News