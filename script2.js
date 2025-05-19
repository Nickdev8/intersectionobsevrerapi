// genatate json file
// ls *.jpg *.png 2>/dev/null | jq -R . | jq -s . > images.json

document.addEventListener('DOMContentLoaded', async () => {
  const gallery = document.getElementById('gallery');
  const sentinel = document.getElementById('sentinel');

  let photos = [];
  try {
    const res = await fetch('/images.json');
    photos = await res.json();
    photos = photos.map(name => `/images/${name}`);
  } catch (e) {
    console.error('Kon images.json niet laden:', e);
    return;
  }

  let index = 0;

  function loadPhotos(count = 10) {
    for (let i = 0; i < count && index < photos.length; i++, index++) {
      const img = document.createElement('img');
      img.src = photos[index];
      img.alt = `Foto ${index+1}`;
      gallery.append(img);
    }
  }

  loadPhotos();

  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loadPhotos();
      if (index >= photos.length) {
        io.unobserve(sentinel);
        const endMsg = document.createElement('p');
        endMsg.textContent = 'Geen foto’s meer om te laden.';
        gallery.append(endMsg);
      }
    }
  });
  io.observe(sentinel);
});
