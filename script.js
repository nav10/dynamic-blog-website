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

//function to create and add a write new post button on the homepage
function addCreatePostButton() {
    const buttonHTML = `
        <div class="button-container">
            <a href="new-post.html" class="create-post-button">Write New Post</a>
        </div>`;
    document.querySelector(".container h1").insertAdjacentHTML("afterend", buttonHTML);
}

//function to save a new post from new-post.html
function saveNewPost(event) {
    //gets title and content entered by user, and image if user selects one
    event.preventDefault();
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const imageFile = document.getElementById("image").files[0];

    //creates new post object with ID, title, content and date
    const newPost = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleDateString(),
    };

    //if statement checks if user selected a image to uplaid and converts to base64 string to save to local storage
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = e => {
            newPost.imageUrl = e.target.result;
            savePost(newPost);
        };
        reader.readAsDataURL(imageFile);
    } else {    //if no image is selected, it saves the post without an image
        savePost(newPost);
    }
}

//function to save post to local storage and redirects user back to homepage
function savePost(newPost) {
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    posts.push(newPost);
    localStorage.setItem("blogPosts", JSON.stringify(posts));
    window.location.href = "index.html";
}

//initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
    //if state to check if post container element is present at the top of the homepage, then loads and displays posts from local storage
    if (document.getElementById("posts-container")) {
        loadPosts();
        addCreatePostButton();  //adding a write new post button on homepage
    } else if (document.getElementById("post-details")) {
        loadPostDetails();  //loads and displays specific post based on post ID
    }

    const blogForm = document.getElementById("blogForm");
    if (blogForm) {
        blogForm.addEventListener("submit", saveNewPost);   //event listener that handles form submission for saving new post
    }
});