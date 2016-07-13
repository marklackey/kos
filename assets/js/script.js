var books = [];
var nextId = 0;
//Only use local storage if supported
var localStorageSupport = (typeof(Storage) !== 'undefined') ? true : false;
$(window).ready(function() {

    //For Development purposes, convenient way to clear storage
    // $("#clearStorage").on('submit', function(e) {
    //     localStorage.clear();
    //     localStorage.books = [];
    //     initBookList();
    //     updateBookListHTML();
    //     updateBookListDisplay();
    // });

    $("#addOrUpdateBookForm").on('submit', addOrUpdateBook);
    //Initialize the book list and update display
    initBookList();
    updateBookListHTML();
    addBookListToPage();

});

//Current storage method makes this slower than I'd like.
//Did it this way because I thought Handlebars needed my
//data structure to be this way, but I think I could improve it
function deleteBook(id) {
    currentBooks = books.slice();
    books = [];
    for (i in currentBooks) {
        if (currentBooks[i]['id'] != id) {
            books.push(currentBooks[i]);
        }
    }
    //Development output
    //console.log(books['books']);
    persistBooks();
    updateBookListHTML(); //these two are separate because
    updateBookListDisplay(); //initializing is different than updating
}

//Again, less efficient because of data storage
function updateBook(data) {
    currentBooks = books.slice();
    books = [];
    for (i in currentBooks) {
        if (currentBooks[i]['id'] != data['id']) {
            books.push(currentBooks[i]);
        } else {
            books.push(data);
        }
    }
    persistBooks();
    updateBookListHTML();
    updateBookListDisplay();
}

function persistBooks() {
    localStorage.books = JSON.stringify(books);
}

function storeBookInBrowser(data) {
    books.push(data);

    if (localStorageSupport) {
        localStorage.books = JSON.stringify(books);
    }
    updateBookListHTML();
    updateBookListDisplay();

}

function readBookListFromBrowser() {

    if (localStorage.books) {
        books = JSON.parse(localStorage.books);
        if (!books) {
            books = [];
        }
    } else {
        books = [];
    }
    for (book in books) {
        if (books[book]['id'] > nextId) {
            nextId = books[book]['id']
        }
        nextId++;
    }
}

//Update or add a book
function addOrUpdateBook(e) {
    // prevent default submit action
    e.preventDefault();

    //quick way to get form values for storage
    var serialized = $(this).serializeArray(),
        obj = {};
    $.each(serialized, function() {
        obj[this.name] = this.value;
    });

    //update or add
    if (obj['updateOrNew'] == 'update') {
        updateBook(obj);
    }
    if (obj['updateOrNew'] == 'new') {
        obj['id'] = nextId;
        nextId++;
        storeBookInBrowser(obj);
        //console.log(books); //development convenience
    }
    resetForm();

}

function resetForm() {
    $('#addOrUpdateBookForm').each(function() {
        this.reset();
    });
    $('#bookFormHiddenField').val("new");
    $('#bookFormIdField').val('');
    $('#bookFormSubmitButton').val("Add");
}

// Could probably refactor to eliminate global variable
var theCompiledHtml;

function updateBookListHTML() {
    // Grab the template script
    var theTemplateScript = $("#example-template").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // This is the default context, which is passed to the template
    var context = {"books":books};

    // Pass our data to the template
    theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
}

function addBookListToPage() {
    $('#listOfBooks').append(theCompiledHtml);
    updateBookListAnchorTags();
}

//Update the page from template.
function updateBookListDisplay() {
    $('#listOfBooks').html(theCompiledHtml);
    updateBookListAnchorTags();
}

function updateBookListAnchorTags() {
    $('.deleteBookButton').on('click', function(e) {
        deleteBook(this.id);
    });
    //Populate update form
    $('.updateBookButton').on('click', function(e) {
        $('#bookFormHiddenField').val("update");
        $('#bookFormIdField').val(this.id);
        $('#bookFormAuthor').val($(this).data()['author']);
        $('#bookFormTitle').val($(this).data()['title']);
        $('#bookFormISBN').val($(this).data()['isbn']);
        $('#bookFormSubmitButton').val("Update");
    });
}

//Execute at loading page or resetting data
function initBookList() {
    if (localStorageSupport) {
        readBookListFromBrowser();
    } else {
        books = [{
                id: '1',
                title: 'Iliad',
                author: 'Homer',
                isbn: '123'
            }];
        nextId = 2;
    }
}
