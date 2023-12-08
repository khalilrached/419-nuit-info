import { SearchIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputRightElement, Spinner, Stack, HStack } from '@chakra-ui/react';
import React from 'react';

const Chat = ({ onChange, value, onClick, loading, onReset }) => {
    return (
        <>
            <HStack width={'full'} >
                <InputGroup>
                    <Input rounded={'full'} backgroundColor={'white'} placeholder='type something...' type='text' onChange={onChange} value={value}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                onClick()
                            }
                        }} ></Input>
                    {loading && <InputRightElement>
                        <Spinner color='blue.500' />
                    </InputRightElement>}
                </InputGroup>
                <Button colorScheme='blue' rounded={'full'} onClick={() => { onReset() }} >Reset</Button>
            </HStack>
        </>
    );
}

export default Chat;