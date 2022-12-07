var d=Object.defineProperty;var h=(o,e,t)=>e in o?d(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var n=(o,e,t)=>(h(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerpolicy&&(a.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?a.credentials="include":r.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();class c{constructor(e){n(this,"id");n(this,"hasWumpus");n(this,"hasHole");n(this,"hasBat");this.id=e,this.hasWumpus=!1,this.hasHole=!1,this.hasBat=!1}}function m(o,e){if(o*e<20)throw new Error("The gameboard is too small! Choose a bigger one.");const t=[];for(let l=0;l<o;l++){const r=[];for(let a=0;a<e;a++){const u=new c(a*o+l+1);Math.random()<.2?u.hasHole=!0:Math.random()<.3&&(u.hasBat=!0),r.push(u)}t.push(r)}for(;;){const l=Math.round(Math.random()*(o-1)),r=Math.round(Math.random()*(e-1)),a=t[l][r];if(!a.hasHole&&!a.hasBat){a.hasWumpus=!0;break}}return t}class f{constructor(){n(this,"arrowCount");n(this,"moveCount");n(this,"board");n(this,"playerX");n(this,"playerY");this.arrowCount=5,this.moveCount=0,this.board=m(5,4),this.playerX=2,this.playerY=3}playerPosition(){const e=this.playerX,t=this.playerY;return[e,t]}movePlayer(e){e==="North"?this.playerY-=1:e==="East"?this.playerX+=1:e==="South"?this.playerY+=1:e==="West"?this.playerX-=1:console.log("Choose either North, East, South or West.")}wumpusPosition(){for(let e=0;e<this.board[0].length;e++)for(let t=0;t<this.board.length;t++)this.board[t][e].hasWumpus}moveWumpus(){for(let e=0;e<this.board[0].length;e++)for(let t=0;t<this.board.length;t++)if(this.board[t][e].hasWumpus){let l=t+1,r=e;l===this.board.length?l=0:r===this.board[0].length&&(r=0),console.log(t),console.log(e),this.board[t][e].hasWumpus=!1,this.board[l][r].hasWumpus=!0;return}}}const s=new f,p=document.querySelector("#boardContainer"),b=document.querySelector("#arrows"),y=document.querySelector("#moves");b.innerHTML=s.arrowCount.toString();y.innerHTML=s.moveCount.toString();console.log(s.playerPosition());s.movePlayer("North");s.movePlayer("North");s.movePlayer("West");console.log(s.playerPosition());console.log(s.moveWumpus());let i="";for(let o=0;o<s.board[0].length;o++){i+="<tr>";for(let e=0;e<s.board.length;e++)s.playerX===e&&s.playerY===o?i+=`<td class="board-square"> ${s.board[e][o].id} <img src="/player.jpg" width="50"></td>`:s.board[e][o].hasWumpus?i+=`<td class="board-square"> ${s.board[e][o].id} <img src="/wumpus.png" width="50"></td>`:s.board[e][o].hasHole?i+=`<td class="board-square"> ${s.board[e][o].id} <img src="/hole.jpg" width="50"></td>`:s.board[e][o].hasBat?i+=`<td class="board-square"> ${s.board[e][o].id} <img src="/bats.jpg" width="50"></td>`:i+=`<td class="board-square"> ${s.board[e][o].id} </td>`;i+="</tr>"}console.log(s.board);p.innerHTML=i;
