import './../css/componentes.css';

const postsContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');
let limit = 3;
let page = 1;
const url = 'https://jsonplaceholder.typicode.com/posts';

/* FETCH => GET POSTS */
const getPosts = async() => {

    try {

        const resp = await fetch(`${url}?_limit=${limit}&_page=${page}`);
        if (!resp.ok) throw 'No se pudo realizar la Petición';
        const data = await resp.json();

        return data;

    } catch (err) {

        throw err;

    }
};
/* SHOW POSTS IN DOM */
const showPosts = async() => {
    const posts = await getPosts();
    posts.map((post) => {
        const { id, title, body } = post;
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="number">${id}</div>
            <div class="post-info">
                <h2 class="post-title">${title}</h2>
                <p class="post-body">
                    ${body}
                </p>
            </div>
        `;
        postsContainer.appendChild(postEl);
    });
};
/* SHOW LOADER & FETCH MORE POSTS */
const showLoading = () => {
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
};
/* FILTER POSTS BY INPUT  */
const filterPosts = (e) => {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach((post) => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();
        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
};
/* ************************************************************ */
const eventos = () => {
    console.log('Event Listeners');
    showPosts(); // Show Initial Posts
    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            showLoading();
        }
    });
    filter.addEventListener('input', filterPosts);
};
/* ************************************************************ */
const init = () => {
    console.log('Infinite Scroll');
    eventos();
};
/* ************************************************************ */
export {
    init
}