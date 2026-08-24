import { socket } from "@/socket";
import { DeployItem } from "@/types";
import { useSession } from "next-auth/react";
import { SubmitEvent, useState } from "react";


export default function NewDeployForm() {
  const [ title, setTitle ] = useState<string>('');
  const [ link, setLink ] = useState<string>('');
  const [ message, setMessage ] = useState<string>('');

  const { data: session } = useSession();

  function submitForm( event: SubmitEvent<HTMLFormElement> ) {
    event.preventDefault();
    const submission: DeployItem = {
      user: session?.user,
      timestamp: Date.now(),
      title,
      link,
      message
    };
    socket.emit('new deploy', submission);
  }
  return (
    <div className="card">
      <h2>
        Join Queue
      </h2>
      <form onSubmit={submitForm} className="new-deploy-form">
        <div className="field-wrapper">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="New component xyz"
            value={ title }
            onChange={ e => setTitle( e.target.value ) }
          />
        </div>
        <div className="field-wrapper">
          <label>Link</label>
          <input
            name="link"
            type="text"
            placeholder="https://github.com/dc-thomson/reforge/pull/1234"
            value={ link }
            onChange={ e => setLink( e.target.value ) }
          />
        </div>
        <div className="field-wrapper">
          <label>Message</label>
          <textarea
            name="message"
            placeholder="This one might take a while, there's loads of terraform stuff."
            value={ message }
            onChange={ e => setMessage( e.target.value ) }
          />
        </div>
        <button type="submit">Reserve a spot</button>
      </form>
    </div>
  );
}