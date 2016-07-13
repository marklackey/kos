# kos
Library at Kos SPA Demo

## Usage
The library should be intuitive to use. There's a form on the left to add a book. When you click the 'update' button for a book, the form is pre-filled for you to update that record.

## About
This app was created by Mark Lackey at the request of Shannon @ Gloo in Boulder, CO.
### Origin of Name
The name 'Kos' comes from the ancient library at Kos, a lesser-known treasure of the ancient world. I like that a resident of Kos is a 'Koan', because in Japanese Zen, a koan is a philosophical riddle or sorts that requires introspection. So the idea that a book is a koan appeals to me.
### Design Considerations
As revealed by the favicon that remains, this project was origially started in Angular 2 with TypeScript. I was excited to learn all about it, but after learning a great deal, it was still buggy and I was a bit lost, so I scrapped it and moved to a 'platform-less' style.
So, I had aspirations for more features like lining to Google Books, adding images, and adding a single book display. But I ran out of time.
### Implementation Details
* Using jquery and Handlebars, along with bootstrap for styling.
* Uses local storage if the browser supports it
* Tried to modularize the javascript as much as possible
* Heavy use of the jquery DOM access abilities, minimal use of the Handlebars templating--could be powerful
* Uploaded to a sub-domain on my server: kos.marklackey.org
