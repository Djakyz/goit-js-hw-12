import{a as u,S as d,i as l}from"./assets/vendor-67BWzQEt.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const f="51374553-10d356351fe3cee6cad66f6b9",p="https://pixabay.com/api/";function m(r){const o={key:f,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0};return u.get(p,{params:o}).then(s=>s.data)}const y=new d(".gallery a",{captionsData:"alt",captionDelay:250});function g(r){const o=document.querySelector(".gallery"),s=r.map(a=>`
    <li class="gallery-item">
      <a href="${a.largeImageURL}">
        <img src="${a.webformatURL}" alt="${a.tags}" />
      </a>
      <div class="info">
        <p><span class="label">Likes</span> ${a.likes}</p>
        <p><span class="label">Views</span> ${a.views}</p>
        <p><span class="label">Comments</span> ${a.comments}</p>
        <p><span class="label">Downloads</span> ${a.downloads}</p>
      </div>
    </li>
  `).join("");o.insertAdjacentHTML("beforeend",s),y.refresh()}function h(){const r=document.querySelector(".gallery");r.innerHTML=""}function L(){document.querySelector(".loader").classList.add("visible")}function b(){document.querySelector(".loader").classList.remove("visible")}const c=document.querySelector(".form"),i=c.elements["search-text"];c.addEventListener("submit",r=>{r.preventDefault();const o=i.value.trim();if(!o){l.warning({title:"Warning",message:"Please enter a search term!"});return}L(),h(),m(o).then(s=>{if(s.hits.length===0){l.error({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"});return}g(s.hits),i.value=""}).catch(s=>{l.error({title:"Error",message:"Something went wrong. Please try again later."}),console.error(s)}).finally(()=>{b()})});
//# sourceMappingURL=index.js.map
