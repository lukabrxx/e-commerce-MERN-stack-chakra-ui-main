import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    Icon,
    Text,
    useDisclosure,
    Button,
    Stack,
    useColorModeValue,
    useColorMode,
    useToast,
    MenuButton,
    MenuDivider,
    Menu,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react';
  import { Link as ReactLink } from 'react-router-dom';
  import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons';
  import { CgProfile } from 'react-icons/cg';
  import { MdLocalShipping, MdLogout, MdOutlineAdminPanelSettings } from 'react-icons/md';
  import { FiShoppingCart } from 'react-icons/fi';
  import { GiTechnoHeart } from 'react-icons/gi';

  const NavLink = ({path,children}) => (
        <Link as={ReactLink} to={path} py={2} px={2} rounded="md" _hover={{textDecoration: "none", bg: useColorModeValue("gray.200", "gray.700")}}>{children}</Link>
    )
    const links = [
        {name: "Products", path: "/products"},
        {name: "ShoppingCart", path: "/cart"},
    ]

  const Navbar = () => {
    const {isOpen,onClose,onOpen} = useDisclosure()
    const {colorMode, toggleColorMode} = useColorMode()
 
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
    <Flex h={16} justifyContent="space-between" alignItems="center">
    <IconButton  size="md" icon={isOpen? <CloseIcon /> : <HamburgerIcon />} display={{md:"none"}} onClick={isOpen? onClose : onOpen }/>

<HStack>
    <Link as={ReactLink} to="/">
        <Flex alignItems="center">
            <Icon as={GiTechnoHeart} h={6} w={6} color="orange.400" />
            <Text fontWeight="extrabold">Tech</Text>
        </Flex>
    </Link>
    <HStack as="nav" spacing={4} display={{base:"none" , md:"flex"}}>
        {
        links.map(link => (
            <NavLink key={link.name} path={link.path}>{link.name}</NavLink>
        ))
        }
    </HStack>
</HStack>
<Flex alignItems="center">
<NavLink>
<Icon as={colorMode === "light" ? MoonIcon : SunIcon } alignSelf="center" onClick={() => toggleColorMode()} />
</NavLink>
<Button as={ReactLink} to="/login" p={2} fontSize="sm" fontWeight={400} variant="link" display={{base:"none" , md:"inline-flex"}}>Sign In</Button>
<Button as={ReactLink} to="/register" p={2} fontSize="sm" fontWeight={600} variant="link" _hover={{bg:"orange.400"}} bg="orange.500" color="white" display={{base:"none" , md:"inline-flex"}}>Sign up</Button>
</Flex>
</Flex>
{
    isOpen ? (
        <Box pb={4} display={{md:"none"}}>
        <Stack as="nav" spacing={4}>
        {
        links.map(link => (
            <NavLink key={link.name} path={link.path}>{link.name}</NavLink>
        ))
        }
        <NavLink key="sign-up" path="/register">Sign Up</NavLink>
        <NavLink key="sign-in" path="/login">Sign In</NavLink>

        </Stack>
        </Box>
    ) : null
}
    </Box>
  )
}

export default Navbar