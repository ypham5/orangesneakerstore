import React from 'react';
import { Brand } from 'components/branding/'
import styles from './styles.module.scss'

function PageTitle ({children, tagline,...props})  {
  return (
        <div className={styles.pagetitle}>
          <Brand/>
          <h1>Sneakers <span>Marketplace</span></h1>
          <p>{tagline || "uiTagline"}</p>
        </div>
  )
}

export default PageTitle