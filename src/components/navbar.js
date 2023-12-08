'use client'

import {
    Box,
    Flex,
    Avatar,
    Text,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Container,
    TableContainer,
    useBreakpoint,
    Link,
    Icon,
    MenuIcon,
    IconButton,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverTrigger,
    usePopper,
    usePopover,
    CloseButton,
    Input,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import { ExternalLinkIcon, HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import { SiGooglesearchconsole } from 'react-icons/si';
import { DiTerminal } from 'react-icons/di';

export function ThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Button rounded={'full'} onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
}

const Routes = [
    {
        name: 'Home',
        url: '/',
        icon: <></>
    },
    {
        name: 'Contact',
        url: '/contact',
        icon: <FaEnvelope></FaEnvelope>
    },
    {
        name: 'Blog',
        url: 'https://blog.khalilrached.com/',
        icon: <ExternalLinkIcon fontWeight={'bold'} />
    },
]

const Route = ({ name, url, icon, active }) => {
    const active_color = useColorModeValue('black', 'white')
    const inactive_color = useColorModeValue('gray.400', 'gray.600')
    const nav = useNavigate();
    const navigate = (url = "") => {
        if (url.startsWith('http')) window.location.href = url;
        else nav(url)
    }
    return <>
        <Button
            className='text-sm font-semibold rounded-sm'
            _hover={{
                textDecoration: 'none',
                backgroundColor: useColorModeValue('black', 'white'),
                color: useColorModeValue('white', 'black')
            }}
            color={active ? active_color : inactive_color}
            textDecoration={'none'}
            href={url}
            leftIcon={icon}
            onClick={() => navigate(url)}
            background={'transparent'}
        >
            {name}
        </Button>
    </>
}

const BurgerMenu = ({ active }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement='bottom-start' isLazy>
            <PopoverTrigger>
                <IconButton variant={'ghost'} icon={isOpen ? <CloseButton /> : <HamburgerIcon />} ></IconButton>
            </PopoverTrigger>
            <PopoverContent outline={'none'} bg={useColorModeValue('gray.50', 'gray.900')} >
                <PopoverBody>
                    <Stack direction={'column'} spacing={7}>
                        {Routes.map((val) => ({ ...val, active: val.name.toLowerCase() === active.toLowerCase() })).map(Route)}
                        <ThemeToggle />
                    </Stack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    </>
}

export default function Nav({ active }) {
    const navigate = useNavigate();
    const bg_color = useColorModeValue('gray.50', 'gray.900')

    return (
        <>
            <Box rounded={'2xl'} bg={bg_color} px={10} mx={{ 'base': 5, 'md': 20 }} my={2}>
                <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
                    <Box className='select-none hover:cursor-pointer' color={useColorModeValue('text-black', 'text-white')} onClick={() => { navigate('/') }} fontWeight={'bold'} >CustomAI</Box>
                    {/* <ResponsiveWrapper breakpoints={['sm', 'md', 'base']} element={<BurgerMenu active={active} />}>
                        <Stack direction={'row'} spacing={7}>
                            {Routes.map((val) => ({ ...val, active: val.name.toLowerCase() === active.toLowerCase() })).map(Route)}
                        </Stack>
                    </ResponsiveWrapper> */}
                </Flex>
            </Box>
        </>
    )
}