Define a slice of a React program to show a department course schedule.

This slice should have the component App use JSX in TypeScript to show the title and courses of the schedule for 2018-2019. The interface should be responsive to screensize. Use Tailwind 4 to style the HTML. 

Change the app so a user can click a "course plan" button to see a pop-up listing the classes they've selected so far -- numbers, titles, and meeting times. If no courses are selected, the pop-up should have text that says that, along with brief instructions on how to select courses. The pop-up should have a button to close it. Clicking outside the pop-up should also close it, but clicking anywhere inside the pop-up should not.

A reasonable place for the course plan button on the same line as the term selector but on the right side of the screen.

The following code shows an example from a different project that should be used as reference. Follow the coding style used in this example when producing the answer. 

File: /src/components/Modal.tsx
```
import { type PropsWithChildren } from 'react'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) => (
  !isOpen ? null : (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75"
         onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative ">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  )
);

export default Modal;
```

File: /src/components/QuoteCard.tsx
```
import { useState } from 'react';
import { useJsonQuery } from '../utilities/fetch';
import { Button } from './Button';
import Modal from './Modal';
import type { Quote, QuoteCollection } from '../types/quotes';

const noQuote: Quote = { id: 0, quote: 'I have nothing to say.', author: 'Oliver Hardy'};

const pickQuote = (coll: QuoteCollection) => (
  coll.quotes.length === 0 ? noQuote : coll.quotes[Math.floor(Math.random() * coll.quotes.length)]
);

interface ReportModalProps {
  quote: Quote;
  isOpen: boolean;
  onClose: () => void
}

const ReportModal = ({ quote, isOpen, onClose }: ReportModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="flex flex-col">
      <h2 className="text-lg font-bold">Report!</h2>
      <p>Do you want to report this quote to the administrators?</p>
      
      <Button text="Report!" onClick={() => { console.log(quote); onClose() } } />
    </div>
  </Modal>
);

const QuoteCard = ( ) => {
  const [json, isLoading, error] = useJsonQuery('https://dummyjson.com/quotes');
  const [quote, setQuote] = useState<Quote>(noQuote);
  const [modalOpen, setModalOpen] = useState(false);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;

  const collection = json as QuoteCollection;

  const newQuote = () => { if (collection.quotes.length > 0) {
      setQuote(pickQuote(collection))
    }
  }

  return (
    <div className="container mx-auto px-4 w-svw">
      <h1 className="text-2xl">Today's Quote</h1>
      <blockquote className="border-l-4 border-gray-500 italic my-8 pl-4 md:pl-8 py-4 mx-4 md:mx-10 max-w-md">
          <p className="text-lg font-medium">{quote?.quote}</p>
          <cite className="block text-right mt-4 text-gray-600">- {quote?.author}</cite>
      </blockquote>

      <div className="flex gap-2">
        <Button text='New Quote' onClick={newQuote} />
        <Button text='Share Quote' onClick={() => setModalOpen(true)} />
      </div>
        
      <ReportModal quote={quote} isOpen={modalOpen} onClose={() => setModalOpen(false)} />

    </div>
  )
}
export default QuoteCard;
```
