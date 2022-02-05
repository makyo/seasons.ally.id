// Create a modal background and element.
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = '<aside><h3></h3><q></q></aside>';
const aside = modal.querySelector('aside');

// Allow clicking outside or hitting escape to close the modal.
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
aside.onclick = (e) => {
  // We want users to be able to select modal text, so stop click events except on backref link.
  if (e.target.className !== 'footnote-backref') {
    e.stopPropagation();
  }
};

// Append modal to body.
document.querySelector('main').appendChild(modal);

// Collect all of the footnotes and hide the static display.
document.querySelector('.footnotes').style.display = 'none';
let footnotes = {};
document.querySelectorAll('.footnotes li').forEach((fn) => {
  footnotes[fn.getAttribute('id')] = fn.innerHTML;

  // Block the usual action of clicking the backref link, just close the modal
  fn.querySelector('.footnote-backref').onclick = (e) => {
    e.preventDefault();
    modal.classList.remove('active');
  };
})

// For each ref link, set up an event that populates the modal.
document.querySelectorAll('.footnote-ref').forEach((fnRef) => {
  fnRef.onclick = (e) => {
    e.preventDefault();
    const id = fnRef.getAttribute('href').substring(1);
    modal.querySelector('q').innerHTML = footnotes[id];
    modal.querySelector('h3').innerText = id.split(':')[1];
    modal.classList.add('active');
    aside.style.top = `max(calc(50vh - 1rem - ${aside.clientHeight}px / 2), 0px)`;
  };
});
