
const getProducts = async () => {
    let outerDiv = document.querySelector('#outer_div')
    console.log(outerDiv)
    let result = await fetch('/allProducts')
    let products = await result.json()

    for (product of products) {
        let productDiv = document.createElement('div')
        let title = document.createElement('h3')
        let artist = document.createElement('p')
        let image = document.createElement('img')
        let desc = document.createElement('p')
        let materials = document.createElement('p')
        let num_reviews = document.createElement('p')
        let num_sales = document.createElement('p')
        let num_stars = document.createElement('p')
        let price = document.createElement('p')
        let size = document.createElement('p')
        let sizeAndFit = document.createElement('p')
        let imageDiv = document.createElement('div')
        title.textContent = product.title
        artist.textContent = "Artist: " + product.artist
        desc.textContent = "Description: " + product.description
        materials.textContent = "Materials: " + product.materials
        num_reviews.textContent = product.num_reviews
        num_sales.textContent = product.num_sales
        num_stars.textContent = product.num_stars
        price.textContent = "$"+product.price
        size.textContent = product.size.join('x')
        sizeAndFit.textContent = "Size and Fit: "+product.size_and_fit
        imageDiv.appendChild(image)
        imageDiv.classList.add('imageDiv')
        productDiv.classList.add('productDiv')
        image.setAttribute('src', '/images/' + product.image)
        productDiv.appendChild(imageDiv)
        productDiv.appendChild(title)
        productDiv.appendChild(price)
        productDiv.appendChild(artist)
        productDiv.appendChild(desc)
        productDiv.appendChild(materials)
        productDiv.appendChild(sizeAndFit)
        outerDiv.appendChild(productDiv)
    }
    
}
getProducts()
