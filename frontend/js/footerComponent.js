const FooterComponents = {
    Footer: (tagIdFooter) => {
        const tagFooter = document.getElementById(tagIdFooter);
        tagFooter.innerHTML = ( 
            '<footer class="footerNav">' +
                '<p>Todos los derechos reservados de sin nombre todavia &copy;</a>' +
            '</footer>'
            );
    }
}

export default FooterComponents;