/* Reusable HTML components */
const Components = {
    Navbar: (tagId) => {
        const tag = document.getElementById(tagId);
        tag.innerHTML = ( 
            '<nav class="topnav">' +
                '<a href="http://localhost:8000/users.html">Users</a>' +
                '<a href="http://localhost:8000/products.html">Products</a>' +
                '<a href="#" class="topnav-signout" onclick=\'' +
                'window.localStorage.removeItem("usrId");window.location.href = "/";\'>Sign out</a>' +
            '</nav>'
            );
    }
}

export default Components;