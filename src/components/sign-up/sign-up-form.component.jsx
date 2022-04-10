import { useState } from "react";

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('passwords do not match')
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(formFields.email, formFields.password)
      console.log(user)
      // await createUserDocumentFromAuth(userAuth)
      await createUserDocumentFromAuth(user, { displayName })

      resetFormFields()
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        alert('cannot create. email already in use')
      } else {
        console.log(`Error occurred with message: ${e.message}`)
      }

    }
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="displayName">Display Name</label>
        <input type="text" name="displayName" required onChange={handleChange} value={displayName} />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" required onChange={handleChange} value={email}/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" required onChange={handleChange} value={password}/>

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword}/>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignUpForm