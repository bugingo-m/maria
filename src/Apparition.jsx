import React from 'react'

import {MdDeleteOutline} from 'react-icons/md'
import{BiEdit} from 'react-icons/bi'
import { useGlobalContext } from './context'
import customFetch from './utils'
import { useMutation,useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

const Apparition = ({_id,name,approved}) => {
	
	const {setIsEditing,setApparition,setId} = useGlobalContext()
	const queryClient = useQueryClient()
	const getSingleItem =async(id)=>{
		setIsEditing(true)
		const {data} = await customFetch.get(`/${id}`)
		const[apparition]= data.apparition
		console.log(apparition.name);
		setApparition(apparition.name)
		setId(apparition._id)
	}
	const {mutate:deleteApparition} =useMutation({
		mutationFn:async(id)=>await customFetch.delete(`/${id}`),
		onSuccess:()=>{
			queryClient.invalidateQueries({queryKey:['apparitions']})
			toast.success('apparition deleted successfully')
		}
	})
	const {mutate:checkApparition} =useMutation({
		mutationFn:async({id,approved})=>await customFetch.patch(`/${id}`,{approved}),
		onSuccess:()=>{
			queryClient.invalidateQueries({queryKey:['apparitions']})
			
		}
	})
		
		 
  return (
    <div className='apparition'>
			<input type='checkbox' checked={approved} 
			onChange={()=>checkApparition({id:_id,approved:!approved})}/>
			<p className='info'>{name}</p>
			<button className='edit-btn'
			 onClick={()=>getSingleItem(_id)}><BiEdit/></button>
			<button className='delete-btn' 
			onClick={()=>deleteApparition(_id)}><MdDeleteOutline/></button>
		</div>
  )
}

export default Apparition
