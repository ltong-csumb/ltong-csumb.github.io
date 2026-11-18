loadBooks("https://openlibrary.org/subjects/fantasy.json?limit=3", "#books");

loadBooks("https://openlibrary.org/subjects/adventure.json?limit=3", "#recommendations");

async function loadBooks(url, container) {
    let response = await fetch(url);
    let data = await response.json();

    for (let book of data.works) {
        let bookCard = document.createElement("div");
        bookCard.className = "book";

        let img = document.createElement("img");
        let cover = book.cover_i || book.cover_id;
        img.src = `https://covers.openlibrary.org/b/id/${cover}-M.jpg`;
        img.alt = "Book cover";

        let title = document.createElement("h3");
        title.textContent = book.title;

        let info = document.createElement("p");

        img.addEventListener("click", function() {
            if (info.textContent === "") {
                displayInfo(book, info);
            } else {
                info.textContent = "";
            }
        });

        bookCard.appendChild(img);
        bookCard.appendChild(title);
        bookCard.appendChild(info);

        document.querySelector(container).appendChild(bookCard);
    }
}

async function displayInfo(book, info) {
    let url = `https://openlibrary.org${book.key}.json`;
    let response = await fetch(url);
    let data = await response.json();

    let author = "Unknown";

    if (book.author_name) {
        author = book.author_name[0];
    } else if (book.authors && book.authors.length > 0) {
        author = book.authors[0].name;
    }

    let description = "No description available.";

    if (typeof data.description === "string") {
        description = data.description;
    } else if (data.description) {
        description = data.description.value;
    }

    info.textContent = `Author: ${author}
    Published: ${book.first_publish_year || "Unknown"}

    Description: ${description}`;
}