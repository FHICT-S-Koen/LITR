import { createContext, FC, Dispatch, useReducer, ReactNode } from 'react'
import { Map } from 'leaflet'
import { DetectionProps } from '../components/Detection'

const initialState = {
  map: null as Map | null,
  detections: null as DetectionProps[] | null,
  picture: null as string | null
}

type Action =
  | { type: 'setMap', payload: Map }
  | { type: 'setDetections', payload: DetectionProps[] }
  | { type: 'setPicture', payload: string }

const reducer = (state = initialState, action: Action): InitialState => {
  switch (action.type) {
    case 'setMap': 
      return { ...state, map: action.payload }
    case 'setDetections': 
      return { ...state, detections: action.payload }
    case 'setPicture': 
      return { ...state, picture: action.payload }
    default:
      return state
  }
}

type InitialState = typeof initialState

type InitialContext = {
  state: InitialState,
  dispatch: Dispatch<Action>
}

const initialContextState: InitialContext = {
  state: initialState,
  dispatch: () => null
}

export const Context = createContext(initialContextState)

const StoreProvider: FC<{children: ReactNode | []}> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <Context.Provider value={{state, dispatch}}>
    {children}
  </Context.Provider>
}

export default StoreProvider