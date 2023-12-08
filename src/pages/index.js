import * as React from "react"

import Layout from "../components/layout"


import { AbsoluteCenter, Box, Button, Container, Divider, HStack, Stack, Text, useToast } from "@chakra-ui/react"
import { getPrompt } from "../service/openai"
import Parser from "html-react-parser";
import Chat from "../components/chat"



const IndexPage = () => {
  const [prompt, setPrompt] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [html, setHtml] = React.useState("<h1 style='' >Type your prompt and change your site.</h1>");
  const [style, setStyle] = React.useState('');
  const [script, setScript] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const toast = useToast();

  const onChange = (event) => {
    setPrompt(event.target.value);
  }

  const handlePrompt = () => {
    setLoading(true);
    const _prompt = {
      role: 'assistant',
      content: prompt
    }
    getPrompt(_prompt, messages, (response) => {
      /**
       * @type {string[]}
       */
      const codes = response.data.choices[0].message.content?.replace(/\n/g, ' ')?.match(/```(.*?)```/g)
      codes?.forEach((code) => {
        if (code.search(/```html/g) !== -1 || code.search(/<html>|<div>|<a>|<li>/g) !== -1) {
          console.log('html: ' + code)
          setHtml(code.replace(/```\w+/g, "").replace('```', ''))
        }
        if (code.search(/```css/g) !== -1) {
          console.log('css: ' + code)
          setStyle(code.replace(/```\w+/g, "").replace('```', ''))
        }
        if (code.search(/```js/g) !== -1) alert('cannot execute js code for security reason.');
      })
      setMessages([
        ...messages,
        response.data.choices[0].message,
        _prompt
      ])
      setLoading(false);
      setPrompt('')
    }, (err) => {
      if (err.response.status === 429) {
        toast({
          title:'too many request.',
          status: 'warning',
          position: 'top'
        })
      }
      setLoading(false);
    })
  }

  const onReset = () => {
    setHtml("<h1 style='' >Type your prompt and change your site.</h1>");
    setMessages([]);
    setStyle('');
  }

  return (
    <Layout style={style} script={script} active={'Home'}>
      <Stack minW={'full'} alignItems={'center'} justifyContent={'center'} >
        <Box className="absolute top-24" w={'full'} >
          <div className="overflow-hidden" >
            {Parser(html)}
          </div>
        </Box>
        <Chat onChange={onChange} onReset={() => { onReset() }} onClick={handlePrompt} value={prompt} loading={loading} />
      </Stack>
    </Layout>
  )
}

export default IndexPage
