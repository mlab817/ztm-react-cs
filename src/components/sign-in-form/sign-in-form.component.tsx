import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { googleSignInStart } from "../../store/user/user.action";

import {
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";

import FormInput from "../form-input/form-input.component";

import { SignInContainer, ButtonsContainer} from "./sign-in-form.styles";

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({...formFields, [name]: value})
  }

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart())
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await signInAuthUserWithEmailAndPassword(email, password)

      resetFormFields()
    } catch (error) {
      console.log(`Error signing in: `, error)
      // switch(err.code) {
      //   case 'auth/wrong-password':
      //     alert('incorrect password for email')
      //     break
      //   case 'auth/user-not-found':
      //     alert('no user associated with this email')
      //     break
      //   default:
      //     console.log(`Error occurred with message: ${err.message}`)
      // }
    }
  }

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>

      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email}/>

        <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password}/>

        <ButtonsContainer>
          <Button buttonType={BUTTON_TYPES_CLASSES.base} type="submit">Sign In</Button>

          <Button type="button" buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </ButtonsContainer>

      </form>
    </SignInContainer>
  )
}

export default SignInForm