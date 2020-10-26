import gallery from './gallery-items.js';

const isGalleryRef = document.querySelector('.js-gallery');
const galleryImages = onCreateGalleryImages(gallery);

function onCreateGalleryImages(img) {
  return img
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

isGalleryRef.insertAdjacentHTML('beforeend', galleryImages);
isGalleryRef.addEventListener('click', onOpenClick);

const lightBoxRef = document.querySelector('div.lightbox');
const openModalRef = document.querySelector('.lightbox__image');
const btnCloseClickRef = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector('div.lightbox__overlay');


function onOpenClick(evt) { 
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }  
  lightBoxRef.classList.add('is-open');  
  openModalRef.src = evt.target.dataset.source;
  window.addEventListener('keydown', onEscKeyPress);  
  btnCloseClickRef.addEventListener('click', onCloseModal,{once:true});  
  overlayRef.addEventListener('click', onCloseModal, { once: true });
  // btnCloseClickRef.addEventListener('click', onBtnCloseClick,{once:true});  
  // overlayRef.addEventListener('click', onOverlay, { once: true });
  window.addEventListener('keydown', onKeyboardPress);  
}

function onEscKeyPress(evt) {
  const ESC_Key_Code = 'Escape';
  const isESCKey = evt.code === ESC_Key_Code;
  if (isESCKey) {
    onCloseModal();    
  }
}

function onCloseModal() {
  lightBoxRef.classList.remove('is-open');
  openModalRef.src = '';
  window.removeEventListener('keydown', onEscKeyPress);
}

// function onBtnCloseClick(evt) {
//   if (evt.target.nodeName !== 'BUTTON') {
//     return
//   }
//   onCloseModal()
// }

// function onOverlay(evt) {
//   if (evt.target !== evt.currentTarget) {
//     return
//   }
//  onCloseModal()
// }

function onKeyboardPress(event) {
  
  const UrlsArr = gallery.map((img) =>
    img.original);
  
  if (event.code === "ArrowRight") {
    console.dir(event.code);
    for (let i = 0; i < UrlsArr.length; i += 1) {
      if (openModalRef.src === UrlsArr[8]) {
        openModalRef.src = `${UrlsArr[0]}`;
        return;
      } else if (openModalRef.src === UrlsArr[i]) {
        openModalRef.src = `${UrlsArr[i + 1]}`;
        return;
      }
    }
  } else if (event.code === "ArrowLeft") {
    console.dir(event.code);
    for (let i = 0; i < UrlsArr.length; i += 1) {
      if (openModalRef.src === UrlsArr[0]) {
        openModalRef.src = `${UrlsArr[8]}`;
        return;
      } else if (openModalRef.src === UrlsArr[i]) {
        openModalRef.src = `${UrlsArr[i - 1]}`;
        return;
      }
    }
  }
}

