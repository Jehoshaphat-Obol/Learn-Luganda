(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#app`);e.innerHTML=`
  <main class="placeholder">
    <svg class="placeholder__mark" viewBox="0 0 200 200" role="img" aria-label="Bauhaus shapes">
      <circle cx="78" cy="80" r="52" fill="var(--color-bauhaus-yellow)" />
      <rect x="96" y="96" width="78" height="78" fill="var(--color-bauhaus-blue)" />
      <path d="M26 176 L96 176 L26 106 Z" fill="var(--color-bauhaus-black)" />
      <circle cx="140" cy="54" r="22" fill="var(--color-primary)" />
    </svg>
    <h1 class="placeholder__title">Oli otya!</h1>
    <p class="placeholder__lead">Learn Luganda with bite-sized, game-like lessons. Coming soon.</p>
    <button class="btn" type="button" disabled>Tandika</button>
    <p class="placeholder__note"><em>Tandika</em> means "start".</p>
  </main>
`;