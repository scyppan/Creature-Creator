let fuse;
let data = [];

async function initsearchbox() {
  data = creatures;
  fuse = new Fuse(data, { keys: ['name', 'meta.description'] });

  document.getElementById('searchbox').addEventListener('input', e => {
    const query = e.target.value.trim();
    const results = query ? fuse.search(query).map(res => res.item) : data;
    render(results);
  });
}

document.addEventListener('DOMContentLoaded', initsearchbox);