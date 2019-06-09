const input = document.querySelector('#search_box');
const search_results = document.querySelector('#search_results');
console.log(input);


const searchstate = async search_text => {
    const res = await fetch('../res/states.json');
    const states = await res.json();

    let matches = states.filter(state => {
        const regextext = new RegExp(`^${search_text}`, 'gi');
        return state.name.match(regextext) || state.abbr.match(regextext);
    })

    if (search_text.length === 0)
        matches = [];
    return matches
}

// Adding event listener on input box
input.addEventListener('input', () => {
    if (input.value) {
        searchstate(input.value).then((data) => {
            data1 = data[0]
            
            if(data.length<=0){
                console.log("No data");
                const search_container1 = `
                <div class="search_container">
                        <h1>Sorry No Such search result!!!
                        </h1>
                </div>`
                search_results.innerHTML = search_container1;
            }
            
            else{
                console.log(data.length);
                data.map(element => {
                const html = search_container = `
                <div class="search_container">
                        <h1>${element.name} (${element.abbr})<span class="primary">${element.capital}</span>
                        </h1>
                        <h6>Maine (ME) <span class="primary">Augusta</span>
                        </h6>
                </div>`
                search_results.innerHTML += search_container;
            });
        }
   
        })
    }
    else {
        search_results.innerHTML = ''
    }
});