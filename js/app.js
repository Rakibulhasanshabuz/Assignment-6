const toggleSpinner = displayStyle => {
  document.getElementById('spinner').style.display = displayStyle;
};

const errorDiv = document.getElementById('error');

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear data
    searchField.value = '';
    
    if(searchText === ''){
     const p = document.createElement('p');
     p.innerText = `No Result Found`
     errorDiv.appendChild(p);
    }
    else{
      toggleSpinner('block');
      // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => diaplaySearchResults(data.docs, data));
    }
};

const diaplaySearchResults = (books, data) => {
    const searchResult = document.getElementById('search-result');
    const searchFound = document.getElementById('search-found')
    searchResult.textContent = '';
    if(books.length === 0){
      const p = document.createElement('p');
      p.innerText = `No Result Found`
      errorDiv.appendChild(p);
      toggleSpinner('none');
    }
    else{
      const h5 = document.createElement('h5')
        h5.innerHTML = `
        <h5>Search Result Found: ${data.numFound}</h5>
        `;
        searchFound.appendChild(h5);

      books.slice(0, 21).forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Book-name : ${book.title}</h5>
          <h6 class="card-title">author-name : ${book.author_name}.</h6>
          <h6 class="card-title">first-publish-year : ${book.first_publish_year}</h6>
          <p class="card-text">publisher :${book.publisher}</p>
        </div>
      </div>
        `;
        searchResult.appendChild(div);
      
    });
    toggleSpinner('none');
    };

};

// ENd
