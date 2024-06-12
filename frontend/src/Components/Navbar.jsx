// import { Link } from "@chakra-ui/react";
// import React from "react";
// import { NavLink } from "react-router-dom";

// export const Navbar = () => {
//   return (
//     <>
//       <Link to="/" as={NavLink}>
//         Home
//       </Link>
//       <Link to="/contactUs" as={NavLink}>
//         Contact
//       </Link>
//       <Link to="/account" as={NavLink}>
//         Account
//       </Link>
//       <Link to="/bag" as={NavLink}>
//         Bag
//       </Link>
import { Flex, Heading, Link, Text, useDisclosure, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, IconButton, Image } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MydrawerContent } from "./MydrawerContent";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../Store/actiontype";
import styles from "../style/navbar.module.css";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export const Navbar = ({ setQuery }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    /* const { isAuth } = useSelector((st) => st); */
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            <Flex justify="space-between" alignItems="center" p="4" h={{ base: "10vh", md: "10vh", lg: "10vh", xl: "10vh" }} w="100%" className={styles.navbaronly} zIndex="1000">
                <Flex align="center">
                    <IconButton display={{ base: "flex", md: "none" }} onClick={isOpen ? onClose : onOpen} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} variant="ghost" color="white" aria-label="Toggle Navigation" />
                    <Link to="/" as={NavLink} p="1" display="flex" alignItems="center">
                        {/* import the ShivstarLogo from src directory here  for image tag*/}

                        <Image src={require("../ShivstarLogo.png")} alt="Logo" boxSize="40px" mr="2" width={"85px"} height={"55px"} />
                        <Heading as="h4" fontSize="25px" color="white" ml={{ base: "4", md: "0" }}>
                            SHIVSTAR IMPEX
                        </Heading>
                    </Link>
                </Flex>
                <Flex display={{ base: "none", md: "flex" }} justify="space-around" w="50%">
                    <Text onClick={onOpen} p="1" _hover={{ cursor: "pointer" }} color="white">
                        Diamonds
                    </Text>
                    <Text onClick={onOpen} p="1" _hover={{ cursor: "pointer" }} color="white">
                        Watches
                    </Text>
                    <Text onClick={onOpen} p="1" _hover={{ cursor: "pointer" }} color="white">
                        Gift
                    </Text>
                    <Link to="/contactUs" as={NavLink} p="1" color="white">
                        Contact
                    </Link>
                    <Link to="/account" as={NavLink} p="1" color="white">
                        Account
                    </Link>
                    <Link to="/bag" as={NavLink} p="1" color="white">
                        Bag
                    </Link>
                </Flex>

                <SignedOut>
                    {/* <SignInButton /> */}
                    <SignInButton>
                        <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            Sign-In
                        </button>
                        {/* <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Log-In</button> */}
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                    {/* <UserButton showName /> */}
                </SignedIn>

                {/* <Button
                    display={{ base: "none", md: "flex" }}
                    colorScheme="white"
                    variant="ghost"
                    color="white"
                    onClick={() => {
                        isAuth ? dispatch({ type: LOGOUT }) : navigate("/account");
                    }}
                >
                    {isAuth ? "Logout" : "Login"}
                </Button> */}
            </Flex>

            <Drawer onClose={onClose} isOpen={isOpen} size="md" placement="left">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <Link to="/" as={NavLink} p="1">
                        <DrawerHeader>SHIVSTAR IMPEX</DrawerHeader>
                    </Link>
                    <DrawerBody>
                        <MydrawerContent setQuery={setQuery} />
                        <Flex direction="column" mt="4">
                            <Link to="/" as={NavLink} onClick={onClose} p="2">
                                Home
                            </Link>
                            <Link to="/contactUs" as={NavLink} onClick={onClose} p="2">
                                Contact
                            </Link>
                            <Link to="/account" as={NavLink} onClick={onClose} p="2">
                                Account
                            </Link>
                            <Link to="/bag" as={NavLink} onClick={onClose} p="2">
                                Bag
                            </Link>

                            <SignedOut>
                                {/* <SignInButton /> */}
                                <SignInButton>
                                    <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                        Sign-In
                                    </button>
                                    {/* <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Log-In</button> */}
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            {/* <Button
                                mt="4"
                                onClick={() => {
                                    isAuth ? dispatch({ type: LOGOUT }) : navigate("/account");
                                    onClose();
                                }}
                            >
                                {isAuth ? "Logout" : "Login"}
                            </Button> */}
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};
