import{j as c,r as e}from"./app-_A7k2OWJ.js";function x({message:r,className:n="",...s}){return r?c.jsx("p",{...s,className:"text-sm text-red-600 dark:text-red-400 "+n,children:r}):null}const d=e.forwardRef(function({type:n="text",className:s="",isFocused:a=!1,...f},o){const u=e.useRef(null);return e.useImperativeHandle(o,()=>({focus:()=>{var t;return(t=u.current)==null?void 0:t.focus()}})),e.useEffect(()=>{var t;a&&((t=u.current)==null||t.focus())},[a]),c.jsx("input",{...f,type:n,className:"rounded-md border-black-500 left-20 dark:text-black-300 "+s,ref:u})});export{x as I,d as T};
