//function to load posts for index.html
function loadPosts() {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = "";

    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];  //if there are no posts saved it will display a message to add a new post
    if (posts.length === 0) {
        postsContainer.innerHTML = `<p style="color: #ccc; text-align: center;">It's lonely in here, add a new post.</p>`;
        return;
    }

    posts.forEach(post => {
        postsContainer.innerHTML += `
            <div class="post">
                <h2>${post.title}</h2>
                <p class="date">Published on ${post.date}</p>
                <p>${post.content}</p>
                <a href="post.html?postId=${post.id}" style="display: block; margin-top: 10px; color: #3a3ad0; text-decoration: none;">Read more</a>
            </div>`;
    });
}