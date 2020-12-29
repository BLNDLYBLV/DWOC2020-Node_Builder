const path = require('path');
const url = require('url');
const ipcRender = require('electron').ipcRenderer;

const f_crt = document.getElementById("f_creation"); // file creation button
const m_crt = document.getElementById("m_creation"); // model creation button
const r_mgr = document.getElementById("r_manager"); // route manager button  
const p_mgr=document.getElementById("p_manager"); // package manager button

f_crt.addEventListener('click',()=>{
    console.log("Clicked");
    ipcRender.send('redirection','f_crt');
})
m_crt.addEventListener('click',()=>{
    ipcRender.send('redirection','m_crt');
})
r_mgr.addEventListener('click',()=>{
    ipcRender.send('redirection','r_mgr');
})
p_mgr.addEventListener('click',()=>{
    ipcRender.send('redirection','p_mgr');
})

