const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const WAITING = 'WAITING';
const IDLE = 'IDLE';


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

function Editor({ text, onTextChange}) {
  function handleChange(event) {
    onTextChange(event.target.value);
  }
  function handleChange(event){
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

function makeFakeRequest() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(Math.random() > 0.5) {
                resolve('Success');
            } else {
                reject("Failure");
            }
        }, 500);
    })
}



// convert to a class 
class WordCounter extends React.Component {
    
    constructor() {
        super();
        this.state = { text: 'Hello There Word Count'};
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    render() {
        const { targetWordCount } = this.props;
        const {text} = this.state;
        const wordCount = countWords(text);
        const progress = wordCount / targetWordCount;
        
        return (
            <form className="measure pa4 sans-serif">
              <Editor 
                onTextChange={this.handleTextChange}
                text={text}
              />
              <Counter count={wordCount} />
              <ProgressBar completion={progress} />
              <SaveManager saveFunction={makeFakeRequest} data={this.state} />
            </form>
        
        );
    } 
    
    handleTextChange(currentText) {
        this.setState(() => ({text: currentText}));
    }
}

function SaveButton({ onClick }){
    return (
     <button className="pv2 ph3" onClick={onClick}>
        SaveButton
        </button>
    );
}

function AlertBox({ status }) {
  if (status === FAILURE) {
    return <div className="mv2">Save failed</div>;
  } else if (status === SUCCESS) {
    return <div className="mv2">Save successful</div>;
  } else if (status === WAITING) {
    return <div className="mv2">Saving…</div>;
  } else {
    return null;
  }
}

class SaveManager extends React.Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
    this.state = { saveStatus: IDLE };
  }
    // when user clicks button 
  save(event) {
    event.preventDefault();
    this.setState(() => ({ saveStatus: WAITING }));
    this.props
      .saveFunction(this.props.data)
      .then(
        success => this.setState(() => ({ saveStatus: SUCCESS })),
        failure => this.setState(() => ({ saveStatus: FAILURE }))
      );
  }
  render() {
    return (
      <div className="flex flex-column mv2">
        <SaveButton onClick={this.save} />
        <AlertBox status={this.state.saveStatus} />
      </div>
    );
  }
}


ReactDOM.render(
  <WordCounter targetWordCount={10} />,
  document.getElementById('app')
);



