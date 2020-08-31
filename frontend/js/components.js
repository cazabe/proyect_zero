/* Reusable HTML components */
const Components = {
    Navbar: (tagId) => {
        const tag = document.getElementById(tagId);
        tag.innerHTML = ( 
            '<nav class="topnav">' +
                '<a href="/users">Users</a>' +
                '<a href="/products">Products</a>' +
                '<a href="#" class="topnav-signout">Sign out</a>' +
            '</nav>');
    }
}

export default Components;