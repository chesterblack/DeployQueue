import { socket } from "@/socket";
import { Submission } from "@/types";
import { SubmitEvent, useState } from "react";


export default function NewDeployForm() {
  const [ title, setTitle ] = useState<string>('');
  const [ link, setLink ] = useState<string>('');
  const [ message, setMessage ] = useState<string>('');

  function submitForm( event: SubmitEvent<HTMLFormElement> ) {
    event.preventDefault();
    const submission: Submission = { title, link, message };
    socket.emit('new deploy', submission);
  }
  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        name="title"
        placeholder="title"
        value={ title }
        onChange={ e => setTitle( e.target.value ) }
      />
      <input
        type="text"
        name="link"
        placeholder="link"
        value={ link }
        onChange={ e => setLink( e.target.value ) }
      />
      <textarea
        name="message"
        placeholder="message"
        value={ message }
        onChange={ e => setMessage( e.target.value ) }
      />
      <button type="submit">send</button>
    </form>
  );
}