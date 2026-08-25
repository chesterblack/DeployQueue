import { socket } from "@/socket";
import { DeployItem, PullRequest } from "@/types";
import { useSession } from "next-auth/react";
import { ChangeEvent, SubmitEvent, useState } from "react";
import useFetchPullRequests from "../hooks/useFetchPullRequests";


export default function NewDeployForm() {
  const [ selectedPullRequest, setSelectedPullRequest ] = useState<PullRequest>();

  const { data: session } = useSession();
  const { isLoading, pullRequests } = useFetchPullRequests( session );

  function submitForm( event: SubmitEvent<HTMLFormElement> ) {
    event.preventDefault();
    if ( !session || !selectedPullRequest ) {
      return;
    }

    const submission: DeployItem = {
      user: session.user,
      timestamp: Date.now(),
      pullRequest: selectedPullRequest,
    }

    console.log( 'findme: submission: ', submission );

    socket.emit('deploy', submission);
  }

  function selectPullRequest( e: ChangeEvent<HTMLSelectElement> ) {
    if ( !pullRequests ) {
      return;
    }

    const index = parseInt( e.target.value );
    const selected = pullRequests[index];
    setSelectedPullRequest( selected );
  }

  if ( isLoading || !pullRequests ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <h2>
        Join Queue
      </h2>
      <form onSubmit={ submitForm } className="new-deploy-form">
        <select onChange={ selectPullRequest } defaultValue={ -1 }>
          <option value={ -1 } disabled>
            Select a pull request
          </option>
          { pullRequests.map( ( pullRequest, i ) => (
            <option key={ pullRequest.number } value={ i }>
              { pullRequest.title }
            </option>
          ) ) }
        </select>
        <button type="submit">Join the queue</button>
      </form>
    </div>
  );
}