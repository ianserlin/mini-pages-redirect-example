Repro steps:

1. Check out this repo and run with `mrt`
2. Load the app at `localhost:3000` in your browser
3. Navigate to `/dashboard`
4. Open up `mini-pages.js` in the browser debugger and add a breakpoint at line 704
5. Reload the page and at each break point inspect `this.defaultTemplate`

Notice that the order of execution will be:

1. dashboard page run
2. home page run
3. dashboard page run

which is because of the `this.redirect` in the before filter. 

When the data is loaded, the before filter is run reactively again and the content of the page changes accordingly. My original pull request fixes the issue where the content was loaded but the browser url did not reflect the change b/c I assumed this was expected behavior.

If it is not expected behavior for the before filter to have been run reactively again after a redirect, then that is a different bug altogether. :)