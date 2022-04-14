import { useState} from "react";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss'
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({...formFields, [name]: value})
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await signInAuthUserWithEmailAndPassword(email, password)

      resetFormFields()
    } catch (err) {
      switch(err.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break
        case 'auth/user-not-found':
          alert('no user associated with this email')
          break
        default:
          console.log(`Error occurred with message: ${err.message}`)
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>

      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email}/>

        <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password}/>

        <div className="buttons-container">
          <Button buttonType={BUTTON_TYPES_CLASSES.base} type="submit">Sign In</Button>

          <Button type="button" buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>

      </form>
    </div>
  )
}

export default SignInForm