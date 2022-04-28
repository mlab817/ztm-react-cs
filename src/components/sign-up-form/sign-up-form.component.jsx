import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import { SignUpContainer } from "./sign-up-form.styles";

import Button from "../button/button.component";
import {useDispatch} from "react-redux";
import {signUpStart} from "../../store/user/user.action";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const dispatch = useDispatch()
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
      dispatch(signUpStart(email, password, displayName))
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        alert('cannot create. email already in use')
        resetFormFields()
      } else {
        console.log(`Error occurred with message: ${e.message}`)
      }
    }
  }

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>

      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" name="displayName" required onChange={handleChange} value={displayName} />

        <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email}/>

        <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password}/>

        <FormInput label="Confirm Password" type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword}/>

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm