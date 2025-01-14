import{z as d,y as p,C as g,r as u,G as x,j as n,H as C,J as D,E as m,T as v,az as y,e as f}from"./index-VKYCie2F.js";import{d as T,D as j,a as w}from"./DialogTitle-DEw6i8NW.js";function R(o){return p("MuiDialogActions",o)}d("MuiDialogActions",["root","spacing"]);const h=o=>{const{classes:t,disableSpacing:s}=o;return D({root:["root",!s&&"spacing"]},R,t)},M=g("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:s}=o;return[t.root,!s.disableSpacing&&t.spacing]}})({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto",variants:[{props:({ownerState:o})=>!o.disableSpacing,style:{"& > :not(style) ~ :not(style)":{marginLeft:8}}}]}),S=u.forwardRef(function(t,s){const e=x({props:t,name:"MuiDialogActions"}),{className:l,disableSpacing:a=!1,...r}=e,i={...e,disableSpacing:a},c=h(i);return n.jsx(M,{className:C(c.root,l),ownerState:i,ref:s,...r})});function A(o){return p("MuiDialogContent",o)}d("MuiDialogContent",["root","dividers"]);const b=o=>{const{classes:t,dividers:s}=o;return D({root:["root",s&&"dividers"]},A,t)},U=g("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:s}=o;return[t.root,s.dividers&&t.dividers]}})(m(({theme:o})=>({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px",variants:[{props:({ownerState:t})=>t.dividers,style:{padding:"16px 24px",borderTop:`1px solid ${(o.vars||o).palette.divider}`,borderBottom:`1px solid ${(o.vars||o).palette.divider}`}},{props:({ownerState:t})=>!t.dividers,style:{[`.${T.root} + &`]:{paddingTop:0}}}]}))),N=u.forwardRef(function(t,s){const e=x({props:t,name:"MuiDialogContent"}),{className:l,dividers:a=!1,...r}=e,i={...e,dividers:a},c=b(i);return n.jsx(U,{className:C(c.root,l),ownerState:i,ref:s,...r})});function $(o){return p("MuiDialogContentText",o)}d("MuiDialogContentText",["root"]);const k=o=>{const{classes:t}=o,e=D({root:["root"]},$,t);return{...t,...e}},E=g(v,{shouldForwardProp:o=>y(o)||o==="classes",name:"MuiDialogContentText",slot:"Root",overridesResolver:(o,t)=>t.root})({}),P=u.forwardRef(function(t,s){const e=x({props:t,name:"MuiDialogContentText"}),{children:l,className:a,...r}=e,i=k(r);return n.jsx(E,{component:"p",variant:"body1",color:"textSecondary",ref:s,ownerState:r,className:C(i.root,a),...e,classes:i})}),F=({open:o,handleClose:t,deleteHandler:s})=>n.jsxs(j,{open:o,onClose:t,children:[n.jsx(w,{children:"Conform Delete"}),n.jsx(N,{children:n.jsx(P,{children:"Are you sure you want to delete this group?"})}),n.jsxs(S,{children:[n.jsx(f,{onClick:t,children:"No"}),n.jsx(f,{onClick:s,color:"error",children:"Yes"})]})]});export{F as default};
