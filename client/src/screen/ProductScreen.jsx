import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Image,
  Text,
  Wrap,
  Spinner,
  Alert,
  Stack,
  AlertDescription,
  AlertIcon,
  Flex,
  AlertTitle,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react'
import { MinusIcon, StarIcon, SmallAddIcon } from '@chakra-ui/icons'
import { BiPackage, BiSupport, BiCheckShield } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../redux/action/productActions'
import { addCartItem } from '../redux/action/cartActions'

const ProductScreen = () => {
  const [amount, setAmount] = useState(1)
  let { id } = useParams()
  const toast = useToast()
  // redux
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const { loading, error, product } = products
  const cartContent = useSelector((state) => state.cart)
  const { cart } = cartContent

  useEffect(() => {
    dispatch(getProduct(id))
  }, [dispatch, id, cart])
  return (
    <Wrap spacing="30px" justify="center" minH="100vh">
      {loading ? (
        <Stack direction="row" spacing="4">
          <Spinner
            mt="20"
            thickness="2px"
            speed="0.65s"
            color="orange.500"
            size="xl"
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box
            maxW={{ base: '3xl', lg: '5xl' }}
            mx="auto"
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              align={{ lg: 'flex-start' }}
            >
              <Stack
                pr={{ base: '0', md: '12' }}
                spacing={{ base: '8', md: '4' }}
                flex="1.5"
                mb={{ base: 12, md: '0' }}
              >
                {product.productIsNew && (
                  <Badge
                    rounded="full"
                    w="40px"
                    fontSize="0.8em"
                    colorScheme="green"
                  >
                    New
                  </Badge>
                )}
              <Heading fontSize="2xl" fontWeight="extrabold">{product.name}</Heading>
              <Stack spacing="5">
                <Box>
                  
                </Box>
              </Stack>
              </Stack>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  )
}

export default ProductScreen
