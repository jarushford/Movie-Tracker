import { logInUser, setError } from '../actions/index'

export const addNewUserThunk = (user) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3000/api/users/new`
      const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json'
        }
      })
      if (!result.ok) {
        throw new Error('User already exists!')
      }
      const data = await result.json()
      dispatch(logInUser({...user, id: data.id}))
      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}
