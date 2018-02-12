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



function Counter({ count }) {
  return (
    <p className="mb2">
      Word count: {count}
    </p>
  );
}

function ProgressBar({ completion }) {
  const percentage = completion * 100;
  return (
    <div className="mv2 flex flex-column">
      <label htmlFor="progress" className="mv2">
        Progress
      </label>
      <progress value={completion} id="progress" className="bn">
        {percentage}%
      </progress>
    </div>
  );
}

function Editor({
  text,
  onTextChange
}) {
  function handleChange(event) {
    onTextChange(event.target.value);
  }
  return (
    <div className="flex flex-column mv2">
      <label htmlFor="editor" className="mv2">
        Enter your text:
      </label>
      <textarea
        value={text}
        onChange={handleChange}
        id="editor"
      />
    </div>
  );
}







function WordCounter({ text, targetWordCount }) {
  const wordCount = countWords(text);
  const progress = wordCount / targetWordCount;
  return (
      <form className="measure pa4 sans-serif">
        <Editor text={text} />
          <Counter count={wordCount} />
          <ProgressBar completion={progress} />
      </form>
  );
}


ReactDOM.render(
  <WordCounter text="Count the words in here." targetWordCount={10} />,
  document.getElementById('app')
);



