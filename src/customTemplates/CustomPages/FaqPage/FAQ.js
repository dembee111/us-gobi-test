import React from 'react';

function FAQ({ faq, index, toggleFAQ }) {
  return (
    <div className={`faq ${faq.open ? 'open' : ''}`} key={index}>
      <div className="faq-question" onClick={() => toggleFAQ(index)}>
        {faq.question}
      </div>
      <div className="faq-answer-h">
        <div className="faq-answer">
          {faq.answer}
          <a href={faq.answerLink}>{faq.answerLink}</a>
          {faq.answer3}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
