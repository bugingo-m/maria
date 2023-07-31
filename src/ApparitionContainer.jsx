import React from 'react' 
import Apparition from './Apparition'
import customFetch from './utils'
import { useQuery } from 'react-query'

const ApparitionContainer = () => {
  const {isLoading,isError,data} = useQuery({
    queryKey:['apparitions'],
    queryFn:async()=>{
      const {data} = await customFetch.get('/')
      return data
    }
  })
  if(isLoading){
    return(
      <p style={{marginTop:'4rem'}}>Loading....</p>
    )
  }
  if(isError){
    return(
      <p style={{marginTop:'4rem'}}>there was an error</p>
    )
  }
  return (
    <main style={{marginTop:'4rem'}}>
      <h2 className='apparition-heading'>marian apparitions</h2>
      {data.allapparitions.map((apparition)=>{
        return(
        <Apparition key={apparition._id} {...apparition}/>

        )
      })}
    </main>
  )
}

export default ApparitionContainer
