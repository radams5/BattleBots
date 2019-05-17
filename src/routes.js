import React from 'react'
import Welcome from './Components/Welcome/Welcome'
import Create from './Components/Create/Create'
import Collection from './Components/Collection/Collection'
import {Switch, Route} from 'react-router-dom'


export default(
  <Switch>
    <Route path='/Create' component={Create}/>
    <Route path='/Collection' component={Collection}/>    
    <Route excact path='/' component={Welcome}/>
  </Switch>
)