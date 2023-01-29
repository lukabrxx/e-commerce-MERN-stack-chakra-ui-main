import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from '@chakra-ui/react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link as ReactLink, useLocation } from 'react-router-dom'
//TODO pw make more chr if it is for production
const LoginScreen = () => {
  return (
  <Formik
  initialValues={{email: "", password: ""}}
    validationSchema={Yup.object({
        email: Yup.string().email("Invalid Email").required("An email address is required"),
        password:  Yup.string().min(1, "Password is to short - must contain at least 1 character").required("password is required")
    })}
    onSubmit={(value) => {
        dispatch(login(value.email, value.password))
    }}
  >
  {
    (formik) => {
        <Container maxW="lg" py={{base:"12", md:"24"}}  px={{base:"0", md:"8"}} minH="4xl"></Container>
    }
  }

  </Formik>
  )
}

export default LoginScreen
