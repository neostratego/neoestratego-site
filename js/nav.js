/* NEOSTRATEGO — Navbar scroll + mobile */
(function(){
  var nav = document.getElementById('navbar');
  if(!nav) return;
  window.addEventListener('scroll', function(){
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, {passive:true});
})();
