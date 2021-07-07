const apikey = 'c3d80849'


const searchButton = document.querySelector('.search-movie')
searchButton.addEventListener('click', async function(){
  try{
  const inputKeyword = document.querySelector('.input-keyword')
  const movies = await getMovies(inputKeyword.value)
  updateUI(movies)

  } catch (err){
    pesanError(err)
    // console.log('error')
}


})

// ketika tombol detail diklik
// EVENT BINDING
document.addEventListener('click', async function(e){

  if(e.target.classList.contains('movies-detail-button')) {
    const imdbID = e.target.dataset.imdbid
    const movieDetail = await getMovieDetail(imdbID)
    updateUIMovieDetail(movieDetail)

  }


})

function getMovies(key){
  if(key == '')  throw new Error('Masukkan Kata Kunci..')
  return fetch(`http://www.omdbapi.com/?s=${key}&apikey=${apikey}`)
        .then(res => {
          // console.log(res)
          if(!res.ok){
            throw new Error (res.statusText)
          }
          return res.json()
        })
        .then(res => {
          if(res.Response === "False"){
            throw new Error(res.Error)
          }
          return res.Search
        })

    
}
function updateUI(result){
  let card = '';
      result.forEach(r => card += showCards(r))
      let movieContainer = document.querySelector('.movie-container')
      movieContainer.innerHTML = card;
}

function getMovieDetail(z){
return fetch(`http://www.omdbapi.com/?i=${z}&apikey=${apikey}`)
    .then(res => res.json())
    .then(res => res)
}

function updateUIMovieDetail(m){
  const movieDetail = showModal(m)
  const modalDetail = document.querySelector('.modal-detail-movie')
  modalDetail.innerHTML = movieDetail

}


function showCards(r){
    return `<div class="col-md-4 my-5">
            <div class="card" >
              <img src="${r.Poster}" class="card-img-top img-fluid" >
              <div class="card-body">
                <h6 class="card-title">${r.Title}</h6>
                <h6 class="card-subtitle mb-2 text-muted">${r.Year}</h6>
                <a href="#" class="btn btn-primary movies-detail-button" data-toggle="modal" data-target="#detailMovie" data-imdbid="${r.imdbID}">Detail</a>
              </div>
            </div>
          </div>`
}
function showModal(m){
return `<div class="container-fluid">
        <div class="row">
      <div class="col-md-3">
        <img src="${m.Poster}" class="img-fluid" >
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
          <li class="list-group-item"><strong>Rilis:</strong> ${m.Released}</li>
          <li class="list-group-item"><strong>Actors:</strong> ${m.Actors}</li>
          <li class="list-group-item"><strong>Genre:</strong> ${m.Genre}</li>
          <li class="list-group-item"><strong>Plot:</strong> ${m.Plot}</li>
        </ul>
      </div>
    </div>
  </div>`
}

function pesanError(err){
  let movieContainer = document.querySelector('.movie-container')
  return  movieContainer.innerHTML = `<div class="alert alert-info" role="alert">
  ${err}
</div>`
}