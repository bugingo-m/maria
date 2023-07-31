import React from 'react'
import {BiSend} from 'react-icons/bi'
import { toast } from 'react-toastify'
import { useGlobalContext } from './context'
import { useMutation,useQueryClient } from 'react-query'
import customFetch from './utils'
const Form = () => {
  const queryClient = useQueryClient()
  const {isEditing,apparition,setApparition,setIsEditing,id} = useGlobalContext()

  //CREATE TASK
  const {mutate:createApparition,isLoading:createLoading} =useMutation({
  mutationFn:async(name)=>await customFetch.post('/',{name:name}),
  onSuccess:()=>{
    toast.success('Apparition created')
    queryClient.invalidateQueries({queryKey:['apparitions']})
    setApparition('')
  },
  onError:(error)=>{
    toast.error(error.response.data)
  }
})

//EDIT TASK
  const{mutate:editApparition}=useMutation({
    mutationFn:async({id,name})=>await customFetch.patch(`/${id}`,{name:name}),
    onSuccess:()=>{
      toast.success('Apparition edited successfully')
      queryClient.invalidateQueries({queryKey:['apparitions']})
      setIsEditing(false)
      setApparition('')
    },
    onError:(error)=>{
      toast.error(error.response.data)
    }
  })
console.log(id);
    const handleSubmit=(e)=>{
        e.preventDefault()
        //handle editing
        if(isEditing){
          editApparition({id:id,name:apparition})
          return
        }
        createApparition(apparition)
        
    }
    //console.log(isEditing);
  return (
    <form className='apparition-form' onSubmit={handleSubmit} >
        
        <input type='text' className='apparition-input'
        onChange={(e)=>setApparition(e.target.value)}
        value={apparition} />
        <button type='submit' className='apparition-btn' disabled={createLoading}><BiSend/></button>
      
    </form>
  )
}

export default Form
