# Download text file

This extension provides a function `download_link(filename,content,link_text)`, which creates an HTML link tag with the given link tag. When the student clicks on the link, a file with the given filename and content is downloaded.

[There's a demo question showing how to use this extension](https://numbas.mathcentre.ac.uk/question/77554/download-text-file-extension/).

## `download_link(filename,content,link_text)`

Creates an HTML link tag which downloads a file with the given filename and text content. If you don't give `link_text`, the link reads "Download `filename`".

## `csv(data,headers)`

Format a set of data as a CSV file.

* If `data` is a list of lists, The second argument `headers` is an optional list of strings to use as column headers.
* If `data` is a list of dictionaries, the output contains a column for each distinct key in those dictionaries.
* If `data` is a dictionary, it's assumed to map headers to columns of data.