import axios from "axios";

/**
 * @type {import("axios").AxiosRequestConfig}
 */

const RequestConfig = {
    url: `https://axo-openai-nuitinfo.openai.azure.com/openai/deployments/${process.env.REACT_APP_DEPLOYMENT}/chat/completions?api-version=2023-09-01-preview`,
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.REACT_APP_API_KEY
    },
    data: {
        messages: [
            {
                role: 'assistant',
                content: 'create hello world page with html'
            }
        ]
    }
}
/**
 * 
 * @param {{role:'user'|'assistant',content:string}} prompt 
 * @param {Array<{role:'user'|'assistant',content:string}>} old_messages 
 * @param {*} cb 
 */
export function getPrompt(prompt,old_messages,cb,err_cb) {
    const messages_log = [
        ...old_messages,
        prompt
    ]
    axios({
        ...RequestConfig,
        data: {
            messages: messages_log
        }
    })
        .then(cb)
        .catch((err) => {
            err_cb(err)
            console.log(err);
        })
} 