/* 
    Use a regular expression to count the words in the text area
    - return 0 if text is null or undefined
    - build array separated by white space
    - use length as word count
    /\w+/g    = matches a whitespace separated word
    \w        = matches a non-space character
    + sign    = every sequence  of one or more characters  counts as a single match
    g         = indicates to returns the substrings that match the pattern in the whole string

*/

function countWords(text) {
  return text ? text.match(/\w+/g).length : 0;
}

export default countWords;