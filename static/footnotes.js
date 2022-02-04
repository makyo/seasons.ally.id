const modal = document.createElement('div');
modal.classList.add('modal');
modal.onclick = (e) => {
  e.preventDefault();
  modal.classList.remove('active');
};
document.onkeydown = (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    modal.classList.remove('active');
  }
};
modal.innerHTML = '<aside><h3></h3><q></q></aside>';
document.querySelector('main').appendChild(modal);
const aside = modal.querySelector('aside');

document.querySelector('.footnotes').style.display = 'none';
let footnotes = {};
document.querySelectorAll('.footnotes li').forEach((fn) => {
  footnotes[fn.getAttribute('id')] = fn.innerHTML;
  fn.querySelector('.footnote-backref').onclick = (e) => {
    e.preventDefault();
    modal.classList.remove('active');
  };
})

document.querySelectorAll('.footnote-ref').forEach((fnRef) => {
  fnRef.onclick = (e) => {
    e.preventDefault();
    const id = fnRef.getAttribute('href').substring(1);
    modal.querySelector('q').innerHTML = footnotes[id];
    modal.querySelector('h3').innerText = id.split(':')[1];
    modal.classList.add('active');
    aside.style.top = `max(calc(50vh - ${aside.clientHeight}px / 2), 0px)`;
  };
});
