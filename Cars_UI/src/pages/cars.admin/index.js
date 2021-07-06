import Create from './Create'
import { useState, useEffect } from "react"
import Update from "./Update"
import { useDispatch } from "react-redux"
import { getAllCarsAsync } from "../../redux/actions/cars.action"
import StoriesList from "./List"
import StoryMenu from "./Menu"

const Story = () => {
  const dispatch = useDispatch()

  const [createForm, setCreateForm] = useState(false)
  const [updateForm, setUpdateForm] = useState({ status: false, info: {}, index: 0 })

  useEffect(() => {
    dispatch({
      type: 'SET_ADMIN_TITLE',
      payload: 'Xe'
    })
    
    // dispatch(getAllProductsAsync({}, true))
  }, [])

  useEffect(() => {
    dispatch(getAllCarsAsync({}, true))
  }, [])

  return (
    <div id='client-tab'>
      <Create status={createForm} setCreateForm={setCreateForm} />
      <Update updateForm={updateForm} setUpdateForm={setUpdateForm} />
      <div className='client-container'>
        <StoryMenu setCreateForm={setCreateForm} />
        <StoriesList setUpdateForm={setUpdateForm} />
      </div>
    </div>
  )
}

export default Story