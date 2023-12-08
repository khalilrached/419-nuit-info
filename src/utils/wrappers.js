import Parser from 'html-react-parser';

export function CssWrapper({ style }) {
    return <style>
        {Parser(style)}
    </style>
}

export function JSWrapper({ script }) {
    return <scrip>
        {Parser(script)}
    </scrip>
}