const metaForm = document.querySelector('.meta-form')
const imageForm = document.querySelector('.image-form')
const webSearchForm = document.querySelector('.web-search form')

const description = document.querySelector('.description p')
const tags = document.querySelector('.tags p')
const thumbnail = document.querySelector('.thumbnail img') 
const searchResultContainer = document.querySelector('.Searchresult')
// const searchHeading = document.querySelector('.Searchresult h3')
// const searchContent = document.querySelector('.Searchresult p')


metaForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const res = await fetch('/openai/meta', {
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: metaForm.title.value}),
    method: 'POST'
  })
  const data = await res.json()

  console.log(data)

  description.textContent = data.description.content
  tags.textContent = data.tags.content
})


imageForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const res = await fetch('/openai/image', {
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({prompt: imageForm.prompt.value}),
    method: 'POST'
  })
  const data = await res.json()

  thumbnail.setAttribute('src', data.url)
})

webSearchForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const res = await fetch('/openai/websearch', {
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ query: webSearchForm.websearch.value }),
    method: 'POST'
  })

  const data =  await res.json()

  const text = data.response.output_text;

  const results = text.split("/n").filter(line => line.trim() !== "")

  searchResultContainer.innerHTML = "";

  if(results.length > 0) {
    results.forEach(result => {
      const p = document.createElement('p');
      p.textContent = result;
      searchResultContainer.appendChild(p)
    });
  } else {
    const p = document.createElement('p');
    p.textContent = "No results found.";
    searchResultContainer.appendChild(p);
  }
})