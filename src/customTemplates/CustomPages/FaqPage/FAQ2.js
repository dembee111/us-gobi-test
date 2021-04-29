import React from 'react';

function FAQ2({ faq2, index, toggleFAQ2 }) {
  return (
    <div className={`faq ${faq2.open ? 'open' : ''}`} key={index}>
      <div className="faq-question" onClick={() => toggleFAQ2(index)}>
        {faq2.question}
      </div>
      <div className="faq-answer">
        {faq2.answer}
        <a href={faq2.answerLink}>{faq2.answerLink}</a>
        {faq2.answer3}
      </div>
    </div>
  );
}
export default FAQ2;
