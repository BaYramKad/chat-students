import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Context } from '..'
import { chatLogic, CHAT_ROUTE, loginLogic, LOGIN_ROUTE, quizLogic } from './routes'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './Loader';

import styled from 'styled-components'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query } from 'firebase/firestore';

const ComponentStyleLogin = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 55px);
    width: 100%;
`

export default function AppRouter() {
    const {auth, db} = useContext(Context)
    const [user, loading] = useAuthState(auth)
    

    if(loading) {
        return <Loader />
    }


  return (user ? 
            (<Switch>
                    {
                        chatLogic.map(({path, component}) => {
                            return <Route key={path} path={path} component={component} exact={true} />
                        })
                    }
                    <Redirect to={CHAT_ROUTE} />
                        
                </Switch>)
            :
            (<Switch>
                    <ComponentStyleLogin>
                        {
                                loginLogic.map(({path, component}) => {
                                    return <Route key={path} path={path} component={component} exact={true} />
                                })
                        }
                    <Redirect to={LOGIN_ROUTE} />
                </ComponentStyleLogin>
            </Switch>)
  )
}
